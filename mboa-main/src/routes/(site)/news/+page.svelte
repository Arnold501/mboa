<script lang="ts">
  import { reveal } from '$lib/utils/animations';
  import PageHero from '$lib/components/PageHero.svelte';
  import ArticleCard from '$lib/components/newsroom/ArticleCard.svelte';
  import FeaturedArticle from '$lib/components/newsroom/FeaturedArticle.svelte';
  import CategoryFilterBar from '$lib/components/newsroom/CategoryFilterBar.svelte';
  import NewsletterSignup from '$lib/components/newsroom/NewsletterSignup.svelte';
  import { urlFor } from '$lib/sanity/image';
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();
  const topStory = $derived(data.featured?.[0]);

  const hero = $derived(data.page?.hero);
  const heroImgUrl = $derived(
    hero?.image?.image
      ? urlFor(hero.image.image)?.width(1400).height(700).fit('crop').url()
      : 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&h=700&fit=crop'
  );
</script>

<svelte:head>
  <title>{hero?.title || 'Newsroom'} — MBOA Sports</title>
  <meta name="description" content={hero?.subtitle || 'Breaking news, fight results, and behind-the-scenes stories from MBOA Sports.'} />
</svelte:head>

<PageHero
  title={hero?.title || 'Newsroom'}
  subtitle={hero?.subtitle || 'Breaking news, fight recaps, and stories from across MBOA Sports.'}
  eyebrow={hero?.eyebrow || 'MBOA Sports Newsroom'}
  image={heroImgUrl}
/>

{#if topStory}
  <section class="px-6 lg:px-10 max-w-7xl mx-auto -mt-16 relative z-10" use:reveal>
    <FeaturedArticle post={topStory} />
  </section>
{/if}

<section class="py-16 md:py-20">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="mb-10">
      <CategoryFilterBar categories={data.categories} active={data.activeCategory} />
    </div>

    {#if data.posts?.length === 0}
      <div class="text-center py-20">
        <p class="font-bebas text-4xl text-white/20">No articles found</p>
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
          <a
            href="/newsroom?p={data.currentPage - 1}{data.activeCategory !== 'All' ? `&category=${data.activeCategory}` : ''}"
            class="btn-outline text-xs"
          >Previous</a>
        {/if}
        <span class="font-poppins text-xs text-white/40 tracking-widest uppercase">
          Page {data.currentPage} of {data.totalPages}
        </span>
        {#if data.currentPage < data.totalPages}
          <a
            href="/newsroom?p={data.currentPage + 1}{data.activeCategory !== 'All' ? `&category=${data.activeCategory}` : ''}"
            class="btn-outline text-xs"
          >Next</a>
        {/if}
      </div>
    {/if}
  </div>
</section>

<NewsletterSignup />
