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
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
    Header
  },
  methods: {
    ...mapActions([
      'GET_EVENTS_FROM_API'
    ])
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  }
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
}
</style>
