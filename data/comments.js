const mongoCollections = require("../config/mongoCollections");
const memories = mongoCollections.memories;
let { ObjectId, ReadPreferenceMode } = require('mongodb');

const mem = require('./memories');
const { create } = require("handlebars");

module.exports = {

    async create(content, userId, likes) {
        
    }
}