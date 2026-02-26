<script module lang="ts">
	// Module script runs once for the route module (not once per component instance).
	// This disables server-side rendering and makes the app client-side only.
	export const ssr = false;
</script>

<script lang="ts">
	// $props() gives access to component props in Svelte 5.
	// In a layout, "children" is the content of the active page route.
	let { children } = $props();
</script>

<!--
	This layout is shared by all routes.
	The navigation bar appears on every page.
-->
<nav class="main-nav">
	<a href="/calculator">Calculator</a>
	<a href="/todo">Todo List</a>
	<a href="/counter">Counter</a>
	<a href="/stopwatch">Stopwatch</a>
	<a href="/flappybird">Flappy Bird</a>
	<a href="/qix">Qix</a>
	<a href="/snake">Snake</a>
</nav>

<!-- Render the page content of the current route -->
<main class="content">
	<!-- {@render ...} renders the passed snippet (the current child route). -->
{@render children()}
</main>

<style>
	/* Basic page defaults for readability */
	:global(body) {
		margin: 0;
		font-family: Arial, sans-serif;
		background-color: #f5f7fb;
		color: #1f2937;
	}

	/* Simple horizontal navigation bar */
	.main-nav {
		display: flex;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		background-color: #1e3a8a;
	}

	/* Menu items look like small buttons */
	.main-nav a {
		color: white;
		text-decoration: none;
		padding: 0.45rem 0.7rem;
		border: 1px solid rgba(255, 255, 255, 0.4);
		border-radius: 0.4rem;
	}

	/* A tiny hover effect for interaction feedback */
	.main-nav a:hover {
		background-color: rgba(255, 255, 255, 0.15);
	}

	/* Keep route content centered with spacing */
	.content {
		max-width: 760px;
		margin: 1rem auto;
		padding: 0 1rem;
	}
</style>
