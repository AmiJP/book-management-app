# Book Management API

This project is a RESTful API built using Node.js and Express. It manages a collection of books and authors, providing endpoints for CRUD operations on books and additional functionalities such as fitering book list and bulk deletion of books etc.

## My environment

- nvm (node version manager)
- Node.js version v18.19.0 (lts/hydrogen)
- npm version v10.2.3

## Setup and Initialization

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the server using `npm run dev`.

## Models

### Book Model

- **id**: Unique identifier for the book.
- **title**: The title of the book.
- **author**: The author associated with the book.
- **yearPublished**: The year the book was published.
- **genre**: The genre of the book.

### Author Model

- **id**: Unique identifier for the author.
- **author**: The author's name.
- **born**: The birth date of the author.
- **city**: The city where the author resides.

- ### User Model

- **id**: Unique identifier for the author.
- **email**: The user's email.
- **password**: password for the account.

## API Endpoints

### Book Routes

- **POST /api/books/create/:authorId**: Add a new book associated with a specific author.
- **GET /api/books**: Get a list of books, optionally allow filtering by authors's city and within a specified date range (ex. from 2011-01-01 to 2023-12-31).
- **GET /api/books/:bookId**: Get details of a specific book by its ID.
- **PUT /api/books/update/:bookId**: Update details of a specific book by its ID.
- **DELETE /api/books/delete/:bookId**: Delete a specific book by its ID.
- **DELETE /api/books/delete**: Delete multiple books by their ids.

### Author Routes

- **GET /api/authors**: Get a list of all authors.
- **GET /api/authors/:authorId**: Get details of a specific author by their ID.
- **POST /api/authors/create**: Add a new author.
- **PUT /api/authors/update/:authorId**: Update details of a specific author by their ID.
- **DELETE /api/authors/delete/:authorId**: Delete a specific author by their ID.

## Middleware

- `Logging middleware` logs each API request to the console, including DateTime, HTTP method, URL path, response status code and response time.
- `Error handling middleware` catches and responds with appropriate HTTP status codes and messages for different types of errors.
- `Request validator middleware` catches any validation errors from request query,payload or params and show appropriate errors to user
- `Auth middleware` check if user is logged in or not
- `Current user middleware` verify auth token and attach logged in user payload to request.

## Validation

- Request validation middlewares for each route ensures that all of expected and valid data are provided in api request call.
