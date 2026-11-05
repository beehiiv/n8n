import type { INodeProperties } from 'n8n-workflow';

import { unwrapDataOutput } from '../../shared/descriptions';
import {
   applyAddTagsUrl,
   applyAddToListUrl,
   applyCreateSubscriberUrl,
   applyEnrollInAutomationUrl,
   applySubscriberIdentityBody,
   applyUpdateSubscriberUrl,
} from '../../shared/preSend';
import { subscriberAddTagsDescription } from './addTags';
import { subscriberAddToListDescription } from './addToList';
import { subscriberCreateDescription } from './create';
import { subscriberEnrollInAutomationDescription } from './enrollInAutomation';
import { subscriberUpdateDescription } from './update';

const showOnlyForSubscribers = {
   resource: ['subscriber'],
};

export const subscriberDescription: INodeProperties[] = [
   {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {
         show: showOnlyForSubscribers,
      },
      options: [
         {
            name: 'Create',
            value: 'create',
            action: 'Create a subscriber',
            description: 'Create a subscriber',
            routing: {
               request: {
                  method: 'POST',
                  url: '/publications/subscriptions',
               },
               send: {
                  preSend: [applyCreateSubscriberUrl],
               },
               output: unwrapDataOutput,
            },
         },
         {
            name: 'Update',
            value: 'update',
            action: 'Update a subscriber',
            description: 'Update an existing subscriber',
            routing: {
               request: {
                  method: 'PUT',
                  url: '/publications/subscriptions',
               },
               send: {
                  preSend: [applyUpdateSubscriberUrl],
               },
               output: unwrapDataOutput,
            },
         },
         {
            name: 'Add Tags',
            value: 'addTags',
            action: 'Add tags to a subscriber',
            description: 'Add tags to an existing subscriber',
            routing: {
               request: {
                  method: 'POST',
                  url: '/publications/subscriptions/tags',
               },
               send: {
                  preSend: [applyAddTagsUrl],
               },
               output: unwrapDataOutput,
            },
         },
         {
            name: 'Add to List',
            value: 'addToList',
            action: 'Add a subscriber to a list',
            description: 'Add an existing subscriber to a newsletter list',
            routing: {
               request: {
                  method: 'POST',
                  url: '/publications/newsletter_lists/subscriptions',
               },
               send: {
                  preSend: [applyAddToListUrl, applySubscriberIdentityBody],
               },
               output: unwrapDataOutput,
            },
         },
         {
            name: 'Enroll in Automation',
            value: 'enrollInAutomation',
            action: 'Enroll a subscriber in an automation',
            description: 'Enroll an existing subscriber in an automation',
            routing: {
               request: {
                  method: 'POST',
                  url: '/publications/automations/journeys',
               },
               send: {
                  preSend: [applyEnrollInAutomationUrl, applySubscriberIdentityBody],
               },
               output: unwrapDataOutput,
            },
         },
      ],
      default: 'create',
   },
   ...subscriberCreateDescription,
   ...subscriberUpdateDescription,
   ...subscriberAddTagsDescription,
   ...subscriberAddToListDescription,
   ...subscriberEnrollInAutomationDescription,
];
