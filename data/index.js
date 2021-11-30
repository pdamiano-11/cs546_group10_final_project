const commentsData = require('./comments');
const dateData = require('./dates');
const commentData = require('./comments');
const imageData = require('./images');
const memoryData = require('./memories');

module.exports = {
  users: userData,
  memories: memoryData,
  dates: dateData,
  comments: commentData,
  images :imageData
};