import React, { Component } from 'react';
import data from './data.json';

import Chat from './components/Chat.jsx';


class App extends Component {
  render() {
    //console.log('console from APP');
    //console.log(data);
    return (
      <div className="App">
        <Chat data={data}/>
      </div>
    );
  }
}

export default App;
