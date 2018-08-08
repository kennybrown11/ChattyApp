import React, {Component} from 'react';

class ChatBar extends Component {

  render() {
    console.log("Rendering <ChatBar/>")
    return (
      <footer className="chatbar">
      <input className="chatbar-username" value={this.props.currentUser} placeholder="Your Name (Optional)" 
      onChange={this.props.handleNewUser}/>
      <input className="chatbar-message" value={this.props.message} placeholder="Type a message and hit ENTER" 
      onKeyDown={this.props.handleNewMessage}/>
    </footer>
    );
  }
}

export default ChatBar;
