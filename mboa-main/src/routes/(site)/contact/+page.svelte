<script lang="ts">
  import { reveal } from '$lib/utils/animations';
  import PageHero from '$lib/components/PageHero.svelte';
  import { urlFor } from '$lib/sanity/image';
  import type { PageProps } from './$types';
  import PartnerLogoTile from '$lib/components/PartnerLogoTile.svelte';

  const { data }: PageProps = $props();
  const settings = $derived(data.siteSettings ?? {});
  const hero = $derived(data.page?.hero);
  const partners = $derived(data.partners ?? []);

  const heroImgUrl = $derived(
    hero?.image?.image
      ? urlFor(hero.image.image)?.width(1400).height(700).fit('crop').url()
      : 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&h=700&fit=crop'
  );

  const inquiryTypes = $derived(
    settings.inquiryTypes?.length
      ? settings.inquiryTypes
      : ['General Inquiry', 'Athlete Application', 'Partnership / Sponsorship', 'Media Accreditation', 'Event Hosting', 'Coaching Education']
  );
  const address = $derived(settings.address?.length ? settings.address : ['Kigali Arena Complex', 'KG 11 Ave, Kigali', 'Rwanda']);
  const emails = $derived(settings.emails?.length ? settings.emails : ['info@mboasports.com', 'media@mboasports.com']);
  const phones = $derived(settings.phones?.length ? settings.phones : ['+250 000 000 000']);
  const officeHours = $derived(settings.officeHours?.length ? settings.officeHours : ['Monday – Friday: 8:00 – 18:00', 'Saturday: 9:00 – 14:00']);

  let form = $state({ name: '', email: '', subject: '', message: '', type: '' });
  $effect(() => { if (!form.type && inquiryTypes.length) form.type = inquiryTypes[0]; });

  let submitting = $state(false);
  let submitted = $state(false);
  let error = $state('');

  async function handleSubmit() {
    if (!form.name || !form.email || !form.message) {
      error = 'Please fill in all required fields.';
      return;
    }
    error = '';
    submitting = true;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json().catch(() => ({}) as { success?: boolean; error?: string });

      if (res.ok && data.success) {
        submitted = true;
      } else {
        error = data.error || 'Something went wrong. Please try again.';
      }
    } catch {
      error = 'Something went wrong. Please check your connection and try again.';
    } finally {
      submitting = false;
    }
  }




  const MARQUEE_TARGET_LAP_TILES = 14;
  const MARQUEE_SECONDS_PER_TILE = 2.2;
  const MARQUEE_MIN_DURATION = 18;

  const marqueeRepeat = $derived(
    partners.length > 0 ? Math.max(1, Math.ceil(MARQUEE_TARGET_LAP_TILES / partners.length)) : 1
  );
  const marqueeLap = $derived(Array.from({ length: marqueeRepeat }).flatMap(() => partners));
  const marqueeItems = $derived([...marqueeLap, ...marqueeLap]);
  const marqueeDuration = $derived(
    Math.max(MARQUEE_MIN_DURATION, marqueeLap.length * MARQUEE_SECONDS_PER_TILE)
  );

</script>

<svelte:head>
  <title>{hero?.title || 'Contact'} MBOA Sports</title>
  <meta name="description" content={hero?.subtitle || 'Get in touch with MBOA Sports. Athlete applications, partnership enquiries, media accreditation and more.'} />
</svelte:head>

<PageHero
  title={hero?.title || 'Contact'}
  subtitle={hero?.subtitle || "Whether you're an athlete, partner, or media — we want to hear from you."}
  eyebrow={hero?.eyebrow || 'Get in Touch'}
  image={heroImgUrl}
  overlay={0.75}
/>

