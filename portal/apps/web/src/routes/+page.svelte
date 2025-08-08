<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  
  onMount(() => {
    // For static demo, just redirect to enter page
    goto("/enter");
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-glacier-900 to-black flex items-center justify-center">
  <div class="text-white text-center">
    <h1 class="text-3xl font-bold mb-2">Loading Portal...</h1>
    <p class="text-white/60">Redirecting to entry point</p>
  </div>
</div>