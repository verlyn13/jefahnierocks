<script lang="ts">
  import { goto } from "$app/navigation";
  
  // Mock spaces for now - will be loaded from DB
  const spaces = [
    {
      id: "family",
      name: "Jefahnie Family",
      hue: 198,
      activity: "2 threads warm • 1 promise due",
      members: 5,
      lastActive: true
    },
    {
      id: "projects",
      name: "Personal Projects",
      hue: 271,
      activity: "3 nodes updated today",
      members: 1,
      lastActive: false
    }
  ];
  
  function selectSpace(spaceId: string) {
    // Store selected space in session/cookie
    goto("/");
  }
  
  function createSpace() {
    // TODO: Implement space creation
    alert("Space creation coming soon!");
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-glacier-900 to-black flex items-center justify-center relative overflow-hidden">
  <!-- Animated background -->
  <div class="absolute inset-0">
    {#each spaces as space, i}
      <div 
        class="absolute w-64 h-64 rounded-full blur-3xl opacity-20"
        style="background: hsl({space.hue}, 70%, 50%); left: {20 + i * 40}%; top: {30 + i * 20}%; animation: float {15 + i * 5}s ease-in-out infinite;"
      />
    {/each}
  </div>
  
  <!-- Spaces selector -->
  <div class="relative z-10 w-full max-w-2xl p-8">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Choose Your Space</h1>
      <p class="text-white/60">Where would you like to focus today?</p>
    </div>
    
    <div class="grid gap-4 mb-6">
      {#each spaces as space}
        <button
          on:click={() => selectSpace(space.id)}
          class="relative group p-6 bg-black/40 backdrop-blur-xl rounded-2xl border transition-all hover:bg-black/50 {space.lastActive ? 'border-aurora-500/50' : 'border-white/10'}"
        >
          <!-- Desire lines on hover -->
          <svg class="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <path
              d="M 10 50 Q 50 20 90 50"
              stroke="hsl({space.hue}, 70%, 50%)"
              stroke-width="1"
              fill="none"
              opacity="0.3"
            />
          </svg>
          
          <div class="relative flex items-center justify-between">
            <div class="text-left">
              <h3 class="text-xl font-medium text-white flex items-center gap-2">
                {space.name}
                {#if space.lastActive}
                  <span class="text-xs px-2 py-1 bg-aurora-500/20 text-aurora-500 rounded-full">Last active</span>
                {/if}
              </h3>
              <p class="text-white/60 text-sm mt-1">{space.activity}</p>
              <p class="text-white/40 text-xs mt-2">{space.members} member{space.members !== 1 ? 's' : ''}</p>
            </div>
            
            <div 
              class="w-12 h-12 rounded-full"
              style="background: linear-gradient(135deg, hsl({space.hue}, 70%, 50%), hsl({space.hue}, 50%, 30%))"
            />
          </div>
        </button>
      {/each}
    </div>
    
    <button
      on:click={createSpace}
      class="w-full py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-all"
    >
      Create a New Space
    </button>
  </div>
</div>

<style>
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(120deg); }
    66% { transform: translateY(20px) rotate(240deg); }
  }
</style>