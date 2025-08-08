<script lang="ts">
  import { ZoomIn } from "lucide-svelte";
  
  export let open = false;
  export let onSelect: (item: any) => void;
  export let items: any[] = [];
  export let placeholder = "Search...";
  
  let searchQuery = "";
  
  $: filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      open = false;
    }
  };
</script>

{#if open}
  <div class="fixed inset-0 z-50 bg-black/40" role="dialog" aria-modal="true" tabindex="-1" on:click={() => open = false} on:keydown={handleKeyDown}>
    <div class="fixed left-1/2 top-24 z-50 w-[680px] -translate-x-1/2 rounded-2xl border border-white/10 bg-black/80 p-2 shadow-2xl backdrop-blur">
      <input
        bind:value={searchQuery}
        {placeholder}
        class="w-full bg-transparent px-4 py-3 text-white placeholder:text-white/50 focus:outline-none"
        on:keydown={(e) => e.stopPropagation()}
      />
      <div class="max-h-[50vh] overflow-auto">
        {#if filteredItems.length === 0}
          <div class="px-4 py-8 text-center text-white/50">Nothing found.</div>
        {:else}
          {#each filteredItems as item}
            <button
              class="flex w-full items-center px-4 py-2 text-white hover:bg-white/10 cursor-pointer text-left"
              on:click={() => {
                onSelect(item);
                open = false;
              }}>
              <ZoomIn class="mr-2 h-4 w-4" /> {item.title}
            </button>
          {/each}
        {/if}
      </div>
    </div>
  </div>
{/if}