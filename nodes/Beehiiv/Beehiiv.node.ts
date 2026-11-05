import { type INodeType, type INodeTypeDescription, NodeConnectionTypes } from 'n8n-workflow';

import { newsletterListDescription } from './resources/newsletterList';
import { subscriberDescription } from './resources/subscriber';
import { searchAutomations, searchNewsletterLists, searchPublications } from './shared/listSearch';

export class Beehiiv implements INodeType {
   description: INodeTypeDescription = {
      displayName: 'beehiiv',
      name: 'beehiiv',
      icon: { light: 'file:beehiiv.svg', dark: 'file:beehiiv.dark.svg' },
      group: ['transform'],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: 'Create, get, and update beehiiv subscribers, tags, lists, and automations',
      defaults: {
         name: 'beehiiv',
      },
      usableAsTool: true,
      inputs: [NodeConnectionTypes.Main],
      outputs: [NodeConnectionTypes.Main],
      credentials: [{ name: 'beehiivApi', required: true }],
      requestDefaults: {
         baseURL: 'https://api.beehiiv.com/v2',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
      },
      properties: [
         {
            displayName: 'Resource',
            name: 'resource',
            type: 'options',
            noDataExpression: true,
            options: [
               {
                  name: 'Newsletter List',
                  value: 'newsletterList',
               },
               {
                  name: 'Subscriber',
                  value: 'subscriber',
               },
            ],
            default: 'subscriber',
         },
         ...newsletterListDescription,
         ...subscriberDescription,
      ],
   };

   methods = {
      listSearch: {
         searchPublications,
         searchNewsletterLists,
         searchAutomations,
      },
   };
}
