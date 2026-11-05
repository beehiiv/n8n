import type { IDataObject, IExecuteSingleFunctions, IHttpRequestOptions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { beehiivApiRequest } from './transport';

export type SubscriberIdentifyBy = 'email' | 'id';

function locatorValue(value: unknown): string {
   if (typeof value === 'string') {
      return value;
   }

   if (value && typeof value === 'object' && 'value' in value) {
      const nested = (value as { value: unknown }).value;
      return typeof nested === 'string' ? nested : '';
   }

   return '';
}

function getPublicationId(context: IExecuteSingleFunctions): string {
   const publicationId = locatorValue(context.getNodeParameter('publicationId', { extractValue: true }));

   if (!publicationId) {
      throw new NodeOperationError(context.getNode(), 'Publication ID is required');
   }

   return publicationId;
}

function getIdentifyBy(context: IExecuteSingleFunctions): SubscriberIdentifyBy {
   const identifyBy = context.getNodeParameter('identifyBy') as SubscriberIdentifyBy;

   switch (identifyBy) {
      case 'email':
      case 'id':
         return identifyBy;
      default: {
         const exhaustive: never = identifyBy;
         throw new NodeOperationError(context.getNode(), `Unhandled subscriber identifier: ${exhaustive}`);
      }
   }
}

async function resolveSubscriptionId(context: IExecuteSingleFunctions, publicationId: string): Promise<string> {
   const identifyBy = getIdentifyBy(context);

   switch (identifyBy) {
      case 'id': {
         const subscriptionId = locatorValue(context.getNodeParameter('subscriptionId', { extractValue: true }));
         if (!subscriptionId) {
            throw new NodeOperationError(context.getNode(), 'Subscription ID is required');
         }
         return subscriptionId;
      }
      case 'email': {
         const email = context.getNodeParameter('email') as string;
         if (!email) {
            throw new NodeOperationError(context.getNode(), 'Email is required');
         }

         const response = (await beehiivApiRequest.call(
            context,
            'GET',
            `/publications/${publicationId}/subscriptions/by_email/${encodeURIComponent(email)}`,
         )) as IDataObject;
         const data = response.data as IDataObject | undefined;
         const subscriptionId = typeof data?.id === 'string' ? data.id : '';

         if (!subscriptionId) {
            throw new NodeOperationError(context.getNode(), `No subscriber found for ${email}`);
         }

         return subscriptionId;
      }
      default: {
         const exhaustive: never = identifyBy;
         throw new NodeOperationError(context.getNode(), `Unhandled subscriber identifier: ${exhaustive}`);
      }
   }
}

export async function applyCreateSubscriberUrl(
   this: IExecuteSingleFunctions,
   requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
   const publicationId = getPublicationId(this);
   requestOptions.url = `/publications/${publicationId}/subscriptions`;
   return requestOptions;
}

export async function applyUpdateSubscriberUrl(
   this: IExecuteSingleFunctions,
   requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
   const publicationId = getPublicationId(this);
   const identifyBy = getIdentifyBy(this);

   switch (identifyBy) {
      case 'id': {
         const subscriptionId = locatorValue(this.getNodeParameter('subscriptionId', { extractValue: true }));
         requestOptions.url = `/publications/${publicationId}/subscriptions/${subscriptionId}`;
         break;
      }
      case 'email': {
         const email = this.getNodeParameter('email') as string;
         requestOptions.url = `/publications/${publicationId}/subscriptions/by_email/${encodeURIComponent(email)}`;
         break;
      }
      default: {
         const exhaustive: never = identifyBy;
         throw new NodeOperationError(this.getNode(), `Unhandled subscriber identifier: ${exhaustive}`);
      }
   }

   return requestOptions;
}

export async function applySubscriptionTagsUrl(
   this: IExecuteSingleFunctions,
   requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
   const publicationId = getPublicationId(this);
   const subscriptionId = await resolveSubscriptionId(this, publicationId);
   requestOptions.url = `/publications/${publicationId}/subscriptions/${subscriptionId}/tags`;
   return requestOptions;
}

export async function applyGetByEmailUrl(
   this: IExecuteSingleFunctions,
   requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
   const publicationId = getPublicationId(this);
   const email = this.getNodeParameter('email') as string;

   if (!email) {
      throw new NodeOperationError(this.getNode(), 'Email is required');
   }

   requestOptions.url = `/publications/${publicationId}/subscriptions/by_email/${encodeURIComponent(email)}`;
   return requestOptions;
}

export async function applyAddToListUrl(
   this: IExecuteSingleFunctions,
   requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
   const publicationId = getPublicationId(this);
   const newsletterListId = locatorValue(this.getNodeParameter('newsletterListId', { extractValue: true }));
   requestOptions.url = `/publications/${publicationId}/newsletter_lists/${newsletterListId}/subscriptions`;
   return requestOptions;
}

export async function applyUpdateListSubscriptionUrl(
   this: IExecuteSingleFunctions,
   requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
   const publicationId = getPublicationId(this);
   const newsletterListId = locatorValue(this.getNodeParameter('newsletterListId', { extractValue: true }));
   const subscriptionId = await resolveSubscriptionId(this, publicationId);
   requestOptions.url = `/publications/${publicationId}/newsletter_lists/${newsletterListId}/subscriptions/by_subscription_id/${subscriptionId}`;
   return requestOptions;
}

export async function applyEnrollInAutomationUrl(
   this: IExecuteSingleFunctions,
   requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
   const publicationId = getPublicationId(this);
   const automationId = locatorValue(this.getNodeParameter('automationId', { extractValue: true }));
   requestOptions.url = `/publications/${publicationId}/automations/${automationId}/journeys`;
   return requestOptions;
}

export async function applySubscriberIdentityBody(
   this: IExecuteSingleFunctions,
   requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
   const identifyBy = getIdentifyBy(this);
   const body = (requestOptions.body ?? {}) as IDataObject;

   switch (identifyBy) {
      case 'email':
         body.email = this.getNodeParameter('email') as string;
         break;
      case 'id':
         body.subscription_id = locatorValue(this.getNodeParameter('subscriptionId', { extractValue: true }));
         break;
      default: {
         const exhaustive: never = identifyBy;
         throw new NodeOperationError(this.getNode(), `Unhandled subscriber identifier: ${exhaustive}`);
      }
   }

   requestOptions.body = body;
   return requestOptions;
}
