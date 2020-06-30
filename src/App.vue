<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App',
     methods: {
    calculateRem () {
      let w = window.innerWidth
      let whdef = 100 / 3840
      let rem = w * whdef
      document.documentElement.style.fontSize = rem + 'px'
    }
  },
  created () { 
    this.$utils.addEvent('resize', this.calculateRem)
    this.calculateRem()
  },
  beforeDestroy () {
    this.$utils.removeEvent('resize', this.calculateRem)
  }
}
</script>
<style>
@import './assets/styles/font-family.scss';
html, body {
  height: 100%;
}

 #app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}
</style>
