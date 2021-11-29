const mongoCollections = require("../config/mongoCollections");
const memories = mongoCollections.memories;
const comments = mongoCollections.comments;
let { ObjectId, ReadPreferenceMode } = require('mongodb');

const mem = require('./memories');
const { create } = require("handlebars");

module.exports = {

    async create(content, userId, likes) {
        
        try{
            if (typeof(content) !== 'string') throw 'comment must be a string';
            if (typeof(likes) !== 'number') throw 'likes must be a number';

            const memoryCollection = await memories();
            const commentCollection = await comments();
            let comment = {
                memoryId: memoryId,
                content: content,
                userId: userId, 
                likes: 0
            }
            const insertedComment = await commentCollection.insertOne(comment);
            if (insertedComment.insertedCount === 0) throw "Could not add the comment";

            const newId = insertedComment.insertedId;
            const newIdString = newId.toString();

            return newIdString;

        } catch (e) {
            throw "comments.js Error: " + e;
        }
    }
}