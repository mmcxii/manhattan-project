import { Router, Application } from 'express';
import userRoutes from './userRoutes';

export default (app: Application) => {
  // Create new router and setup API routes
  const router: Router = Router();

  userRoutes(router);

  // Attach router to Express app
  app.use('/api', router);
};
