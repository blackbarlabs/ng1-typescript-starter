export default {
  appErrorPrefix: '[Starter Error] ',
  appTitle: 'Starter',

  environmentVars: {
    starterApiUrl: 'starterApiUrl',
    authApiUrl: 'authApiUrl',
    apiSuffix: 'apiSuffix',
    siteAdminToken: 'siteAdminToken',
    siteAdminKey: 'siteAdminKey',
    shouldLog: 'shouldLog'
  },

  environmentConfig: <ng.environment.Config>{
    domains: {
      karma: ['localhost:9876'],
      loc: ['localhost:3000'],
      dev: [],
      stg: [],
      uat: [],
      prd: []
    },
    vars: {
      karma: {
        starterApiUrl: 'https://unit-test.com/',
        authApiUrl: 'https://unit-test-auth.com/',
        apiSuffix: 'api',
        siteAdminToken: 'starterTestToken',
        shouldLog: false
      },
      loc: {
        starterApiUrl: 'https://starter-api.com',
        authApiUrl: 'https://starter-api-auth.com',
        apiSuffix: 'api',
        siteAdminToken: 'starterTestToken',
        siteAdminKey: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role?id=fb7f557f458c4eadb08652c4a7315fd6',
        shouldLog: true
      },
      dev: {
        starterApiUrl: '',
        authApiUrl: '',
        apiSuffix: 'api/',
        siteAdminToken: '',
        siteAdminKey: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role?id=fb7f557f458c4eadb08652c4a7315fd6',
        shouldLog: true
      },
      stg: {
        starterApiUrl: '',
        authApiUrl: '',
        apiSuffix: 'api/',
        siteAdminToken: '',
        shouldLog: false,
      },
      uat: {
        starterApiUrl: '',
        authApiUrl: '',
        apiSuffix: 'api/',
        siteAdminToken: '',
        shouldLog: false
      },
      prd: {
        starterApiUrl: '',
        authApiUrl: '',
        apiSuffix: 'api/',
        siteAdminToken: '',
        siteAdminKey: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role?id=fb7f557f458c4eadb08652c4a7315fd6',
        shouldLog: false
      }
    }
  }
};
