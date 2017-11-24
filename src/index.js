import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

window.GermesChat=App;

//2768031944000 2768027877000 Это тип чата по Заявке
console.log("Запуск GermesChat index.js");
//import registerServiceWorker from './registerServiceWorker';

// Перед тем как Build для Клариса нужно закоментировать строчку ниже а в Кларисе ReactDOM.render(React.createElement(window.GermesChat), document.getElementById('germes-chat'))
//Иначе компонент попытаеться разу где-то отрисоваться

export const  chatparams={
  'chatType':'',
  'chatId':'2768074019000',
  'userId':'39098772000'
};


ReactDOM.render(
  React.createElement(App, {chatparams:chatparams}, null),
  document.getElementById('germes-chat')
);

// ReactDOM.render(<App chatparams={chatparams:chatparams}/>, document.getElementById('germes-chat'));

//registerServiceWorker();
