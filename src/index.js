import React from 'react';
import ReactDOM from 'react-dom';
import { hubConnection } from 'signalr-no-jquery';

import App from './App';

window.GermesChat=App;

//2768031944000 2768027877000 Это тип чата по Заявке
console.log("Запуск GermesChat index.js");
//import registerServiceWorker from './registerServiceWorker';

// Перед тем как Build для Клариса нужно закоментировать строчку ниже а в Кларисе ReactDOM.render(React.createElement(window.GermesChat), document.getElementById('germes-chat'))
//Иначе компонент попытаеться разу где-то отрисоваться


// 2375300449000 Веребейчик Вадим Алексеевич chatId 2768027587000
//	2767852694000 ПСН API chatId 2768027587000
// 39098772000  Быконя chatId 2768027587000
// 2690192400000 абармова chatId  2768089107000
// 2767267939000 Медведева

export const  chatparams={
  'chatType':'',
  'chatId':'2768089346000',
  'userId':'2767267939000'
};

//
const pushServiceUrl="http://localhost:89/";
const connection = hubConnection(pushServiceUrl);
const hubProxy = connection.createHubProxy('RequestsHub');
connection.logging = true;

hubProxy.on('sendNewRequests', function(requests) {
    console.log('sendNewRequests invoked', requests);
});


connection.start()
.done(function(){ console.log('Now connected, connection ID=' + connection.id); })
.fail(function(){ console.log('Could not connect'); });


window.hubProxy=hubProxy;


ReactDOM.render(
  React.createElement(App, {chatparams:chatparams}, null),
  document.getElementById('germes-chat')
);

// ReactDOM.render(<App chatparams={chatparams:chatparams}/>, document.getElementById('germes-chat'));

//registerServiceWorker();
