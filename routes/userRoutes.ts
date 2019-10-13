import { Router } from 'express';
import { User } from '../models/User';

export default (router: Router): void => {
  router
    .get('/users', (req, res) => {
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
    .post('/users', (req, res) => {
      // Create new User
      // TODO
    })
    .get('/users/:username', (req, res) => {
      // Get User by username
      User.find({ username: req.params.username })
        .then(user => res.json(user))
        .catch(error => res.status(500).send(error));
    })
    .put('/users/:username', (req, res) => {
      // Update User by username
      // TODO
    });
};
