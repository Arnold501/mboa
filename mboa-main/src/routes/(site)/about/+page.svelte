<script lang="ts">
  import { reveal } from '$lib/utils/animations';
  import PageHero from '$lib/components/PageHero.svelte';
  import PartnerLogoTile from '$lib/components/PartnerLogoTile.svelte';
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();
  const partners = $derived(data.partners ?? []);
  const becomePartnerUrl = $derived(data.siteSettings?.becomePartnerUrl ?? null);
</script>

<svelte:head>
  <title>About MBOA Sports — Our Story</title>
  <meta name="description" content="Learn about MBOA Sports — our vision, mission, philosophy, and the journey from Africa to the world." />
</svelte:head>

<PageHero
  title="About MBOA Sports"
  subtitle="Building Champions. Empowering Talent."
  eyebrow="Core Motto"
  image="/about-page.jpg"
/>

<!-- What is MBOA  section -->
<section class="py-24 md:py-32">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="text-center mb-16" use:reveal>
      <span class="section-eyebrow">About Us</span>
      <h2 class="section-title">What is MBOA Sports</h2>
    </div>

    <div class="grid lg:grid-cols-3 gap-8">
      <div class="lg:col-span-1" use:reveal>
        <div class="h-px w-12 bg-(--gold) mb-6"></div>
        <p class="font-poppins text-white/70 leading-relaxed text-lg">
          MBOA SPORTS is a high-performance sports organization committed to discovering talent, developing elite athletes, and creating pathways to international success.
        </p>
      </div>

      <div class="lg:col-span-1" use:reveal={{ delay: 100 }}>
        <div class="h-px w-12 bg-(--gold) mb-6"></div>
        <p class="font-poppins text-white/70 leading-relaxed text-lg">
          We believe that talent exists everywhere, but opportunity does not. Our purpose is to bridge that gap by providing athletes with world-class training, professional competition, athlete management, education, and career development.
        </p>
      </div>

      <div class="lg:col-span-1" use:reveal={{ delay: 200 }}>
        <div class="h-px w-12 bg-(--gold) mb-6"></div>
        <p class="font-poppins text-white/70 leading-relaxed text-lg">
          More than a sports organization, MBOA SPORTS is a movement dedicated to transforming potential into excellence while inspiring the next generation of African champions.
        </p>
      </div>
    </div>
  </div>
</section>


<!-- ── Vision & Mission ── -->
<section class="py-24 md:py-32">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid lg:grid-cols-2 gap-16 md:gap-24">
      <div use:reveal>
        <span class="section-eyebrow">Our Vision</span>
        <h2 class="section-title-sm mb-6">To be Africa's premier<br/><span class="text-(--gold)-gradient">combat sports organization</span></h2>
        <p class="font-poppins text-white/60 leading-relaxed mb-4">
        To become Africa's leading sports organization, setting the global standard for athlete development, producing world champions, and shaping the future of sport across generations.
        </p>
      </div>
      <div use:reveal={{ delay: 200 }}>
        <span class="section-eyebrow">Our Mission</span>
        <h2 class="section-title-sm mb-6">Discover. Develop.<br/><span class="text-(--gold)-gradient">Produce Champions.</span></h2>
        <p class="font-poppins text-white/60 leading-relaxed mb-4">
        To identify, develop, and elevate athletes to world-class standards through professional training, competition, education, and strategic opportunities while empowering coaches, communities, and the future of African sport.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ── Divider ── -->
<div class="divider-gold max-w-7xl mx-auto px-6 lg:px-10"></div>

