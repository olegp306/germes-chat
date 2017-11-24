import React, { Component } from 'react';

//import {testExternalParam} from  '../index.js';

class BigChatDescription extends Component {
  constructor(props) {
    super(props);

    this.state={};
  }

  componentDidMount() {
      this.setState({chatInfo:this.props.chatInfo}) ;
  }
  componentWillReceiveProps(nextProps) {
      this.setState({chatInfo:nextProps.chatInfo}) ;
  }

  render() {

    if(this.state.chatInfo==null || !this.state.chatInfo )
    {
      return <p>BigChatDescription Loading....</p>
    }
    //console.log(this.props.data);
    let chatInfo=this.state.chatInfo;
    return (
        <h3 className="panel-title">Название чата: {chatInfo.description}</h3>
    );
  }
}

export default BigChatDescription;
