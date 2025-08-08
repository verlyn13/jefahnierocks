<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  
  let email = "";
  let loading = false;
  let error = "";
  let demoMode = false; // Production mode with real auth
  
  async function handleSubmit() {
    if (!email) return;
    
    loading = true;
    error = "";
    
    // Demo mode - just navigate based on email
    if (demoMode && browser) {
      setTimeout(() => {
        // Store email in sessionStorage for demo
        sessionStorage.setItem("demo_email", email);
        
        // Check if this looks like a returning user (has @ and .)
        if (email.includes("@") && email.includes(".")) {
          // Simulate existing user
          goto(`/verify?email=${encodeURIComponent(email)}`);
        } else {
          // Simulate new user
          goto(`/enroll?email=${encodeURIComponent(email)}`);
        }
      }, 500);
      return;
    }
    
    // Production mode with real API
    try {
      const res = await fetch("/api/auth/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      
      const data = await res.json();
      
      if (data.exists) {
        goto(`/verify?email=${encodeURIComponent(email)}`);
      } else {
        goto(`/enroll?email=${encodeURIComponent(email)}`);
      }
    } catch (e) {
      error = "Something went wrong. Please try again.";
    } finally {
      loading = false;
    }
  }
  
  let particles: Array<{x: number, y: number, vx: number, vy: number}> = [];
  
  onMount(() => {
    // Create orbiting particles
    for (let i = 0; i < 3; i++) {
      particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2
      });
    }
    
    const interval = setInterval(() => {
      particles = particles.map(p => ({
        x: (p.x + p.vx + 100) % 100,
        y: (p.y + p.vy + 100) % 100,
        vx: p.vx,
        vy: p.vy
      }));
    }, 50);
    
    return () => clearInterval(interval);
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-glacier-900 to-black flex items-center justify-center relative overflow-hidden">
  <!-- Penrose grid background -->
  <svg class="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.1"/>
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#grid)" />
  </svg>
  
  <!-- Orbiting nodes -->
  {#each particles as particle}
    <div 
      class="absolute w-2 h-2 bg-aurora-500 rounded-full blur-sm animate-pulse"
      style="left: {particle.x}%; top: {particle.y}%; transform: translate(-50%, -50%)"
    ></div>
  {/each}
  
  <!-- Auth card -->
  <div class="relative z-10 w-full max-w-md p-8 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Welcome to the Portal</h1>
      <p class="text-white/60">One key. No password. Your field awaits.</p>
      {#if demoMode}
        <p class="text-aurora-500 text-xs mt-2">(Demo Mode - No server required)</p>
      {/if}
    </div>
    
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div>
        <input
          type="email"
          bind:value={email}
          placeholder="name@yourdomain.com"
          class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-aurora-500 focus:bg-white/10 transition-all"
          disabled={loading}
          required
        />
      </div>
      
      {#if error}
        <p class="text-fireweed-500 text-sm">{error}</p>
      {/if}
      
      <button
        type="submit"
        disabled={loading || !email}
        class="w-full py-3 bg-gradient-to-r from-glacier-500 to-aurora-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-aurora-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {loading ? "Processing..." : "Continue"}
      </button>
    </form>
    
    <div class="mt-8 pt-8 border-t border-white/10">
      <p class="text-center text-white/40 text-sm">
        New to the portal? You'll need an invite.
      </p>
    </div>
  </div>
</div>