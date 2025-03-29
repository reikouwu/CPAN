import express from 'express';
import Book from '../models/book.js';

const router = express.Router();
router.get("/", (req, res) => {
    Book.find().then((results) => {
        res.json(results);
    });
});
router.get("/:id", (req, res) => {
    Book.findById(req.params.id).then((result) => {
        res.json(result);
    });
});

router.get("/search", (req, res) => {
    const filter = req.query;
    if (req.query.title) {
        filter.title = req.query.title;
    }
    if (req.query.pages) {
        let pages = parseInt(req.query.pages);
        if (req.query.logicalOperators) {
            switch (req.query.logicalOperators) {
                case gte:
                    filter.pages = { $gte: { pages } };
                    break;
                default:
                    break;
            }
        }
        filter.pages = pages;
    }
});

router.put("/:id", (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((result) => {
        res.json({ message: "Update Successful", result });
    }).catch((error) => {
        res.status(500).json({ message: "Update Failed", error });
    });
});

router.delete("/:id", (req, res) => {
    Book.findByIdAndDelete(req.params.id).then((result) => {
        res.json({ message: "Delete Successful", result });
    });
});

router.post("/save", (req, res) => {
    const { title, author, publisher, pages, releaseDate, ISBN } = req.body;
    let newBook = new Book({
        title,
        author,
        publisher,
        pages: 500,
        releaseDate,
        ISBN,
    });

    newBook.save().then(() => {
        res.json({ message: 'Book Saved' });
    });
});

export default router; 