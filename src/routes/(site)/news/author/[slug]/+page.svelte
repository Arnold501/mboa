<script lang="ts">
  import { urlFor } from '$lib/sanity/image';
  import { reveal } from '$lib/utils/animations';
  import ArticleCard from '$lib/components/newsroom/ArticleCard.svelte';
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();
  const avatarUrl = $derived(
    data.author.avatar ? urlFor(data.author.avatar)?.width(240).height(240).fit('crop').url() : null
  );
</script>

<svelte:head>
  <title>{data.author.name} — MBOA Sports Newsroom</title>
  <meta name="description" content={data.author.bio || `Articles by ${data.author.name} on MBOA Sports.`} />
</svelte:head>

<section class="pt-40 pb-16 bg-(--dark-gray) border-b border-light-gray/30">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center sm:items-end gap-6">
    {#if avatarUrl}
      <img src={avatarUrl} alt={data.author.name} class="w-28 h-28 rounded-full object-cover border-2 border-gold/30" />
    {/if}
    <div class="text-center sm:text-left">
      <p class="section-eyebrow">Newsroom Author</p>
      <h1 class="font-bebas text-5xl md:text-6xl text-white leading-none mb-2">{data.author.name}</h1>
      {#if data.author.role}<p class="font-poppins text-sm text-white/50">{data.author.role}</p>{/if}
    </div>
  </div>
  {#if data.author.bio}
    <p class="font-poppins text-white/60 max-w-2xl mx-auto px-6 lg:px-10 mt-8 leading-relaxed text-center sm:text-left">
      {data.author.bio}
    </p>
  {/if}
</section>

<section class="py-16 md:py-20">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <span class="section-eyebrow">Articles</span>
    <h2 class="section-title mb-10">By {data.author.name}</h2>
    {#if data.posts?.length === 0}
      <p class="font-poppins text-white/40">No published articles yet.</p>
    {:else}
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each data.posts as post, i (post._id)}
          <div use:reveal={{ delay: (i % 3) * 80 }}>
            <ArticleCard {post} />
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>
