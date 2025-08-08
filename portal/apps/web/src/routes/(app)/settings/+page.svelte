<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { startRegistration } from "@simplewebauthn/browser";
  
  let user: any = null;
  let loading = false;
  let error = "";
  let success = "";
  let hasPasskeys = false;
  
  onMount(async () => {
    // Get current user
    const res = await fetch("/api/auth/me");
    if (!res.ok) {
      goto("/verify");
      return;
    }
    
    user = await res.json();
    
    // Check if user has passkeys
    const passkeysRes = await fetch("/api/auth/passkeys");
    if (passkeysRes.ok) {
      const data = await passkeysRes.json();
      hasPasskeys = data.count > 0;
    }
  });
  
  async function addPasskey() {
    loading = true;
    error = "";
    success = "";
    
    try {
      // Get registration options for existing user
      const optionsRes = await fetch("/api/webauthn/register/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userId: user.id, 
          email: user.email 
        })
      });
      
      if (!optionsRes.ok) {
        const data = await optionsRes.json();
        throw new Error(data.error || "Failed to get registration options");
      }
      
      const options = await optionsRes.json();
      
      // Start WebAuthn registration
      const regResponse = await startRegistration(options);
      
      // Verify registration
      const verifyRes = await fetch("/api/webauthn/register/finish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userId: user.id, 
          response: regResponse 
        })
      });
      
      if (!verifyRes.ok) {
        throw new Error("Failed to register passkey");
      }
      
      success = "Passkey added successfully!";
      hasPasskeys = true;
    } catch (e: any) {
      error = e.message || "Failed to add passkey";
    } finally {
      loading = false;
    }
  }
  
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    goto("/");
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-glacier-900 to-black p-8">
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-white">Account Settings</h1>
      <button
        on:click={() => goto("/spaces")}
        class="px-4 py-2 text-white/60 hover:text-white transition-colors"
      >
        Back to Spaces
      </button>
    </div>
    
    {#if user}
      <!-- User Info -->
      <div class="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-6">
        <h2 class="text-xl font-semibold text-white mb-4">Profile</h2>
        <div class="space-y-2">
          <p class="text-white/80">
            <span class="text-white/60">Email:</span> {user.email}
          </p>
          <p class="text-white/80">
            <span class="text-white/60">Name:</span> {user.name || "Not set"}
          </p>
          <p class="text-white/80">
            <span class="text-white/60">User ID:</span> 
            <span class="font-mono text-sm">{user.id}</span>
          </p>
        </div>
      </div>
      
      <!-- Passkeys -->
      <div class="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-6">
        <h2 class="text-xl font-semibold text-white mb-4">Security</h2>
        
        {#if error}
          <div class="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4">
            <p class="text-red-300">{error}</p>
          </div>
        {/if}
        
        {#if success}
          <div class="bg-green-500/20 border border-green-500/50 rounded-lg p-3 mb-4">
            <p class="text-green-300">{success}</p>
          </div>
        {/if}
        
        <div class="mb-4">
          <p class="text-white/80 mb-2">
            {#if hasPasskeys}
              ✅ You have passkeys configured
            {:else}
              ⚠️ No passkeys configured yet
            {/if}
          </p>
          <p class="text-white/60 text-sm mb-4">
            Passkeys provide secure, passwordless authentication to your account.
          </p>
        </div>
        
        <button
          on:click={addPasskey}
          disabled={loading}
          class="px-6 py-3 bg-aurora-500 text-white rounded-xl hover:bg-aurora-600 transition-colors disabled:opacity-50"
        >
          {loading ? "Setting up..." : hasPasskeys ? "Add Another Passkey" : "Add Your First Passkey"}
        </button>
      </div>
      
      <!-- Actions -->
      <div class="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <h2 class="text-xl font-semibold text-white mb-4">Actions</h2>
        <button
          on:click={logout}
          class="px-6 py-3 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 transition-colors border border-red-500/50"
        >
          Sign Out
        </button>
      </div>
    {:else}
      <div class="text-center text-white/60">
        Loading...
      </div>
    {/if}
  </div>
</div>