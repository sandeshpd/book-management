import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@material/web/textfield/outlined-text-field';
import '@material/web/button/filled-button';
import '@material/web/dialog/dialog';
import '@material/web/icon/icon';
import '@material/web/menu/menu';
import '@material/web/menu/menu-item';
import '@material/web/menu/sub-menu';
import '@material/web/divider/divider'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <App/>
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
