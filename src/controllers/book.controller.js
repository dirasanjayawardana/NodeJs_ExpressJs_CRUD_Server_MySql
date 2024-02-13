const bookModel = require("../models/book.model");

module.exports = {
    // get books
    getBooks: async (req, res) => {
        try {
            const data = await bookModel.findAll();
            return res.status(200).json({
                message: "success get boook",
                data,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    // create book
    createBook: async (req, res) => {
        try {
            const { title, desc, author } = req.body;
            await bookModel.saveBook({ title, desc, author });
            const data = await bookModel.findAll();
            return res.status(201).json({
                message: "success saved book..",
                data,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
};
