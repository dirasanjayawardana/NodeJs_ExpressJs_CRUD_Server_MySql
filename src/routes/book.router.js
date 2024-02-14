const express = require("express");
const bookController = require("../controllers/book.controller");
const authMiddleware = require("../middleware/auth.middleware");

const bookRouter = express.Router();

// localhost:4000/books
bookRouter.get("/", bookController.getBooks);

// menggunakan middleware
bookRouter.post("/", authMiddleware.authMiddleware, bookController.createBook);
bookRouter.patch("/", bookController.updateBook);
bookRouter.delete("/:id", bookController.deleteBook);

module.exports = bookRouter;
