import packageJSON from './package.json';

const ENV = process.env.NODE_ENV || 'development';
const ISDEV = ENV === 'development';

const VARIABLES = {
  DEBUGGING: true,
  MONITORING: true,
  ENVIRONMENT_NAME: ENV,
  VERSION: packageJSON.version,
  MAPBOXTOKEN: process.env.MAP_BOX_TOKEN
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
