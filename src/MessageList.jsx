import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>")
    const post = this.props.messages.map(post => {
    return  <Message
                  key={post.id}
                  username={post.username}
                  content={post.content}
                  type={post.type}
                  />
    })
    return (
      <div>
        {post}
      </div>  
    );
  }
}



export default MessageList;
