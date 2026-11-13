import type { IAuthenticateGeneric, ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';

export class BeehiivApi implements ICredentialType {
   name = 'beehiivApi';

   displayName = 'Beehiiv API';

   documentationUrl = 'https://github.com/beehiiv/n8n?tab=readme-ov-file#credentials';

   icon = {
      light: 'file:../nodes/Beehiiv/beehiiv.svg',
      dark: 'file:../nodes/Beehiiv/beehiiv.dark.svg',
   } as const;

   properties: INodeProperties[] = [
      {
         displayName: 'API Key',
         name: 'apiKey',
         type: 'string',
         typeOptions: { password: true },
         required: true,
         default: '',
      },
   ];

   authenticate: IAuthenticateGeneric = {
      type: 'generic',
      properties: {
         headers: {
            Authorization: '=Bearer {{$credentials.apiKey}}',
         },
      },
   };

   test: ICredentialTestRequest = {
      request: {
         baseURL: 'https://api.beehiiv.com/v2',
         url: '/publications',
      },
   };
}
