import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-0pzew51yth8pbhi7.us.auth0.com"
    clientId="cvaFb90ylf9v8dFufnW7SDoIHTNNibsR"
   
   
  >
    <App />
  </Auth0Provider>,
  </React.StrictMode>,
)
