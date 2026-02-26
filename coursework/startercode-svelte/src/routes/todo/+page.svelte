<script lang="ts">
	/*
		One todo item has:
		- text: what to do
		- done: if it is completed
	*/
	// This is a TypeScript type alias. It describes the shape of one todo object.
	type TodoItem = {
		id: number;
		text: string;
		done: boolean;
	};

	// Text that the user types into the input field.
	// $state makes this value reactive.
	let newTodoText = $state('');

	// Starter items so students see data on first load.
	// todos is a reactive array of TodoItem objects.
	let todos = $state<TodoItem[]>([
		{ id: 1, text: 'Read Svelte basics', done: false },
		{ id: 2, text: 'Build a first component', done: true }
	]);

	// A simple counter used to create unique ids.
	let nextId = 3;

	/*
		Add a new todo when the button is clicked.
		We trim text so "only spaces" is ignored.
	*/
	function addTodo() {
		const cleanedText = newTodoText.trim();

		if (cleanedText.length === 0) {
			return;
		}

		const newItem: TodoItem = {
			id: nextId,
			text: cleanedText,
			done: false
		};

		// Create a new array with ... so Svelte clearly sees an update.
		todos = [...todos, newItem];
		nextId += 1;
		newTodoText = '';
	}

	// Toggle the done state for one item.
	function toggleDone(id: number) {
		for (const todo of todos) {
			if (todo.id === id) {
				// Flip true -> false or false -> true.
				todo.done = !todo.done;
				break;
			}
		}
	}
</script>

<h1>Simple Todo List</h1>

<p>Add a task and mark it as done when finished.</p>

<!-- Input row uses Flexbox so items are in one line -->
<div class="input-row">
	<!-- Two-way binding: input text <-> newTodoText -->
	<input
		type="text"
		placeholder="Enter a todo"
		bind:value={newTodoText}
	/>
	<!-- Simple event handler -->
	<button type="button" onclick={addTodo}>Add</button>
</div>

<ul class="todo-list">
	<!--
		{#each ...} loops over all todos.
		(todo.id) is the key so Svelte can track each list item.
	-->
	{#each todos as todo (todo.id)}
		<li class="todo-item">
			<label>
				<!-- Toggle one item when checkbox value changes -->
				<input
					type="checkbox"
					checked={todo.done}
					onchange={() => toggleDone(todo.id)}
				/>
				<!-- class:done adds class "done" only when todo.done is true -->
				<span class:done={todo.done}>{todo.text}</span>
			</label>
		</li>
	{/each}
</ul>

<style>
	h1 {
		margin-bottom: 0.4rem;
	}

	p {
		margin-top: 0;
	}

	/* Basic Flexbox row for input + button */
	.input-row {
		display: flex;
		gap: 0.6rem;
		margin-bottom: 1rem;
	}

	.input-row input {
		flex: 1;
	}

	input,
	button {
		padding: 0.45rem;
		border: 1px solid #cbd5e1;
		border-radius: 0.4rem;
	}

	button {
		background-color: #059669;
		color: white;
		cursor: pointer;
	}

	button:hover {
		background-color: #047857;
	}

	.todo-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.todo-item {
		padding: 0.5rem 0.3rem;
		border-bottom: 1px solid #e2e8f0;
	}

	.todo-item label {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	/* Visual feedback for finished tasks */
	.done {
		text-decoration: line-through;
		color: #64748b;
	}
</style>
