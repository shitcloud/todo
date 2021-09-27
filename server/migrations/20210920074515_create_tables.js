/**
 * @param {import('knex').Knex} knex 
 */
exports.up = function(knex) {
	return knex.schema.createTable('todos', table => {
		table.increments('id', { primaryKey: true });
		table.string('title').notNullable();
		table.text('description');
		table.string('author', 36).notNullable();
		table.boolean('done').defaultTo(true);
	});
};

/**
 * @param {import('knex').Knex} knex 
 */
exports.down = function(knex) {
	return knex.schema.dropTableIfExists('todos');
};
