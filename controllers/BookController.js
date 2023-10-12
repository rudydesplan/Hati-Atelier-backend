// Importing Custom Errors and logging utility
const {
  BadRequestError,
  NotFoundError,
} = require('../errors/CustomErrors');
const logger = require('../utils/winstonConfig');

// Importing other dependencies
const Book = require('../models/Book');

// Function to handle adding a book
exports.addBook = async (req, res, next) => {
  try {
    const { title, author, pages, genre, published } = req.body;

    if (!title) {
      throw new BadRequestError('Missing title');
    }
    if (!author) {
      throw new BadRequestError('Missing author');
    }
    if (typeof pages !== 'number') {
      throw new BadRequestError('Pages should be a number');
    }
    if (!genre) {
      throw new BadRequestError('Missing genre');
    }
    if (typeof published !== 'boolean') {
      throw new BadRequestError('Published should be a boolean');
    }

    const newBook = new Book({ title, author, pages, genre, published, userId: req.user.id });
    await newBook.save();
    res.status(201).send('Book created');

  } catch (error) {
    logger.error(error);
    next(error);
  }
};


// Function to get all books
exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    if (!books || books.length === 0) {
      throw new NotFoundError('No books found');
    }
    res.status(200).send(books);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Function to get a book by ID
exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      throw new NotFoundError('Book not found');
    }
    res.status(200).send(book);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Function to delete a book
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      throw new NotFoundError('Book not found');
    }
    res.status(200).send('Book deleted');
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

