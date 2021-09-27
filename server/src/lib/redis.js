const config = require('config');
const redis = require('redis');
const client = redis.createClient(config.get('redis.port'), config.get('redis.host'));

module.exports = client;