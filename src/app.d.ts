// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { SanityLocals } from '@sanity/sveltekit';
import type { ResolvedPathname } from '$app/types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals extends SanityLocals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module '$app/paths' {
	export function resolve(
		path: '/preview/disable',
		options?: { redirect?: string }
	): ResolvedPathname;
	export function resolve(
		path: '/preview/enable',
		options?: { redirect?: string }
	): ResolvedPathname;
}

export {};
