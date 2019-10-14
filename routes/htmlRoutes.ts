import path from 'path';
import { Router } from 'express';

export const HtmlRoutes = Router().get('*', (req, res) => {
  // Defer '/' and all other routes to React App
  res.setHeader('Content-Type', 'text/html');
  res.status(200).sendFile('index.html', {
    root: path.join(__dirname, '../client/build')
  });
});
