const dbConnection = require('./mongoConnection.js');

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection.connectToDb();
      _col = await db.collection(collection);
    }

    return _col;
  };
};


/* Now, you can list your collections here: */
module.exports = {
  users: getCollectionFn('users'),
  memories: getCollectionFn('memories'),
  dates: getCollectionFn('dates')
};
