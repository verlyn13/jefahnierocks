<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import CommandPalette from "$lib/components/CommandPalette.svelte";
  import type { PageData } from "./$types";
  import { pillars } from "$lib/seed";
  
  export let data: PageData;
  
  $: space = {
    ...data.space,
    color: data.space.slug === "family" ? "from-cyan-500 to-blue-600" : "from-purple-500 to-pink-600",
    description: data.space.slug === "family" ? "Our family's digital home" : "Track and manage your projects"
  };
  
  let activeTab = "overview";
  let messages = data.messages || [];
  let newMessage = "";
  let promises = data.promises || [];
  let commandPaletteOpen = false;
  let searchItems: any[] = [];
  let isLoading = false;
  
  // Connect to keyboard shortcut
  function handleKeydown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      commandPaletteOpen = true;
    }
  }
  
  let pollInterval: any;
  
  onMount(() => {
    // Setup command palette items
    setupSearchItems();
    window.addEventListener('keydown', handleKeydown);
    
    // Poll for new messages every 5 seconds when on messages tab
    pollInterval = setInterval(() => {
      if (activeTab === "messages") {
        fetchLatestMessages();
      }
    }, 5000);
    
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      if (pollInterval) clearInterval(pollInterval);
    };
  });
  
  function setupSearchItems() {
    searchItems = [
      { title: "New Message", action: () => activeTab = "messages" },
      { title: "Add Promise", action: () => activeTab = "promises" },
      { title: "View Calendar", action: () => activeTab = "calendar" },
      { title: "Settings", action: () => goto("/settings") },
      { title: "Switch Space", action: () => goto("/spaces") },
      ...promises.map(p => ({ 
        title: p.title, 
        action: () => { activeTab = "promises"; }
      }))
    ];
  }
  
  async function sendMessage() {
    if (!newMessage.trim() || isLoading) return;
    
    isLoading = true;
    try {
      const response = await fetch("/api/spaces/" + data.space.id + "/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newMessage })
      });
      
      if (response.ok) {
        const { message } = await response.json();
        messages = [...messages, {
          id: message.id,
          author_name: message.author_name || data.user.name,
          content: message.content,
          created_at: message.created_at,
          author_email: message.author_email
        }];
        newMessage = "";
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      isLoading = false;
    }
  }
  
  async function addPromise() {
    const title = prompt("Promise title:");
    if (!title) return;
    
    const pillarOptions = pillars.map(p => p.id).join(", ");
    const pillarId = prompt("Pillar (" + pillarOptions + "):") || "people";
    const icon = prompt("Icon (emoji):") || "🎯";
    
    try {
      const response = await fetch("/api/spaces/" + data.space.id + "/promises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, pillar_id: pillarId, icon })
      });
      
      if (response.ok) {
        const { promise } = await response.json();
        promises = [...promises, promise];
      }
    } catch (error) {
      console.error("Failed to add promise:", error);
    }
  }
  
  function formatTime(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return minutes + " min ago";
    if (hours < 24) return hours + " hour" + (hours > 1 ? 's' : '') + " ago";
    return days + " day" + (days > 1 ? 's' : '') + " ago";
  }
  
  async function fetchLatestMessages() {
    try {
      const response = await fetch("/api/spaces/" + data.space.id + "/messages");
      if (response.ok) {
        const { messages: newMessages } = await response.json();
        if (newMessages.length > messages.length) {
          messages = newMessages.reverse(); // API returns newest first
        }
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  }
  
  function handleMessageKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }
  
  function handlePaletteSelect(item: any) {
    if (item.action) {
      item.action();
    }
  }
</script>

<!-- Command Palette -->
<CommandPalette 
  bind:open={commandPaletteOpen}
  items={searchItems}
  placeholder="Search or jump to..."
  onSelect={handlePaletteSelect}
/>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
  <!-- Header -->
  <div class="bg-black/20 backdrop-blur-lg border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button
            on:click={() => goto("/spaces")}
            class="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Back to spaces"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 class="text-2xl font-bold text-white">{space.name}</h1>
            <p class="text-white/60 text-sm">{space.description}</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <button
            on:click={() => commandPaletteOpen = true}
            class="px-3 py-1 bg-white/10 text-white/60 rounded-lg text-sm hover:bg-white/20 transition-colors flex items-center gap-2"
          >
            <kbd class="px-1.5 py-0.5 bg-white/10 rounded text-xs">⌘K</kbd>
            Search
          </button>
          <button
            on:click={() => goto("/settings")}
            class="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Settings"
          >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Tabs -->
  <div class="max-w-7xl mx-auto px-4 py-6">
    <div class="flex gap-2 mb-6">
      {#each ["overview", "messages", "promises", "calendar"] as tab}
        <button
          on:click={() => activeTab = tab}
          class="px-4 py-2 rounded-lg transition-all {activeTab === tab 
            ? 'bg-white/20 text-white' 
            : 'bg-white/5 text-white/60 hover:bg-white/10'}"
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      {/each}
    </div>
    
    <!-- Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {#if activeTab === "overview"}
        <!-- Quick Stats -->
        <div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div class="text-3xl mb-2">👥</div>
            <h3 class="text-white font-semibold">Family Members</h3>
            <p class="text-white/60">2 active today</p>
          </div>
          <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div class="text-3xl mb-2">💬</div>
            <h3 class="text-white font-semibold">Recent Messages</h3>
            <p class="text-white/60">{messages.length} new today</p>
          </div>
          <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div class="text-3xl mb-2">🎯</div>
            <h3 class="text-white font-semibold">Active Promises</h3>
            <p class="text-white/60">{promises.length} this week</p>
          </div>
        </div>
        
        <!-- Recent Activity -->
        <div class="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <h2 class="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div class="space-y-3">
            {#each messages.slice(-3) as msg}
              <div class="flex gap-3">
                <div class="text-2xl">{msg.author_email?.includes('jeffrey') ? '👨' : '👩'}</div>
                <div class="flex-1">
                  <p class="text-white/80">{msg.author_name}: {msg.content}</p>
                  <p class="text-white/40 text-sm">{formatTime(msg.created_at)}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
        
        <!-- Upcoming -->
        <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <h2 class="text-xl font-semibold text-white mb-4">Upcoming</h2>
          <div class="space-y-3">
            {#each promises.slice(0, 5) as promise}
              <div class="flex items-center gap-3">
                <div class="text-2xl">{promise.icon || '🎯'}</div>
                <div>
                  <p class="text-white/80">{promise.title}</p>
                  <p class="text-white/40 text-sm">
                    {promise.due_date ? new Date(promise.due_date).toLocaleDateString() : 'No due date'}
                  </p>
                </div>
              </div>
            {/each}
          </div>
        </div>
        
      {:else if activeTab === "messages"}
        <!-- Message Board -->
        <div class="lg:col-span-3 bg-white/10 backdrop-blur-lg rounded-xl border border-white/10">
          <div class="p-6 border-b border-white/10">
            <h2 class="text-xl font-semibold text-white">Family Message Board</h2>
          </div>
          
          <div class="h-96 overflow-y-auto p-6 space-y-4">
            {#each messages as msg}
              <div class="flex gap-3">
                <div class="text-2xl">{msg.author_email?.includes('jeffrey') ? '👨' : '👩'}</div>
                <div class="flex-1">
                  <div class="bg-white/10 rounded-lg p-3">
                    <p class="text-white/60 text-sm mb-1">{msg.author_name} • {formatTime(msg.created_at)}</p>
                    <p class="text-white">{msg.content}</p>
                  </div>
                </div>
              </div>
            {/each}
          </div>
          
          <div class="p-6 border-t border-white/10">
            <div class="flex gap-2">
              <input
                type="text"
                bind:value={newMessage}
                on:keydown={handleMessageKeydown}
                placeholder="Type a message..."
                class="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
              />
              <button
                on:click={sendMessage}
                class="px-6 py-2 bg-gradient-to-r {space.color} text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Send
              </button>
            </div>
          </div>
        </div>
        
      {:else if activeTab === "promises"}
        <!-- Promises/Tasks -->
        <div class="lg:col-span-3">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each promises as promise}
              <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                <div class="text-4xl mb-3">{promise.icon}</div>
                <h3 class="text-white font-semibold mb-1">{promise.title}</h3>
                <p class="text-white/60 text-sm mb-3">{promise.date}</p>
                <span class="px-2 py-1 bg-white/10 rounded text-xs text-white/80">
                  {promise.status}
                </span>
              </div>
            {/each}
            
            <!-- Add New -->
            <button 
              on:click={addPromise}
              class="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 border-dashed hover:bg-white/10 transition-colors">
              <div class="text-4xl mb-3 opacity-50">➕</div>
              <h3 class="text-white/60">Add Promise</h3>
            </button>
          </div>
        </div>
        
      {:else if activeTab === "calendar"}
        <!-- Calendar View -->
        <div class="lg:col-span-3 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <h2 class="text-xl font-semibold text-white mb-4">Family Calendar</h2>
          <div class="grid grid-cols-7 gap-2 text-center">
            {#each ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as day}
              <div class="text-white/60 text-sm py-2">{day}</div>
            {/each}
            {#each Array(35) as _, i}
              <div class="aspect-square bg-white/5 rounded-lg p-2 hover:bg-white/10 transition-colors cursor-pointer">
                <span class="text-white/40 text-sm">{i % 31 + 1}</span>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>