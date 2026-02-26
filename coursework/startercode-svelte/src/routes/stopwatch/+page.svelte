<script lang="ts">
  import { onMount } from 'svelte';

  let duration = 60; // Default duration in seconds
  let timeLeft = duration;
  let timer: NodeJS.Timeout | null = null;
  let isRunning = false;

  function startTimer() {
    if (!isRunning) {
      isRunning = true;
      timer = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft -= 1;
        } else {
          stopTimer();
        }
      }, 1000);
    }
  }

  function stopTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    isRunning = false;
  }

  function updateDuration(event: Event) {
    const target = event.target as HTMLInputElement;
    duration = parseInt(target.value, 10);
    timeLeft = duration;
  }

  $: timeLeft = Math.max(0, timeLeft); // Ensure timeLeft doesn't go below 0
</script>

<h1>Stopwatch</h1>

<div class="duration-container">
  <label for="duration">Set Duration (0-100s)</label>
  <input
    id="duration"
    type="range"
    min="0"
    max="100"
    bind:value={duration}
    on:input={updateDuration}
  />
  <span>{duration} s</span>
</div>

<div class="timer">
  <div class="circle">
    <div
      class="progress"
      style="--progress: {Math.max(0, (timeLeft / duration) * 100)}%"
    ></div>
    <div class="time">{timeLeft}</div>
  </div>
</div>

<div class="controls">
  <button on:click={startTimer} disabled={isRunning}>START</button>
  <button on:click={stopTimer}>STOP</button>
</div>

<style>
  h1 {
    text-align: center;
    color: #1f2937;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  label {
    display: block;
    text-align: center;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #374151;
  }

  input[type="range"] {
    width: 80%;
    margin: 0.5rem auto;
    display: block;
  }

  .timer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.5rem 0;
  }

  .circle {
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: #e5e7eb;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .progress {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: conic-gradient(
      #10b981 var(--progress),
      #e5e7eb var(--progress)
    );
  }

  .time {
    font-size: 2.5rem;
    font-weight: bold;
    color: #1d4ed8;
    z-index: 1;
  }

  .controls {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
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

  .duration-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .duration-container span {
    margin-top: 0.5rem;
    font-size: 1rem;
    color: #1f2937;
  }
</style>