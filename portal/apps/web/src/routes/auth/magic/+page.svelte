<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  
  let status = "Verifying magic link...";
  let error = "";
  
  onMount(async () => {
    const token = $page.url.searchParams.get("token");
    const email = $page.url.searchParams.get("email");
    
    if (!token || !email) {
      error = "Invalid magic link";
      return;
    }
    
    try {
      const res = await fetch("/api/auth/magic-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email })
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Verification failed");
      }
      
      status = "Success! Redirecting...";
      setTimeout(() => goto("/spaces"), 1500);
    } catch (e: any) {
      error = e.message || "Invalid or expired magic link";
    }
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-glacier-900 to-black flex items-center justify-center">
  <div class="text-center text-white">
    {#if error}
      <div class="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-4">
        <p class="text-red-300">{error}</p>
      </div>
      <button 
        class="px-6 py-2 bg-aurora-500 text-white rounded-lg hover:bg-aurora-600 transition-colors"
        on:click={() => goto("/verify")}
      >
        Back to Login
      </button>
    {:else}
      <h2 class="text-2xl font-bold mb-4">{status}</h2>
      <div class="animate-spin w-8 h-8 border-4 border-aurora-500 border-t-transparent rounded-full mx-auto"></div>
    {/if}
  </div>
</div>