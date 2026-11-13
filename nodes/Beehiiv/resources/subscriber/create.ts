import type { INodeProperties } from 'n8n-workflow';

import { publicationSelect } from '../../shared/descriptions';

const showOnlyForCreate = {
   operation: ['create'],
   resource: ['subscriber'],
};

export const subscriberCreateDescription: INodeProperties[] = [
   {
      ...publicationSelect,
      displayOptions: { show: showOnlyForCreate },
   },
   {
      displayName: 'Email',
      name: 'email',
      type: 'string',
      placeholder: 'e.g. reader@example.com',
      default: '',
      required: true,
      displayOptions: { show: showOnlyForCreate },
      description: 'The email address of the subscriber',
      routing: {
         send: {
            type: 'body',
            property: 'email',
         },
      },
   },
   {
      displayName: 'Reactivate Existing',
      name: 'reactivateExisting',
      type: 'boolean',
      default: false,
      displayOptions: { show: showOnlyForCreate },
      description: 'Whether to reactivate the subscriber if they previously unsubscribed',
      routing: {
         send: {
            type: 'body',
            property: 'reactivate_existing',
         },
      },
   },
   {
      displayName: 'Send Welcome Email',
      name: 'sendWelcomeEmail',
      type: 'boolean',
      default: false,
      displayOptions: { show: showOnlyForCreate },
      description: 'Whether to send the publication welcome email',
      routing: {
         send: {
            type: 'body',
            property: 'send_welcome_email',
         },
      },
   },
   {
      displayName: 'Custom Fields',
      name: 'customFields',
      type: 'fixedCollection',
      placeholder: 'Add Custom Field',
      default: {},
      typeOptions: {
         multipleValues: true,
      },
      displayOptions: { show: showOnlyForCreate },
      description: 'Existing publication custom fields to set on the subscriber',
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
                  description: 'The existing custom field name',
               },
               {
                  displayName: 'Value',
                  name: 'value',
                  type: 'string',
                  default: '',
                  description: 'The value to store for this subscriber',
               },
            ],
         },
      ],
      routing: {
         send: {
            type: 'body',
            property: 'custom_fields',
            value: '={{$parameter.customFields.field}}',
         },
      },
   },
   {
      displayName: 'Additional Fields',
      name: 'additionalFields',
      type: 'collection',
      placeholder: 'Add Field',
      default: {},
      displayOptions: { show: showOnlyForCreate },
      options: [
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
            description: 'Override the publication default double opt-in setting for this subscriber',
            routing: {
               send: {
                  type: 'body',
                  property: 'double_opt_override',
               },
            },
         },
         {
            displayName: 'Referral Code',
            name: 'referralCode',
            type: 'string',
            default: '',
            description: 'Existing subscriber referral code to credit for this signup',
            routing: {
               send: {
                  type: 'body',
                  property: 'referral_code',
               },
            },
         },
         {
            displayName: 'Referring Site',
            name: 'referringSite',
            type: 'string',
            default: '',
            description: 'The website the subscriber was referred from',
            routing: {
               send: {
                  type: 'body',
                  property: 'referring_site',
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
            displayName: 'UTM Campaign',
            name: 'utmCampaign',
            type: 'string',
            default: '',
            routing: {
               send: {
                  type: 'body',
                  property: 'utm_campaign',
               },
            },
         },
         {
            displayName: 'UTM Content',
            name: 'utmContent',
            type: 'string',
            default: '',
            routing: {
               send: {
                  type: 'body',
                  property: 'utm_content',
               },
            },
         },
         {
            displayName: 'UTM Medium',
            name: 'utmMedium',
            type: 'string',
            default: '',
            routing: {
               send: {
                  type: 'body',
                  property: 'utm_medium',
               },
            },
         },
         {
            displayName: 'UTM Source',
            name: 'utmSource',
            type: 'string',
            default: '',
            routing: {
               send: {
                  type: 'body',
                  property: 'utm_source',
               },
            },
         },
         {
            displayName: 'UTM Term',
            name: 'utmTerm',
            type: 'string',
            default: '',
            routing: {
               send: {
                  type: 'body',
                  property: 'utm_term',
               },
            },
         },
      ],
   },
];
