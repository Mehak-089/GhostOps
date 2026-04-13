const redis = require(".queue/redisClient");

const addToQueue = async (logData) => {
  await redis.lpush("logQueue", JSON.stringify(logData));
};

module.exports = addToQueue;