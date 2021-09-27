<template>
	<div class="home">
		<section class="section">
			<div class="container">
				<div class="columns">
					<div class="column" :class="{'is-fullwidth': !selected, 'is-two-thirds': selected, 'has-border-right': selected}">
						<table class="table is-fullwidth is-hoverable">
							<colgroup>
								<col span="1" style="width: 20px;">
								<col span="1">
							</colgroup>
							<tbody>
								<tr>
									<td class="check">
										<b-button class="button is-link" size="is-small" @click="add">
											<b-icon
												icon="plus"
												size="is-small">
											</b-icon>
										</b-button>
									</td>
									<td>
										<input type="text" class="input" placeholder="Title" v-model="title" @keyup.enter="add">
									</td>
								</tr>
								<tr v-for="todo of $store.state.todos" :key="todo.id">
									<td class="check">
										<b-checkbox v-model="todo.done" size="is-large" @input="(value)=> todoChecked(todo.id, value)" style="padding: 0; margin: 0; with: 20px;" />
									</td>
									<td @click="() => select(todo.id)" class="is-clickable">
										<div class="media">
											<div class="media-content">
												<p class="title is-6">{{todo.title}}</p>
												<p class="subtitle is-6">{{todo.description}}</p>
											</div>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="column is-one-third" v-if="selected">
						<div class="field">
							<label class="label">Title</label>
							<div class="control">
								<input type="text" v-model="selected.title" class="input title is-4" @input="updateSelected">
							</div>
						</div>
						<div class="field">
							<label class="label">Description</label>
							<textarea class="textarea" v-model="selected.description" @input="updateSelected"></textarea>
						</div>
						<div class="field">
							<div class="buttons">
								<button class="button is-danger" @click="() => remove(selected.id)">Delete</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	name: 'Home',
	data: () => ({
		title: '',
		selected: null
	}),
	created() {
		this.updateSelected = this._.debounce(() => {
			this.$socket.emit('todo:update', this.selected.id, { title: this.selected.title, description: this.selected.description });
		}, 1000);
	},
	mounted() {
		if (this.$socket)
			this.fetchTodos();
	},
	sockets: {
		connect: function () {
			this.fetchTodos();
		},
		'todo:created': function (todo) {
			this.$store.commit('addTodo', todo);
		},
		'todo:updated': function ([id, todo]) {
			this.$store.commit('setTodo', { id, todo });
			if (this.selected.id === id) {
				this.select(id);
			}
		},
		'todo:deleted': function (id) {
			this.$store.commit('removeTodo', id);
			if (this.selected.id === id) {
				this.selected = null;
			}
		}
	},
	methods: {
		add() {
			this.$socket.emit('todo:create', this.title, this.description);
			this.title = '';
		},
		remove(id) {
			this.$socket.emit('todo:delete', id);
		},
		select(id) {
			this.selected = this.$store.state.todos.find(t => t.id === id);
		},
		fetchTodos() {
			this.$socket.emit('todo:find', (todos) => {
				this.$store.commit('setTodos', todos);
			});
		},
		todoChecked(id, status) {
			this.$socket.emit('todo:update', id, { done: status });
		}
	},
};
</script>

<style scoped>

td {
	vertical-align: middle !important;
}
td.check {
	padding-right: 0;
}

.has-border-right {
	border-right: solid 1px #dbdbdb;
}

@media screen and (max-width: 769px) {
  .columns {
    display: flex;
    flex-direction: column-reverse;
  }
}

</style>