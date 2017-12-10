import axios from 'axios'

const CLIENT_ID = 'kdwcc83defm8o7bkdwcc83defm8o7b';

function parseJSON(response) {
  return response.json();
}

export function toAssociativeArray (data,idFieldName){
  if(!idFieldName){
    var  idFieldName="id";
  }
  let map = {};
  //console.log('toAssociativeArr', data);
  for (var i = 0, l = data.length; i < l; i++) {
    let item=data[i];
      map[item[idFieldName]] = item;
  }
  //console.log(map);
  return map;
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  if(response.status == 401){
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function authenticateByUserId (userId){
  return axios.post('/authbyappkey/token', {
    userid: userId,
    appkey: CLIENT_ID
    })
}

export function getChatInfoByChatId (chatId){
  return  axios.get('/chats/chat/'+chatId).then(checkStatus);
}

export function getUserChatsInfos (userId) {
  return axios.get('/chats/chatsinfos/'+userId).then(checkStatus);
}

// export function getAllChatsByUserId (userId) {
//   return axios.get('/chats/user/'+this.userId).then(checkStatus);
// }

export function getUserChats () {
  return axios.get('/userchat').then(checkStatus);
}

export function addUsersInChats (users) {
  return axios.post('/userchat',users).then(checkStatus);
}

export function getUsersByChatId(chatId) {
  return axios.get('/users/usersinfos/'+chatId).then(checkStatus);
}

 export function getUsersAvailableToAdd(chatId) {
   return axios.get('/users/availabletoadd/'+chatId).then(checkStatus);
 }

export function getMessagesByChatId (chatId) {
  return axios.get('/messages/chatid/'+ chatId).then(checkStatus);
}

export function addUsersInChat (users) {
  return axios.post('/userchat/', users).then(checkStatus);
}

export function addMessage (message) {
  return axios.post('/messages/', message).then(checkStatus);
}

export function getUnreadMessage (userId) {
  return axios.get('/mesreadinfo/userId/'+ userId).then(checkStatus);
}

export function updateMessagesReadStatus (readMessages) {
  return axios.put('/mesreadinfo',readMessages).then(checkStatus);
}
