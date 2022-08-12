import { useState, useEffect } from 'react';

import Auth from './legacy/Auth';

export enum AuthStatus {
  Pending,
  Authorized,
  Unauthorized,
}

/**
 * ! As this hook is only used in App.unit.test. this Hook will be tested as part of the Auth component and not on it's own.
 */
const useAuthInit = () => {
  const [authStatus, setAuthStatus] = useState(AuthStatus.Pending);

  useEffect(() => {
    if (authStatus === AuthStatus.Pending) {
      Auth.initialize({
        onAuthSuccess: () => setAuthStatus(AuthStatus.Authorized),
        onAuthError: () => setAuthStatus(AuthStatus.Unauthorized),
        redirectUri: window.location.href,
      });
    }
  }, [authStatus]);

  return authStatus;
};

export default useAuthInit;
