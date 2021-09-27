const config = require('config');
const Keycloak = require('keycloak-connect');
const { store } = require('./session');

module.exports = new Keycloak({
	store,
	logoutUrl: '/logout'
}, config.get('keycloak'));