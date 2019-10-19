import { Router, Application } from 'express';
import { HtmlRoutes } from './htmlRoutes'
import { UserRoutes } from './userRoutes';
import { CommentRoutes } from './commentRoutes';
import { LoginRoutes } from './LoginRoutes';
import { ProductRoutes } from './productRoutes';
import { SearchRoutes } from './searchRoutes';
import { validateToken } from '../util/validateToken';

export default (app: Application) => {
  // Create new router and setup API routes
  const apiRoutes: Router = Router();
  apiRoutes.use('/users', UserRoutes);
  apiRoutes.use('/comments', CommentRoutes);
  apiRoutes.use('/products', ProductRoutes);

  // Attach routers to Express app
  app.use('/search', SearchRoutes);
  app.use('/auth', LoginRoutes);
  app.use('/api', validateToken, apiRoutes);
  app.use('/', HtmlRoutes);
};
