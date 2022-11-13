import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios'

export const axiosGitHubGraphQL = axios.create({
    baseURL: 'https://api.github.com/graphql',
    headers: {
    "Authorization": `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
                <App />
        </BrowserRouter>
    </React.StrictMode>
);
