<script lang="ts">
  import { whatsAppLink } from '$lib/sanity/utils';

  let { store }: { store: any } = $props();
</script>

<div class="p-6 bg-(--dark-gray) border border-light-gray/30 hover:border-gold/30 transition-colors">
  <div class="flex items-start justify-between gap-4 mb-3">
    <h4 class="font-bebas text-xl text-white leading-none">{store.name}</h4>
    <span class="inline-flex items-center gap-1.5 shrink-0 bg-(--gold)/10 border border-gold/30 text-(--gold) font-poppins text-[10px] font-bold tracking-widest uppercase px-2.5 py-1">
      <span class="w-1.5 h-1.5 rounded-full bg-(--gold)"></span>
      In Stock
    </span>
  </div>

  <div class="space-y-2">
    <p class="font-poppins text-sm text-white/60">{store.address}</p>
    <p class="font-poppins text-xs text-white/40">{store.city}</p>

    <div class="flex flex-wrap gap-x-5 gap-y-1 pt-2">
      {#if store.phone}
        <a href="tel:{store.phone.replace(/\s/g, '')}" class="font-poppins text-xs text-white/60 hover:text-(--gold) transition-colors flex items-center gap-1.5">
          <span class="text-(--gold)">📞</span>{store.phone}
        </a>
      {/if}
      {#if whatsAppLink(store.whatsapp)}
        <a
          href={whatsAppLink(store.whatsapp, `Hi, I'd like to ask about products at ${store.name}.`)}
          target="_blank"
          rel="noreferrer"
          class="font-poppins text-xs text-white/60 hover:text-(--gold) transition-colors flex items-center gap-1.5"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="text-(--gold) shrink-0">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.005c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.83 14.16c-.24.68-1.4 1.32-1.93 1.4-.53.08-1.18.11-1.9-.12-.44-.14-1-.32-1.72-.63-3.02-1.31-4.99-4.38-5.14-4.58-.15-.21-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.53.28-.3.6-.38.81-.38.2 0 .41 0 .58.01.19.01.44-.07.68.52.25.59.83 2.02.9 2.17.07.15.12.32.02.52-.1.2-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.06 1.14 1.01 2.1 1.32 2.4 1.47.3.15.47.12.64-.07.17-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.97.3.15.49.22.57.35.08.13.08.72-.16 1.4z"/>
          </svg>
          WhatsApp
        </a>
      {/if}
      {#if store.email}
        <a href="mailto:{store.email}" class="font-poppins text-xs text-white/60 hover:text-(--gold) transition-colors flex items-center gap-1.5">
          <span class="text-(--gold)">✉️</span>{store.email}
        </a>
      {/if}
      {#if store.mapUrl}
        <a href={store.mapUrl} target="_blank" rel="noreferrer" class="font-poppins text-xs text-(--gold) hover:text-(--gold-light) transition-colors flex items-center gap-1.5">
          <span>📍</span>Get Directions
        </a>
      {/if}
    </div>

    {#if store.hours?.length}
      <div class="pt-2 border-t border-light-gray/20 mt-3">
        {#each store.hours as line}
          <p class="font-poppins text-[11px] text-white/35">{line}</p>
        {/each}
      </div>
    {/if}
  </div>
</div>