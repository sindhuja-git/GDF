import React, { FC, lazy, Suspense } from 'react';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import useAuthInit, { AuthStatus } from 'utils/auth/useAuthInit';
import LinearLoading from 'lib/LinearLoading';
import { Provider } from 'react-redux';
import reducers, { rootSaga } from './Ducks/index';
import { AppLayoutProvider } from './components/AppLayoutProvider';
import { AppLayout } from './components/AppLayout';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const sagaMiddleware = createSagaMiddleware();
const appReducer = combineReducers(reducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store: any = createStore(
  appReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

// Lazy Loading app since SSO will kick us off prior to needing the entire app;
const AuthenticatedApp = lazy(
  () => import(/* webpackPrefetch: true */ './Authenticated')
);
const UnauthenticatedApp = lazy(
  () => import('./components/UnauthenticatedApp')
);

const App: FC<{}> = () => {
  const authStatus = useAuthInit();

  return (
    <Provider store={store}>
      <AppLayoutProvider>
        <AppLayout>
          <Suspense fallback={<LinearLoading />}>
            {authStatus === AuthStatus.Pending && <LinearLoading />}
            {authStatus === AuthStatus.Authorized && <AuthenticatedApp />}
            {authStatus === AuthStatus.Unauthorized && <UnauthenticatedApp />}
          </Suspense>
        </AppLayout>
      </AppLayoutProvider>
    </Provider>
  );
};

export default App;
