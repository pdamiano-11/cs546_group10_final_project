const mongoCollections = require("../config/mongoCollections");
const memories = mongoCollections.memories;
let { ObjectId, ReadPreferenceMode } = require('mongodb');
const moment = require('moment');
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

    async create(title, description, dateTime, location, userId, visibility) {
        try {
            checkStrings(title);
            checkStrings(description);
            checkStrings(dateTime);
            checkStrings(visibility);

            if (!moment(dateTime, 'YYYY-MM-DD', true).isValid()) throw "Date not valid";

            if (Object.prototype.toString.call(location) !== '[object Object]') {
                throw "Location not an object";
            }

            if (location.length !== 4) throw "Location Object invalid";
            
            let attributes = ['address', 'city', 'state', 'country'];
            if (Object.keys(location).length !== 4) throw "Incomplete location attributes";
            for (key in location) {
                if (attributes.indexOf(key) === -1) {
                    throw "A location attribute key is invalid";
                }
                checkStrings(location[key]);
            }

            userObjId = ObjectId(userId);
            if (!ObjectId.isValid(userObjId)) throw "Invalid Object ID";

            const memoryCollection = await memories();

            let memory = {
                title: title,
                description: description,
                images: [],
                date: dateTime,
                location: location,
                userId: userId, 
                visibility: visibility,
                likes: 0,
                comments: []
            }

            const insertedMemory = await memoryCollection.insertOne(memory);
            if (insertedMemory.insertedCount === 0) throw "Could not add the memory";

            const newId = insertedMemory.insertedId;
            const newIdString = newId.toString();

            return newIdString;

        } catch (e) {
            throw "memories.js Error: " + e;
        }
    },
}

