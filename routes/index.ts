import { Router, Application } from 'express';
import { HtmlRoutes } from './htmlRoutes'
import { UserRoutes } from './userRoutes';
import { CommentRoutes } from './commentRoutes';
import { LoginRoutes } from './LoginRoutes';
import { validateToken } from '../util/validateToken';

export default (app: Application) => {
  // Create new router and setup API routes
  const apiRoutes: Router = Router();
  apiRoutes.use('/api', LoginRoutes);
  apiRoutes.use('/users', UserRoutes);
  apiRoutes.use('/comments', CommentRoutes);

  // Attach routers to Express app
  app.use('/', apiRoutes);
  app.use('/api', validateToken, apiRoutes);
  app.use('/', HtmlRoutes);
};
