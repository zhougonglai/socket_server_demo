import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import './index.styl';
const config = require('../config');


class App extends React.Component {
  componentDidMount() {
    this.socket = io(config.ORIGIN);
    this.video = React.createRef();
    console.log(this.socket);
  }

  getUserMedia = () => {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(mediaSteam => {
      const localPeerConnection = new RTCPeerConnection();
      if (this.video.current.srcObject) {
        this.video.current.srcObject = mediaSteam;
      } else {
        this.video.current.src = URL.createObjectURL(mediaSteam);
      }
      localPeerConnection.addStream(mediaSteam);
      console.log(mediaSteam, this.video.current, localPeerConnection);
    })
  }

  inRoom = () => {
    this.room = this.socket.io.socket('/room');
    console.log(this.room);
  }

  render() {
    return (
      <div>
        resume App
        <button onClick={this.getUserMedia}>get User Media</button>
        <button onClick={this.inRoom}>in room</button>
        <video ref={this.video} autoPlay playsInline />
      </div>
    )
  }
}
const app = document.getElementById('app');

render(<App />, app);

if (module.hot) {
  module.hot.dispose(function() {
    // 模块即将被替换时
  })

  module.hot.accept(() => {
    // 模块或其依赖项之一刚刚更新时
    render(<App />, app);
  })
}
