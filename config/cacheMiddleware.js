const redisClient = require('./redisClient');

const cacheMiddleware = async function (req, res, next) {
    const cache = await redisClient.getAsync(req.originalUrl);
    if(cache) res.status(200).json(JSON.parse(cache))
    else next()

};

module.exports = { cacheMiddleware }