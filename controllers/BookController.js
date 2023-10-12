const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  const { title, author, pages, genre, published } = req.body;
  const newBook = new Book({ title, author, pages, genre, published, userId: req.user.id });
  await newBook.save();
  res.status(201).send('Book created');
};

exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.status(200).send(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.status(200).send(book);
};

exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.status(200).send('Book deleted');
};
