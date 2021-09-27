module.exports = {
	knex: {
		client: 'KNEX_CLIENT',
		connection: {
			host:     string('KNEX_CONNECTION_HOST'),
			database: string('KNEX_CONNECTION_DATABASE'),
			user:     string('KNEX_CONNECTION_USER'),
			password: string('KNEX_CONNECTION_PASSWORD'),
		},
		pool: {
			min: string('KNEX_POOL_MIN'),
			max: string('KNEX_POOL_MAX'),
		}
	},
	keycloak: {
		realm:               string('KEYCLOAK_REALM'),
		'auth-server-url':   string('KEYCLOAK_AUTH_SERVER_URL'),
		'ssl-required':      string('KEYCLOAK_SSL_REQUIRED'),
		resource:            string('KEYCLOAK_RESOURCE'),
		'public-client':     boolean('KEYCLOAK_PUBLIC_CLIENT'),
		'confidential-port': number('KEYCLOAK_CONFIDENTIAL_PORT')
	},
	session: {
		secret: string('SESSION_SECRET')
	},
	redis: {
		host: string('REDIS_HOST'),
		port: string('REDIS_PORT')
	},
	micro: {
		host: string('MICRO_HOST'),
		port: string('MICRO_PORT')
	}
};

/*
	Utilities
*/

function string(name) {
	return name;
}

function number(name) {
	return {
		__name: name,
		__format: 'number'
	};
}

function boolean(name) {
	return {
		__name: name,
		__format: 'boolean'
	};
}