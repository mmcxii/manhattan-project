import { IUser } from '../interfaces/IUser';
import { User } from '../models/User';
import { QueryUpdateOptions } from 'mongoose';

interface IUpdateContext {
  filter: Object;
  options: QueryUpdateOptions;
}

export class UserUtilities {
  addFollower(user: IUser, follower: IUser): Promise<number> {
    // Add follower to user
    const userContext: IUpdateContext = {
      filter: { _id: user._id },
      options: { $addToSet: { followers: follower._id } }
    };

    // Add user to follows
    const followerContext: IUpdateContext = {
      filter: { _id: follower._id },
      options: { $addToSet: { follows: user._id } }
    };

    return this.updateFollowers(userContext, followerContext);
  }

  removeFollower(user: IUser, follower: IUser): Promise<number> {
    // Remove follower from followers
    const userContext: IUpdateContext = {
      filter: { _id: user._id },
      options: { $pull: { followers: follower._id } }
    };

    // Remove user from follows
    const followerContext: IUpdateContext = {
      filter: { _id: follower._id },
      options: { $pull: { follows: user._id } }
    };

    return this.updateFollowers(userContext, followerContext);
  }

  async updateFollowers(...updateContext: IUpdateContext[]): Promise<number> {
    // Get User/Follower update results and return appropriate status
    const results = await Promise.all(updateContext.map(u => User.updateOne(u.filter, u.options)));

    const allOk = results.every(result => result.ok === 1);

    return allOk ? 200 : 202;
  }

  async getUserAndFollower(
    username: string,
    followerName: string
  ): Promise<[IUser, IUser] | Error> {
    // Find both user documents
    const users: IUser[] = await User.find({
      username: [username, followerName]
    });

    // Match user documents on username
    const user: IUser | undefined = users.find(u => u.username === username);
    const follower: IUser | undefined = users.find(u => u.username === followerName);

    // Return error if one or both documents not found
    if (!follower || !user) {
      const name = !user ? username : followerName;
      return new Error(`User not found: ${name}`);
    }

    // Return both User documents in a tuple (User,Follower)
    return [user, follower];
  }
}
