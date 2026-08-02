<script lang="ts">

let {title, subtitle, image, eyebrow, overlay =0.7 } = $props();

</script>

<section class="relative min-h-[60vh] flex items-end overflow-hidden">
  <!-- Background image -->
  <div class="absolute inset-0">
    <img
      src={image}
      alt={title}
      class="w-full h-full object-cover scale-105"
      loading="eager"
    />
    <div
      class="absolute inset-0"
      style:background="linear-gradient(to top, rgba(0,0,0,{overlay}) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.3) 100%)"
    ></div>
    <!-- Gold left accent -->
    <div class="absolute left-0 top-0 w-1 h-full bg-linear-to-b from-transparent via-gold/60 to-transparent"></div>
  </div>

  <!-- Content -->
  <div class="relative max-w-7xl mx-auto px-6 lg:px-10 pb-20 pt-40 w-full">
    {#if eyebrow}
      <p class="section-eyebrow mb-4">{eyebrow}</p>
    {/if}
    <h1 class="font-bebas text-7xl md:text-9xl lg:text-[10rem] leading-none text-white mb-4">
      {title}
    </h1>
    {#if subtitle}
      <p class="font-poppins text-base md:text-lg text-white/60 max-w-xl">
        {subtitle}
      </p>
    {/if}
    <div class="gold-line-full mt-8"></div>
  </div>
</section>