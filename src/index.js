import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/redaxStore'
// import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

ReactDOM.render(
    <HashRouter>
    {/* <BrowserRouter basename={process.env.PUBLIC_URL}> */}
        <Provider store={ store }>
            <App />
        </Provider>
    {/* </BrowserRouter> */}
    </HashRouter>, 
    document.getElementById('root'));

serviceWorker.unregister();
