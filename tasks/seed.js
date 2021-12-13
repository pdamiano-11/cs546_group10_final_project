const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const memories = data.memories;

async function main() {

    try {
        const db = await dbConnection.connectToDb();
        await db.dropDatabase();
    
        const petesDiner = await restaurants.create("Pete's Diner", "New York, New York", "123-234-3456", "http://www.petesdiner.com", "$", ["American"], {dineIn: true, takeOut: true, delivery: true});
        const petesBuffet = await restaurants.create("Pete's Buffet", "Princeton, New Jersey", "998-765-4321", "http://www.petesbuffet.com", "$$", ["Bulgarian", "American", "Italian"], {dineIn: true, takeOut: false, delivery: false});
        
        // Change date to current date before running seed.js
        const petesDinerRev1 = await reviews.create(petesDiner['_id'].toString(), 'test', 'me', 4, '10-28-2021', 'test review');
    
        console.log('Done seeding database');
        await dbConnection.closeConnection();

    } catch (e) {
        throw "Error: " + e;
    }
}

main();