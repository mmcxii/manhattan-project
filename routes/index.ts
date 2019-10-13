import { Router, Application } from 'express';
import { HtmlRoutes } from './htmlRoutes'
import { UserRoutes } from './userRoutes';

export default (app: Application) => {
  // Create new router and setup API routes
  const apiRoutes: Router = Router();

  apiRoutes.use('/users', UserRoutes);

  // Attach routers to Express app
  app.use('/', HtmlRoutes);
  app.use('/api', apiRoutes);
};
