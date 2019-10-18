import { Router } from 'express';
import { Comment, ICommentDocument } from '../models/Comment';
import { IUser } from '../interfaces/IUser';
import { User, IUserDocument } from '../models/User';

// Get votes of the specified type (upvotes or downvotes)
const getVoters = async (id: string, type: 'upvotes' | 'downvotes'): Promise<IUser[] | null> => {
  const votes = await Comment.findById(id, {type}).populate(type);

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
      return res.json(comments);
    } catch (error) {
      return res.status(500).send(error);
    }
  })
  .post('/', async (req, res) => {
    // Create a new comment
    const { text, author } = req.body;

    if (!text) {
      return res.status(400).send('Missing comment text.');
    }
    if (!author) {
      return res.status(400).send('Missing comment author (user).');
    }

    try {
      const newComment: ICommentDocument | Error = await Comment.createComment(author, text);

      if (newComment instanceof Error) {
        throw newComment;
      }

      return res.json(newComment);
    } catch (error) {
      return res.status(500).send(error);
    }
  })
  .get('/:id', async (req, res) => {
    // Get comment by document ID
    try {
      const { id } = req.params;
      const comment: ICommentDocument | null = await Comment.findById(id).populate('author');

      if (!comment) {
        return res.status(404).send(`Comment ${id} not found.`);
      }

      return res.json(comment);
    } catch (error) {
      return res.status(500).send(error);
    }
  })
  .get('/:id/upvotes', async (req, res) => {
    // Get upvoters for comment

    const { id } = req.params;

    try {
      const upvoters = await getVoters(id, 'upvotes');

      return res.json(upvoters);
    } catch (error) {
      return res.status(500).send(error);
    }
  })
  .get('/:id/downvotes', async (req, res) => {
    // Get downvotes for comment
    const { id } = req.params;

    try {
      const downvoters = await getVoters(id, 'downvotes');

      return res.json(downvoters);
    } catch (error) {
      return res.status(500).send(error);
    }
  })
  .put('/:id/upvotes', async (req, res) => {
    // Add comment upvoter
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.status(400).send('Missing username.');
    }

    // Get User document
    const user: IUserDocument | null = await User.findOne({ username });
    if (!user) {
      return res.status(404).send(`User ${username} not found.`);
    }

    // Get Comment document
    const comment: ICommentDocument | null = await Comment.findById(id);
    if (!comment) {
      return res.status(404).send(`Comment ${id} not found.`);
    }

    // Perform upvote, then return updated upvote count
    const upvotes: number | Error = await comment.upvote(user);

    if (upvotes instanceof Error) {
      return res.status(500).send(upvotes);
    }

    res.json(upvotes);
  })
  .put('/:id/downvotes', async (req, res) => {
    // Add comment downvoter
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.status(400).send('Missing username.');
    }

    // Get User document
    const user: IUserDocument | null = await User.findOne({ username });
    if (!user) {
      return res.status(404).send(`User ${username} not found.`);
    }

    // Get Comment document
    const comment: ICommentDocument | null = await Comment.findById(id);
    if (!comment) {
      return res.status(404).send(`Comment ${id} not found.`);
    }

    // Perform downvote, then return updated downvote count
    const downvotes: number | Error = await comment.downvote(user);

    if (downvotes instanceof Error) {
      return res.status(500).send(downvotes);
    }

    res.json(downvotes);
  });
