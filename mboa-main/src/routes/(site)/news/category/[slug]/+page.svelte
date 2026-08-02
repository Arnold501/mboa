<script lang="ts">
  import { reveal } from '$lib/utils/animations';
  import PageHero from '$lib/components/PageHero.svelte';
  import ArticleCard from '$lib/components/newsroom/ArticleCard.svelte';
  import CategoryFilterBar from '$lib/components/newsroom/CategoryFilterBar.svelte';
  import { urlFor } from '$lib/sanity/image';
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();

  const heroImgUrl = $derived(
    data.page?.hero?.image?.image
      ? urlFor(data.page.hero.image.image)?.width(1400).height(700).fit('crop').url()
      : 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=1400&h=700&fit=crop'
  );
</script>

<svelte:head>
  <title>{data.activeCategoryMeta.title} — MBOA Sports Newsroom</title>
  <meta name="description" content={data.activeCategoryMeta.description || `${data.activeCategoryMeta.title} news from MBOA Sports.`} />
</svelte:head>

<PageHero
  title={data.activeCategoryMeta.title}
  subtitle={data.activeCategoryMeta.description}
  eyebrow={data.page?.hero?.eyebrow || 'Newsroom Category'}
  image={heroImgUrl}
/>

<section class="py-16 md:py-20">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="mb-10">
      <CategoryFilterBar categories={data.categories} active={data.activeCategory} />
    </div>

    {#if data.posts?.length === 0}
      <div class="text-center py-20">
        <p class="font-bebas text-4xl text-white/20">No articles in this category yet</p>
      </div>
    {:else}
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each data.posts as post, i (post._id)}
          <div use:reveal={{ delay: (i % 3) * 80 }}>
            <ArticleCard {post} />
          </div>
        {/each}
      </div>
    {/if}

    {#if data.totalPages > 1}
      <div class="flex items-center justify-center gap-4 mt-14">
        {#if data.currentPage > 1}
          <a href="/newsroom/category/{data.activeCategory}?p={data.currentPage - 1}" class="btn-outline text-xs">Previous</a>
        {/if}
        <span class="font-poppins text-xs text-white/40 tracking-widest uppercase">
          Page {data.currentPage} of {data.totalPages}
        </span>
        {#if data.currentPage < data.totalPages}
          <a href="/newsroom/category/{data.activeCategory}?p={data.currentPage + 1}" class="btn-outline text-xs">Next</a>
        {/if}
      </div>
    {/if}
  </div>
</section>
