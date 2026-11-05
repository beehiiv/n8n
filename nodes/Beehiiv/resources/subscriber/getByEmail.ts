import type { INodeProperties } from 'n8n-workflow';

import { publicationSelect, subscriberEmailField, subscriberExpandField } from '../../shared/descriptions';

const showOnlyForGetByEmail = {
   operation: ['getByEmail'],
   resource: ['subscriber'],
};

export const subscriberGetByEmailDescription: INodeProperties[] = [
   {
      ...publicationSelect,
      displayOptions: { show: showOnlyForGetByEmail },
   },
   {
      ...subscriberEmailField,
      displayOptions: { show: showOnlyForGetByEmail },
   },
   {
      displayName: 'Additional Fields',
      name: 'additionalFields',
      type: 'collection',
      placeholder: 'Add Field',
      default: {},
      displayOptions: { show: showOnlyForGetByEmail },
      options: [subscriberExpandField],
   },
];
