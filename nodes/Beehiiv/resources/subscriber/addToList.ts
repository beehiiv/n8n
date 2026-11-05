import type { INodeProperties } from 'n8n-workflow';

import {
   identifySubscriberBy,
   newsletterListSelect,
   publicationSelect,
   subscriberEmailField,
   subscriptionIdField,
} from '../../shared/descriptions';

const showOnlyForAddToList = {
   operation: ['addToList'],
   resource: ['subscriber'],
};

const showOnlyForAddToListByEmail = {
   ...showOnlyForAddToList,
   identifyBy: ['email'],
};

const showOnlyForAddToListById = {
   ...showOnlyForAddToList,
   identifyBy: ['id'],
};

export const subscriberAddToListDescription: INodeProperties[] = [
   {
      ...publicationSelect,
      displayOptions: { show: showOnlyForAddToList },
   },
   {
      ...newsletterListSelect,
      displayOptions: { show: showOnlyForAddToList },
   },
   {
      ...identifySubscriberBy,
      displayOptions: { show: showOnlyForAddToList },
   },
   {
      ...subscriberEmailField,
      displayOptions: { show: showOnlyForAddToListByEmail },
   },
   {
      ...subscriptionIdField,
      displayOptions: { show: showOnlyForAddToListById },
   },
];
