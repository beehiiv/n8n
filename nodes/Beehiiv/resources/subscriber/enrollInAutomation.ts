import type { INodeProperties } from 'n8n-workflow';

import {
   automationSelect,
   identifySubscriberBy,
   publicationSelect,
   subscriberEmailField,
   subscriptionIdField,
} from '../../shared/descriptions';

const showOnlyForEnroll = {
   operation: ['enrollInAutomation'],
   resource: ['subscriber'],
};

const showOnlyForEnrollByEmail = {
   ...showOnlyForEnroll,
   identifyBy: ['email'],
};

const showOnlyForEnrollById = {
   ...showOnlyForEnroll,
   identifyBy: ['id'],
};

export const subscriberEnrollInAutomationDescription: INodeProperties[] = [
   {
      ...publicationSelect,
      displayOptions: { show: showOnlyForEnroll },
   },
   {
      ...automationSelect,
      displayOptions: { show: showOnlyForEnroll },
   },
   {
      ...identifySubscriberBy,
      displayOptions: { show: showOnlyForEnroll },
   },
   {
      ...subscriberEmailField,
      displayOptions: { show: showOnlyForEnrollByEmail },
   },
   {
      ...subscriptionIdField,
      displayOptions: { show: showOnlyForEnrollById },
   },
   {
      displayName: 'Double Opt-In Override',
      name: 'doubleOptOverride',
      type: 'options',
      options: [
         { name: 'Not Set', value: 'not_set' },
         { name: 'Off', value: 'off' },
         { name: 'On', value: 'on' },
      ],
      default: 'not_set',
      displayOptions: { show: showOnlyForEnroll },
      description: 'Override the publication default double opt-in setting for this enrollment',
      routing: {
         send: {
            type: 'body',
            property: 'double_opt_override',
         },
      },
   },
];
