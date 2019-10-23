import { Router } from 'express';
import { IProduct, ProductType } from '../interfaces';
import { Product } from '../models';



export const ProductRoutes = Router()
  .get('/', async (req, res) => {

    const { query, type } = req.query;

    // TODO - this is temporary
    const productType = type === 'beer' ? ProductType.BEER : ProductType.MIXED;

    const searchCriteria = {
      type: productType,
      name: { $regex: new RegExp(query), $options: 'i' }
    }

    // Get all Product documents from DB
    try {
      console.log({criteria: searchCriteria});
      const products: IProduct[] = await Product.find(searchCriteria);

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