<!-- ── Story ── -->
<section class="pb-24 md:pb-32">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid lg:grid-cols-3 gap-12 items-start">
      <div class="lg:col-span-1" use:reveal>
        <span class="section-eyebrow">OUR STORY</span>
        <h2 class="section-title-sm">The Story<br/><span class="text-(--gold)-gradient">Behind MBOA SPORTS</span></h2>
      </div>
      <div class="lg:col-span-2 space-y-6" use:reveal={{ delay: 150 }}>
        <p class="font-poppins text-white/65 leading-relaxed text-lg">
        MBOA SPORTS was founded with one clear vision—to create an organization that gives African athletes the opportunities they deserve.
        </p>
        <p class="font-poppins text-white/55 leading-relaxed">
        Across Africa, thousands of talented athletes possess the skill, determination, and discipline to compete at the highest level. Yet many never reach their full potential because they lack access to professional coaching, quality competition, exposure, and structured development.
        </p>
        <p class="font-poppins text-white/55 leading-relaxed">
        MBOA SPORTS was established to change that reality.
        </p>
        <p class="font-poppins text-white/55 leading-relaxed">
          Our journey began with a commitment to build a professional sports ecosystem that nurtures athletes from grassroots to the global stage. By combining athlete development, event promotion, sports education, and strategic partnerships, we create opportunities that extend beyond competition and build lasting careers.
        </p>
        <p class="font-poppins text-white/55 leading-relaxed">
          Today, MBOA SPORTS is laying the foundation for a new generation of champions while contributing to the growth of African sport as a whole.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ── Full bleed image ── -->
<div class="relative h-[50vh] overflow-hidden">
  <img
    src="/about-hero.jpg"
    alt="MBOA Training"
    class="w-full h-full object-cover"
    style:filter="brightness(0.5)"
  />
  <div class="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-black/40"></div>
  <div class="absolute inset-0 flex items-center justify-center">
    <blockquote class="text-center max-w-2xl px-6">
      <p class="font-bebas text-4xl md:text-6xl text-white leading-none mb-4">
        "Talent is everywhere.<br/>
        <span class="text-(--gold)">Opportunity is what we build."</span>
      </p>
      <cite class="font-poppins text-sm text-white/50 not-italic tracking-widest uppercase">— MBOA Sports Founder</cite>
    </blockquote>
  </div>
</div>

