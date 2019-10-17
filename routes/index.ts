import { Router, Application } from 'express';
import { HtmlRoutes } from './htmlRoutes'
import { UserRoutes } from './userRoutes';
import { CommentRoutes } from './commentRoutes';

export default (app: Application) => {
  // Create new router and setup API routes
  const apiRoutes: Router = Router();

  apiRoutes.use('/users', UserRoutes);
  apiRoutes.use('/comments', CommentRoutes);

  // Attach routers to Express app
  app.use('/api', apiRoutes);
  app.use('/', HtmlRoutes);
};
