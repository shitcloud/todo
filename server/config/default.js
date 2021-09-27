module.exports = {
	knex: {
		client: 'postgresql',
		connection: {
			host: 'localhost',
			database: 'shitcloud_todo',
			user:     'postgres',
			password: 'postgres'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	},
	keycloak: {
		'realm': 'shitcloud',
		'host': 'https://login.shitcloud.io/auth',
		'ssl-required': 'external',
		'resource': 'todo',
		'public-client': true,
		'confidential-port': 0
	},
	session: {
		secret: 'XNGEgBmy7dy_Ly7ikOZUc'
	},
	redis: {
		host: 'localhost',
		port: 6379
	},
	micro: {
		host: 'localhost'
	}
};