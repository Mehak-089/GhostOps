
const { Redis } = require("@upstash/redis");

const redis = new Redis({
  url: "https://usable-mammoth-71927.upstash.io",
  token: "gQAAAAAAARj3AAIncDExZTIxYTUyNGZhMTc0NWFiODFlODgyZjQ3YWI2MWY1MXAxNzE5Mjc",
});

module.exports = redis;

redis.set("test", "hello");
redis.get("test").then(console.log);