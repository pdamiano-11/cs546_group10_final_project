const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
let { ObjectId, ReadPreferenceMode } = require('mongodb');
const bcrypt = require('bcryptjs');
const saltRounds = 12;

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

const createUser = async function createUser(firstName, lastName, email, gender, age, username, password) {
    
    //I chose not to make profile picture required
    if (!firstName) throw 'You must provide a first name';
    if (!lastName) throw 'You must provide a last name';
    if (!email) throw 'You must provide a email';
    if (!gender) throw 'You must provide a gender';
    if (!age) throw 'You must provide an age';
    if (!username) throw 'You must provide a username';
    if (!password) throw 'You must provide a password';
    //below username and password is same as needed for lab, we can change
    if (username.length < 4) throw 'username must be at least 4 characters long';
    if (password.length < 6) throw 'password must be at least 6 characters long';
    if (age < 13) throw 'must be 13 years or older to use MemoryMap';
    //check for validity of names (no numbers/special characters)
    if (!firstName.match(/^[A-Za-z]+$/)) throw 'invalid first name';
    if (!lastName.match(/^[A-Za-z]+$/)) throw 'invalid last name';
    //below only uses alphanumeric
    if (!username.match(/^[0-9A-Za-z]+$/)) throw 'Username must be a valid string';
    //email validation below checks for @ and . only
    if (!(/\S+@\S+\.\S+/.test(email))) throw 'not a valid email';
    //case insensitive username
    username = username.toLowerCase();
    if (/\s/.test(password)) throw 'password cannot have whitespaces';
    //check system if username already exists
    
    const hash = await bcrypt.hash(password, saltRounds);

    //put new user into mongo
    const userCollection = await users();
    
    let newUser = {
        _id: ObjectId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
        age:age,
        username: username,
        password: hash
    };
    
    const taken = await userCollection.findOne({username: username});
    if (taken) throw 'username is already taken';
    const insertInfo = await userCollection.insertOne(newUser);
    
    if (insertInfo.insertedCount === 0) throw 'Could not add user';
    return {userInserted: true};
}

const checkUser = async function checkUser(username, password) {
    if (!username) throw 'You must provide a username';
    if (!password) throw 'You must provide a password';

    if (username.length < 4) throw 'username must be at least 4 characters long';
    if (password.length < 6) throw 'password must be at least 6 characters long';
    //if (!username.match(/^[0-9A-Za-z]+$/)) throw 'Username must be a valid string';
    
    if (/\s/.test(password)) throw 'password cannot have whitespaces';
    username = username.toLowerCase();

    const userCollection = await users();
    const user = await userCollection.findOne({username: username});
    if (user === null) throw 'No user with that username';

    let encrypted = user.password;
    let comparePassword = false;
    try {
        comparePassword = await bcrypt.compare(password, encrypted);
    } catch (e) {
        //no op
    }
    if (comparePassword) {
        return {authenticated: true}
    }
    else {
        throw 'Either the username or the password is invalid';
    }
}

