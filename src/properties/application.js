const lod = require('lodash');
const propertiesLocal = require('./app-local');
const propertiesDev = require('./app-dev');
const propertiesUat = require('./app-uat');
const propertiesPrd = require('./app-prod');
const Env = require('../utils/env');

let clusterName = 'dev2';
if (window.location.hostname !== 'localhost') {
  clusterName = Env.clusterDetermineFn();
}

const getClusterSuffixHostName = () => {
  if (window.location.hostname === 'localhost') {
    return ''; // overwrite in app-local.js
  }
  if (window.location.hostname.includes('apps')) {
    // OCP4 SSO url
    return `apps.${clusterName}-int.ocp.healthpartners.com`;
  }
  // OCP3 SSO url
  return `openshift-${clusterName}.healthpartners.com`;
};

const baseProperties = {
  auth: {
    realm: 'admin-systems',
    client: {
      id: 'gdf-viewer-ui',
    },
    server: {
      url: `https://sso.${getClusterSuffixHostName()}/auth`,
    },
  },
  services: {
    aggregator: {
      url: `https://api-gsu-gdf.${getClusterSuffixHostName()}`,
    },
    api: {
      url: `https://admin-group-setup.${getClusterSuffixHostName()}`,
    },
  },
};

let mergedProperties = null;

export default function properties() {
  if (mergedProperties == null) {
    const envName = Env.getEnvName();
    if (envName === 'local') {
      mergedProperties = lod.merge(baseProperties, propertiesLocal);
    } else if (envName === 'dev') {
      mergedProperties = lod.merge(baseProperties, propertiesDev);
    } else if (envName === 'uat') {
      mergedProperties = lod.merge(baseProperties, propertiesUat);
    } else if (envName === 'production') {
      mergedProperties = lod.merge(baseProperties, propertiesPrd);
    } else
      throw new Error(
        `Unable to determine application properties from envName: ${envName}`
      );
  }
  return mergedProperties;
}
