const mongoCollections = require("../config/mongoCollections");
const memories = mongoCollections.memories;
let { ObjectId, ReadPreferenceMode } = require('mongodb');

const mem = require('./memories');

const checkStrings = function checkStrings(string) {
    if (typeof(string) !== 'string') {
        throw "Not a String";
    }

    string = string.trim();

    if (string.length === 0) {
        throw "String too short";
    }

}

module.exports = {

    async create(memoryId, placeholderText, bstring) {
        try {
            if (arguments.length !== 3) throw "Invalid amount of arguments";
            checkStrings(memoryId);
            checkStrings(placeholderText);
            checkStrings(bstring);

            let memoryObjId = ObjectId(memoryId);
            if (!ObjectId.isValid(memoryObjId)) throw "Invalid memory ID";

            const memoryCollection = await memories();
            const parentMemory = await memoryCollection.findOne({ _id: memoryObjId });
            if (parentMemory === null) throw "Memory Not Found";

            let newImage = {
                _id: new ObjectId(),
                memoryId: memoryId,
                placeholderText: placeholderText,
                bstring: bstring
            }

            const addImage = await memoryCollection.updateOne({ _id: memoryObjId}, {$push: {images: newImage}});
            if (addImage.modifiedCount === 0) throw "Could not add image";

            return {imageAdded: true};
        } catch (e) {
            throw "images.js Error: " + e;
        }
    },

    async get(id) {

    },

}