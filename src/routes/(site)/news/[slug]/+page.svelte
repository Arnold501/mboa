<script lang="ts">
  import { urlFor } from '$lib/sanity/image';
  import { formatDate, estimateReadTime } from '$lib/sanity/utils';
  import PortableTextRenderer from '$lib/components/portableText/PortableTextRenderer.svelte';
  import AuthorCard from '$lib/components/newsroom/AuthorCard.svelte';
  import RelatedArticles from '$lib/components/newsroom/RelatedArticles.svelte';
  import ShareButtons from '$lib/components/newsroom/ShareButtons.svelte';
  import NewsletterSignup from '$lib/components/newsroom/NewsletterSignup.svelte';
  import { reveal } from '$lib/utils/animations';
  import { page } from '$app/state';
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();
  const post = $derived(data.post);
  const readTime = $derived(estimateReadTime(post.body));
  const heroImg = $derived(
    post.coverImage?.image ? urlFor(post.coverImage.image)?.width(1600).height(800).fit('crop').url() : null
  );
  const shareImg = $derived(
    post.seo?.shareImage ? urlFor(post.seo.shareImage)?.width(1200).height(630).fit('crop').url() : heroImg
  );
  const canonicalUrl = $derived(page.url.href);

  const jsonLd = $derived({
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: post.author ? { '@type': 'Person', name: post.author.name } : undefined,
    image: shareImg ? [shareImg] : undefined
  });
</script>

<svelte:head>
  <title>{post.seo?.metaTitle || post.title} — MBOA Newsroom</title>
  <meta name="description" content={post.seo?.metaDescription || post.excerpt} />
  {#if post.seo?.noIndex}<meta name="robots" content="noindex" />{/if}
  <meta property="og:title" content={post.seo?.metaTitle || post.title} />
  <meta property="og:description" content={post.seo?.metaDescription || post.excerpt} />
  <meta property="og:type" content="article" />
  {#if shareImg}<meta property="og:image" content={shareImg} />{/if}
  <script type="application/ld+json">
    {@html JSON.stringify(jsonLd).replace(/</g, '\\u003c')}
  </script>
</svelte:head>

<!-- Hero -->
<section class="relative min-h-[70vh] flex items-end overflow-hidden">
  <div class="absolute inset-0">
    {#if heroImg}
      <img src={heroImg} alt={post.coverImage?.alt ?? post.title} class="w-full h-full object-cover" />
    {/if}
    <div class="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent"></div>
  </div>
  <div class="relative max-w-7xl mx-auto px-6 lg:px-10 pb-16 pt-32 w-full">
    <a
      href="/newsroom"
      class="inline-flex items-center gap-2 font-poppins text-xs text-white/40 hover:text-(--gold) transition-colors mb-8 tracking-wider uppercase"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M12 7H2M2 7l4-4M2 7l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
      All Articles
    </a>
    {#if post.category}
      <a href="/newsroom/category/{post.category.slug}" class="tag mb-4 inline-block">{post.category.title}</a>
    {/if}
    <h1 class="font-bebas text-5xl md:text-7xl lg:text-8xl leading-none text-white mb-5">{post.title}</h1>
    <div class="flex flex-wrap items-center gap-4 font-poppins text-xs text-white/50 tracking-wide">
      {#if post.author}<span>By <span class="text-white/80">{post.author.name}</span></span>{/if}
      <span>·</span>
      <span>{formatDate(post.publishedAt)}</span>
      <span>·</span>
      <span>{readTime} min read</span>
    </div>
  </div>
</section>

<!-- Body -->
<section class="py-16 md:py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid lg:grid-cols-4 gap-16">
      <article class="lg:col-span-3 max-w-3xl">
        <PortableTextRenderer value={post.body} />

        <div class="mt-14 pt-8 border-t border-light-gray/30 flex items-center justify-between flex-wrap gap-4">
          {#if post.tags?.length}
            <div class="flex flex-wrap gap-2">
              {#each post.tags as tag}<span class="tag text-[10px]">{tag}</span>{/each}
            </div>
          {/if}
          <ShareButtons url={canonicalUrl} title={post.title} />
        </div>

        {#if post.author}
          <div class="mt-12" use:reveal>
            <AuthorCard author={post.author} />
          </div>
        {/if}
      </article>

      <aside class="lg:col-span-1 space-y-8">
        <NewsletterSignup compact />
      </aside>
    </div>
  </div>
</section>

{#if data.related?.length}
  <section class="py-20 bg-(--dark-gray) border-t border-light-gray/30">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">
      <span class="section-eyebrow">Keep Reading</span>
      <h2 class="section-title mb-10">Related Stories</h2>
      <RelatedArticles posts={data.related} />
    </div>
  </section>
{/if}
