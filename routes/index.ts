import { Router, Application } from 'express';
import { UserRoutes } from './userRoutes';

export default (app: Application) => {
  // Create new router and setup API routes
  const apiRoutes: Router = Router();

  apiRoutes.use('/users', UserRoutes);

  // Attach router to Express app
  app.use('/api', apiRoutes);
};
