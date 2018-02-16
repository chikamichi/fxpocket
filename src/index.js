import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import StaticUI from './StaticUI'
import registerServiceWorker from './registerServiceWorker';

const PrettyApp = StaticUI(App)
ReactDOM.render(<PrettyApp />, document.getElementById('root'));
registerServiceWorker();
