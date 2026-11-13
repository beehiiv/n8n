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
      displayName: 'Filters',
      name: 'filters',
      type: 'collection',
      placeholder: 'Add Filter',
      default: {},
      displayOptions: { show: showOnlyForGetMany },
      options: [
         {
            displayName: 'Creation Date',
            name: 'creationDate',
            type: 'string',
            default: '',
            placeholder: 'e.g. 2026/01/15',
            description: 'Only include subscriptions created on this date, as YYYY/MM/DD',
            routing: {
               send: {
                  type: 'query',
                  property: 'creation_date',
               },
            },
         },
         {
            displayName: 'Email',
            name: 'email',
            type: 'string',
            default: '',
            placeholder: 'e.g. reader@example.com',
            description: 'Exact subscriber email, case insensitive',
            routing: {
               send: {
                  type: 'query',
                  property: 'email',
               },
            },
         },
         {
            ...subscriberExpandField,
         },
         {
            displayName: 'Premium Tier IDs',
            name: 'premiumTierIds',
            type: 'string',
            default: [],
            typeOptions: {
               multipleValues: true,
            },
            placeholder: 'e.g. tier_00000000-0000-0000-0000-000000000000',
            description: 'Only include subscriptions on these premium tiers',
            routing: {
               send: {
                  type: 'query',
                  property: 'premium_tier_ids[]',
               },
            },
         },
         {
            displayName: 'Status',
            name: 'status',
            type: 'options',
            options: [
               { name: 'Active', value: 'active' },
               { name: 'All', value: 'all' },
               { name: 'Inactive', value: 'inactive' },
               { name: 'Invalid', value: 'invalid' },
               { name: 'Needs Attention', value: 'needs_attention' },
               { name: 'Paused', value: 'paused' },
               { name: 'Pending', value: 'pending' },
               { name: 'Unset', value: 'unset' },
               { name: 'Validating', value: 'validating' },
            ],
            default: 'all',
            description: 'Only include subscriptions with this status',
            routing: {
               send: {
                  type: 'query',
                  property: 'status',
               },
            },
         },
         {
            displayName: 'Tier',
            name: 'tier',
            type: 'options',
            options: [
               { name: 'All', value: 'all' },
               { name: 'Free', value: 'free' },
               { name: 'Premium', value: 'premium' },
            ],
            default: 'all',
            description: 'Only include subscriptions on this tier',
            routing: {
               send: {
                  type: 'query',
                  property: 'tier',
               },
            },
         },
      ],
   },
];
