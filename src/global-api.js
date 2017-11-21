import axios from 'axios';
import * as api from  './api/api.js';



console.log('global-api');
if (process.env.NODE_ENV === 'development') {
  // axios.defaults.baseURL = 'http://localhost:85/germes/v1';
  axios.defaults.baseURL = 'http://service.allwingroup.ru:3652/germes/v1';
}

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://service.allwingroup.ru:3652/germes/v1';
}

const activeUser = JSON.parse(localStorage.getItem('claris-vnext-global-user'));
// if (activeUser!=null) {
//   axios.defaults.headers.common['Authorization'] = `Bearer ${activeUser.accessToken}`;
// // eslint-disable-line dot-notation
// }
// else {
//   api.authenticateByUserId(testExternalParam.userId).then((data)=>console.log(data),(error)=>console.log(error));
// }
