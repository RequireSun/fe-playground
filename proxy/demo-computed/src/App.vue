<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <p>Computed result: {{count}}</p>
    <p style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
      <input type="checkbox" v-model="vSwitch">
      <span>checked</span>
      <button @click="increase">+1</button>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";

const FIXED = 999;

@Component({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {
  vClick: number = 0;
  vSwitch: boolean = false;

  get count() {
    return this.vSwitch ? this.vClick : FIXED;
  }

  increase() {
    ++this.vClick;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
