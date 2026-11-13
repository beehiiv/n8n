import type { ILoadOptionsFunctions, INodeListSearchResult } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { locatorValue } from './locator';
import { beehiivApiRequest } from './transport';

type BeehiivNamedResource = {
   id: string;
   name: string;
};

type BeehiivPage<T> = {
   data?: T[];
   page?: number;
   total_pages?: number;
};

function getPublicationId(context: ILoadOptionsFunctions): string {
   const publicationId = locatorValue(context.getCurrentNodeParameter('publicationId', { extractValue: true }));

   if (!publicationId) {
      throw new NodeOperationError(context.getNode(), 'Select a publication first');
   }

   return publicationId;
}

function filterResults(results: INodeListSearchResult['results'], filter?: string): INodeListSearchResult['results'] {
   if (!filter) {
      return results;
   }

   const query = filter.toLowerCase();
   return results.filter(
      (item) => item.name.toLowerCase().includes(query) || String(item.value).toLowerCase().includes(query),
   );
}

async function searchNamedCollection(
   context: ILoadOptionsFunctions,
   path: string,
   filter?: string,
   paginationToken?: string,
   qs: Record<string, string | number> = {},
): Promise<INodeListSearchResult> {
   const page = paginationToken ? Number(paginationToken) : 1;
   const response = (await beehiivApiRequest.call(context, 'GET', path, {
      limit: 100,
      page,
      ...qs,
   })) as BeehiivPage<BeehiivNamedResource>;

   const results = (response.data ?? []).map((item) => ({
      name: item.name,
      value: item.id,
   }));

   const nextPage = page < (response.total_pages ?? 1) ? String(page + 1) : undefined;

   return {
      results: filterResults(results, filter),
      paginationToken: nextPage,
   };
}

export async function searchPublications(
   this: ILoadOptionsFunctions,
   filter?: string,
   paginationToken?: string,
): Promise<INodeListSearchResult> {
   return searchNamedCollection(this, '/publications', filter, paginationToken, {
      order_by: 'name',
      direction: 'asc',
   });
}

export async function searchNewsletterLists(
   this: ILoadOptionsFunctions,
   filter?: string,
   paginationToken?: string,
): Promise<INodeListSearchResult> {
   const publicationId = getPublicationId(this);
   return searchNamedCollection(this, `/publications/${publicationId}/newsletter_lists`, filter, paginationToken);
}

export async function searchAutomations(
   this: ILoadOptionsFunctions,
   filter?: string,
   paginationToken?: string,
): Promise<INodeListSearchResult> {
   const publicationId = getPublicationId(this);
   return searchNamedCollection(this, `/publications/${publicationId}/automations`, filter, paginationToken);
}
