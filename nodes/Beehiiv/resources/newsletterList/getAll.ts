import type { INodeProperties } from 'n8n-workflow';

import { publicationSelect } from '../../shared/descriptions';

const showOnlyForListGetMany = {
   operation: ['getAll'],
   resource: ['newsletterList'],
};

export const newsletterListGetManyDescription: INodeProperties[] = [
   {
      ...publicationSelect,
      displayOptions: { show: showOnlyForListGetMany },
   },
   {
      displayName: 'Return All',
      name: 'returnAll',
      type: 'boolean',
      default: false,
      displayOptions: { show: showOnlyForListGetMany },
      description: 'Whether to return all results or only up to a given limit',
      routing: {
         send: {
            paginate: '={{ $value }}',
            type: 'query',
            property: 'limit',
            value: '100',
         },
         operations: {
            pagination: {
               type: 'generic',
               properties: {
                  continue: '={{ $response.body.page < $response.body.total_pages }}',
                  request: {
                     qs: {
                        page: '={{ $response.body.page + 1 }}',
                     },
                  },
               },
            },
         },
      },
   },
   {
      displayName: 'Limit',
      name: 'limit',
      type: 'number',
      default: 50,
      typeOptions: {
         minValue: 1,
         maxValue: 100,
      },
      displayOptions: {
         show: {
            ...showOnlyForListGetMany,
            returnAll: [false],
         },
      },
      description: 'Max number of results to return',
      routing: {
         send: {
            type: 'query',
            property: 'limit',
         },
         output: {
            maxResults: '={{$value}}',
         },
      },
   },
];
