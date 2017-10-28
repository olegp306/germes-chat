import React from './react/react.js';
import ReactDOM from './react/react-dom.js';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

window.React=React;
window.ReactDOM=ReactDOM;

ReactDOM.render(<App />, document.getElementById('germes-chat'));

registerServiceWorker();
