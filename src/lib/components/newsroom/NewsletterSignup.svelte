<script lang="ts">
  let {
    compact = false,
    inline = false,
    showHeading = true,
    heading = 'Never Miss a Headline',
    subtext = 'Get MBOA Sports fight results, exclusive interviews, and behind-the-scenes stories delivered straight to your inbox.'
  }: {
    compact?: boolean;
    inline?: boolean;
    showHeading?: boolean;
    heading?: string;
    subtext?: string;
  } = $props();

  let email = $state('');

  let website = $state('');
  let status = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
  let errorMessage = $state('');

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!email) return;
    status = 'submitting';
    errorMessage = '';
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website })
      });
      const data = await res.json().catch(() => ({}) as { success?: boolean; error?: string });
      if (res.ok && data.success) {
        status = 'success';
      } else {
        status = 'error';
        errorMessage = data.error || 'Something went wrong. Please try again.';
      }
    } catch {
      status = 'error';
      errorMessage = 'Something went wrong. Please try again.';
    }
  }
</script>

{#snippet honeypot()}
  <input
    type="text"
    name="website"
    bind:value={website}
    tabindex="-1"
    autocomplete="off"
    aria-hidden="true"
    class="absolute -left-2499.75 w-px h-px opacity-0 overflow-hidden"
  />
{/snippet}

{#if inline}
  <div class="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-10 w-full">
    {#if showHeading}
      <div class="lg:max-w-xs shrink-0">
        <h4 class="font-bebas text-2xl text-white mb-1 tracking-wide leading-none">{heading}</h4>
        {#if subtext}<p class="font-poppins text-xs text-white/45 leading-relaxed">{subtext}</p>{/if}
      </div>
    {/if}
    <div class="flex-1 w-full {showHeading ? 'lg:max-w-sm' : ''}">
      {#if status === 'success'}
        <p class="font-poppins text-sm text-(--gold) flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="shrink-0">
            <path d="M3 8.5l3.5 3.5L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          You're subscribed. Welcome to the family.
        </p>
      {:else}
        <!-- Footer-scale -->
        <form onsubmit={handleSubmit} class="flex flex-col sm:flex-row gap-3 relative">
          <input
            type="email"
            required
            placeholder="you@email.com"
            bind:value={email}
            class="input-dark flex-1 text-sm py-3"
            autocomplete="email"
          />
          {@render honeypot()}
          <button
            type="submit"
            class="btn-primary shrink-0 justify-center text-xs py-3 px-6"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        {#if status === 'error'}<p class="font-poppins text-xs text-red-400 mt-2">{errorMessage}</p>{/if}
      {/if}
    </div>
  </div>
{:else if compact}
  <div class="p-6 bg-(--dark-gray) border border-light-gray/30">
    <h4 class="font-bebas text-xl text-white mb-2">{heading}</h4>
    <p class="font-poppins text-xs text-white/50 mb-4 leading-relaxed">{subtext}</p>
    {#if status === 'success'}
      <p class="font-poppins text-xs text-(--gold)">You're subscribed. Welcome to the family.</p>
    {:else}
      <form onsubmit={handleSubmit} class="space-y-3 relative">
        <input type="email" required placeholder="you@email.com" bind:value={email} class="input-dark text-sm py-3" autocomplete="email" />
        {@render honeypot()}
        <button type="submit" class="btn-primary w-full justify-center text-xs py-3" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
        </button>
        {#if status === 'error'}<p class="font-poppins text-xs text-red-400">{errorMessage}</p>{/if}
      </form>
    {/if}
  </div>
{:else}
  <section class="py-20 bg-dark-gray border-t border-light-gray/30 text-center">
    <div class="max-w-xl mx-auto px-6">
      <span class="section-eyebrow">Stay Connected</span>
      <h2 class="section-title-sm mb-4">{heading}</h2>
      <p class="font-poppins text-sm text-white/50 mb-8">{subtext}</p>
      {#if status === 'success'}
        <p class="font-poppins text-sm text-(--gold)">You're subscribed. Welcome to the family.</p>
      {:else}
        <form onsubmit={handleSubmit} class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
          <input type="email" required placeholder="you@email.com" bind:value={email} class="input-dark flex-1" autocomplete="email" />
          {@render honeypot()}
          <button type="submit" class="btn-primary shrink-0 justify-center" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        {#if status === 'error'}<p class="font-poppins text-xs text-red-400 mt-3">{errorMessage}</p>{/if}
      {/if}
    </div>
  </section>
{/if}