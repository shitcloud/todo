const config = require('config');
const Micro = require('@shitcloud/micro');
const micro = new Micro('portal', config.get('micro'));

module.exports = micro;