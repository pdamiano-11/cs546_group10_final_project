const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const memories = data.memories;

async function main() {

    try {
        const db = await dbConnection.connectToDb();
        await db.dropDatabase();
    
        const user1 = await users.createUser("Peter", "Damianov", "pdamiano@stevens.edu", "M", "22", "pdamiano", "password");
        const user2 = await users.createUser("Kelly", "DiResto", "kdiresto@stevens.edu", "F", "23", "kdiresto", "password2");

        // Change date to current date before running seed.js
    
        console.log('Done seeding database');
        await dbConnection.closeConnection();

    } catch (e) {
        throw "Error: " + e;
    }
}

main();