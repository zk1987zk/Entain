<template>
  <div id="app">
    <RacingBoard />
  </div>
</template>

<script>
import RacingBoard from './components/RacingBoard.vue'

export default {
  name: 'App',
  components: {
    RacingBoard
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
