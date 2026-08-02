<script lang="ts">
  import { reveal } from '$lib/utils/animations';
  import { urlFor } from '$lib/sanity/image';
  import StoreAvailabilityCard from '$lib/components/store/StoreAvailabilityCard.svelte';
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();
  const product = $derived(data.product);

  let activeImage = $state(0);
  let selectedSize = $state<string | null>(null);

  const images = $derived(
    (product.images ?? [])
      .map((img: any) => ({
        url: img.image ? urlFor(img.image)?.width(900).height(900).fit('crop').url() : null,
        alt: img.alt ?? product.name
      }))
      .filter((i: any) => i.url)
  );

  const mainImageUrl = $derived(images[activeImage]?.url ?? images[0]?.url);
</script>

<svelte:head>
  <title>{product.seo?.metaTitle || product.name} — MBOA Sports Store</title>
  <meta name="description" content={product.seo?.metaDescription || product.description} />
</svelte:head>

<section class="pt-32 pb-20 md:pb-28">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <a href="/store" class="inline-flex items-center gap-2 font-poppins text-xs text-white/40 hover:text-(--gold) transition-colors mb-10 tracking-wider uppercase">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M12 7H2M2 7l4-4M2 7l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      All Products
    </a>

    <div class="grid lg:grid-cols-2 gap-12 lg:gap-20">
      <!-- Gallery -->
      <div use:reveal={{ direction: 'left' }}>
        <div class="aspect-square bg-(--dark-gray) border border-light-gray/30 overflow-hidden mb-4">
          {#if mainImageUrl}
            <img src={mainImageUrl} alt={images[activeImage]?.alt ?? product.name} class="w-full h-full object-cover" />
          {/if}
        </div>
        {#if images.length > 1}
          <div class="grid grid-cols-5 gap-3">
            {#each images as img, i}
              <button
                class="aspect-square overflow-hidden border transition-colors"
                style:border-color={activeImage === i ? '#C8A96A' : 'rgba(255,255,255,0.1)'}
                onclick={() => (activeImage = i)}
              >
                <img src={img.url} alt={img.alt} class="w-full h-full object-cover" />
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Details -->
      <div use:reveal={{ delay: 150 }}>
        {#if product.category}<span class="tag mb-4 inline-block">{product.category.title}</span>{/if}
        <h1 class="font-bebas text-5xl md:text-6xl text-white leading-none mb-4">{product.name}</h1>
        <p class="font-montserrat font-bold text-2xl text-(--gold) mb-6">{product.price} {product.currency}</p>
        <p class="font-poppins text-white/60 leading-relaxed mb-8">{product.description}</p>

        {#if product.sizes?.length}
          <div class="mb-10">
            <p class="font-poppins text-xs text-white/40 tracking-widest uppercase mb-3">Select Size</p>
            <div class="flex flex-wrap gap-2">
              {#each product.sizes as size}
                <button
                  class="w-12 h-12 border font-montserrat text-sm font-semibold transition-all duration-200"
                  style:background={selectedSize === size ? '#C8A96A' : 'transparent'}
                  style:color={selectedSize === size ? '#000' : 'rgba(255,255,255,0.7)'}
                  style:border-color={selectedSize === size ? '#C8A96A' : 'rgba(255,255,255,0.2)'}
                  onclick={() => (selectedSize = selectedSize === size ? null : size)}
                >
                  {size}
                </button>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Available At — replaces an "Add to Cart" button entirely -->
        <div class="border-t border-light-gray/30 pt-8">
          <p class="font-poppins text-xs text-(--gold) tracking-widest uppercase mb-1">Not sold online</p>
          <h2 class="font-bebas text-2xl text-white mb-5">Available At</h2>

          {#if product.availableAt?.length}
            <div class="space-y-4">
              {#each product.availableAt as store (store._id)}
                <StoreAvailabilityCard {store} />
              {/each}
            </div>
          {:else}
            <div class="p-6 bg-(--dark-gray) border border-light-gray/30 text-center">
              <p class="font-poppins text-sm text-white/50">
                Currently unavailable in stores — check back soon, or
                <a href="/contact" class="text-(--gold) hover:underline">get in touch</a> for restock updates.
              </p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>
