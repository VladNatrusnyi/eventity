<template>
  <div>
    <my-orders-item
      v-for="item in MY_CURRENT_ORDERS"
      :key="item.id"
      :order_data="item"
    />
  </div>
</template>

<script>
import MyOrdersItem from './MyOrdersItem'
import { mapGetters } from 'vuex'

export default {
  name: 'MyOrdersList',
  components: {
    MyOrdersItem
  },
  computed: {
    ...mapGetters([
      'MY_CURRENT_ORDERS'
    ])
  }
}
</script>

<style scoped>

</style>
