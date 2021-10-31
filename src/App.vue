<template>
  <div id="app">
    <HorseRacing />
  </div>
</template>

<script>
import HorseRacing from './components/HorseRacing.vue'

export default {
  name: 'App',
  components: {
    HorseRacing
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
