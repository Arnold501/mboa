export function estimateReadTime(body: any[] = []): number {
  const words = (body ?? [])
    .filter((b) => b?._type === 'block')
    .flatMap((b) => b.children ?? [])
    .map((c: any) => c?.text ?? '')
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(
  dateStr: string,
  opts: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }
): string {
  return new Date(dateStr).toLocaleDateString('en-US', opts);
}

export function formatViews(n: number | undefined | null): string {
  if (n == null) return '0';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(n);
}

export function whatsAppLink(rawNumber: string | undefined | null, message?: string): string | null {
  const digits = (rawNumber ?? '').replace(/\D/g, '');
  if (!digits) return null;
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}