<!-- ── Philosophy ── -->
<section class="py-24 md:py-32 bg-(--dark-gray)">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="text-center mb-16" use:reveal>
      <span class="section-eyebrow">What We Stand For</span>
      <h2 class="section-title">Our Philosophy</h2>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each [
        { title: 'Discipline', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.', icon: '⚔️', n: '01' },
        { title: 'Excellence', desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo.', icon: '🏆', n: '02' },
        { title: 'Culture', desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.', icon: '🌍', n: '03' },
        { title: 'Legacy', desc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.', icon: '🔱', n: '04' },
      ] as item, i}
        <div
          class="p-8 border border-light-gray/30 hover:border-gold/40 transition-all duration-400 group relative overflow-hidden"
          use:reveal={{ delay: i * 100 }}
        >
          <div class="absolute top-0 right-0 font-bebas text-7xl text-(--gold)/5 leading-none select-none">{item.n}</div>
          <span class="text-3xl mb-5 block">{item.icon}</span>
          <h3 class="font-bebas text-2xl text-white mb-3 group-hover:text-(--gold) transition-colors">{item.title}</h3>
          <!-- <p class="font-poppins text-xs text-white/50 leading-relaxed">{item.desc}</p> -->
          <div class="absolute bottom-0 left-0 h-0.5 w-0 bg-(--gold) group-hover:w-full transition-all duration-500"></div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ── Africa to World pathway ── -->
<section class="py-24 md:py-32 relative overflow-hidden">
  <div class="absolute right-0 top-0 w-1/2 h-full opacity-3 pointer-events-none select-none flex items-center justify-end pr-10">
    <span class="font-bebas text-[15vw] text-(--gold) leading-none">WORLD</span>
  </div>
  <div class="max-w-7xl mx-auto px-6 lg:px-10 relative">
    <div class="text-center mb-16" use:reveal>
      <span class="section-eyebrow">The Pathway</span>
      <h2 class="section-title">Africa <span class="text-(--gold)">→</span> Global</h2>
    </div>
    <div class="relative">
      <!-- Connecting line -->
      <div class="absolute top-8 left-8 right-8 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent hidden md:block"></div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {#each [
          { step: '01', label: 'Local Scouting', desc: 'Identifying raw talent at grassroots level across African nations', icon: '🔍' },
          { step: '02', label: 'Development Camp', desc: 'MBOA\'s intensive 3-month onboarding and development program', icon: '🏋️' },
          { step: '03', label: 'Regional Fights', desc: 'Building records through structured regional competitive events', icon: '🥊' },
          { step: '04', label: 'Continental Title', desc: 'Targeting Pan-African and continental championship recognition', icon: '🥇' },
          { step: '05', label: 'World Stage', desc: 'Competing and winning at the highest international level', icon: '🌐' },
        ] as item, i}
          <div class="text-center" use:reveal={{ delay: i * 100 }}>
            <div class="relative inline-flex items-center justify-center w-16 h-16 border-2 border-gold mb-5 bg-black">
              <span class="text-2xl">{item.icon}</span>
              <div class="absolute -top-2 -right-2 w-6 h-6 bg-(--gold) flex items-center justify-center">
                <span class="font-bebas text-black text-sm leading-none">{item.step}</span>
              </div>
            </div>
            <h4 class="font-bebas text-lg text-white mb-2">{item.label}</h4>
            <p class="font-poppins text-xs text-white/45 leading-relaxed">{item.desc}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- ── Partners ──-->
{#if partners.length}
<section class="py-24 md:py-32 bg-(--dark-gray)">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16" use:reveal>
      <div>
        <span class="section-eyebrow">Our Network</span>
        <h2 class="section-title">Trusted Partners</h2>
      </div>
      {#if becomePartnerUrl}
        <a href={becomePartnerUrl} target="_blank" rel="noreferrer" class="btn-primary shrink-0">
          Become a Partner
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </a>
      {/if}
    </div>

    <div class="flex flex-wrap justify-center gap-x-10 gap-y-14">
      {#each partners as partner, i}
        <div
          class="group w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.7rem)] text-center sm:text-left"
          use:reveal={{ delay: i * 80 }}
        >
          <!-- Logo -->
          <div class="h-16 flex items-center justify-center sm:justify-start mb-5">
            <PartnerLogoTile {partner} size="md" mono={false} />
          </div>

          <!-- Tier -->
          {#if partner.tier}
            <span class="block font-poppins text-[10px] font-semibold tracking-widest text-(--gold)/60 uppercase mb-1.5">
              {partner.tier}
            </span>
          {/if}

          <h4 class="font-bebas text-xl text-white mb-2 tracking-wide">{partner.name}</h4>

          {#if partner.description}
            <p class="font-poppins text-xs text-white/45 leading-relaxed mb-3">{partner.description}</p>
          {/if}

          {#if partner.website}
            <a
              href={partner.website}
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center gap-1.5 font-poppins text-xs text-(--gold) hover:gap-2.5 transition-all"
            >
              Visit Website
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" stroke-width="1.5"/></svg>
            </a>
          {/if}

          <!-- Hairline. -->
          <div class="mt-5 h-px w-full bg-linear-to-r from-light-gray/25 to-transparent group-hover:from-gold/50 transition-colors duration-500"></div>
        </div>
      {/each}
    </div>
  </div>
</section>
{/if}

<!-- ── CTA ── -->
<section class="py-20 bg-(--gold) text-black text-center" use:reveal>
  <div class="max-w-7xl mx-auto px-6">
    <h2 class="font-bebas text-5xl md:text-7xl leading-none mb-4">Ready to Be Part of This?</h2>
    <p class="font-poppins text-black/70 mb-8 max-w-lg mx-auto">Whether you're an athlete, coach, or partner, we want to hear from you.</p>
    <div class="flex flex-wrap gap-4 justify-center">
      <a href="/contact" class="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-montserrat font-bold text-sm tracking-wider uppercase hover:bg-(--dark-gray) transition-colors">
        Get in Touch
      </a>
      <a href="/programs-hidden" class="inline-flex items-center gap-2 px-8 py-4 border-2 border-black text-black font-montserrat font-bold text-sm tracking-wider uppercase hover:bg-black hover:text-white transition-all">
        View Programs
      </a>
    </div>
  </div>
</section>