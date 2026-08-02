<script lang="ts">
  import { urlFor } from '$lib/sanity/image';
  import { formatDate } from '$lib/sanity/utils';
  import { getBrandColorHex } from '$lib/sanity/brandColors';

  let { post } = $props();
  let imgUrl = $derived(post.coverImage?.image
    ? urlFor(post.coverImage.image)?.width(600).height(400).fit('crop').url()
    : null);
  let accent = $derived(getBrandColorHex(post.category?.accentColor));
</script>

<a href="/newsroom/{post.slug}" class="card-dark block group relative overflow-hidden">
  <div class="aspect-3/2 overflow-hidden relative">
    {#if imgUrl}
      <img
        src={imgUrl}
        alt={post.coverImage?.alt ?? post.title}
        class="w-full h-full object-cover grayscale-30 group-hover:grayscale-0 group-hover:scale-105
               transition-all duration-700"
        loading="lazy"
      />
    {/if}
    <div class="img-overlay absolute inset-0"></div>
    {#if post.category}
      <div class="absolute top-4 left-4">
        <span
          class="tag text-[10px]"
          style:color={accent}
          style:border-color="{accent}33"
          style:background="{accent}1a"
        >
          {post.category.title}
        </span>
      </div>
    {/if}
  </div>

  <div class="p-5">
    <p class="font-poppins text-xs text-white/40 tracking-widest uppercase mb-2">
      {formatDate(post.publishedAt)}
    </p>
    <h3 class="font-bebas text-2xl text-white leading-tight mb-2 group-hover:text-(--gold) transition-colors duration-200">
      {post.title}
    </h3>
    <p class="font-poppins text-xs text-white/50 leading-relaxed line-clamp-2 mb-4">
      {post.excerpt}
    </p>
    <div class="flex items-center justify-between">
      <span class="font-poppins text-xs text-(--gold) font-medium tracking-wide flex items-center gap-1 group-hover:gap-2 transition-all">
        Read Story
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="transition-transform group-hover:translate-x-1">
          <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" stroke-width="1.5" />
        </svg>
      </span>
      {#if post.author}<span class="font-poppins text-xs text-white/30">{post.author.name}</span>{/if}
    </div>
  </div>
</a>
