import { Router } from 'express';
import { User, IUserDocument, UserData } from '../models';
import { NotFound, ServerError, BadRequest, Ok, OkNoContent, SendStatus } from './Status';

export const UserRoutes = Router()
  .get('/', async (req, res) => {
    // Get all users
    try {
      const userDocs: IUserDocument[] = await User.find();

      const users: UserData[] = userDocs.map(user => user.toUserData());

      return Ok(res, users);
    } catch (error) {
      return ServerError(res, error);
    }
  })
  .get('/:username', async (req, res) => {
    // Get User by username
    const username = req.params.username.trim().toLowerCase();

    try {
      const userDoc: IUserDocument | null = await User.findOne({ username });

      if (!userDoc) {
        return NotFound(res, `User ${username} not found.`);
      }

      return Ok(res, userDoc.toUserData());
    } catch (error) {
      return ServerError(res, error);
    }
  })
  .put('/:username', async (req, res) => {
    // Update User by username
    if (!req.body) {
      return BadRequest(res, 'Missing user data.');
    }

    const username = req.params.username.trim().toLowerCase();
    const userData = req.body;

    try {
      const user: IUserDocument | null = await User.findOneAndUpdate({ username }, userData, {
        new: true
      });

      if (!user) {
        return NotFound(res, `Cannot update user: ${username} not found.`);
      }

      return Ok(res, user);
    } catch (error) {
      return ServerError(res, error);
    }
  })
  .delete('/:username', async (req, res) => {
    // Delete a User
    // TODO - should be controlled via some Admin flag or equivalent
    const username = req.params.username.trim().toLowerCase();

    try {
      const response = await User.deleteOne({ username });

      if (!response.ok) {
        return ServerError(res, 'Error deleting User.');
      }

      if (!response.deletedCount || response.deletedCount === 0) {
        return OkNoContent(res);
      }

      return Ok(res, `User ${username} deleted.`);
    } catch (error) {
      return ServerError(res, error);
    }
  })
  .get('/:username/followers', async (req, res) => {
    // Get user followers
    const username = req.params.username.trim().toLowerCase();

    try {
      const userDoc: IUserDocument | null = await User.findOne({ username }, 'followers').populate(
        'followers'
      );

      if (!userDoc) {
        return NotFound(res, `User ${username} not found.`);
      }

      const followersData: UserData[] = userDoc.followers.map(user => user.toUserData());

      return Ok(res, followersData);
    } catch (error) {
      return ServerError(res, error);
    }
  })
  .put('/:username/followers', async (req, res) => {
    // Add a follower to a user.
    if (!req.body.username) {
      return BadRequest(res, 'Missing follower username.');
    }

    // Get username and follower name
    const username = req.params.username.trim().toLowerCase();
    const followerName: string = String(req.body.username)
      .trim()
      .toLowerCase();

    // Make sure user and follower are different...
    if (username === followerName) {
      return BadRequest(res, 'User cannot follow themself.');
    }

    try {
      // Lookup both user and follower User documents
      const userDocs:
        | [IUserDocument, IUserDocument]
        | Error = await User.getUserAndFollower(username, followerName);

      if (userDocs instanceof Error) {
        return NotFound(res, userDocs.message);
      }

      const [user, follower] = userDocs;

      // Update Users follows/followers
      const status = await user.addFollower(follower);

      return SendStatus(res, status);
    } catch (error) {
      return ServerError(res, error);
    }
  })
  .delete('/:username/followers', async (req, res) => {
    // Remove a follower from user

    if (!req.body.username) {
      return BadRequest(res, 'Missing follower username.');
    }

    // Get username and follower name
    const username = req.params.username.trim().toLowerCase();
    const followerName: string = String(req.body.username)
      .trim()
      .toLowerCase();

    // Make sure user and follower are different...
    if (username === followerName) {
      return BadRequest(res, 'User cannot follow themself.');
    }

    try {
      // Lookup both user and follower User documents
      const userDocs:
        | [IUserDocument, IUserDocument]
        | Error = await User.getUserAndFollower(username, followerName);

      if (userDocs instanceof Error) {
        return NotFound(res, userDocs.message);
      }

      const [user, follower] = userDocs;

      // Update Users follows/followers
      const status = await user.removeFollower(follower);

      return SendStatus(res, status);
    } catch (error) {
      return ServerError(res, error);
    }
  })
  .get('/:username/follows', async (req, res) => {
    // Get users the user follows
    const username = req.params.username.trim().toLowerCase();

    try {
      const user: IUserDocument | null = await User.findOne({ username }, 'follows').populate(
        'follows'
      );

      if (!user) {
        return NotFound(res, `User ${username} not found.`);
      }

      const followsData: UserData[] = user.follows.map(user => user.toUserData());

      return Ok(res, followsData);
    } catch (error) {
      return ServerError(res, error);
    }
  })
  .put('/:username/follows', async (req, res) => {
    // Adds a user to the specified user's follow list
    if (!req.body.username) {
      return BadRequest(res, 'Missing username to follow.');
    }

    // Get username and follower name. The provided user in the route is the follower.
    const followerName = req.params.username.trim().toLowerCase();
    const username: string = String(req.body.username)
      .trim()
      .toLowerCase();

    // Make sure user and follower are different...
    if (username === followerName) {
      return BadRequest(res, 'User cannot follow themself.');
    }

    try {
      // Lookup both user and follower User documents
      const userDocs = await User.getUserAndFollower(username, followerName);
      if (userDocs instanceof Error) {
        return NotFound(res, userDocs.message);
      }

      const [user, follower] = userDocs;

      // Update Users follows/followers
      const status = await user.addFollower(follower);

      return SendStatus(res, status);
    } catch (error) {
        return ServerError(res, error);
    }
  })
  .delete('/:username/follows', async (req, res) => {
    // Remove user from the specified user's follow list

    if (!req.body.username) {
      return BadRequest(res, 'Missing username to unfollow.');
    }

    // Get username and follower name
    const followerName = req.params.username.trim().toLowerCase();
    const username: string = String(req.body.username)
      .trim()
      .toLowerCase();

    // Make sure user and follower are different...
    if (username === followerName) {
      return BadRequest(res, 'User cannot follow themself.');
    }

    try {
      // Lookup both user and follower User documents
      const userDocs:
        | [IUserDocument, IUserDocument]
        | Error = await User.getUserAndFollower(username, followerName);

      if (userDocs instanceof Error) {
        return NotFound(res, userDocs.message);
      }

      const [user, follower] = userDocs;

      // Update Users follows/followers
      const status = await user.removeFollower(follower);

      return SendStatus(res, status);
    } catch (error) {
      return ServerError(res, error);
    }
  });
