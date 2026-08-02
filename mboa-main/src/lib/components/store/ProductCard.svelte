<script lang="ts">
  import { urlFor } from '$lib/sanity/image';

  let { product } = $props();
  const imgUrl = $derived(product.coverImage?.image
    ? urlFor(product.coverImage.image)?.width(600).height(600).fit('crop').url()
    : null);
</script>

<a href="/store/{product.slug}" class="card-dark block group relative overflow-hidden">
  <div class="aspect-square overflow-hidden relative bg-(--dark-gray)">
    {#if imgUrl}
      <img
        src={imgUrl}
        alt={product.coverImage?.alt ?? product.name}
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        loading="lazy"
      />
    {/if}
    <div class="img-overlay absolute inset-0 opacity-60"></div>

    {#if product.category}
      <div class="absolute top-4 left-4">
        <span class="tag text-[10px]">{product.category.title}</span>
      </div>
    {/if}

    {#if !product.inStockSomewhere}
      <div class="absolute top-4 right-4">
        <span class="inline-flex items-center gap-1.5 bg-(--dark-gray) border border-white/20 text-white/60 font-poppins text-[10px] tracking-widest uppercase px-3 py-1.5">
          Sold Out
        </span>
      </div>
    {/if}
  </div>

  <div class="p-5">
    <h3 class="font-bebas text-2xl text-white leading-none mb-2 group-hover:text-(--gold) transition-colors duration-200">
      {product.name}
    </h3>
    <div class="flex items-center justify-between">
      <span class="font-montserrat font-bold text-sm text-(--gold)">
        {product.price} {product.currency}
      </span>
      {#if product.sizes?.length}
        <span class="font-poppins text-xs text-white/30">{product.sizes.length} sizes</span>
      {/if}
    </div>
  </div>
</a>
