import { Router } from 'express';
import { Comment, ICommentDocument, User, IUserDocument } from '../models';
import { IUser } from '../interfaces';
import { Ok, BadRequest, ServerError, NotFound, Status, SendStatus } from './Status';

// Get votes of the specified type (upvotes or downvotes)
const getVoters = async (id: string, type: 'upvotes' | 'downvotes'): Promise<IUser[] | null> => {
  const votes = await Comment.findById(id, { type }).populate(type);

  if (!votes) {
    return votes;
  }

  return type === 'upvotes' ? votes.upvotes : votes.downvotes;
};

export const CommentRoutes = Router()
  .get('/', async (req, res) => {
    // Get all comment documents
    try {
      const comments: ICommentDocument[] = await Comment.find();
      return Ok(res, comments);
    } catch (error) {
      return ServerError(res, error);
    }
  })
  .post('/', async (req, res) => {
    // Create a new comment
    const { text, author, product } = req.body;

    if (!text) {
      return BadRequest(res, 'Missing comment text.');
    }
    if (!author) {
      return BadRequest(res, 'Missing comment author (user).');
    }

    try {
      const newComment: ICommentDocument | Error = await Comment.createComment(author, text, product);

      if (newComment instanceof Error) {
        throw newComment;
      }

      return Ok(res, newComment);
    } catch (error) {
      return ServerError(res, error);
    }
  })
  .get('/:id', async (req, res) => {
    // Get comment by document ID
    try {
      const { id } = req.params;
      const comment: ICommentDocument | null = await Comment.findById(id).populate('author');

      if (!comment) {
        return NotFound(res, `Comment ${id} not found.`);
      }

      return Ok(res, comment);
    } catch (error) {
      return ServerError(res, error);
    }
  })
  .get('/:id/upvotes', async (req, res) => {
    // Get upvoters for comment

    const { id } = req.params;

    try {
      const upvoters = await getVoters(id, 'upvotes');

      return Ok(res, upvoters);
    } catch (error) {
      return ServerError(res, error);
    }
  })
  .get('/:id/downvotes', async (req, res) => {
    // Get downvotes for comment
    const { id } = req.params;

    try {
      const downvoters = await getVoters(id, 'downvotes');

      return Ok(res, downvoters);
    } catch (error) {
      return ServerError(res, error);
    }
  })
  .put('/:id/upvotes', async (req, res) => {
    // Add comment upvoter
    const { id } = req.params;
    let { username } = req.body;

    // Verify username is provided
    username = username && username.trim().toLowerCase();

    if (!username) {
      return BadRequest(res, 'Username missing or empty.');
    }

    // Get Comment document
    const comment: ICommentDocument | null = await Comment.findById(id);
    if (!comment) {
      return NotFound(res, `Comment ${id} not found.`);
    }

    // Get User document
    const user: IUserDocument | null = await User.findOne({ username });
    if (!user) {
      return NotFound(res, `User ${username} not found.`);
    }

    // Perform upvote, then return updated upvote count
    const upvotes: number | Error = await comment.upvote(user);

    if (upvotes instanceof Error) {
      return ServerError(res, upvotes);
    }

    return Ok(res, upvotes);
  })
  .put('/:id/downvotes', async (req, res) => {
    // Add comment downvoter
    const { id } = req.params;
    let { username } = req.body;

    // Verify username is provided
    username = username && username.trim().toLowerCase();

    if (!username) {
      return BadRequest(res, 'Username missing or empty.');
    }

    // Get Comment document
    const comment: ICommentDocument | null = await Comment.findById(id);
    if (!comment) {
      return NotFound(res, `Comment ${id} not found.`);
    }

    // Get User document
    const user: IUserDocument | null = await User.findOne({ username });
    if (!user) {
      return NotFound(res, `User ${username} not found.`);
    }

    // Perform downvote, then return updated downvote count
    const downvotes: number | Error = await comment.downvote(user);

    if (downvotes instanceof Error) {
      return ServerError(res, downvotes);
    }

    return Ok(res, downvotes);
  });
