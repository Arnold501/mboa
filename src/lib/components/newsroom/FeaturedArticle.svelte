<script lang="ts">
  import { urlFor } from '$lib/sanity/image';
  import { formatDate } from '$lib/sanity/utils';

  let { post } = $props();
  const imgUrl = $derived(post.coverImage?.image
    ? urlFor(post.coverImage.image)?.width(1400).height(700).fit('crop').url()
    : null);
</script>

<a href="/newsroom/{post.slug}" class="group relative block overflow-hidden min-h-[60vh] items-end">
  {#if imgUrl}
    <img
      src={imgUrl}
      alt={post.coverImage?.alt ?? post.title}
      class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
    />
  {/if}
  <div class="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/10"></div>
  <div class="relative p-8 md:p-14 max-w-3xl">
    {#if post.category}<span class="tag mb-4 inline-block">{post.category.title}</span>{/if}
    <h2 class="font-bebas text-4xl md:text-6xl lg:text-7xl leading-none text-white mb-4 group-hover:text-(--gold) transition-colors">
      {post.title}
    </h2>
    <p class="font-poppins text-white/60 text-base md:text-lg max-w-xl mb-4">{post.excerpt}</p>
    <p class="font-poppins text-xs text-white/40 tracking-widest uppercase">
      {formatDate(post.publishedAt)}{post.author ? ` · ${post.author.name}` : ''}
    </p>
  </div>
</a>
