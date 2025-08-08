<script lang="ts">
  import { goto } from "$app/navigation";
  
  let email = "";
  let recoveryCode = "";
  let loading = false;
  let error = "";
  
  async function handleRecovery() {
    if (!email || !recoveryCode) {
      error = "Email and recovery code required";
      return;
    }
    
    loading = true;
    error = "";
    
    try {
      const res = await fetch("/api/auth/recovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, recoveryCode })
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Recovery failed");
      }
      
      // Success - redirect to spaces
      goto("/spaces");
    } catch (e: any) {
      error = e.message || "Recovery failed";
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-glacier-900 to-black flex items-center justify-center">
  <div class="w-full max-w-md p-8 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10">
    <h2 class="text-2xl font-bold text-white mb-6">Account Recovery</h2>
    
    <p class="text-white/60 mb-6 text-sm">
      Temporary recovery page for whitelisted users. Use recovery code: portal-recovery-2025
    </p>
    
    {#if error}
      <div class="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4">
        <p class="text-red-300 text-sm">{error}</p>
      </div>
    {/if}
    
    <input
      type="email"
      bind:value={email}
      placeholder="Email"
      class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 mb-4"
      disabled={loading}
    />
    
    <input
      type="text"
      bind:value={recoveryCode}
      placeholder="Recovery Code"
      class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 mb-6"
      disabled={loading}
    />
    
    <button
      on:click={handleRecovery}
      disabled={loading}
      class="w-full px-6 py-3 bg-aurora-500 text-white rounded-xl hover:bg-aurora-600 transition-colors disabled:opacity-50"
    >
      {loading ? "Recovering..." : "Recover Account"}
    </button>
    
    <p class="text-white/40 text-sm mt-4 text-center">
      <a href="/verify" class="hover:text-white/60">Back to login</a>
    </p>
  </div>
</div>