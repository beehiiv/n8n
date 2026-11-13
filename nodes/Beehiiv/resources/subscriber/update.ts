import type { INodeProperties } from 'n8n-workflow';

import {
   identifySubscriberBy,
   publicationSelect,
   subscriberEmailField,
   subscriptionIdField,
} from '../../shared/descriptions';

const showOnlyForUpdate = {
   operation: ['update'],
   resource: ['subscriber'],
};

const showOnlyForUpdateByEmail = {
   ...showOnlyForUpdate,
   identifyBy: ['email'],
};

const showOnlyForUpdateById = {
   ...showOnlyForUpdate,
   identifyBy: ['id'],
};

export const subscriberUpdateDescription: INodeProperties[] = [
   {
      ...publicationSelect,
      displayOptions: { show: showOnlyForUpdate },
   },
   {
      ...identifySubscriberBy,
      displayOptions: { show: showOnlyForUpdate },
   },
   {
      ...subscriberEmailField,
      displayOptions: { show: showOnlyForUpdateByEmail },
   },
   {
      ...subscriptionIdField,
      displayOptions: { show: showOnlyForUpdateById },
   },
   {
      displayName: 'Update Fields',
      name: 'updateFields',
      type: 'collection',
      placeholder: 'Add Field',
      default: {},
      displayOptions: { show: showOnlyForUpdate },
      options: [
         {
            displayName: 'Custom Fields',
            name: 'customFields',
            type: 'fixedCollection',
            placeholder: 'Add Custom Field',
            default: {},
            typeOptions: {
               multipleValues: true,
            },
            description: 'Existing publication custom fields to update',
            options: [
               {
                  name: 'field',
                  displayName: 'Field',
                  values: [
                     {
                        displayName: 'Name',
                        name: 'name',
                        type: 'string',
                        default: '',
                     },
                     {
                        displayName: 'Value',
                        name: 'value',
                        type: 'string',
                        default: '',
                     },
                  ],
               },
            ],
            routing: {
               send: {
                  type: 'body',
                  property: 'custom_fields',
                  value: '={{$parameter.updateFields.customFields.field}}',
               },
            },
         },
         {
            displayName: 'New Email',
            name: 'newEmail',
            type: 'string',
            placeholder: 'e.g. new.reader@example.com',
            default: '',
            description: 'Replace the subscriber email address',
            routing: {
               send: {
                  type: 'body',
                  property: 'email',
               },
            },
         },
         {
            displayName: 'Tier',
            name: 'tier',
            type: 'options',
            options: [
               { name: 'Free', value: 'free' },
               { name: 'Premium', value: 'premium' },
            ],
            default: 'free',
            description: 'The subscription tier to assign',
            routing: {
               send: {
                  type: 'body',
                  property: 'tier',
               },
            },
         },
         {
            displayName: 'Unsubscribe',
            name: 'unsubscribe',
            type: 'boolean',
            default: false,
            description: 'Whether to unsubscribe this person from the publication',
            routing: {
               send: {
                  type: 'body',
                  property: 'unsubscribe',
               },
            },
         },
      ],
   },
];
