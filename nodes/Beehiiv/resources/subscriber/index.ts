import type { INodeProperties } from 'n8n-workflow';

import { noContentOutput, unwrapDataOutput } from '../../shared/descriptions';
import {
   applyAddToListUrl,
   applyCreateSubscriberUrl,
   applyEnrollInAutomationUrl,
   applyGetByEmailUrl,
   applySubscriberIdentityBody,
   applySubscriptionTagsUrl,
   applyUpdateListSubscriptionUrl,
   applyUpdateSubscriberUrl,
} from '../../shared/preSend';
import { subscriberAddTagsDescription } from './addTags';
import { subscriberAddToListDescription } from './addToList';
import { subscriberCreateDescription } from './create';
import { subscriberEnrollInAutomationDescription } from './enrollInAutomation';
import { subscriberGetByEmailDescription } from './getByEmail';
import { subscriberRemoveTagsDescription } from './removeTags';
import { subscriberUpdateDescription } from './update';
import { subscriberUpdateListSubscriptionDescription } from './updateListSubscription';

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
            name: 'Get by Email',
            value: 'getByEmail',
            action: 'Get a subscriber by email',
            description: 'Get an existing subscriber by email',
            routing: {
               request: {
                  method: 'GET',
                  url: '/publications/subscriptions/by_email',
               },
               send: {
                  preSend: [applyGetByEmailUrl],
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
                  preSend: [applySubscriptionTagsUrl],
               },
               output: unwrapDataOutput,
            },
         },
         {
            name: 'Remove Tags',
            value: 'removeTags',
            action: 'Remove tags from a subscriber',
            description: 'Remove tags from an existing subscriber',
            routing: {
               request: {
                  method: 'DELETE',
                  url: '/publications/subscriptions/tags',
               },
               send: {
                  preSend: [applySubscriptionTagsUrl],
               },
               output: noContentOutput,
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
            name: 'Update List Subscription',
            value: 'updateListSubscription',
            action: 'Update a newsletter list subscription',
            description: 'Unsubscribe a subscriber from a newsletter list',
            routing: {
               request: {
                  method: 'PATCH',
                  url: '/publications/newsletter_lists/subscriptions',
               },
               send: {
                  preSend: [applyUpdateListSubscriptionUrl],
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
   ...subscriberGetByEmailDescription,
   ...subscriberUpdateDescription,
   ...subscriberAddTagsDescription,
   ...subscriberRemoveTagsDescription,
   ...subscriberAddToListDescription,
   ...subscriberUpdateListSubscriptionDescription,
   ...subscriberEnrollInAutomationDescription,
];
