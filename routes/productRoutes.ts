import { Router } from 'express';
import { IProduct, ProductType, IUser } from '../interfaces';
import {
  IProductDocument,
  Product,
  Query,
  ICommentDocument,
  Comment,
  IUserDocument,
  User,
  CommentData,
  ProductData
} from '../models';
import { Status, NotFound, ServerError, BadRequest, Ok } from './Status';
import { Dictionary, Response } from 'express-serve-static-core';

interface IProductFilters {
  query?: string;
  type?: string;
}

// Get votes of the specified type (upvotes or downvotes)
const getVoters = async (id: string, type: 'upvotes' | 'downvotes'): Promise<IUser[] | null> => {
  const votes = await Product.findById(id, { type }).populate(type);

  if (votes == null) {
    return votes;
  }

  return type === 'upvotes' ? votes.upvotes : votes.downvotes;
};

// Constructs and returns a query to find Product docs for the provided parms
function buildProductsQuery(parms: IProductFilters, fuzzy = false): Query<IProductDocument[]> {
  // Create new query. Decorate as needed, determined by provided filters
  const productQuery = Product.find();

  const { type, query } = parms;

  // Determine product type
  const prodType =
    type &&
    type
      .toString()
      .trim()
      .toLowerCase();

  const searchType = prodType === 'beer' ? ProductType.BEER : ProductType.MIXED;

  // Determine search name
  const queryString = query && query.trim();
  if (queryString) {
    if (fuzzy) {
      const pattern = new RegExp(queryString);
      productQuery.where({ type: searchType, name: { $regex: pattern, $options: 'i' } });
    } else {
      // Do text search by default
      productQuery.where({ type: searchType, $text: { $search: queryString } });
    }
  } else {
    productQuery.where({ type: searchType });
  }

  return productQuery;
}

async function productVote(
  req: { params: Dictionary<string>; body: Dictionary<string> },
  res: Response,
  voteType: 'upvote' | 'downvote'
): Promise<Response> {
  // Add product voter
  const { id } = req.params;
  let { username } = req.body;

  // Verify username is provided
  username = username && username.trim().toLowerCase();

  if (!username) {
    return BadRequest(res, 'Username missing or empty.');
  }

  try {
    // Get Product document
    const product: IProductDocument | null = await Product.findById(id);
    if (product == null) {
      return NotFound(res, `product ${id} not found.`);
    }

    // Get User document
    const user: IUserDocument | null = await User.findOne({ username });
    if (!user) {
      return NotFound(res, `User ${username} not found.`);
    }

    // Perform vote, then return updated rating data
    const votedProduct: IProductDocument = await (voteType === 'upvote'
      ? product.upvote(user)
      : product.downvote(user));

    return Ok(res, { rating: votedProduct.rating });
  } catch (error) {
    return ServerError(res, `Product vote error: ${error}`);
  }
}

export const ProductRoutes = Router()
  .get('/', async (req, res) => {
    const findProducts = buildProductsQuery(req.query);
    const productFuzzySearch = buildProductsQuery(req.query, true);

    // Get all Product documents from DB
    try {
      const results = await Promise.all([findProducts.exec(), productFuzzySearch.exec()]);
      const [textResults, fuzzyResults] = results;

      const productResults = new Map<string, IProductDocument>(
        [...textResults, ...fuzzyResults].map(r => [`${r._id}`, r])
      );

      return Ok(res, Array.from(productResults.values()));
    } catch (error) {
      return ServerError(res, error);
    }
  })
  .post('/', async (req, res) => {
    if (!req.body) {
      return BadRequest(res, 'Missing product data.');
    }

    try {
      const newProduct = await Product.create(req.body);

      return Ok(res, newProduct, Status.Created);
    } catch (error) {
      return ServerError(res, `Error creating new product: ${error}`);
    }
  })
  .get('/:id', async (req, res) => {
    // Get product by id
    const { id } = req.params;

    if (!id || id.trim() === '') {
      return BadRequest(res, 'No product ID.');
    }

    try {
      const product: IProductDocument | null = await Product.findById(id).populate('comments');

      if (!product) {
        return NotFound(res, `Product ${id} not found.`);
      }

      return Ok(res, new ProductData(product));
    } catch (error) {
      return ServerError(res, error);
    }
  })
  .get('/:id/comments', async (req, res) => {
    const { id } = req.params;

    try {
      const product: IProduct | null = await Product.findOne({ _id: id }, 'comments').populate('comments');
      if (product == null) {
        return NotFound(res, `Product ${id} not found.`);
      }

      const productComments = product.comments
        .sort((c1, c2) => c2.rating - c1.rating)
        .map(c => new CommentData(c, c.author));

      return Ok(res, productComments);
    } catch (error) {
      return ServerError(res, error);
    }
  })
  .post('/:id/comments', async (req, res) => {
    // Product id
    const { id } = req.params;

    // Create a new comment
    const { text, author } = req.body;

    if (!text) {
      return BadRequest(res, 'Missing comment text.');
    }
    if (!author) {
      return BadRequest(res, 'Missing comment author (user).');
    }

    try {
      const newComment: ICommentDocument | Error = await Comment.createComment(author, text, id);

      if (newComment instanceof Error) {
        throw newComment;
      }

      const product: IProductDocument | null = await Product.findByIdAndUpdate(id, {
        $addToSet: { comments: newComment._id }
      });

      if (product == null) {
        return NotFound(res, `Product ${id} not found.`);
      }

      const commentDetails = new CommentData(newComment, newComment.author);

      return Ok(res, commentDetails);
    } catch (error) {
      return ServerError(res, error);
    }
  })
  .get('/:id/upvotes', async (req, res) => {
    // Get product upvotes
    const { id } = req.params;

    try {
      const upvoters = await getVoters(id, 'upvotes');

      return Ok(res, upvoters);
    } catch (error) {
      return ServerError(res, error);
    }
  })
  .get('/:id/downvotes', async (req, res) => {
    // Get product downvotes
    const { id } = req.params;

    try {
      const downvoters = await getVoters(id, 'downvotes');

      return Ok(res, downvoters);
    } catch (error) {
      return ServerError(res, error);
    }
  })
  .put('/:id/upvotes', async (req, res) => {
    return await productVote(req, res, 'upvote');
  })
  .put('/:id/downvotes', async (req, res) => {
    return await productVote(req, res, 'downvote');
  });
