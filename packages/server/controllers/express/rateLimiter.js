const redisClient = require("../../redis");

const rateLimiter =
  (secondsLimit, limitAmount) => async (req, res, next) => {
    const ip =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    [response] = await redisClient // redisClient returns an array of sub arrays, one sub array for every command. sub array from incr will be like [null, 1] where null means it's ok and 1 is the value in the ip key.
      .multi() // starts a multi line command
      .incr(ip) // ip is the key in redis, incr adds 1
      .expire(ip, secondsLimit)
      .exec(); // executes mutiple commands

    if (response[1] > limitAmount)
      res.json({
        loggedIn: false,
        status: "Slow down!! Try again in a minute.",
      });
    else next();
  };

module.exports = rateLimiter;
