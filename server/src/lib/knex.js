const config = require('config');
const Knex = require('knex');

const knex = Knex(config.get('knex'));

module.exports = knex;