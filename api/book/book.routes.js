const express = require('express')
const { log } = require('../../middlewares/logger.middleware')
const { addBook, getBooks, deleteBook, getBookById, updateBook } = require('./book.controller')
const router = express.Router()

// middleware that is specific to this router

router.get('/', log, getBooks)
router.get('/:id', getBookById)
router.post('/', log, addBook)
router.delete('/:id', deleteBook)
router.put('/:id', updateBook)

module.exports = router