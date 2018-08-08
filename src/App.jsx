import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages:[]
    };
  }



  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = () => {
    console.log('Connected to server');
    }  

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      const messages = this.state.messages.concat(message);
      this.setState({
        messages: messages,
        });
      }
    
    
    console.log("componentDidMount <App />");

  }

  newMessage(event) {
    if (event.key === 'Enter') {
      const message = {
        username: this.state.currentUser.name,
        content: event.target.value,
        id: new Date().toString()
      }
      this.socket.send(JSON.stringify(message));
      event.target.value = '';
    }
  }

  
  newUser(event) {
    const username = event.target.value;
    this.setState({currentUser: {name: username}});
  }  


  render() {
    console.log("Rendering <App/>")
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} handleNewMessage={this.newMessage.bind(this)} handleNewUser={this.newUser.bind(this)}/>
      </div>
    );
  }
}
export default App;
