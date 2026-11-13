import type { INodeProperties } from 'n8n-workflow';

import {
   identifySubscriberBy,
   newsletterListSelect,
   publicationSelect,
   subscriberEmailField,
   subscriptionIdField,
} from '../../shared/descriptions';

const showOnlyForUpdateListSubscription = {
   operation: ['updateListSubscription'],
   resource: ['subscriber'],
};

const showOnlyForUpdateListSubscriptionByEmail = {
   ...showOnlyForUpdateListSubscription,
   identifyBy: ['email'],
};

const showOnlyForUpdateListSubscriptionById = {
   ...showOnlyForUpdateListSubscription,
   identifyBy: ['id'],
};

export const subscriberUpdateListSubscriptionDescription: INodeProperties[] = [
   {
      ...publicationSelect,
      displayOptions: { show: showOnlyForUpdateListSubscription },
   },
   {
      ...newsletterListSelect,
      description: 'The newsletter list membership to update',
      displayOptions: { show: showOnlyForUpdateListSubscription },
   },
   {
      ...identifySubscriberBy,
      displayOptions: { show: showOnlyForUpdateListSubscription },
   },
   {
      ...subscriberEmailField,
      displayOptions: { show: showOnlyForUpdateListSubscriptionByEmail },
   },
   {
      ...subscriptionIdField,
      displayOptions: { show: showOnlyForUpdateListSubscriptionById },
   },
   {
      displayName: 'Unsubscribe',
      name: 'unsubscribe',
      type: 'boolean',
      default: true,
      displayOptions: { show: showOnlyForUpdateListSubscription },
      description:
         'Whether to unsubscribe the subscriber from this newsletter list. Does not unsubscribe them from the publication.',
      routing: {
         send: {
            type: 'body',
            property: 'unsubscribe',
         },
      },
   },
];
