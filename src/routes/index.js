const express = require("express");
const bookRouter = require("./book.router");
const authRouter = require("./auth.router");

const router = express.Router();

// router testing
router.post("/user", (req, res) => {
    const { firstName, lastName, username } = req.body;
    res.status(200).json({
        firstName,
        lastName,
        username,
    });
});

// router endpoint
router.use("/books", bookRouter);
router.use("/auth", authRouter)

module.exports = router;
