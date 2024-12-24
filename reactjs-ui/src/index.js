import reportWebVitals from './reportWebVitals';

import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

// https://getbootstrap.com/docs/4.4/getting-started/webpack/
// callapse works after including this, also must install jquery and popper
import 'bootstrap';

import reducers from './reducers';

import App from './App';
import './scss/custom.scss';

import { GlobalContextProvider } from './context/global-context';

const rootReducer = combineReducers({
  form: formReducer,
  reducers: reducers,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true,
});

ReactDOMClient.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <GlobalContextProvider>
          <App />
        </GlobalContextProvider>
      </Provider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
