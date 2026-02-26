<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let birdY = 150;
  let birdVelocity = 0;
  let gravity = 0.10; // reduced gravity — lower value = slower fall
  let isGameRunning = false;
  let pipes = [];
  let score = 0;
  let gameLoop: number;

  const bird = {
    x: 50,
    y: birdY,
    width: 20,
    height: 20,
  };

  const pipeWidth = 50;
  const pipeGap = 120;
  const pipeSpeed = 1.5; // Reduced pipe speed to make the game easier

  function startGame() {
    isGameRunning = true;
    birdY = 150;
    birdVelocity = 0;
    pipes = [];
    score = 0;
    spawnPipes();
    gameLoop = requestAnimationFrame(updateGame);
  }

  function stopGame() {
    isGameRunning = false;
    cancelAnimationFrame(gameLoop);
  }

  function spawnPipes() {
    pipes = Array.from({ length: 3 }, (_, i) => {
      const gapStart = Math.random() * (canvas.height - pipeGap - 20) + 10;
      return {
        x: canvas.width + i * 300, // Increased spacing between pipes
        gapStart,
      };
    });
  }

  function updateGame() {
    if (!isGameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update bird position
    birdVelocity += gravity;
    birdY += birdVelocity;
    bird.y = birdY;

    // Draw bird
    ctx.fillStyle = 'yellow';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

    // Update and draw pipes
    pipes.forEach((pipe) => {
      pipe.x -= pipeSpeed;

      // Draw top pipe
      ctx.fillStyle = 'green';
      ctx.fillRect(pipe.x, 0, pipeWidth, pipe.gapStart);

      // Draw bottom pipe
      ctx.fillRect(
        pipe.x,
        pipe.gapStart + pipeGap,
        pipeWidth,
        canvas.height - pipe.gapStart - pipeGap
      );

      // Check for collision
      if (
        bird.x < pipe.x + pipeWidth &&
        bird.x + bird.width > pipe.x &&
        (bird.y < pipe.gapStart || bird.y + bird.height > pipe.gapStart + pipeGap)
      ) {
        stopGame();
      }

      // Check if pipe is out of bounds
      if (pipe.x + pipeWidth < 0) {
        pipe.x = canvas.width;
        pipe.gapStart = Math.random() * (canvas.height - pipeGap - 20) + 10;
        score++;
      }
    });

    // Check if bird hits the ground or flies too high
    if (bird.y + bird.height > canvas.height || bird.y < 0) {
      stopGame();
    }

    // Draw score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);

    gameLoop = requestAnimationFrame(updateGame);
  }

  function flap() {
    if (!isGameRunning) return;
    // apply a moderate upward velocity (negative = up)
    birdVelocity = -3; // adjust magnitude (e.g. -2.5 to -4) to tune jump height
  }

  onMount(() => {
    ctx = canvas.getContext('2d')!;
    canvas.width = 300;
    canvas.height = 400;
  });
</script>

<h1>Flappy Bird</h1>
<canvas bind:this={canvas} on:click={flap}></canvas>
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