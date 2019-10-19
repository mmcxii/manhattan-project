import { Router } from 'express';
import { IProduct } from '../interfaces';
import { Product } from '../models';

export const ProductRoutes = Router()
  .get('/', async (req, res) => {
    // Get all Product documents from DB
    try {
      const products: IProduct[] = await Product.find();

      return res.json(products);
    } catch (error) {
      return res.status(500).send(error);
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
