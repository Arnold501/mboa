<script lang="ts">
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { urlFor } from '$lib/sanity/image';

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Athletes', href: '/athletes' },
    { label: 'Events', href: '/events' },
    { label: 'News', href: '/news' },
    { label: 'Media', href: '/media' },
    { label: 'Store', href: '/store' },
    { label: 'Community', href: '/community' },
    { label: 'Contact', href: '/contact' }
  ];

  let { settings = {} }: { settings?: any } = $props();

  const brandName = $derived(settings.brandName || 'MBOA');
  const brandSubtitle = $derived(settings.brandSubtitle || 'Sports');
  const logoUrl = $derived(settings.logoImage ? urlFor(settings.logoImage)?.width(80).height(80).url() : null);
  const ctaLabel = $derived(settings.navCtaLabel || 'Join / Partner');
  const ctaUrl = $derived(settings.navCtaUrl || '/contact');

  let scrolled = $state(false);
  let menuOpen = $state(false);

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 60;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function toggleMenu() {
    menuOpen = !menuOpen;
    if (browser) {
      document.body.style.overflow = menuOpen ? 'hidden' : '';
    }
  }

  function closeMenu() {
    menuOpen = false;
    if (browser) document.body.style.overflow = '';
  }

  let currentPath = $derived($page.url.pathname);
</script>

<!-- ── Desktop Nav ── -->
<header
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
  class:bg-black={scrolled}
  class:border-b={scrolled}
  class:border-gold-muted={scrolled}
  style:background={scrolled ? '#000000ee' : 'transparent'}
  style:backdrop-filter={scrolled ? 'blur(12px)' : 'none'}
>
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="flex items-center justify-between h-20">

      <!-- Logo (dynamic: logo image/brand name/subtitle) -->
      <a href="/" onclick={closeMenu} class="flex items-center gap-3 group shrink-0">
        <div class={`w-12 h-12 ${logoUrl ?? 'border'} border-gold flex items-center justify-center relative overflow-hidden`}>
          {#if logoUrl}
            <img src={logoUrl} alt={brandName} class="w-full h-full object-cover" />
          {:else}
            <span class="font-bebas text-(--gold) text-lg leading-none">{brandName.charAt(0)}</span>
          {/if}
          <div class="absolute inset-0 bg-(--gold) opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </div>
        <div class="flex flex-col leading-none">
          <span class="font-bebas text-white text-xl tracking-wider">{brandName}</span>
          <span class="font-poppins text-(--gold) text-[10px] tracking-widest-2 uppercase font-medium">{brandSubtitle}</span>
        </div>
      </a>

      <!-- Desktop Menu (static) -->
      <nav class="hidden lg:flex items-center gap-8">
        {#each navItems as item}
          <a href={item.href} class="nav-link text-xs" class:active={currentPath === item.href}>
            {item.label}
          </a>
        {/each}
      </nav>

      <!-- CTA (dynamic) -->
      <div class="hidden lg:flex items-center gap-4">
        <a href={ctaUrl} class="btn-primary text-xs py-3 px-6">
          {ctaLabel}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </a>
      </div>

      <!-- Mobile hamburger -->
      <button class="lg:hidden flex flex-col gap-1.5 p-2 relative z-50" onclick={toggleMenu} aria-label="Toggle menu">
        <span class="block w-6 h-px bg-white transition-all duration-300" class:rotate-45={menuOpen} class:translate-y-2={menuOpen}></span>
        <span class="block h-px bg-(--gold) transition-all duration-300" class:opacity-0={menuOpen} style:width={menuOpen ? '0' : '16px'}></span>
        <span class="block w-6 h-px bg-white transition-all duration-300" class:-rotate-45={menuOpen} class:-translate-y-2={menuOpen}></span>
      </button>

    </div>
  </div>
</header>

<!-- ── Mobile Menu (static links) ── -->
{#if menuOpen}
  <div class="fixed inset-0 z-40 bg-black flex flex-col lg:hidden" style:padding-top="80px">
    <div class="absolute top-0 left-0 w-px h-full bg-linear-to-b from-gold/30 to-transparent"></div>
    <div class="absolute bottom-0 right-0 w-px h-1/2 bg-linear-to-t from-gold/30 to-transparent"></div>

    <nav class="flex flex-col px-8 pt-12 gap-6">
      {#each navItems as item, i}
        <a
          href={item.href}
          class="font-bebas text-5xl text-white/80 hover:text-(--gold) transition-colors duration-200 tracking-wide"
          class:text-gold={currentPath === item.href}
          onclick={closeMenu}
          style:animation-delay="{i * 60}ms"
        >
          <span class="text-(--gold)/50 text-xl font-poppins mr-3">0{i + 1}</span>
          {item.label}
        </a>
      {/each}
    </nav>

    <div class="mt-auto px-8 pb-12">
      <a href={ctaUrl} class="btn-primary w-full justify-center" onclick={closeMenu}>{ctaLabel}</a>
      <p class="font-poppins text-xs text-white/30 mt-6 tracking-wider uppercase">{settings.tagline || 'Building Champions. Empowering Talents'}</p>
    </div>
  </div>
{/if}