<section class="py-24 md:py-32">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid lg:grid-cols-5 gap-16 lg:gap-20">

      <div class="lg:col-span-3" use:reveal>
        <span class="section-eyebrow">Send a Message</span>
        <h2 class="section-title-sm mb-10">Let's Start a<br /><span class="text-gold-gradient">Conversation</span></h2>

        {#if submitted}
          <div class="p-10 border border-gold/40 bg-gold/5 text-center">
            <div class="w-16 h-16 border-2 border-gold flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M5 14l7 7L23 7" stroke="#C8A96A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="font-bebas text-3xl text-white mb-2">Message Sent</h3>
            <p class="font-poppins text-sm text-white/50 mb-6">
              Thank you for reaching out. A member of our team will be in touch within 2–3 business days.
            </p>
            <button
              class="btn-outline text-xs"
              onclick={() => { submitted = false; form = { name: '', email: '', subject: '', message: '', type: inquiryTypes[0] }; }}
            >
              Send Another Message
            </button>
          </div>
        {:else}
          <form onsubmit={handleSubmit} class="space-y-5" novalidate>
            <div>
              <label for="type" class="font-poppins text-xs text-white/40 tracking-widest uppercase block mb-2">Inquiry Type</label>
              <div class="flex flex-wrap gap-2">
                {#each inquiryTypes as type}
                  <button
                    type="button"
                    class="px-4 py-2 font-poppins text-xs tracking-wide border transition-all duration-200"
                    style:background={form.type === type ? '#C8A96A' : 'transparent'}
                    style:color={form.type === type ? '#000' : 'rgba(255,255,255,0.4)'}
                    style:border-color={form.type === type ? '#C8A96A' : 'rgba(255,255,255,0.1)'}
                    onclick={() => (form.type = type)}
                  >
                    {type}
                  </button>
                {/each}
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label for="name" class="font-poppins text-xs text-white/40 tracking-widest uppercase block mb-2">
                  Full Name <span class="text-gold">*</span>
                </label>
                <input id="name" type="text" class="input-dark" placeholder="Your names" bind:value={form.name} required />
              </div>
              <div>
                <label for="email" class="font-poppins text-xs text-white/40 tracking-widest uppercase block mb-2">
                  Email Address <span class="text-gold">*</span>
                </label>
                <input id="email" type="email" class="input-dark" placeholder="your@email.com" bind:value={form.email} required />
              </div>
            </div>

            <div>
              <label for="subject" class="font-poppins text-xs text-white/40 tracking-widest uppercase block mb-2">Subject</label>
              <input id="subject" type="text" class="input-dark" placeholder="How can we help you?" bind:value={form.subject} />
            </div>

            <div>
              <label for="message" class="font-poppins text-xs text-white/40 tracking-widest uppercase block mb-2">
                Message <span class="text-gold">*</span>
              </label>
              <textarea id="message" rows="6" class="input-dark resize-none" placeholder="Tell us about yourself or your enquiry..." bind:value={form.message} required></textarea>
            </div>

            {#if error}<p class="font-poppins text-xs text-red-400">{error}</p>{/if}

            <button type="submit" class="btn-primary w-full justify-center" disabled={submitting}>
              {#if submitting}
                <span class="inline-flex items-center gap-2">
                  <svg class="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5" stroke-dasharray="20" stroke-dashoffset="10"/>
                  </svg>
                  Sending...
                </span>
              {:else}
                Send Message
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              {/if}
            </button>
          </form>
        {/if}
      </div>

      <div class="lg:col-span-2 space-y-10" use:reveal={{ delay: 200 }}>
        <div>
          <span class="section-eyebrow">Contact Details</span>
          <div class="space-y-4 mt-4">
            {#each [
              { icon: '📍', label: 'Address', lines: address },
              { icon: '✉️', label: 'Email', lines: emails, isEmail: true },
              { icon: '📞', label: 'Phone', lines: phones, isPhone: true },
              { icon: '⏰', label: 'Office Hours', lines: officeHours },
            ] as info}
              <div class="flex gap-4 p-5 bg-dark-gray border border-light-gray/30 hover:border-gold/30 transition-colors group">
                <span class="text-lg shrink-0 mt-0.5">{info.icon}</span>
                <div>
                  <p class="font-poppins text-[10px] text-white/30 tracking-widest uppercase mb-1.5">{info.label}</p>
                  {#each info.lines as line}
                    {#if info.isEmail}
                      <a href="mailto:{line}" class="block font-poppins text-sm text-white/70 hover:text-gold transition-colors">{line}</a>
                    {:else if info.isPhone}
                      <a href="tel:{line.replace(/\s/g,'')}" class="block font-poppins text-sm text-white/70 hover:text-gold transition-colors">{line}</a>
                    {:else}
                      <p class="font-poppins text-sm text-white/70">{line}</p>
                    {/if}
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>

        <div>
          <span class="section-eyebrow">Follow Us</span>
          <div class="grid grid-cols-2 gap-3 mt-4">
            {#each settings.socialLinks?.length ? settings.socialLinks : [
              { platform: 'Instagram', url: '#' }, { platform: 'YouTube', url: '#' },
              { platform: 'Facebook', url: '#' }, { platform: 'Twitter/X', url: '#' }
            ] as social}
              <a href={social.url} class="flex items-center gap-3 p-4 bg-dark-gray border border-light-gray/30 hover:border-gold/40 transition-all duration-200 group">
                <div class="w-8 h-8 border border-light-gray/50 flex items-center justify-center font-poppins text-xs font-bold text-gold/70 group-hover:text-gold group-hover:border-gold transition-all shrink-0">
                  {social.platform.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p class="font-poppins text-xs font-semibold text-white/80 group-hover:text-white transition-colors leading-none">{social.platform}</p>
                </div>
              </a>
            {/each}
          </div>
        </div>

        <div>
          <span class="section-eyebrow">Location</span>
          <div class="mt-4 relative overflow-hidden h-52 bg-dark-gray border border-light-gray/30">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=300&fit=crop" alt="Location" class="w-full h-full object-cover opacity-40" />
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <div class="w-6 h-6 border-2 border-gold rounded-full flex items-center justify-center mb-2">
                <div class="w-2 h-2 bg-gold rounded-full"></div>
              </div>
              <p class="font-poppins text-xs text-white/80 font-semibold">{address[0]}</p>
              <p class="font-poppins text-[10px] text-white/40">{address[address.length - 1]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>


<!-- ══════════════════ PARTNERS ══════════════════ -->
{#if partners.length}
<section class="py-10 md:py-12 bg-(--dark-gray) border-y border-light-gray/30 overflow-hidden">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="flex flex-col md:flex-row md:items-center gap-5 md:gap-14">
      <span class="shrink-0 font-poppins text-[11px] font-semibold tracking-widest text-white/40 uppercase">
        Trusted By Leaders Across African Sport
      </span>

      <div class="marquee-container flex-1 min-w-0">
        <div class="marquee-track" style:animation-duration="{marqueeDuration}s">
          {#each marqueeItems as partner, i (i)}
            {#if partner.website}
              <a
                href={partner.website}
                target="_blank"
                rel="noreferrer"
                class="group shrink-0 mx-5 h-8 flex items-center"
                aria-label={partner.name}
              >
                <PartnerLogoTile {partner} />
              </a>
            {:else}
              <div class="group shrink-0 mx-5 h-8 flex items-center" aria-label={partner.name}>
                <PartnerLogoTile {partner} />
              </div>
            {/if}
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
{/if}