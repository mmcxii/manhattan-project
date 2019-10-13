import { Router } from 'express';
import { User } from '../models/User';

export const UserRoutes = Router()
  .get('/', (req, res) => {
    // Get all users
    User.find()
      .then(users => {
        res.json(users).end();
        return;
      })
      .catch(error => {
        res.status(500).send(error);
        return;
      });
  })
  .post('/', (req, res) => {
    // Create new User
    // TODO
  })
  .get('/:username', (req, res) => {
    // Get User by username
    User.find({ username: req.params.username })
      .then(user => res.json(user))
      .catch(error => res.status(500).send(error));
  })
  .put('/:username', (req, res) => {
    // Update User by username
    // TODO
  });
