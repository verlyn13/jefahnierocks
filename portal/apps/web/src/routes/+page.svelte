<script lang="ts">
  import { onMount } from "svelte";
  import { writable, derived } from "svelte/store";
  import { pillars, nodes, rituals } from "$lib/seed";
  import CommandPalette from "$lib/components/CommandPalette.svelte";
  import { ZoomIn, Search, Play, Sparkles } from "lucide-svelte";
  import { Svelvet } from "svelvet";

  const q = writable("");
  const ritual = writable<string | null>(null);
  const dark = writable(true);

  const filtered = derived([q, ritual], ([$q, $rit]) => {
    const r = rituals.find(x => x.id === $rit);
    return nodes.filter(n => {
      const text = (n.title).toLowerCase();
      const qok = !$q || text.includes($q.toLowerCase());
      const rok = !r || (
        (!r.filter.kinds || r.filter.kinds.includes(n.kind)) &&
        (!r.filter.pillars || r.filter.pillars.includes(n.pillarId)) &&
        (r.filter.minActivity == null || n.activity >= r.filter.minActivity)
      );
      return qok && rok;
    });
  });

  let showCmd = false;
  const openCmd = () => showCmd = true;
  const closeCmd = () => showCmd = false;

  onMount(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); 
        openCmd();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });
</script>

<div class="h-dvh w-dvw overflow-hidden bg-[color:var(--bg)]" data-theme={$dark ? 'dark' : 'light'}>
  <!-- Top bar -->
  <div class="fixed left-4 top-4 z-40 flex gap-2">
    <button 
      class="rounded-xl border border-white/10 px-3 py-2 backdrop-blur bg-black/20 text-white hover:bg-white/10 transition-colors"
      on:click={openCmd}>
      <Search class="inline -mt-0.5 w-4 h-4" /> Aperture (⌘K)
    </button>
    <button 
      class="rounded-xl border border-white/10 px-3 py-2 backdrop-blur bg-black/20 text-white hover:bg-white/10 transition-colors"
      on:click={() => dark.set(!$dark)}>
      <Sparkles class="inline -mt-0.5 w-4 h-4" /> Theme
    </button>
  </div>

  <!-- Now Lens -->
  <div class="fixed right-4 top-4 z-40 rounded-xl border border-white/10 px-4 py-3 backdrop-blur-sm bg-black/20 text-white">
    <div class="text-sm opacity-80">Now</div>
    <div class="font-medium">Focus: <span class="opacity-80">{rituals.find(x => x.id === $ritual)?.label ?? "Free"}</span></div>
    <div class="text-xs opacity-70">Two threads warm • one promise due in 6h</div>
  </div>

  <!-- Ritual Rail -->
  <div class="fixed inset-x-0 bottom-4 z-40 mx-auto flex w-fit gap-2">
    {#each rituals as r}
      <button 
        class="rounded-2xl border px-4 py-2 backdrop-blur hover:shadow transition-all {$ritual === r.id ? 'bg-white/20 border-white/30' : 'bg-black/20 border-white/10'} text-white"
        on:click={() => ritual.set($ritual === r.id ? null : r.id)}>
        <Play class="inline -mt-0.5 w-4 h-4" /> {r.label}
      </button>
    {/each}
  </div>

  <!-- The Field -->
  <div class="absolute inset-0">
    <Svelvet
      nodes={$filtered.map((n, i) => ({
        id: n.id,
        position: { x: 200 + (i % 7) * 180, y: 120 + Math.floor(i / 7) * 140 },
        data: { 
          title: n.title, 
          kind: n.kind, 
          pillar: n.pillarId, 
          activity: n.activity 
        }
      }))}
      edges={[]}
      zoomable={true}
      pannable={true}
      fitView={true}
      minimap={false}
      controls={true}
      background={false}
      edgeStyle="step"
      class="h-full w-full"
    />
  </div>

  <!-- Aperture -->
  <CommandPalette 
    bind:open={showCmd}
    items={$filtered}
    placeholder="Search @pillars #topics $systems…"
    onSelect={(item) => {
      console.log('Selected:', item);
    }}
  />
</div>

<style>
  :global(html) { 
    color-scheme: dark; 
  }
  :root { 
    --bg: #0B1014; 
  }
</style>