// TODO - Update once all environments are built in OCP4
const clusterDetermineFn = () => {
  const splitHostname = window.location.hostname.split('.');
  const ocp3EnvName = splitHostname[1];
  const ocp4EnvName = splitHostname[2];
  const isValidOcp3 = splitHostname[1].includes('openshift-');
  const isValidOcp4 =
    splitHostname.length > 4 &&
    splitHostname[1] === 'apps' &&
    splitHostname[3] === 'ocp';

  if (ocp3EnvName === undefined || (!isValidOcp3 && !isValidOcp4)) {
    throw new Error(
      `Can not determine environment from current hostname: ${window.location.hostname}`
    );
  }
  const clusterName = isValidOcp3
    ? ocp3EnvName.replace('openshift-', '')
    : ocp4EnvName.replace('-int', '');

  return clusterName;
};

module.exports = {
  clusterDetermineFn,
  getEnvName() {
    if (window.location.hostname === 'localhost') {
      return `local`;
    }

    let envName = 'dev';
    const clusterName = clusterDetermineFn();
    if (clusterName.includes('dev')) {
      envName = 'dev';
    }

    if (clusterName.includes('uat')) {
      envName = 'uat';
    }

    if (clusterName.includes('prd')) {
      envName = 'production';
    }

    return envName;
  },
};
