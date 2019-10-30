import path from 'path';
import { Router } from 'express';
import { Status } from './Status';

export const HtmlRoutes = Router().get('*', (req, res) => {
  // Defer '/' and all other routes to React App
  res.setHeader('Content-Type', 'text/html');
  
  if (process.env.NODE_ENV === 'production') {
    res.status(Status.OK).sendFile('index.html', {
      root: path.join(__dirname, '../../client/build')
    });
  } else {
    res.status(Status.OK).sendFile('index.html', {
      root: path.join(__dirname, '../client/build')
    });
  }

});
