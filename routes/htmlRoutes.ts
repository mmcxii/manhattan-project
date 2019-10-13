import { Router } from 'express';

export const HtmlRoutes = Router().get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send('index.html');
});
