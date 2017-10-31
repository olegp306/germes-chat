import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
window.GermesChat=App;
console.log("Запуск GermesChat index.js");
//import registerServiceWorker from './registerServiceWorker';

// Перед тем как Build для Клариса нужно закоментировать строчку ниже а в Кларисе ReactDOM.render(React.createElement(window.GermesChat), document.getElementById('germes-chat'))
//Иначе компонент попытаеться разу где-то отрисоваться

//ReactDOM.render(<App />, document.getElementById('germes-chat'));

//registerServiceWorker();
