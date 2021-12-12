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

    async create(memoryId, placeholderText, fileLink) {
        try {
            if (arguments.length !== 3) throw "Invalid amount of arguments";
            for (let n = 0; n < arguments.length; n++) {
                if (!arguments[n]) throw "Invalid Parameter";
            }
            checkStrings(memoryId);
            checkStrings(placeholderText);
            checkStrings(fileLink);

            let memoryObjId = ObjectId(memoryId);
            if (!ObjectId.isValid(memoryObjId)) throw "Invalid memory ID";

            const memoryCollection = await memories();
            const parentMemory = await memoryCollection.findOne({ _id: memoryObjId });
            if (parentMemory === null) throw "Memory Not Found";

            let newImage = {
                _id: new ObjectId(),
                memoryId: memoryId,
                placeholderText: placeholderText,
                fileLink: fileLink
            }

            const addImage = await memoryCollection.updateOne({ _id: memoryObjId}, {$push: {images: newImage}});
            if (addImage.modifiedCount === 0) throw "Could not add image";

            return {imageAdded: true};
        } catch (e) {
            throw "images.js create Error: " + e;
        }
    },

    async get(id) {
        try {
            if (arguments.length !== 1) throw "Invalid amount of arguments";
            if (!id) throw "ID not found";

            checkStrings(id);

            let objectId = ObjectId(id);
            if (!ObjectId.isValid(memoryObjId)) throw "Invalid memory ID";

            const memoryCollection = await memories();
            let parentMemory = await memoryCollection.findOne({"images._id" : objectId});

            let imgLink = 0;
            for (let n = 0; n < parentMemory["images"].length; n++) {
                if (parentMemory["images"][n]["_id"].toString() === id) {
                    imgLink = parentMemory["images"][n]["fileLink"];
                    break;
                }
            }
            return imgLink;

        } catch (e) {
            throw "images.js get Error: " + e;
        }
    },

    async getAll(memoryId) {
        try {
            if (arguments.length !== 1) throw "Invalid amount of arguments";
            if (!memoryId) throw "Memory ID not found";

            checkStrings(memoryId);

            const objectId = ObjectId(memoryId);
            if (!ObjectId.isValid(restId)) throw "Invalid Object ID";

            let parentMemory = mem.getById(memoryId);

            let imgLinks = [];
            for (let i = 0; i < parentMemory["images"].length; i++) {
                imgLinks.push(parentMemory["images"][i]["fileLink"]);
            }

            return imgLinks;

        } catch (e) {
            throw "images.js getAll Error: " + e;
        }
    },

    async remove(id) {
        try {
            if (arguments.length !== 1) throw "Invalid amount of arguments";
            if (!id) throw "ID not found";

            checkStrings(id);

            let objectId = ObjectId(id);
            if (!ObjectId.isValid(objectId)) throw "Invalid memory ID";

            const memoryCollection = await memories();
            let parentMemory = await memoryCollection.findOne({"images._id" : objectId});

            let img = 0;
            for (let n = 0; n < parentMemory["images"].length; n++) {
                if (parentMemory["images"][n]["_id"].toString() === id) {
                    img = parentMemory["images"][n];
                    break;
                }
            }

            const deleteImage = await memoryCollection.updateOne({ _id : parentMemory['_id'] }, {$pull : {images : img}});
            if (deleteImage.modifiedCount === 0) throw `Could not delete image with description: ${img['placeholderText']}`;
        
            return {"img" : img["placeholderText"], "deleted" : true};

        } catch (e) {
            throw "images.js remove Error: " + e;
        }
    }
}