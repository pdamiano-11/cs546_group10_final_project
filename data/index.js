const commentsData = require('./comments');
const commentData = require('./comments');
const imageData = require('./images');
const memoryData = require('./memories');
const userData = require('./users');

module.exports = {
  users: userData,
  memories: memoryData,
  comments: commentData,
  images :imageData
};