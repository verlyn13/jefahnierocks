<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { startAuthentication } from "@simplewebauthn/browser";
  import { onMount } from "svelte";
  
  let email = $page.url.searchParams.get("email") || "";
  let loading = false;
  let error = "";
  
  async function handlePasskey() {
    loading = true;
    error = "";
    
    try {
      // Get authentication options
      const optionsRes = await fetch("/api/webauthn/login/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      
      if (!optionsRes.ok) {
        throw new Error("Failed to get authentication options");
      }
      
      const options = await optionsRes.json();
      
      // Start WebAuthn authentication
      const authResponse = await startAuthentication(options);
      
      // Verify authentication
      const verifyRes = await fetch("/api/webauthn/login/finish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, response: authResponse })
      });
      
      if (!verifyRes.ok) {
        throw new Error("Authentication failed");
      }
      
      // Success - redirect to portal
      goto("/");
    } catch (e: any) {
      error = e.message || "Authentication failed. Please try again.";
    } finally {
      loading = false;
    }
  }
  
  async function handleMagicLink() {
    loading = true;
    error = "";
    
    try {
      const res = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      
      if (!res.ok) {
        throw new Error("Failed to send magic link");
      }
      
      // Show success message
      error = ""; // Clear any errors
      alert("Check your email for a sign-in link!");
    } catch (e) {
      error = "Failed to send magic link. Please try again.";
    } finally {
      loading = false;
    }
  }
  
  let glowX = 50;
  let glowY = 50;
  
  onMount(() => {
    const handleMouseMove = (e: MouseEvent) => {
      glowX = (e.clientX / window.innerWidth) * 100;
      glowY = (e.clientY / window.innerHeight) * 100;
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-glacier-900 to-black flex items-center justify-center relative overflow-hidden">
  <!-- Animated glow that follows cursor -->
  <div 
    class="absolute w-96 h-96 rounded-full bg-aurora-500/20 blur-3xl pointer-events-none transition-all duration-1000"
    style="left: {glowX}%; top: {glowY}%; transform: translate(-50%, -50%)"
  />
  
  <!-- Auth card -->
  <div class="relative z-10 w-full max-w-md p-8 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Welcome Back</h1>
      <p class="text-white/60">Checking your signature...</p>
      <p class="text-aurora-500 mt-2">{email}</p>
    </div>
    
    <div class="space-y-4">
      <button
        on:click={handlePasskey}
        disabled={loading}
        class="w-full py-3 bg-gradient-to-r from-glacier-500 to-aurora-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-aurora-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
        {loading ? "Authenticating..." : "Use Passkey"}
      </button>
      
      <button
        on:click={handleMagicLink}
        disabled={loading}
        class="w-full py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Send Magic Link
      </button>
      
      {#if error}
        <p class="text-fireweed-500 text-sm text-center">{error}</p>
      {/if}
    </div>
    
    <div class="mt-8 pt-8 border-t border-white/10">
      <a href="/enter" class="text-center text-white/40 text-sm hover:text-white/60 transition-colors block">
        Use a different email
      </a>
    </div>
  </div>
  
  <!-- Now Lens narration -->
  <div class="fixed bottom-4 right-4 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 text-white/60 text-sm">
    Verifying identity protocols...
  </div>
</div>