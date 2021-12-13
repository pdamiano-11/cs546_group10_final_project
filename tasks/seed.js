const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const memories = data.memories;

async function main() {

    try {
        const db = await dbConnection.connectToDb();
        await db.dropDatabase();
    
        const user1 = await users.createUser();
        const user2 = await users.createUser();
        
        // Change date to current date before running seed.js
        const memory1 = await memories.create();
        const memory2 = await memories.create();
    
        console.log('Done seeding database');
        await dbConnection.closeConnection();

    } catch (e) {
        throw "Error: " + e;
    }
}

main();