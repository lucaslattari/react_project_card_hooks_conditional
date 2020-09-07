//App.js
import React, {Component} from 'react';
import './App.css';
import ChannelHandler from './ChannelHandler'

class App extends Component{
  render(){
    return (
      <div className="App">
        <ChannelHandler
          newName = "Loop Infinito"
          newAvatar = "avatarLOOP.jpg"
          newDescription = "Tecnologia"
        />
      </div>
    );
  }
}

export default App;
