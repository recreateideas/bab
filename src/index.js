import React from 'react';
import ReactDOM from 'react-dom';
import '../dist/css/App.css';
import 'react-datepicker/dist/react-datepicker.css';
import App from '../babel_compiled/App';
import registerServiceWorker from '../babel_compiled/registerServiceWorker';
import store from '../babel_compiled/store';
import Provider from 'react-redux/lib/components/Provider';

ReactDOM.render(
        <Provider store={store}>
                <App/>
        </Provider>
, document.getElementById('root'));
registerServiceWorker();
