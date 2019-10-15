import { Router } from 'express';
import { IUser } from '../interfaces/IUser';
import { User } from '../models/User';
import { UserUtilities } from '../util/UserUtilities';

const userUtilities = new UserUtilities();

export const UserRoutes = Router()
  .get('/', async (req, res) => {
    // Get all users
    try {
      const users: IUser[] = await User.find();
      return res.json(users);
    } catch (error) {
      return res.status(500).send(error);
    }
  })
  .post('/', async (req, res) => {
    // Create new User
    if (!req.body) {
      return res.status(400).send('Missing user data.');
    }

    // TODO - encrypt password before saving
    const newUser = new User(req.body);

    try {
      const savedUser: IUser = await newUser.save();

      return res.status(201).json(savedUser);
    } catch (error) {
      // Duplicate username error
      if (error.name === 'MongoError' && error.code === 11000) {
        return res.status(422).send('Username already exists!');
      }
      return res.status(500).send(error);
    }
  })
  .get('/:username', async (req, res) => {
    // Get User by username
    const username = req.params.username.trim().toLowerCase();

    try {
      const user: IUser | null = await User.findOne({ username });

      if (!user) {
        return res.status(404).send(`User ${username} not found.`);
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).send(error);
    }
  })
  .put('/:username', async (req, res) => {
    // Update User by username
    if (!req.body) {
      return res.status(400).send('Missing user data.');
    }

    const username = req.params.username.trim().toLowerCase();
    const userData = req.body;

    try {
      const user: IUser | null = await User.findOneAndUpdate({ username: username }, userData, {
        new: true
      });

      if (!user) {
        return res.status(404).send(`Cannot update user: ${username} not found.`);
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).send(error);
    }
  })
  .get('/:username/followers', async (req, res) => {
    // Get user followers
    const username = req.params.username.trim().toLowerCase();

    try {
      const user: IUser | null = await User.findOne({
        username: username
      }).populate('followers');

      if (!user) {
        return res.status(404).send(`User ${username} not found.`);
      }

      return res.json(user.followers);
    } catch (error) {
      return res.status(500).send(error);
    }
  })
  .put('/:username/followers', async (req, res) => {
    // Add a follower to a user.
    if (!req.body.follower) {
      return res.status(400).send('Missing follower username.');
    }

    // Get username and follower name
    const username = req.params.username.trim().toLowerCase();
    const followerName: string = String(req.body.follower)
      .trim()
      .toLowerCase();

    // Make sure user and follower are different...
    if (username === followerName) {
      return res.status(400).send('User cannot follow themself.');
    }

    try {
      // Lookup both user and follower User documents
      const userDocs: [IUser, IUser] | Error = await userUtilities.getUserAndFollower(
        username,
        followerName
      );

      if (userDocs instanceof Error) {
        return res.status(404).send(userDocs.message);
      }

      const [user, follower] = userDocs;

      // Update Users follows/followers
      const status = await userUtilities.addFollower(user, follower);

      return res.sendStatus(status);
    } catch (error) {
      return res.status(500).send(error);
    }
  })
  .delete('/:username/followers', async (req, res) => {
    // Remove a follower from user

    if (!req.body.follower) {
      return res.status(400).send('Missing follower username.');
    }

    // Get username and follower name
    const username = req.params.username.trim().toLowerCase();
    const followerName: string = String(req.body.follower)
      .trim()
      .toLowerCase();

    // Make sure user and follower are different...
    if (username === followerName) {
      return res.status(400).send('User cannot follow themself.');
    }

    try {
      // Lookup both user and follower User documents
      const userDocs: [IUser, IUser] | Error = await userUtilities.getUserAndFollower(
        username,
        followerName
      );

      if (userDocs instanceof Error) {
        return res.status(404).send(userDocs.message);
      }

      const [user, follower] = userDocs;

      // Update Users follows/followers
      const status = await userUtilities.removeFollower(user, follower);

      return res.sendStatus(status);
    } catch (error) {
      return res.status(500).send(error);
    }
  })
  .get('/:username/follows', async (req, res) => {
    // Get users the user follows
    const username = req.params.username.trim().toLowerCase();

    try {
      const user: IUser | null = await User.findOne({
        username: username
      }).populate('follows');

      if (!user) {
        return res.status(404).send(`User ${username} not found.`);
      }

      return res.json(user.follows);
    } catch (error) {
      return res.status(500).send(error);
    }
  })
  .put('/:username/follows', async (req, res) => {
    // Adds a user to the specified user's follow list
    if (!req.body.username) {
      return res.status(400).send('Missing username to follow.');
    }

    // Get username and follower name. The provided user in the route is the follower.
    const followerName = req.params.username.trim().toLowerCase();
    const username: string = String(req.body.username)
      .trim()
      .toLowerCase();

    // Make sure user and follower are different...
    if (username === followerName) {
      return res.status(400).send('User cannot follow themself.');
    }

    try {
      // Lookup both user and follower User documents
      const userDocs = await userUtilities.getUserAndFollower(username, followerName);
      if (userDocs instanceof Error) {
        return res.status(404).send(userDocs.message);
      }

      const [user, follower] = userDocs;

      // Update Users follows/followers
      const status = await userUtilities.addFollower(user, follower);

      return res.sendStatus(status);
    } catch (error) {
      return res.status(500).send(error);
    }
  })
  .delete('/:username/follows', async (req, res) => {
    // Remove user from the specified user's follow list

    if (!req.body.username) {
      return res.status(400).send('Missing username to unfollow.');
    }

    // Get username and follower name
    const followerName = req.params.username.trim().toLowerCase();
    const username: string = String(req.body.follower)
      .trim()
      .toLowerCase();

    // Make sure user and follower are different...
    if (username === followerName) {
      return res.status(400).send('User cannot follow themself.');
    }

    try {
      // Lookup both user and follower User documents
      const userDocs: [IUser, IUser] | Error = await userUtilities.getUserAndFollower(
        username,
        followerName
      );

      if (userDocs instanceof Error) {
        return res.status(404).send(userDocs.message);
      }

      const [user, follower] = userDocs;

      // Update Users follows/followers
      const status = await userUtilities.removeFollower(user, follower);

      return res.sendStatus(status);
    } catch (error) {
      return res.status(500).send(error);
    }
  });
