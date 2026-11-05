import type { INodeProperties } from 'n8n-workflow';

import { publicationSelect, subscriberExpandField } from '../../shared/descriptions';

const showOnlyForGetMany = {
   operation: ['getAll'],
   resource: ['subscriber'],
};

export const subscriberGetManyDescription: INodeProperties[] = [
   {
      ...publicationSelect,
      displayOptions: { show: showOnlyForGetMany },
   },
   {
      displayName: 'Return All',
      name: 'returnAll',
      type: 'boolean',
      default: false,
      displayOptions: { show: showOnlyForGetMany },
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
                  continue: '={{ $response.body.has_more ?? $response.body.pagination?.has_more }}',
                  request: {
                     qs: {
                        cursor: '={{ $response.body.next_cursor ?? $response.body.pagination?.next_cursor }}',
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
            ...showOnlyForGetMany,
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
   {
      displayName: 'Additional Fields',
      name: 'additionalFields',
      type: 'collection',
      placeholder: 'Add Field',
      default: {},
      displayOptions: { show: showOnlyForGetMany },
      options: [subscriberExpandField],
   },
];
