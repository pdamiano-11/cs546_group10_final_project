const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
let { ObjectId, ReadPreferenceMode } = require('mongodb');

const checkInput = function checkInput(val, check){
    if (check === 'string') {
        if (typeof(val) !== 'string') {
            throw "Invalid String";
        }

        val = val.trim();
        if (val.length === 0) {
            throw "Invalid String Length";
        }
    }
    else if (check === 'number') {
        if (typeof(val) !== 'number') {
            throw "Invalid Number";
        }
    }
    else if (check === 'email') {
        //Use Regex
    }
}

