const logger = require('../../services/logger.service')
const bookService = require('./book.service')


async function updateBook(req, res) {
    try {
        const book = req.body;
        const updatedBook = await bookService.update(book)
        res.json(updatedBook)
    } catch (err) {
        logger.error('Failed to update book', err)
        res.status(500).send({ err: 'Failed to update book' })

    }
}

async function getBookById(req, res) {
    try {
        const bookId = req.params.id;
        const book = await bookService.getById(bookId)
        res.json(book)
    } catch (err) {
        logger.error('Failed to get toy', err)
        res.status(500).send({ err: 'Failed to get board' })
    }
}


async function getBooks(req, res) {
    try {
        const books = await bookService.query(req.query)
        res.send(books)
    } catch (err) {
        logger.error('Cannot get books', err)
        res.status(500).send({ err: 'Failed to get books' })
    }
}

async function deleteBook(req, res) {
    try {
        const deletedCount = await bookService.remove(req.params.id)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            res.status(400).send({ err: 'Cannot remove book' })
        }
    } catch (err) {
        logger.error('Failed to delete book', err)
        res.status(500).send({ err: 'Failed to delete book' })
    }
}


async function addBook(req, res) {

 
    try {
        var book = req.body
        book = await bookService.add(book)
        
        // prepare the updated book for sending out
     
        
        // Give the user credit for adding a book
        // var user = await userService.getById(book.byUserId)
        // user.score += 10
     

        // User info is saved also in the login-token, update it


        

        res.send(book)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add book', err)
        res.status(500).send({ err: 'Failed to add book' })
    }
}

module.exports = {
    getBooks,
    deleteBook,
    addBook,
    getBookById,
    updateBook
}