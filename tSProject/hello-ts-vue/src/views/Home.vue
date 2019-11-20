<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="test">
    <HelloWorld ref="child" msg="Welcome to Your Vue.js + TypeScript App" testmsg="wocao"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  public $refs!: {
    child: HelloWorld,
  };
  private test(): number {
    this.$refs.child.parentCol(1);
    (this.$refs.child as HelloWorld).parentCol(2);
    // (<HelloWorld> this.$refs.child).parentCol(3); 该用法被禁止
    return 1;
  }
}
</script>