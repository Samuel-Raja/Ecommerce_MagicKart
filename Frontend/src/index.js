import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Layout from './component/Layout';
import store from './State/store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <Provider store={store}>
  
  <BrowserRouter>
  <Layout> 
  <App />
  </Layout>  
</BrowserRouter>

</Provider>

 
  
);

