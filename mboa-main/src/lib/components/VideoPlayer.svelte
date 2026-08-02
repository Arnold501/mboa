<script lang="ts">
  let { value, caption, posterUrl = null }: { value: any; caption?: string; posterUrl?: string | null } = $props();

  function getYouTubeId(url: string) {
    const m = url?.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
    return m?.[1] ?? null;
  }
  function getVimeoId(url: string) {
    const m = url?.match(/vimeo\.com\/(\d+)/);
    return m?.[1] ?? null;
  }

  let youTubeId = $derived(value?.source === 'youtube' ? getYouTubeId(value.url) : null);
  let vimeoId = $derived(value?.source === 'vimeo' ? getVimeoId(value.url) : null);
  let playing = $state(false);
  let displayCaption = $derived(caption ?? value?.caption);

  let facadeImage = $derived(posterUrl ?? (youTubeId ? `https://img.youtube.com/vi/${youTubeId}/maxresdefault.jpg` : null));
  let useFacade = $derived(!playing && !!facadeImage && value?.source !== 'file');
</script>

{#if value?.source}
  <figure class="my-0">
    <div class="relative aspect-video bg-black overflow-hidden">
      {#if useFacade}
        <button
          class="absolute inset-0 w-full h-full group cursor-pointer"
          onclick={() => (playing = true)}
          aria-label="Play video"
        >
          <img
            src={facadeImage}
            alt={displayCaption ?? 'Video thumbnail'}
            class="w-full h-full object-cover"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div
              class="w-20 h-20 rounded-full bg-(--gold) flex items-center justify-center shadow-2xl
                     group-hover:scale-110 transition-transform duration-300"
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="currentColor" class="text-black ml-2">
                <path d="M8.5 4.27L21.5 14 8.5 23.73V4.27z" />
              </svg>
            </div>
          </div>
        </button>
      {:else if value.source === 'youtube' && youTubeId}
        <iframe
          src="https://www.youtube.com/embed/{youTubeId}?autoplay=1"
          title={displayCaption ?? 'YouTube video'}
          class="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      {:else if value.source === 'vimeo' && vimeoId}
        <iframe
          src="https://player.vimeo.com/video/{vimeoId}"
          title={displayCaption ?? 'Vimeo video'}
          class="w-full h-full"
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
      {:else if value.source === 'file' && value.file?.url}
        <video
          controls
          muted={value.autoplay}
          autoplay={value.autoplay}
          class="w-full h-full object-cover"
          src={value.file.url}
        >
          <track kind="captions" />
        </video>
      {/if}
    </div>
    {#if displayCaption}
      <figcaption class="font-poppins text-xs text-white/40 mt-3">{displayCaption}</figcaption>
    {/if}
  </figure>
{/if}
