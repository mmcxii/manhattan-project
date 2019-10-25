import { Router } from 'express';
import { IProduct, ProductType } from '../interfaces';
import { Product, Query } from '../models';
import { Status, NotFound, ServerError, BadRequest, Ok } from './Status';

interface IProductFilters {
  query?: string;
  type?: string;
}

// Constructs and returns a query to find Product docs for the provided parms
function buildProductsQuery(parms: IProductFilters): Query<IProduct[]> {
  // Create new query. Decorate as needed, determined by provided filters
  const productQuery = Product.find();

  const { type, query } = parms;

  // Determine product type
  const prodType = type && type.toString().trim().toLowerCase();
  if (prodType) {
    switch (prodType) {
      case 'beer':
        productQuery.where('type', ProductType.BEER);
        break;
      case 'mixed':
        productQuery.where('type', ProductType.MIXED);
        break;
    }
  }

  // Determine search name
  const queryString = query && query.trim();
  if (queryString) {
    productQuery.where({ $text: { $search: queryString } });
  }

  return productQuery;
}

export const ProductRoutes = Router()
  .get('/', async (req, res) => {
    const findProducts = buildProductsQuery(req.query);

    // Get all Product documents from DB
    try {
      const products: IProduct[] = await findProducts.exec();

      return Ok(res, products);
    } catch (error) {
      return ServerError(res, error);
    }
  })
  .post('/', async (req, res) => {
    if (!req.body) {
      return BadRequest(res, 'Missing product data.');
    }

    try {
      const newProduct = await Product.create(req.body);

      return Ok(res, newProduct, Status.Created);
    } catch (error) {
      return ServerError(res, `Error creating new product: ${error}`);
    }
  })
  .get('/:id', async (req, res) => {
    // Get product by id
    const { id } = req.params;

    if (!id || id.trim() === '') {
      return BadRequest(res, 'No product ID.');
    }

    try {
      const product: IProduct | null = await Product.findById(id);

      if (!product) {
        return NotFound(res, `Product ${id} not found.`);
      }

      return Ok(res, product);
    } catch (error) {
      return ServerError(res, error);
    }
  });
