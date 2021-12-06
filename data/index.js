const commentsData = require('./comments');
const dateData = require('./dates');
const commentData = require('./comments');
const imageData = require('./images');
const memoryData = require('./memories');
const userData = require('./users');

module.exports = {
  users: userData,
  memories: memoryData,
  dates: dateData,
  comments: commentData,
  images :imageData
};