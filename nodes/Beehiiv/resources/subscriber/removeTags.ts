import type { INodeProperties } from 'n8n-workflow';

import {
   identifySubscriberBy,
   publicationSelect,
   subscriberEmailField,
   subscriptionIdField,
} from '../../shared/descriptions';

const showOnlyForRemoveTags = {
   operation: ['removeTags'],
   resource: ['subscriber'],
};

const showOnlyForRemoveTagsByEmail = {
   ...showOnlyForRemoveTags,
   identifyBy: ['email'],
};

const showOnlyForRemoveTagsById = {
   ...showOnlyForRemoveTags,
   identifyBy: ['id'],
};

export const subscriberRemoveTagsDescription: INodeProperties[] = [
   {
      ...publicationSelect,
      displayOptions: { show: showOnlyForRemoveTags },
   },
   {
      ...identifySubscriberBy,
      displayOptions: { show: showOnlyForRemoveTags },
   },
   {
      ...subscriberEmailField,
      displayOptions: { show: showOnlyForRemoveTagsByEmail },
   },
   {
      ...subscriptionIdField,
      displayOptions: { show: showOnlyForRemoveTagsById },
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
      displayOptions: { show: showOnlyForRemoveTags },
      description: 'Tags to remove from the subscriber. Publication tag definitions are left in place.',
      routing: {
         send: {
            type: 'body',
            property: 'tags',
         },
      },
   },
];
