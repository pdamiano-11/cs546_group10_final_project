const mongoCollections = require("../config/mongoCollections");
const memories = mongoCollections.memories;
const users = mongoCollections.users;
let { ObjectId, ReadPreferenceMode } = require('mongodb');
const moment = require('moment');
const { updateLocale } = require("moment");
moment().format();

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

    async create(title, description, date, location, userId, visibility, favorite) {
        try {
            for (let n = 0; n < arguments.length; n++) {
                if (!arguments[n]) throw "Invalid Parameter";
            }
            checkStrings(title);
            checkStrings(description);
            checkStrings(date);
            checkStrings(userId);
            checkStrings(visibility);
            checkStrings(favorite);

            //if (!moment(date, 'DD-MM-YYYY', true).isValid()) throw "Date not valid";

            let fav;
            if (favorite === 'yes') {
                fav = true; 
            }else { 
                fav = false;
            }

            userObjId = ObjectId(userId);
            if (!ObjectId.isValid(userObjId)) throw "Invalid Object ID";

            const memoryCollection = await memories();

            let memory = {
                title: title,
                description: description,
                images: [],
                date: date,
                location: location,
                userId: userId, 
                visibility: visibility,
                favorite: fav,
                likes: 0,
                comments: []
            }

            const insertedMemory = await memoryCollection.insertOne(memory);
            if (insertedMemory.insertedCount === 0) throw "Could not add the memory";

            const newId = insertedMemory.insertedId;
            const newIdString = newId.toString();

            const userCollection = await users();
            const userNewMem = await userCollection.updateOne({_id : userObjId}, {$push : {memories : newIdString}});
            if (userNewMem.modifiedCount === 0) throw "Could not add memory to user";

            return newIdString;

        } catch (e) {
            throw "memories.js Error: " + e;
        }
    },

    async getById(id) {
        try {
            if (arguments.length !== 1) throw "Too many arguments";
            for (let n = 0; n < arguments.length; n++) {
                if (!arguments[n]) throw "Invalid Parameter";
            }
            
            checkStrings(id);

            let objectId = ObjectId(id);
            if (!ObjectId.isValid(objectId)) throw "Invalid memory ID";

            const memoryCollection = await memories();
            const memory = await memoryCollection.findOne({_id: objectId});
            if (memory === null) throw "Unable to find memory";

            return memory;

        } catch (e) {
            throw "memories.js Error: " + e;
        }
    },

    async getAll() {
        try {
            if (arguments.length !== 0) throw "Too many arguments";

            const memoryCollection = await memories();
            const memories = await memoryCollection.find({}).toArray();
            if (memories === null) throw "Unable to find memories";

            return memories;

        } catch (e) {
            throw "memories.js Error: " + e;
        }
    },

    async delete(id) {
        try {
            if (arguments.length !== 1) throw "Too many arguments";
            for (let n = 0; n < arguments.length; n++) {
                if (!arguments[n]) throw "Invalid Parameter";
            }
            
            checkStrings(id);

            let objectId = ObjectId(id);

            const memoryCollection = await memories();
            const deleteMemory = await memoryCollection.deleteOne({_id: objectId});
            if (deleteMemory.deletedCount === 0) throw "Could not delete memory";

            return {deleted: true};

        } catch (e) {
            throw "memories.js Error: " + e;
        }
    },

    async update(id, title, description, date, location, visibility, images, favorite) {
        try {
            for (let n = 0; n < arguments.length; n++) {
                if (!arguments[n]) throw "Invalid Parameter: " + arguments[n];
            }
            checkStrings(title);
            checkStrings(description);
            checkStrings(date);
            checkStrings(visibility);
            checkStrings(favorite);

            let fav;
            if (favorite === 'yes') {
                fav = true; 
            }else { 
                fav = false;
            }

            // if (!Array.isArray(images)) throw "Images not an array";

            // if (!moment(dateTime, 'YYYY-MM-DD', true).isValid()) throw "Date not valid";

            const memoryCollection = await memories();
            let objectId = ObjectId(id);

            let newMemory = {
                title: title,
                description: description,
                date: date,
                location: location,
                visibility: visibility,
                favorite: fav
            }
            
            const updatedMemory = await memoryCollection.updateOne(
                { _id : objectId}, 
                {$set : newMemory});
            if (images == false && updatedMemory.modifiedCount === 0) throw "Could not update item.";
            
            return {updated: true};

        } catch (e) {
            throw "memories.js Error: " + e;
        }
    }
}

