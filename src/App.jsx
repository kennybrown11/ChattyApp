import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: ''},
      messages:[],
      currentUsers: 0
    };
    this.newUser = this.newUser.bind(this);
    this.newMessage = this.newMessage.bind(this)
  }



  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = () => {
    console.log('Connected to server');
    }  

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if(message.type === 'incomingClientSize'){
        this.setState({
          currentUsers: message.clientSize
        });
      }
      const messages = this.state.messages.concat(message);
      this.setState({messages: messages}) 
    }  

  }

  newMessage(event) {
    if (event.key === 'Enter') {
      const message = {
        username: this.state.currentUser.name,
        content: event.target.value,
        id: new Date().toString(),
        type: 'postMessage'
      }
      this.socket.send(JSON.stringify(message));
      event.target.value = '';
    }
  }

  
  newUser(event) {
    let oldName = this.state.currentUser.name
    const username = event.target.value;
      if (oldName !== username) {
        let message = {
          type: 'postNotification',
          content: `${oldName} changed their name to ${username}`
        }
        this.socket.send(JSON.stringify(message))
      }
    this.setState({currentUser: {name: username}});
  }  


  render() {
    console.log("Rendering <App/>")
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="counter">{this.state.currentUsers} users online!</span>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name}
        handleNewMessage={this.newMessage}
        handleNewUser={this.newUser}/>
      </div>
    );
  }
}
export default App;
