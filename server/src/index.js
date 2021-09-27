const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const axios = require('axios');
const config = require('config');
const path = require('path');
const knex = require('./lib/knex');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: process.env.NODE_ENV === 'development' ? ['http://localhost:8080'] : [],
		credentials: true
	}
});

app.use(express.static(path.join(__dirname, '../../client')));
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../client/index.html'));
});

const todo = require('./core/todo');
require('./cmd/todo');

knex.migrate.latest().then(() => {
	server.listen(3000);
});

io.use(async (socket, next) => {
	const token = socket.handshake.auth?.token;
	if (!token) {
		return next(new Error('unauthorized'));
	}

	try {
		const { data } = await axios.get(`${config.get('keycloak.host')}/realms/${config.get('keycloak.realm')}/protocol/openid-connect/userinfo`, { headers: { Authorization: `Bearer ${token}`}});
		socket.user = {
			email: data.email_verified ? data.email : null,
			name: data.name,
			firstName: data.given_name,
			lastName: data.family_name,
			id: data.sub,
			username: data.preferred_username
		};
		return next();
	} catch (e) {
		return next(new Error('unauthorized'));
	}
});

io.on('connection', (socket) => {
	socket.join(`user:${socket.user.id}`);

	socket.on('todo:create', async (title, description) => {
		const t = await todo.create(title, description, socket.user.id, false);
		io.in(`user:${socket.user.id}`).emit('todo:created', t);
	});

	socket.on('todo:find', async (cb) => {
		const todos = await todo.find({ author: socket.user.id });
		cb(todos);
	});

	socket.on('todo:update', async (id, { title, description, done}) => {
		const [oldTodo] = await todo.find({ id });

		if (oldTodo.author === socket.user.id) {
			const newTodo = await todo.update(id, title, description, done);
			io.in(`user:${socket.user.id}`).emit('todo:updated', id, newTodo);
		}
	});

	socket.on('todo:delete', async (id) => {
		const [t] = await todo.find({ id });

		if (t.author === socket.user.id) {
			await todo.remove(id);
			io.in(`user:${socket.user.id}`).emit('todo:deleted', id);
		}
	});
});