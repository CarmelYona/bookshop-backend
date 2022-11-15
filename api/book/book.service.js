const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('book')
        var books = await collection.find(criteria).toArray()
        return books
    } catch (err) {
        logger.error('cannot find books', err)
        throw err
    }

}

async function remove(bookId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { loggedinUser } = store
        const collection = await dbService.getCollection('book')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(bookId) }
        if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
        const {deletedCount} = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove book ${bookId}`, err)
        throw err
    }
}

async function update(book) {
    try {
        var id = ObjectId(book._id)
        delete book._id
        const collection = await dbService.getCollection('book')
        await collection.updateOne({ _id: id }, { $set: { ...book } })
        return book
    } catch (err) {
        logger.error(`cannot update board ${book._id}`, err)
        throw err
    }
}

async function getById(bookId) {
    try {
        const collection = await dbService.getCollection('book')
        const book = collection.findOne({ _id: ObjectId(bookId) })
        return book
    } catch (err) {
        logger.error(`while finding book ${bookId}`, err)
        throw err
    }
}

async function add(book) {
    try {
        const bookToAdd = {
            byUserId: ObjectId(book.byUserId),
            aboutUserId: ObjectId(book.aboutUserId),
            txt: book.txt
        }
        const collection = await dbService.getCollection('book')
        await collection.insertOne(bookToAdd)
        return bookToAdd
    } catch (err) {
        logger.error('cannot insert book', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId
    return criteria
}

module.exports = {
    query,
    remove,
    add,
    getById,
    update
}


