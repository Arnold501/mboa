import { sanityFetch } from '@sanity/sveltekit';
import {
  latestProgramsQuery,
  latestProgramsQueryNewest,
  latestProgramsQueryOldest,
  latestProgramsQueryAZ,
  latestProgramsQueryZA,
  pastProgramsQuery,
  pastProgramsQueryNewest,
  pastProgramsQueryOldest,
  pastProgramsQueryAZ,
  pastProgramsQueryZA,
  pastProgramsCountQuery,
  programMonthsQuery,
  programsPageQuery
} from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

const PAST_PAGE_SIZE = 4;

export type ProgramSort = 'manual' | 'newest' | 'oldest' | 'az' | 'za';
const VALID_SORTS: ProgramSort[] = ['manual', 'newest', 'oldest', 'az', 'za'];

const LATEST_SORT_QUERIES = {
  manual: latestProgramsQuery,
  newest: latestProgramsQueryNewest,
  oldest: latestProgramsQueryOldest,
  az: latestProgramsQueryAZ,
  za: latestProgramsQueryZA
} as const;

const PAST_SORT_QUERIES = {
  manual: pastProgramsQuery,
  newest: pastProgramsQueryNewest,
  oldest: pastProgramsQueryOldest,
  az: pastProgramsQueryAZ,
  za: pastProgramsQueryZA
} as const;

/** "YYYY-MM" -> inclusive ["YYYY-MM-01", "YYYY-MM-DD"] range for the date field. */
function monthToRange(month: string | null): { monthStart: string | null; monthEnd: string | null } {
  if (!month || !/^\d{4}-\d{2}$/.test(month)) return { monthStart: null, monthEnd: null };
  const [year, mon] = month.split('-').map(Number);
  const lastDay = new Date(year, mon, 0).getDate(); // day 0 of next month = last day of this one
  return { monthStart: `${month}-01`, monthEnd: `${month}-${String(lastDay).padStart(2, '0')}` };
}

export const load: PageServerLoad = async (event) => {
  const params = event.url.searchParams;

  const page = Math.max(1, Number(params.get('p')) || 1);
  const start = (page - 1) * PAST_PAGE_SIZE;
  const end = start + PAST_PAGE_SIZE;

  const rawSearch = params.get('q')?.trim() ?? '';
  const search = rawSearch ? `*${rawSearch}*` : null;

  const month = params.get('month') ?? '';
  const { monthStart, monthEnd } = monthToRange(month || null);

  const sortParam = params.get('sort') as ProgramSort | null;
  const sort: ProgramSort = sortParam && VALID_SORTS.includes(sortParam) ? sortParam : 'manual';

  const filterParams = { search, monthStart, monthEnd };

  const [latestRes, pastRes, pastCountRes, monthsRes, pageRes] = await Promise.all([
    sanityFetch(event, { query: LATEST_SORT_QUERIES[sort], params: filterParams }),
    sanityFetch(event, { query: PAST_SORT_QUERIES[sort], params: { ...filterParams, start, end } }),
    sanityFetch(event, { query: pastProgramsCountQuery, params: filterParams }),
    sanityFetch(event, { query: programMonthsQuery, params: {} }),
    sanityFetch(event, { query: programsPageQuery, params: {} })
  ]);

  const pastTotalCount = pastCountRes.data ?? 0;

  return {
    latestPrograms: latestRes.data ?? [],
    pastPrograms: pastRes.data ?? [],
    pastTotalCount,
    pastTotalPages: Math.max(1, Math.ceil(pastTotalCount / PAST_PAGE_SIZE)),
    pastCurrentPage: page,
    availableMonths: (monthsRes.data ?? []).slice().sort().reverse(), // "YYYY-MM" strings, newest first
    filters: { q: rawSearch, month, sort },
    page: pageRes.data ?? {}
  };
};