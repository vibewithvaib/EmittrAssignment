import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider></BrowserRouter>,
  document.getElementById('root')
);
