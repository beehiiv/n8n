import type { INodeProperties } from 'n8n-workflow';

import { publicationSelect, subscriberEmailField } from '../../shared/descriptions';

const showOnlyForGetByEmail = {
   operation: ['getByEmail'],
   resource: ['subscriber'],
};

export const subscriberGetByEmailDescription: INodeProperties[] = [
   {
      ...publicationSelect,
      displayOptions: { show: showOnlyForGetByEmail },
   },
   {
      ...subscriberEmailField,
      displayOptions: { show: showOnlyForGetByEmail },
   },
   {
      displayName: 'Additional Fields',
      name: 'additionalFields',
      type: 'collection',
      placeholder: 'Add Field',
      default: {},
      displayOptions: { show: showOnlyForGetByEmail },
      options: [
         {
            displayName: 'Expand',
            name: 'expand',
            type: 'multiOptions',
            default: [],
            description: 'Related objects to include on the subscriber',
            options: [
               { name: 'Custom Fields', value: 'custom_fields' },
               { name: 'Newsletter Lists', value: 'newsletter_lists' },
               { name: 'Referrals', value: 'referrals' },
               { name: 'Stats', value: 'stats' },
               { name: 'Subscription Premium Tiers', value: 'subscription_premium_tiers' },
               { name: 'Tags', value: 'tags' },
            ],
            routing: {
               send: {
                  type: 'query',
                  property: 'expand[]',
               },
            },
         },
      ],
   },
];
