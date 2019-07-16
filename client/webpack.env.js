import packageJSON from './package.json';

const ENV = process.env.NODE_ENV || 'development';
const ISDEV = ENV === 'development';

const VARIABLES = {
  DEBUGGING: true,
  MONITORING: true,
  ENVIRONMENT_NAME: ENV,
  VERSION: packageJSON.version,
  MAP_BOX_TOKEN: process.env.MAP_BOX_TOKEN,
  GOOGLE_SPREAD_SHEET_ID: process.env.GOOGLE_SPREAD_SHEET_ID,
  GOOGLE_SHEET_API_KEY: process.env.GOOGLE_SHEET_API_KEY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
};

const ENV_VARIABLES = {
  production: {
    'process.env.NODE_ENV': 'production',
    'app.env': {
      ...VARIABLES,
      WEB_URL: JSON.stringify(ISDEV ? 'http://localhost' : 'http://data.com')
    }
  },
  development: {
    'process.env.NODE_ENV': 'development',
    'app.env': {
      ...VARIABLES
    }
  }
};

export default {
  name: ENV,
  isDev: ISDEV,
  variables: ENV_VARIABLES[ENV]
};
