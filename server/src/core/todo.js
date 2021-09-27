const knex = require('../lib/knex');

/**
 * Find one or more todos
 * @param {Object} filter 
 */
async function find(filter = {}) {
	const todos = await knex('todos').select('*').where(filter).orderBy('id', 'asc');
	return todos;
}

/**
 * Create an todos
 * @param {String} name todos name
 * @param {String} description todos description
 * @param {String} url todos url
 */
async function create(title, description, author, done) {
	const [id] = await knex('todos').insert({
		title,
		description,
		author,
		done
	}).returning('id');

	return {
		id,
		title,
		description,
		author,
		done
	};
}

/**
 * Delete an todos
 * @param {String} name todos name
 */
async function remove(id) {
	await knex('todos').del().where('id', id);
}

/**
 * 
 * @param {Number} id 
 * @param {String} title 
 * @param {String} description 
 * @param {Boolean} done 
 */

async function update(id, title, description, done) {
	let updates = {};

	if (title || title === '')
		updates.title = title;

	if (description || description  === '')
		updates.description = description;

	if (done === true || done === false)
		updates.done = done;

	let [ updated ] = await knex('todos').update(updates).where({ id }).returning('*');
	console.log(updated);

	return updated;
}

module.exports = {
	find,
	create,
	remove,
	update
};