<script lang="ts">
  import { urlFor } from '$lib/sanity/image';
  import NewsletterSignup from '$lib/components/newsroom/NewsletterSignup.svelte';

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Athletes', href: '/athletes' },
    { label: 'Events', href: '/events' },
    { label: 'Newsroom', href: '/newsroom' },
    { label: 'Media', href: '/media' },
    { label: 'Store', href: '/store' },
    { label: 'Contact', href: '/contact' }
  ];
  const contactAddress = ['UAE / CAMEROON'];
  const contactEmail = 'info@mboasports.com';
  const contactPhone = '+237 650 916 937';

  const fallbackSocial = [
    { platform: 'Instagram', url: '#' },
    { platform: 'YouTube', url: '#' },
    { platform: 'Facebook', url: '#' },
    { platform: 'Twitter/X', url: '#' }
  ];
  const socialAbbrev: Record<string, string> = {
    Instagram: 'IG', YouTube: 'YT', Facebook: 'FB', 'Twitter/X': 'X', LinkedIn: 'LI', Website: 'WWW'
  };

  const tickerPhrases = [
    'ELITE COACHING SYSTEM',
    'AFRICAN CHAMPIONS',
    'CRAFTED FOR EXCELLENCE',
    'GLOBAL PERFORMANCE PIPELINE',
    'DISCOVER • DEVELOP • PRODUCE'
  ];
  const TICKER_LAP_REPEATS = 4;
  const TICKER_SECONDS_PER_PHRASE = 3;
  const tickerLap = Array.from({ length: TICKER_LAP_REPEATS }).flatMap(() => tickerPhrases);
  const tickerItems = [...tickerLap, ...tickerLap];
  const tickerDuration = tickerLap.length * TICKER_SECONDS_PER_PHRASE;

  let { settings = {} }: { settings?: any } = $props();

  const brandName = $derived(settings.brandName || 'MBOA');
  const brandSubtitle = $derived(settings.brandSubtitle || 'Sports');
  const logoUrl = $derived(settings.logoImage ? urlFor(settings.logoImage)?.width(96).height(96).url() : null);
  const tagline = $derived(settings.tagline || 'Building Champions. Empowering Talents');
  const footerDescription = $derived(
    settings.footerDescription ||
      'Discovering raw talent. Developing elite athletes. Producing world champions. Based in UAE and CAMEROON — operating across Africa and beyond.'
  );
  const socialLinks = $derived(settings.socialLinks?.length ? settings.socialLinks : fallbackSocial);

  const newsletterHeading = $derived(settings.newsletter?.heading || 'Stay in the Loop');
  const newsletterSubtext = $derived(
    settings.newsletter?.subtext ||
      'MBOA news, fight announcements, and exclusive content — straight to your inbox.'
  );
</script>

