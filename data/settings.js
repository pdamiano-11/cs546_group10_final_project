const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
let { ObjectId, ReadPreferenceMode } = require('mongodb');

const updateSettings = async function updateSettings(userId, colorMode, showRealName) {
    try {
        for (let n = 0; n < arguments.length; n++) {
            if (!arguments[n]) throw "Invalid Parameter";
        }
        if (!userId) throw 'Missing userId parameter';
        if (!colorMode) throw 'Missing colorMode parameter';
        //if (!trackLocation) throw 'Missing track location parameter';
        if (!showRealName) throw 'Missing show real name parameter';

        const userCollection = await users();
        let objectId = ObjectId(userId);

        let updates = {
<<<<<<< HEAD
            colorMode: colorMode,
            showRealName: showRealName
            //trackLocation: trackLocation
        }
=======
            settings:
            {
                colorMode: colorMode,
                showRealName: showRealName,
                trackLocation: trackLocation
            }
                    }
>>>>>>> a64394fd5ceddc32ccd798e7b1893958f14d5473
        //how to get it to go to settings and not just into user??
        const updatedUser = await userCollection.updateOne(
            { _id : objectId}, 
            {$set : updates});
        if (updatedUser.modifiedCount === 0) throw "Could not update item.";
        
        return {updated: true};

    } catch (e) {
        throw "settings.js Error: " + e;
    }
}

module.exports = {
    updateSettings
};
