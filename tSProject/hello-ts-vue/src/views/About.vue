<template>
  <div class="about">
    <h1>This is an about page</h1>
    <mu-container>
      <mu-flex justify-content="between" align-items="end" wrap="wrap">
        <mu-paper :z-depth="1" class="demo-date-picker">
          <mu-date-picker :date.sync="date"></mu-date-picker>
        </mu-paper>
        <mu-paper :z-depth="1" class="demo-date-picker">
          <mu-date-picker landscape :date.sync="date"></mu-date-picker>
        </mu-paper>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      date: undefined
    };
  }
}
</script>
<style>
.demo-date-picker {
  margin: 8px;
}
</style>