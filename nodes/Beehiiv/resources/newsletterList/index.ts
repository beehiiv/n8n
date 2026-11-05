import type { INodeProperties } from 'n8n-workflow';

import { unwrapDataOutput } from '../../shared/descriptions';
import { applyListNewsletterListsUrl } from '../../shared/preSend';
import { newsletterListGetManyDescription } from './getAll';

const showOnlyForNewsletterLists = {
   resource: ['newsletterList'],
};

export const newsletterListDescription: INodeProperties[] = [
   {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {
         show: showOnlyForNewsletterLists,
      },
      options: [
         {
            name: 'Get Many',
            value: 'getAll',
            action: 'Get many newsletter lists',
            description: 'List newsletter lists for a publication',
            routing: {
               request: {
                  method: 'GET',
                  url: '/publications/newsletter_lists',
               },
               send: {
                  preSend: [applyListNewsletterListsUrl],
               },
               output: unwrapDataOutput,
            },
         },
      ],
      default: 'getAll',
   },
   ...newsletterListGetManyDescription,
];
