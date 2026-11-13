import type { INodeProperties } from 'n8n-workflow';

import {
   identifySubscriberBy,
   publicationSelect,
   subscriberEmailField,
   subscriptionIdField,
} from '../../shared/descriptions';

const showOnlyForAddTags = {
   operation: ['addTags'],
   resource: ['subscriber'],
};

const showOnlyForAddTagsByEmail = {
   ...showOnlyForAddTags,
   identifyBy: ['email'],
};

const showOnlyForAddTagsById = {
   ...showOnlyForAddTags,
   identifyBy: ['id'],
};

export const subscriberAddTagsDescription: INodeProperties[] = [
   {
      ...publicationSelect,
      displayOptions: { show: showOnlyForAddTags },
   },
   {
      ...identifySubscriberBy,
      displayOptions: { show: showOnlyForAddTags },
   },
   {
      ...subscriberEmailField,
      displayOptions: { show: showOnlyForAddTagsByEmail },
   },
   {
      ...subscriptionIdField,
      displayOptions: { show: showOnlyForAddTagsById },
   },
   {
      displayName: 'Tags',
      name: 'tags',
      type: 'string',
      default: [],
      required: true,
      typeOptions: {
         multipleValues: true,
      },
      placeholder: 'e.g. Premium',
      displayOptions: { show: showOnlyForAddTags },
      description: 'Tags to add. Missing publication tags are created automatically.',
      routing: {
         send: {
            type: 'body',
            property: 'tags',
         },
      },
   },
];
