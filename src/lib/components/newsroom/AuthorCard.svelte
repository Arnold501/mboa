<script lang="ts">
  import { urlFor } from '$lib/sanity/image';
  let { author } = $props();
  let avatarUrl = $derived(author.avatar ? urlFor(author.avatar)?.width(160).height(160).fit('crop').url() : null);
</script>

<div class="flex gap-5 p-6 bg-(--dark-gray) border border-light-gray/30">
  {#if avatarUrl}
    <img src={avatarUrl} alt={author.name} class="w-16 h-16 rounded-full object-cover shrink-0" />
  {/if}
  <div class="min-w-0">
    <p class="font-poppins text-[10px] text-(--gold)/70 tracking-widest uppercase mb-1">Written By</p>
    <a href="/newsroom/author/{author.slug}" class="font-bebas text-2xl text-white leading-none mb-1 hover:text-(--gold) transition-colors inline-block">
      {author.name}
    </a>
    {#if author.role}<p class="font-poppins text-xs text-white/40 mb-2">{author.role}</p>{/if}
    {#if author.bio}<p class="font-poppins text-xs text-white/50 leading-relaxed">{author.bio}</p>{/if}
  </div>
</div>
