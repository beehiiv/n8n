import type { IExecuteSingleFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';

export const publicationSelect: INodeProperties = {
   displayName: 'Publication',
   name: 'publicationId',
   type: 'resourceLocator',
   default: { mode: 'list', value: '' },
   required: true,
   description: 'The beehiiv publication to operate on',
   modes: [
      {
         displayName: 'From List',
         name: 'list',
         type: 'list',
         typeOptions: {
            searchListMethod: 'searchPublications',
            searchable: true,
         },
      },
      {
         displayName: 'By ID',
         name: 'id',
         type: 'string',
         placeholder: 'e.g. pub_00000000-0000-0000-0000-000000000000',
      },
   ],
};

export const identifySubscriberBy: INodeProperties = {
   displayName: 'Identify Subscriber By',
   name: 'identifyBy',
   type: 'options',
   options: [
      {
         name: 'Email',
         value: 'email',
      },
      {
         name: 'Subscription ID',
         value: 'id',
      },
   ],
   default: 'email',
   description: 'How to find the existing subscriber',
};

export const subscriberEmailField: INodeProperties = {
   displayName: 'Email',
   name: 'email',
   type: 'string',
   placeholder: 'e.g. reader@example.com',
   default: '',
   required: true,
   description: 'The subscriber email address',
};

export const subscriberExpandField: INodeProperties = {
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
};

export const subscriptionIdField: INodeProperties = {
   displayName: 'Subscription ID',
   name: 'subscriptionId',
   type: 'string',
   placeholder: 'e.g. sub_00000000-0000-0000-0000-000000000000',
   default: '',
   required: true,
   description: 'The prefixed subscription ID',
};

export const newsletterListSelect: INodeProperties = {
   displayName: 'Newsletter List',
   name: 'newsletterListId',
   type: 'resourceLocator',
   default: { mode: 'list', value: '' },
   required: true,
   description: 'The newsletter list to operate on',
   modes: [
      {
         displayName: 'From List',
         name: 'list',
         type: 'list',
         typeOptions: {
            searchListMethod: 'searchNewsletterLists',
            searchable: true,
         },
      },
      {
         displayName: 'By ID',
         name: 'id',
         type: 'string',
         placeholder: 'e.g. nl_list_00000000-0000-0000-0000-000000000000',
      },
   ],
};

export const automationSelect: INodeProperties = {
   displayName: 'Automation',
   name: 'automationId',
   type: 'resourceLocator',
   default: { mode: 'list', value: '' },
   required: true,
   description: 'The automation to enroll the subscriber in. Requires an active Add by API trigger.',
   modes: [
      {
         displayName: 'From List',
         name: 'list',
         type: 'list',
         typeOptions: {
            searchListMethod: 'searchAutomations',
            searchable: true,
         },
      },
      {
         displayName: 'By ID',
         name: 'id',
         type: 'string',
         placeholder: 'e.g. aut_00000000-0000-0000-0000-000000000000',
      },
   ],
};

export const unwrapDataOutput = {
   postReceive: [
      {
         type: 'rootProperty' as const,
         properties: {
            property: 'data',
         },
      },
   ],
};

export async function noContentSuccess(
   this: IExecuteSingleFunctions,
   items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
   return items.map((item) => ({
      json: {
         success: true,
      },
      pairedItem: item.pairedItem,
   }));
}

export const noContentOutput = {
   postReceive: [noContentSuccess],
};
