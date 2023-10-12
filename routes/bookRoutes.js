const express = require('express');
const router = express.Router();
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');
const BookController = require('../controllers/BookController');

router.post('/', authenticate, authorizeAdmin, BookController.addBook);
router.get('/', authenticate, BookController.getBooks);
router.get('/:id', authenticate, BookController.getBookById);
router.delete('/:id', authenticate, authorizeAdmin, BookController.deleteBook);

module.exports = router;
