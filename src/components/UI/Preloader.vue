<template>
  <div class="preloader">
    <ProgressSpinner />
<!--    <img :src=" require('./../../assets/Loading.gif')" alt="">-->
  </div>
</template>

<script>
export default {
  name: 'Preloader'
}
</script>

<style scoped>
@keyframes p-progress-spinner-color {
  100%,
  0% {
    stroke: #7567F8;
  }
  40% {
    stroke: #7567F8;
  }
  66% {
    stroke: #7567F8;
  }
  80%,
  90% {
    stroke: #7567F8;
  }
}
</style>
