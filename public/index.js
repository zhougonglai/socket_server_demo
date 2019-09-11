import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import './index.styl';
const config = require('../config');


class App extends React.Component {
  componentDidMount() {
    const socket = io(config.ORIGIN);
    this.video = React.createRef();
  }

  getUserMedia = () => {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(mediaSteam => {
      console.log(mediaSteam, this.video.current);
      this.video.current.srcObject = mediaSteam;
    })
  }

  render() {
    return (
      <div>
        resume App
        <button onClick={this.getUserMedia}>get User Media</button>
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
