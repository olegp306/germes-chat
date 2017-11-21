import axios from 'axios'

const CLIENT_ID = 'kdwcc83defm8o7bkdwcc83defm8o7b';
const BASE_URL = 'http://localhost:85/germes/v1';


function parseJSON(response) {
  return response.json();
}

export function toAssociativeArray (data){
  let map = {};
  //console.log('toAssociativeArr', data);
  for (var i = 0, l = data.length; i < l; i++) {
      map[data[i].id] = data[i];
  }
  //console.log(map);
  return map;
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if(response.status == 404 || response.status == 401){
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
  return  axios.get('/chats/'+chatId).then(checkStatus);
}

export function getAllChatsByUserId (userId) {
  return axios.get('/chats/user/'+this.userId).then(checkStatus);
}

export function getUsersByChatId(chatId) {
  return axios.get('/users/chatid/'+this.chatId).then(checkStatus);
}

export function getAllUsersByChatId (chatId) {
  return axios.get('/users/chatid/'+chatId).then(checkStatus);
}

export function getMessagesByChatId (chatId) {
  return axios.get('/messages/chatid/'+ chatId).then(checkStatus);
}

export function addMessage (message) {
  return axios.post('/messages/', message).then(checkStatus);
}
