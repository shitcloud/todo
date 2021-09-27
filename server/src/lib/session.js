const config = require('config');
const session = require('express-session');
const redis = require('./redis');

const RedisStore = require('connect-redis')(session);
const store = new RedisStore({ client: redis });

const middleware = session({
	secret: config.get('session.secret'),
	resave: false,
	saveUninitialized: true,
	store
});

module.exports = {
	middleware,
	store
};