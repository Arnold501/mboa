<script lang="ts">
  let { url, title }: { url: string; title: string } = $props();
  const encodedUrl = $derived(encodeURIComponent(url));
  const encodedTitle = $derived(encodeURIComponent(title));
</script>

<div class="flex items-center gap-3">
  <span class="font-poppins text-[10px] text-white/30 tracking-widest uppercase">Share:</span>
  <a
    href="https://twitter.com/intent/tweet?url={encodedUrl}&text={encodedTitle}"
    target="_blank" rel="noreferrer"
    class="w-8 h-8 border border-light-gray/50 flex items-center justify-center text-xs text-white/50 hover:border-gold hover:text-(--gold) transition-all"
  >X</a>
  <a
    href="https://www.facebook.com/sharer/sharer.php?u={encodedUrl}"
    target="_blank" rel="noreferrer"
    class="w-8 h-8 border border-light-gray/50 flex items-center justify-center text-xs text-white/50 hover:border-gold hover:text-(--gold) transition-all"
  >FB</a>
  <a
    href="https://wa.me/?text={encodedTitle}%20{encodedUrl}"
    target="_blank" rel="noreferrer"
    class="w-8 h-8 border border-light-gray/50 flex items-center justify-center text-xs text-white/50 hover:border-gold hover:text-(--gold) transition-all"
  >WA</a>
</div>
