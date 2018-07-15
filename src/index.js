import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<Clothes />, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

if (module.hot) {
	module.hot.accept();
}