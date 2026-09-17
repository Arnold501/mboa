<script lang="ts">
  let { categories, active, basePath = '/news' } = $props();
</script>

<div class="flex items-center gap-3 overflow-x-auto pb-1">
  <span class="font-poppins text-xs text-white/30 tracking-widest uppercase shrink-0 mr-2">Filter:</span>
  <a
    href={basePath}
    class="shrink-0 px-5 py-2 font-poppins text-xs tracking-widest uppercase transition-all duration-200 border"
    style:background={active === 'All' ? '#C8A96A' : 'transparent'}
    style:color={active === 'All' ? '#000' : 'rgba(255,255,255,0.5)'}
    style:border-color={active === 'All' ? '#C8A96A' : 'rgba(255,255,255,0.1)'}
  >
    All
  </a>
  {#each categories as cat}
    <a
      href="{basePath}?category={cat.slug}"
      class="shrink-0 px-5 py-2 font-poppins text-xs tracking-widest uppercase transition-all duration-200 border"
      style:background={active === cat.slug ? '#C8A96A' : 'transparent'}
      style:color={active === cat.slug ? '#000' : 'rgba(255,255,255,0.5)'}
      style:border-color={active === cat.slug ? '#C8A96A' : 'rgba(255,255,255,0.1)'}
    >
      {cat.title}
      <span class="ml-1.5 text-[10px] opacity-60">({cat.postCount})</span>
    </a>
  {/each}
</div>
