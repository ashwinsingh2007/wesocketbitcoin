import React from "react";
import Websocket from "react-websocket";
import moment from 'moment'


class WebSocket extends React.Component {
  constructor() {
    super();
    this.state = {
      connected: "Connect"
    };
  }
  getProperDataToStore = data => {
    return {
      hash: data.hash,
      time: data.time,
      valueBTC: data.out[0].value
    };
  };
  handleData = data => {
    data = JSON.parse(data);
    if (this.state.connected === "Pending") {
      this.setState({
        connected: "Connected"
      });
    }
    if (data && data.x) {
      const dataToStore = this.getProperDataToStore(data.x);
      this.props.storeInGlobalData(dataToStore);
    }
  };
  sendMessage(message) {
    if (this.state.connected === "Connect") {
      this.setState({
        connected: "Pending"
      });
      this.refWebSocket.sendMessage(message);
    }
  }
  render() {
    const message = { op: "unconfirmed_sub" };
    const { connected } = this.state;
    return (
      <div className="socket-container">
        <Websocket
          url="wss://ws.blockchain.info/inv"
          onMessage={data => this.handleData(data)}
          ref={Websocket => {
            this.refWebSocket = Websocket;
          }}
        />
        <button onClick={() => this.sendMessage(JSON.stringify(message))}>
          {connected}
        </button>
      </div>
    );
  }
}
export default WebSocket;

//1564765503
//HH:MM:SS +05:30