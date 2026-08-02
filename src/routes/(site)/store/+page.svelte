<script lang="ts">
  import { reveal } from '$lib/utils/animations';
  import PageHero from '$lib/components/PageHero.svelte';
  import ProductCard from '$lib/components/store/ProductCard.svelte';
  import { urlFor } from '$lib/sanity/image';
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();

  let activeCategory = $state('All');
  let filtered = $derived(
    activeCategory === 'All'
      ? data.products
      : data.products.filter((p: { category: { slug: string; }; }) => p.category?.slug === activeCategory)
  );

  const hero = $derived(data.page?.hero);
  const heroImgUrl = $derived(
    hero?.image?.image
      ? urlFor(hero.image.image)?.width(1400).height(700).fit('crop').url()
      : 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1400&h=700&fit=crop'
  );
</script>

<svelte:head>
  <title>{hero?.title || 'Store'} — MBOA Sports</title>
  <meta name="description" content={hero?.subtitle || 'Official MBOA Sports merchandise — find it at a store near you.'} />
</svelte:head>

<PageHero
  title={hero?.title || 'Store'}
  subtitle={hero?.subtitle || 'Official MBOA Sports gear — find where to pick it up near you.'}
  eyebrow={hero?.eyebrow || 'MBOA Sports Merchandise'}
  image={heroImgUrl}
/>

{#if data.categories?.length}
<section class="py-10 bg-dark-gray border-b border-light-gray/30 sticky top-20 z-30">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="flex items-center gap-3 overflow-x-auto pb-1">
      <span class="font-poppins text-xs text-white/30 tracking-widest uppercase shrink-0 mr-2">Filter:</span>
      <button
        class="shrink-0 px-5 py-2 font-poppins text-xs tracking-widest uppercase transition-all duration-200 border"
        style:background={activeCategory === 'All' ? '#C8A96A' : 'transparent'}
        style:color={activeCategory === 'All' ? '#000' : 'rgba(255,255,255,0.5)'}
        style:border-color={activeCategory === 'All' ? '#C8A96A' : 'rgba(255,255,255,0.1)'}
        onclick={() => (activeCategory = 'All')}
      >All</button>
      {#each data.categories as cat}
        <button
          class="shrink-0 px-5 py-2 font-poppins text-xs tracking-widest uppercase transition-all duration-200 border"
          style:background={activeCategory === cat.slug ? '#C8A96A' : 'transparent'}
          style:color={activeCategory === cat.slug ? '#000' : 'rgba(255,255,255,0.5)'}
          style:border-color={activeCategory === cat.slug ? '#C8A96A' : 'rgba(255,255,255,0.1)'}
          onclick={() => (activeCategory = cat.slug)}
        >
          {cat.title}
          <span class="ml-1.5 text-[10px] opacity-60">({cat.productCount})</span>
        </button>
      {/each}
    </div>
  </div>
</section>
{/if}

<section class="py-20 md:py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    {#if filtered.length === 0}
      <div class="text-center py-20">
        <p class="font-bebas text-4xl text-white/20">No products found</p>
      </div>
    {:else}
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each filtered as product, i (product._id)}
          <div use:reveal={{ delay: (i % 4) * 80 }}>
            <ProductCard {product} />
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>

<section class="py-16 bg-dark-gray border-t border-light-gray/30 text-center">
  <div class="max-w-xl mx-auto px-6" use:reveal>
    <span class="section-eyebrow">Can't Find It Online</span>
    <h2 class="section-title-sm mb-5">This Is a<br/><span class="text-gold-gradient">Store Locator</span></h2>
    <p class="font-poppins text-sm text-white/50">
      Every product here shows exactly which MBOA Sports stores currently carry it — pick a product to see locations, hours, and contact details.
    </p>
  </div>
</section>
