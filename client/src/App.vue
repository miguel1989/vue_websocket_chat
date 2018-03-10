<template>
  <div id="app">
    <img
      src="./assets/logo.png"
      @click="imgClick">
    <HelloWorld/>

    <div v-if="!isInChat">
      <h2> Enter your name for chat</h2>
      <input v-model="nickName">
      <div
        v-show="hasNickName"
        @click="enterChatClick">Enter chat</div>
    </div>

    <div v-if="isInChat">
      <div
        v-for="msg in msgArr"
        :key="msg.id">
        [{{ msg.time }}] {{ msg.nick }}: {{ msg.text }}
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue';
// import VueSocketio from 'vue-socket.io';
import io from 'socket.io-client';
import HelloWorld from './components/HelloWorld';
// https://socket.io/docs/client-api/
// https://github.com/riebel/socketio-es6-starter/blob/master/src/client/js/Chat.js
const SERVER_URL = 'http://localhost:3000';

// Vue.use(VueSocketio, SERVER_URL);

function uuid() {
  return Math.random().toString(16).slice(2);
}

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    return {
      nickName: 'Batman',
      isInChat: false,
      socket: null,
      msgArr: [],
    };
  },
  computed: {
    hasNickName() {
      return !!this.nickName;
    },
  },
  // sockets: {
  //   connect() {
  //     // eslint-disable-next-line
  //     console.log('socket connected');
  //   },
  //   customEmit() {
  //     // eslint-disable-next-line
  //     console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)');
  //   },
  //   message(data) {
  //     // eslint-disable-next-line
  //     console.log('this method was fired by the socket server. eg: io.emit("message", data)');
  //     // eslint-disable-next-line
  //     console.log(data);
  //   },
  // },
  methods: {
    imgClick() {
      // this.$socket.emit('message', 'Something');
      this.socket.emit('ui_message', {
        nick: this.nickName,
        text: 'msg from img click',
      });
    },
    enterChatClick() {
      this.isInChat = true;
      this.socket = io(SERVER_URL, { query: `nick=${this.nickName}` });
      this.setupSocket();
    },
    setupSocket() {
      const vm = this;
      this.socket.on('disconnect', () => {
        // eslint-disable-next-line
        console.log('socket on disconnect');
        vm.socket.close();
      });

      this.socket.on('server_message', (msg) => {
        // eslint-disable-next-line
        // console.log('socket on message, msgText = ' + msgText);
        vm.msgArr.push({
          id: uuid(),
          ...msg,
        });
      });
    },
  },
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
