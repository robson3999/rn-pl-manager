import { AppRegistry } from 'react-native';
import App from './App';
const dgram = require('react-native-udp')

const enc = new TextDecoder("utf-8");
let serverIP = '';
const socket = dgram.createSocket('udp4')
socket.bind(9999)
socket.once('listening', function() {
  console.log('listening')
})

socket.once('message', function(msg, rinfo) {
  serverIP = rinfo.address
  global.SERVERIP = `http://${serverIP}:8080` || global.SERVERIP
})

AppRegistry.registerComponent('playlistManager', () => App);