<footer class="bg-off-black border-t border-light-gray/30 relative overflow-hidden">
  <div class="absolute top-0 left-0 w-64 h-64 rounded-full bg-(--gold)/3 blur-3xl pointer-events-none"></div>
  <div class="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-(--gold)/2 blur-3xl pointer-events-none"></div>

  <!-- Ticker -->
  <div class="marquee-container border-y border-gold/20 py-4 bg-(--dark-gray)/50">
    <div class="marquee-track" style:animation-duration="{tickerDuration}s">
      {#each tickerItems as phrase, i (i)}
        <span class="inline-flex items-center gap-6 font-bebas text-2xl tracking-widest text-(--gold)/70 px-5 shrink-0">
          {phrase}
          <span class="text-(--gold)">✦</span>
        </span>
      {/each}
    </div>
  </div>

  <!-- Newsletter -->
  <div class="relative border-b border-light-gray/20 overflow-hidden">
    <div class="absolute inset-0 bg-(--gold)/4 pointer-events-none"></div>
    <div class="relative max-w-7xl mx-auto px-6 lg:px-10 py-12">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div class="max-w-md">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-9 h-9 border border-gold/40 flex items-center justify-center shrink-0">
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" class="text-(--gold)">
                <path d="M2.5 5.5h15v9a1 1 0 01-1 1h-13a1 1 0 01-1-1v-9z" stroke="currentColor" stroke-width="1.4"/>
                <path d="M2.5 5.5l7.5 5.5 7.5-5.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="font-poppins text-xs font-semibold tracking-widest text-(--gold) uppercase">Stay Connected</span>
          </div>
          <h3 class="font-bebas text-3xl md:text-4xl text-white leading-none mb-2">{newsletterHeading}</h3>
          <p class="font-poppins text-xs text-white/45 leading-relaxed">{newsletterSubtext}</p>
        </div>
        <div class="w-full lg:w-auto lg:min-w-104">
          <NewsletterSignup inline showHeading={false} heading={newsletterHeading} subtext={newsletterSubtext} />
        </div>
      </div>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-6 lg:px-10 py-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

      <!-- Brand col (dynamic) -->
      <div class="lg:col-span-2">
        <a href="/" class="flex items-center gap-3 group mb-6">
          <div class="w-12 h-12 ${logoUrl ?? 'border'} border-gold flex items-center justify-center overflow-hidden">
            {#if logoUrl}
              <img src={logoUrl} alt={brandName} class="w-full h-full object-cover" />
            {:else}
              <span class="font-bebas text-(--gold) text-2xl">{brandName.charAt(0)}</span>
            {/if}
          </div>
          <div class="flex flex-col leading-none">
            <span class="font-bebas text-white text-2xl tracking-wider">{brandName} {brandSubtitle.toUpperCase()}</span>
            <span class="font-poppins text-(--gold) text-[10px] tracking-widest-2 uppercase">{tagline}</span>
          </div>
        </a>
        <p class="font-poppins text-sm text-white/50 leading-relaxed max-w-sm mb-8">
          {footerDescription}
        </p>
        <!-- Social (dynamic) -->
        <div class="flex items-center gap-4">
          {#each socialLinks as social}
            <a
              href={social.url}
              class="w-10 h-10 border border-light-gray/50 flex items-center justify-center font-poppins text-xs font-semibold text-white/50
                     hover:border-gold hover:text-(--gold) transition-all duration-200"
            >
              {socialAbbrev[social.platform] ?? social.platform.slice(0, 2).toUpperCase()}
            </a>
          {/each}
        </div>
      </div>

      <!-- Navigation (static) -->
      <div>
        <h4 class="font-poppins text-xs font-semibold tracking-widest text-(--gold) uppercase mb-6">Navigate</h4>
        <ul class="space-y-3">
          {#each navItems as item}
            <li>
              <a href={item.href} class="font-poppins text-sm text-white/50 hover:text-white transition-colors duration-150 flex items-center gap-2 group">
                <span class="w-3 h-px bg-(--gold)/30 group-hover:bg-(--gold) group-hover:w-5 transition-all duration-200"></span>
                {item.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Contact info (static) -->
      <div>
        <h4 class="font-poppins text-xs font-semibold tracking-widest text-(--gold) uppercase mb-6">Contact</h4>
        <ul class="space-y-4">
          <li class="flex gap-3">
            <span class="text-(--gold) text-xs mt-1">📍</span>
            <div>
              {#each contactAddress as line}<p class="font-poppins text-sm text-white/70">{line}</p>{/each}
            </div>
          </li>
          <li class="flex gap-3">
            <span class="text-(--gold) text-xs mt-1">✉️</span>
            <a href="mailto:{contactEmail}" class="font-poppins text-sm text-white/70 hover:text-(--gold) transition-colors">{contactEmail}</a>
          </li>
          <li class="flex gap-3">
            <span class="text-(--gold) text-xs mt-1">📞</span>
            <a href="tel:{contactPhone.replace(/\s/g, '')}" class="font-poppins text-sm text-white/70 hover:text-(--gold) transition-colors">{contactPhone}</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-light-gray/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="font-poppins text-xs text-white/30">© {new Date().getFullYear()} {brandName} {brandSubtitle}. All rights reserved.</p>
      <div class="flex items-center gap-6">
        <!-- <a href="/#" class="font-poppins text-xs text-white/30 hover:text-white/60 transition-colors">Privacy Policy</a>
        <a href="/#" class="font-poppins text-xs text-white/30 hover:text-white/60 transition-colors">Terms of Use</a> -->
      </div>
    </div>
  </div>
</footer>