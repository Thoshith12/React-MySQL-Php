import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DefaultProvider } from './content/DefaultContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DefaultProvider>
        <App />
    </DefaultProvider>
);

