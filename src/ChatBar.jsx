import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log("Rendering <ChatBar/>")
    return (
      <footer className="chatbar">
      <input className="chatbar-username" value={this.props.currentUser} placeholder="Your Name (Optional)" />
      <input className="chatbar-message" value={this.props.message} placeholder="Type a message and hit ENTER" />
    </footer>
    );
  }
}


export default ChatBar;
