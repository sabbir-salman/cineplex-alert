<script lang="ts">
  const {
    count = 0,
    activeIndex = 0,
    onSelect,
  } = $props<{
    count?: number;
    activeIndex?: number;
    onSelect: (index: number) => void;
  }>();
</script>

<div class="movie-indicators">
  {#each Array(count) as _, index}
    <button
      class:active={index === activeIndex}
      type="button"
      aria-label="Go to slide {index + 1}"
      onclick={() => onSelect(index)}
    ></button>
  {/each}
</div>

<style>
  .movie-indicators {
    display: flex;
    gap: 0.6rem;
    justify-content: center;
    align-items: center;
  }

  button {
    width: 0.95rem;
    height: 0.95rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.08);
    transition: transform 0.25s ease, background 0.25s ease;
    cursor: pointer;
  }

  button.active {
    width: 1.25rem;
    background: rgba(255, 255, 255, 0.95);
    transform: scale(1.05);
  }

  button:hover {
    background: rgba(255, 255, 255, 0.3);
  }
</style>
