import { Router } from 'express';
import { User } from '../models/User';

export default (router: Router): void => {
  router
    .get('/api/users', (req, res) => {
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
    .post('/api/users', (req, res) => {
      // Create new User
      // TODO
    })
    .get('/api/users/:username', (req, res) => {
      // Get User by username
      User.find({ username: req.params.username })
        .then(user => res.json(user))
        .catch(error => res.status(500).send(error));
    })
    .put('/api/users/:username', (req, res) => {
      // Update User by username
      // TODO
    });
};
