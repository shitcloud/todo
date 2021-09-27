const micro = require('../lib/micro');
const todo = require('../core/todo');

micro.cmd('todo.todo.list', async ctx => {
	const filter = {};

	if (ctx.params?.id)
		filter.id = ctx.params.id;
	
	if (ctx.params?.author)
		filter.author = ctx.params.author;

	const todos = await todo.find(filter);

	ctx.reply(todos);
});

micro.cmd('portal.todo.create', async ctx => {
	if (!ctx.params)
		return ctx.reply(false);

	if (!ctx.params.name)
		return ctx.reply(false);
	
	if (!ctx.params.url)
		return ctx.reply(false);

	try {
		await todo.create(ctx.params.name, ctx.params.title, ctx.params.description, ctx.params.url, ctx.params.image, ctx.params.color, ctx.params.role);
		ctx.reply(true);
	} catch(e) {
		console.error(e);
		ctx.reply(false);
	}

});

micro.cmd('portal.todo.remove', async ctx => {
	if (!ctx.params)
		return ctx.reply(false);

	if (!ctx.params.name)
		return ctx.reply(false);

	try {
		await todo.remove(ctx.params.name);
		ctx.reply(true);
	} catch(e) {
		ctx.reply(false);
	}

});