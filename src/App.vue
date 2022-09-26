<template>
  <a-layout>
    <a-layout-content style="padding: 50px; height: 100vh;">
      <a-row type="flex" justify="space-around" align="middle" style="height: 100%">
        <a-col :span="6" v-if="!hasPlayer" style="text-align: center">
          <h1>Simple Buzzer</h1>
          <div v-if="!connecting">
            <p>To begin, enter your name.</p>
            <a-input size="large" v-model:value="player" />
            <a-button block type="primary" size="large" style="margin-top: 1em;" @click="begin">Play</a-button>
          </div>
          <div v-else>
            <a-spin style="margin-top: 1em;" />
            <div style="margin-top: 1em;">
              Connecting to server...
            </div>
          </div>
        </a-col>
        <a-col :span="24" v-else>
          <router-view />
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { notification } from 'ant-design-vue'
import { buzzConnection } from '@/signalr'

export default {
  components: {
    RouterLink,
    RouterView
  },
  data() {
    return {
      buzzConnection,
      connecting: false,
      hasPlayer: false,
      player: null,
    }
  },
  methods: {
    begin() {
      if (this.player != null && this.player.trim() != '') {
        // Attempt to connect
        this.connecting = true

        // Initialize SignalR
        this.buzzConnection.on("ReceiveMessage", (data, two) => {
          console.log(data, two)
        })
        this.buzzConnection.start()
          .then(() => {
            this.buzzConnection.invoke("SendMessage", "/register", this.player)
          })
      } else {
        notification['error']({
          message: 'Error',
          description: 'Please enter a valid player name.'
        })
      }
    }
  }
}
</script>