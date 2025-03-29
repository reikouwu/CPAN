import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        publisher: {
            type: String,
            required: true,
        },

        pages: {
            type: Number,
            required: true,
        },

        releaseDate: {
            type: Date,
            required: true,
        },

        ISBN: {
            type: String,
            required: true,
        },
    }
);

const Book = mongoose.model('books', bookSchema);
export default Book;