# Editions Machettes

## Contexte:
Machettes Editions wants to develop a secure API to manage a library of books with users having different roles (admin and standard user).

## Spécifications:

### 1. **Initialization:**
   - Creation of a Node.js project.
   - Installation of necessary packages:  `express`, `winston`, `mongoose`, `jsonwebtoken`.

### 2. **Logging System with Winston:**
   - Configuration of Winston to record information, warnings, and errors.
   - Logs must be recorded in a `logs.txt` file.

### 3. **Data Models with Mongoose:**
   - `User` model with the fields `username`, `password`, and `role` (admin or user).
   - `Book` model with the fields `title`, `author`, `pages`, `genre`, `published` (boolean), and `userId` (reference to User).
   - User passwords must be hashed.

### 4. **Middleware and Routes with JWT:**
   - Implementation of JWT middleware to secure the routes.
   - The routes `POST /books` and `DELETE /books/:id` should be accessible only by administrators.
   - The routes `GET /books` and `GET /books/:id` should be accessible by all authenticated users.

### 5. **Required Endpoints:**
   - `POST /users/register`  to register a new user.
   - `POST /users/login`  to log in a user and return a JWT.
   - `POST /books` to add a new book (admin only).
   - `GET /books` to retrieve all books (authenticated users).
   - `GET /books/:id` to retrieve a specific book (authenticated users).
   - `DELETE /books/:id` to delete a book (admin only).

### 6. **Error Management:**
	- Implementation of robust and consistent error management across all endpoints.
	- Errors should be logged with Winston.
	- Error responses should be clear and structured.

### 7. **Test de l'API:**
   - Comprehensive tests of all endpoints with appropriate tools.
   - Verification of JWT security and error management.

## Livrables:
- Documented and commented source code.
- Usage documentation and a README for API deployment.

## Bonus
- Create a simple front-end to utilize the API: free choice of technologies and tools.

## Conclusion:
This project will allow Machettes Editions to effectively manage their library of books with a secure and robust API, thus facilitating daily operations and the management of users and books.