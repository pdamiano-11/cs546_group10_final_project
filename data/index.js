const commentsData = require('./comments');
const dateData = require('./dates');
const imagesData = require('./images');
const memoriesData = require('./memories');
const usersData = require('./users');

module.exports = {
  users: usersData,
  memories: memoriesData,
  dates: dateData,
  images: imagesData,
  comments: commentsData
};