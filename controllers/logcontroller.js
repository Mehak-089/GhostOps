const addToQueue = require("../queue/logqueue");
await addToQueue({
  level,
  message,
  service,
});