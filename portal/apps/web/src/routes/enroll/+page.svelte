<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { startRegistration } from "@simplewebauthn/browser";
  
  let email = $page.url.searchParams.get("email") || "";
  let name = email.split("@")[0];
  let step = 1;
  let loading = false;
  let error = "";
  
  async function handleNameSubmit() {
    if (!name) return;
    step = 2;
  }
  
  async function handlePasskeySetup() {
    loading = true;
    error = "";
    
    try {
      // Create user account
      const createRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name })
      });
      
      if (!createRes.ok) {
        throw new Error("Failed to create account");
      }
      
      const { userId } = await createRes.json();
      
      // Get registration options
      const optionsRes = await fetch("/api/webauthn/register/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, email })
      });
      
      if (!optionsRes.ok) {
        throw new Error("Failed to get registration options");
      }
      
      const options = await optionsRes.json();
      
      // Start WebAuthn registration
      const regResponse = await startRegistration(options);
      
      // Verify registration
      const verifyRes = await fetch("/api/webauthn/register/finish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, response: regResponse })
      });
      
      if (!verifyRes.ok) {
        throw new Error("Registration failed");
      }
      
      // Success - go to step 3
      step = 3;
    } catch (e: any) {
      error = e.message || "Setup failed. Please try again.";
    } finally {
      loading = false;
    }
  }
  
  async function completeSetup() {
    goto("/spaces");
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-glacier-900 to-black flex items-center justify-center relative overflow-hidden">
  <!-- Aurora shimmer effect -->
  <div class="absolute inset-0 opacity-20">
    <div class="absolute inset-0 bg-gradient-to-r from-aurora-500 via-fireweed-500 to-gold-500 animate-pulse"></div>
  </div>
  
  <!-- Setup card -->
  <div class="relative z-10 w-full max-w-md p-8 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Welcome to the Portal</h1>
      <p class="text-white/60">Let's get you set up</p>
      
      <!-- Progress indicators -->
      <div class="flex justify-center gap-2 mt-6">
        {#each [1, 2, 3] as i}
          <div 
            class="w-2 h-2 rounded-full transition-all {step >= i ? 'bg-aurora-500' : 'bg-white/20'}"
          ></div>
        {/each}
      </div>
    </div>
    
    {#if step === 1}
      <!-- Step 1: Name -->
      <form on:submit|preventDefault={handleNameSubmit} class="space-y-4">
        <div>
          <label for="email" class="block text-white/60 text-sm mb-2">Your email</label>
          <input
            id="email"
            type="email"
            value={email}
            disabled
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/50"
          />
        </div>
        
        <div>
          <label for="name" class="block text-white/60 text-sm mb-2">What should we call you?</label>
          <input
            id="name"
            type="text"
            bind:value={name}
            placeholder="Your name"
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-aurora-500 focus:bg-white/10 transition-all"
            required
          />
        </div>
        
        <button
          type="submit"
          class="w-full py-3 bg-gradient-to-r from-glacier-500 to-aurora-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-aurora-500/25 transition-all"
        >
          Continue
        </button>
      </form>
      
    {:else if step === 2}
      <!-- Step 2: Create Passkey -->
      <div class="space-y-6">
        <div class="text-center">
          <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-glacier-500 to-aurora-500 rounded-full flex items-center justify-center">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h2 class="text-xl font-medium text-white mb-2">Create Your Passkey</h2>
          <p class="text-white/60 text-sm">Your key is your signature. It's stored securely on this device.</p>
        </div>
        
        <button
          on:click={handlePasskeySetup}
          disabled={loading}
          class="w-full py-3 bg-gradient-to-r from-glacier-500 to-aurora-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-aurora-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? "Setting up..." : "Create Passkey"}
        </button>
        
        {#if error}
          <p class="text-fireweed-500 text-sm text-center">{error}</p>
        {/if}
      </div>
      
    {:else if step === 3}
      <!-- Step 3: Success -->
      <div class="space-y-6">
        <div class="text-center">
          <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-glacier-500 to-aurora-500 rounded-full flex items-center justify-center animate-pulse">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 class="text-xl font-medium text-white mb-2">You're All Set!</h2>
          <p class="text-white/60 text-sm">Your portal is ready. Let's explore your field.</p>
        </div>
        
        <button
          on:click={completeSetup}
          class="w-full py-3 bg-gradient-to-r from-glacier-500 to-aurora-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-aurora-500/25 transition-all"
        >
          Enter the Portal
        </button>
      </div>
    {/if}
  </div>
</div>