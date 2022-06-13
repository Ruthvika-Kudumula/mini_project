import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Store from '../src/Redux/store'
import reportWebVitals from './reportWebVitals';
import Router from './AppRouter/Routes';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
  <Router />
</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
