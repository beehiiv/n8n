import type {
   IDataObject,
   IExecuteFunctions,
   IExecuteSingleFunctions,
   IHttpRequestMethods,
   IHttpRequestOptions,
   ILoadOptionsFunctions,
} from 'n8n-workflow';

export const BEEHIIV_API_BASE_URL = 'https://api.beehiiv.com/v2';

export type BeehiivRequestContext = IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions;

export async function beehiivApiRequest(
   this: BeehiivRequestContext,
   method: IHttpRequestMethods,
   path: string,
   qs: IDataObject = {},
   body?: IDataObject,
): Promise<IDataObject> {
   const options: IHttpRequestOptions = {
      method,
      qs,
      url: `${BEEHIIV_API_BASE_URL}${path}`,
      json: true,
   };

   if (body !== undefined) {
      options.body = body;
   }

   return this.helpers.httpRequestWithAuthentication.call(this, 'beehiivApi', options);
}
