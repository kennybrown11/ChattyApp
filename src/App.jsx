import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: ''},
      messages:[
        {
          id: "1",
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: "2",
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }



  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = () => {
    console.log('Connected to server');
    }  
    
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  newMessage(event) {
    if (event.key === 'Enter') {
      const message = {
        username: this.state.currentUser.name,
        content: event.target.value,
        id: new Date().toString()
      }
      this.socket.send(JSON.stringify(message));
      this.setState({messages: this.state.messages.concat(message)});
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
