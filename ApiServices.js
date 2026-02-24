import { LeadsApi, Configuration } from './src/api-client';
 
 
const apiConfig = new Configuration({
  basePath: 'http://localhost:8080'
});
  export const leadsApi = new LeadsApi(apiConfig);