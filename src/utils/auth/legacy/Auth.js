import appProperties from "../../../properties/application";
class Auth {
  
  static initialize(options) {
    Auth.keycloak = window.Keycloak({
      realm: appProperties().auth.realm,
      url: appProperties().auth.server.url,
      clientId: appProperties().auth.client.id,
      redirectUri: options.redirectUri,
    });
    Auth.keycloak.onAuthSuccess = options.onAuthSuccess;
    Auth.keycloak.onAuthError = options.onAuthError;

    Auth.keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false,
    });

    Auth.authorization = new window.KeycloakAuthorization(Auth.keycloak);
  }
  static logout(options) {
    const root = location.protocol + '//' + location.host;
    const redirectUrl = root + options.redirectUri;
    Auth.keycloak.logout({ redirectUri: redirectUrl });
  }
  
  static getIdToken() {
    const base64Url = Auth.keycloak.idToken.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  static getName() {
    return this.getIdToken().name;
  }

  static getUsername() {
    return this.getIdToken().preferred_username;
  }

  static getRealmRoles() {
    return Auth.keycloak.realmAccess.roles;
  }

  static authorizationHeader() {
    if(Auth.keycloak.isTokenExpired()) {
      Auth.keycloak.updateToken();
    }
    return `Bearer ${Auth.keycloak.token}`;
  }

  static createLogoutUrl() {
    return Auth.keycloak.createLogoutUrl();
  }

  static createAccountUrl() {
    return Auth.keycloak.createAccountUrl();
  }

  static tokenParsed() {
    return Auth.keycloak.tokenParsed;
  }

  static subject() {
    return Auth.keycloak.subject;
  }

  static resourceAccess() {
    return Auth.keycloak.resourceAccess;
  }

  static realmAccess() {
    return Auth.keycloak.realmAccess;
  }

  static idTokenParsed() {
    return Auth.keycloak.idTokenParsed;
  }

  static permissionsToken() {
    return Auth.authorization.rpt;
  }

  static hasPermission(permissionName) {
    if (Auth.permissionsToken()) {
      const rpt2 = Auth.authorization.rpt.split('.')[1];
      const rpt2decoded = atob(rpt2);
      const rpt2json = JSON.parse(rpt2decoded);
      const { permissions } = rpt2json.authorization;

      const permission = permissions.find(
        (element) => element.resource_set_name === permissionName
      );

      return permission;
    }

    return false;
  }
}
export default Auth;
