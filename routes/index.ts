import { Router, Application } from 'express';
import { AuthRoutes } from './authRoutes';
import { HtmlRoutes } from './htmlRoutes'
import { UserRoutes } from './userRoutes';
import { CommentRoutes } from './commentRoutes';
import { ProductRoutes } from './productRoutes';
import { FileRoutes } from './fileRoutes';
import { validateToken } from '../util/validateToken';

export * from './Status';

export default (app: Application) => {
  // Create new router and setup API routes
  const apiRoutes: Router = Router();
  apiRoutes.use('/users', UserRoutes);
  apiRoutes.use('/comments', CommentRoutes);
  apiRoutes.use('/products', ProductRoutes);
  apiRoutes.use('/files', FileRoutes);

  // Attach routers to Express app
  app.use('/auth', AuthRoutes);
  app.use('/api', validateToken, apiRoutes);
  app.use('/', HtmlRoutes);
};
