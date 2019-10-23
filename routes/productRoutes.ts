import { Router } from 'express';
import { IProduct, ProductType } from '../interfaces';
import { Product, Query } from '../models';

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
  if (type) {
    const prodType: string = type
      .toString()
      .trim()
      .toLowerCase();

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
  if (query) {
    const queryString: string = query.toString().trim();
    if (queryString !== '') {
      // Split up and trim search terms around ','
      const searchTerms = queryString.split(',').map(s => s.trim()).join('|');
      const pattern = new RegExp(searchTerms);
      productQuery.where({ name: { $regex: pattern, $options: 'i' } });
    }
  }

  return productQuery;
}

export const ProductRoutes = Router()
  .get('/', async (req, res) => {
    const findProducts = buildProductsQuery(req.query);

    // Get all Product documents from DB
    try {
      const products: IProduct[] = await findProducts.exec();

      return res.json(products);
    } catch (error) {
      return res.status(500).send(error);
    }
  })
  .post('/', async (req, res) => {
    if (!req.body) {
      return res.status(400).send('Missing product data.');
    }

    try {
      const newProduct = await Product.create(req.body);

      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(500).send(`Error creating new product: ${error}`);
    }
  })
  .get('/:id', async (req, res) => {
    // Get product by id
    const { id } = req.params;

    try {
      const product: IProduct | null = await Product.findById(id);

      if (!product) {
        return res.status(404).send(`Product ${id} not found.`);
      }

      return res.json(product);
    } catch (error) {
      return res.status(500).send(error);
    }
  });
