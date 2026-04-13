const redis = require("../queue/redisclient");

const processLogs = async () => {
  while (true) {
    const data = await redis.rpop("logQueue");

    if (data) {
      const log = JSON.parse(data);
      console.log("Processing log:", log);
    }
  }
};

processLogs();