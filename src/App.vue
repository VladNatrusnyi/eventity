<template>
  <div id="app">
    <Header />
    <div class="container">
    </div>
  </div>
  <router-view/>
</template>
<script>
import Header from './components/Header'
export default {
  name: 'app',
  components: { Header }
}
</script>
<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Roboto', sans-serif;
}
.container{
  max-width: 1200px;
  margin:  0 auto;
  padding: 0px 10px;
}
</style>
