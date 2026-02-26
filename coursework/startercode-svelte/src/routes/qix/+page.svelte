<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let player = { x: 50, y: 50, size: 10, speed: 2 };
  let keys = { up: false, down: false, left: false, right: false };
  let trails: { x: number; y: number }[] = [];
  let isGameRunning = false;
  let gameLoop: number;
  let enemy = { x: 150, y: 200, size: 15, speedX: 1.5, speedY: 1.5 };

  function startGame() {
    isGameRunning = true;
    player = { x: 50, y: 50, size: 10, speed: 2 };
    trails = [];
    gameLoop = requestAnimationFrame(updateGame);
  }

  function stopGame() {
    isGameRunning = false;
    cancelAnimationFrame(gameLoop);
  }

  function updateGame() {
    if (!isGameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move player
    if (keys.up) player.y -= player.speed;
    if (keys.down) player.y += player.speed;
    if (keys.left) player.x -= player.speed;
    if (keys.right) player.x += player.speed;

    // Keep player within bounds
    player.x = Math.max(0, Math.min(canvas.width - player.size, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.size, player.y));

    // Add trail
    trails.push({ x: player.x, y: player.y });

    // Draw trails
    ctx.fillStyle = 'blue';
    trails.forEach((trail) => {
      ctx.fillRect(trail.x, trail.y, player.size, player.size);
    });

    // Draw player
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Move enemy
    enemy.x += enemy.speedX;
    enemy.y += enemy.speedY;

    // Bounce enemy off walls
    if (enemy.x <= 0 || enemy.x + enemy.size >= canvas.width) {
      enemy.speedX *= -1;
    }
    if (enemy.y <= 0 || enemy.y + enemy.size >= canvas.height) {
      enemy.speedY *= -1;
    }

    // Draw enemy
    ctx.fillStyle = 'purple';
    ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);

    // Check collision with player
    if (
      player.x < enemy.x + enemy.size &&
      player.x + player.size > enemy.x &&
      player.y < enemy.y + enemy.size &&
      player.y + player.size > enemy.y
    ) {
      stopGame();
    }

    gameLoop = requestAnimationFrame(updateGame);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') keys.up = true;
    if (event.key === 'ArrowDown') keys.down = true;
    if (event.key === 'ArrowLeft') keys.left = true;
    if (event.key === 'ArrowRight') keys.right = true;
  }

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') keys.up = false;
    if (event.key === 'ArrowDown') keys.down = false;
    if (event.key === 'ArrowLeft') keys.left = false;
    if (event.key === 'ArrowRight') keys.right = false;
  }

  onMount(() => {
    ctx = canvas.getContext('2d')!;
    canvas.width = 300;
    canvas.height = 400;

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  });
</script>

<h1>Qix Game</h1>
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