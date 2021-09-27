import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		todos: []
	},
	mutations: {
		addTodo(state, todo) {
			state.todos.push(todo);
		},
		setTodo(state, { id, todo }) {
			console.log(id, todo);
			let index = state.todos.findIndex(t => t.id === id);
			state.todos.splice(index, 1, todo);
		},
		setTodos(state, todos) {
			state.todos = todos;
		},
		removeTodo(state, id) {
			let index = state.todos.findIndex(t => t.id === id);
			state.todos.splice(index, 1);
		}
	},
	actions: {
	},
	modules: {
	}
});
