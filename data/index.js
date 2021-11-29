const userData = require('./restaurants');
const memoryData = require('./reviews');
const dateData = require('./dates');
const commentData = require('./comments')

module.exports = {
  users: userData,
  memories: memoryData,
  dates: dateData,
  comments: commentData
};