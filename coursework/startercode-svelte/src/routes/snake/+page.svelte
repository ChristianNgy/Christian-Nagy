<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null = null;
  let snake = [{ x: 150, y: 150 }];
  let food = { x: 0, y: 0 };
  let direction = { x: 0, y: 0 };
  let gridSize = 15;
  let isGameRunning = false;
  let gameLoop: number;
  let score = 0;

  function startGame() {
    isGameRunning = true;
    snake = [{ x: 150, y: 150 }];
    // start moving right by default so the snake moves even if no key is pressed
    direction = { x: 1, y: 0 };
    score = 0;
    placeFood();
    // ensure the page/canvas has focus so key events are received without extra clicks
    canvas?.focus();
    gameLoop = setInterval(updateGame, 100);
    drawGame();
  }

  function stopGame() {
    isGameRunning = false;
    clearInterval(gameLoop);
  }

  function placeFood() {
    food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
  }

  function updateGame() {
    if (!isGameRunning) return;

    // Move snake
    const head = { x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize };

    // Check for collisions
    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= canvas.width ||
      head.y >= canvas.height ||
      snake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      stopGame();
      return;
    }

    // Add new head to the snake
    snake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
      score++;
      placeFood();
    } else {
      // Remove the tail
      snake.pop();
    }

    // Draw everything
    drawGame();
  }

  function changeDirection(event: KeyboardEvent) {
    const key = String(event.key || '').toLowerCase();
    console.log('keydown:', key, 'isGameRunning:', isGameRunning, 'current dir:', direction);

    // require game running so accidental keypresses before START don't confuse things
    if (!isGameRunning) return;

    if ((key === 'arrowup' || key === 'w') && direction.y === 0) {
      direction = { x: 0, y: -1 };
      event.preventDefault();
      console.log('direction -> up');
    } else if ((key === 'arrowdown' || key === 's') && direction.y === 0) {
      direction = { x: 0, y: 1 };
      event.preventDefault();
      console.log('direction -> down');
    } else if ((key === 'arrowleft' || key === 'a') && direction.x === 0) {
      direction = { x: -1, y: 0 };
      event.preventDefault();
      console.log('direction -> left');
    } else if ((key === 'arrowright' || key === 'd') && direction.x === 0) {
      direction = { x: 1, y: 0 };
      event.preventDefault();
      console.log('direction -> right');
    }
  }

  onMount(() => {
    // ensure canvas is bound before using it
    if (!canvas) {
      console.error('canvas not bound');
      return;
    }

    ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 300;

    console.log('snake page mounted, adding keydown listener. Click START then press keys.');
    window.addEventListener('keydown', changeDirection);

    return () => {
      window.removeEventListener('keydown', changeDirection);
    };
  });

  // Draw function (was missing)
  function drawGame() {
    if (!ctx || !canvas) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#065f46' : '#10b981'; // head darker
      ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
      // optional border for visibility
      ctx.strokeStyle = '#064e3b';
      ctx.strokeRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Draw score
    ctx.fillStyle = '#111827';
    ctx.font = '14px sans-serif';
    ctx.fillText(`Score: ${score}`, 8, 18);
  }
</script>

<h1>Snake Game</h1>
<canvas bind:this={canvas}></canvas>
<div class="controls">
  <button on:click={startGame} disabled={isGameRunning}>START</button>
  <button on:click={stopGame}>STOP</button>
</div>

<style>
  h1 {
    text-align: center;
    color: #1f2937;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  canvas {
    display: block;
    margin: 0 auto;
    border: 2px solid #1d4ed8;
    background-color: #e5e7eb;
  }

  .controls {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }

  button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: #1d4ed8;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  button:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }

  button:hover:enabled {
    background-color: #2563eb;
  }
</style>