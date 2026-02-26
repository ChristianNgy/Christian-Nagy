<script lang="ts">
	/*
		These are reactive state variables in Svelte 5.
		$state means: when a value changes, Svelte updates the UI automatically.
	*/
	let firstNumber = $state(0);
	let secondNumber = $state(0);
	let operator = $state('+');
	let resultText = $state('No result yet');

	/*
		This function runs when the user clicks the button.
		It reads both numbers + selected operator and stores the result.
	*/
	function calculateResult() {
		if (operator === '+') {
			resultText = String(firstNumber + secondNumber);
			return;
		}

		if (operator === '-') {
			resultText = String(firstNumber - secondNumber);
			return;
		}

		if (operator === '*') {
			resultText = String(firstNumber * secondNumber);
			return;
		}

		// Prevent division by zero.
		if (secondNumber === 0) {
			resultText = 'Division by zero is not allowed';
			return;
		}

		resultText = String(firstNumber / secondNumber);
	}
</script>

<h1>Simple Calculator</h1>

<p>Enter two numbers, choose an operator, and click the button.</p>

<!--
	The calculator form uses CSS Grid.
	Each label is followed by its input/select.
-->
<div class="calculator-grid">
	<label for="firstNumber">First number</label>
	<!-- bind:value creates two-way binding between input and variable -->
	<input id="firstNumber" type="number" bind:value={firstNumber} />

	<label for="secondNumber">Second number</label>
	<input id="secondNumber" type="number" bind:value={secondNumber} />

	<label for="operator">Operator</label>
	<!-- bind:value also works with <select> -->
	<select id="operator" bind:value={operator}>
		<option value="+">+</option>
		<option value="-">-</option>
		<option value="*">*</option>
		<option value="/">/</option>
	</select>
</div>

<!-- onclick calls the function when the user clicks -->
<button type="button" onclick={calculateResult}>Calculate</button>

<!-- {resultText} inserts the variable value into HTML -->
<p class="result"><strong>Result:</strong> {resultText}</p>

<style>
	h1 {
		margin-bottom: 0.4rem;
	}

	p {
		margin-top: 0;
	}

	/* Basic two-column grid: labels on the left, controls on the right */
	.calculator-grid {
		display: grid;
		grid-template-columns: 150px 1fr;
		gap: 0.6rem;
		max-width: 420px;
		margin-bottom: 0.9rem;
	}

	input,
	select,
	button {
		padding: 0.45rem;
		border: 1px solid #cbd5e1;
		border-radius: 0.4rem;
	}

	button {
		background-color: #2563eb;
		color: white;
		cursor: pointer;
	}

	button:hover {
		background-color: #1d4ed8;
	}

	.result {
		margin-top: 0.8rem;
		padding: 0.6rem;
		background-color: #eef2ff;
		border: 1px solid #c7d2fe;
		border-radius: 0.4rem;
		max-width: 420px;
	}
</style>
