const {Router} = require('express');

const fs = require('fs-extra');
const path = require('path')

const router = Router();
 const Book = require('../models/Books');

 router.get('/api/books', async(req, res) => {
    const books = await Book.find();

    res.json(
        books
    )
 });

 router.post('/api/books', async(req, res) => {
   const {title, author, isbn} = req.body;
   const imagePath = '/uploads/' + req.file.filename;

    const newBook =  new Book({
        title,
        author,
        isbn,
        imagePath
    });

    await newBook.save();
    res.json({
        message:'Data Saved'
    })
 });

 router.delete('/api/books/:id', async (req, res) => {
     const deleteBook = req.params.id;
    const book =  await Book.findByIdAndDelete(deleteBook);
    fs.unlink(path.resolve('./backend/public' + book.imagePath))
     res.json({
         message: 'Book Deleted'
     })


 })


module.exports = router;