<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <p>
        If iView is successfully added to this project, you'll see an
        <code v-text="'<Button>'"></code>
        below
      </p>
      <Button @click="getConsol" type="primary">Button</Button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import { Button } from 'iview';
import {timerd, timerD} from './common/util';
export default {
  name: 'app',
  components: {
    HelloWorld,
    Button,
  },
  mounted() {
    console.log(timerd('-'));
  },
  methods: {
    getConsol() {
      // ts的接口验证在这没用了，可惜
      console.log(timerD({a: 1, b: 2, mid_str: true}));
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
