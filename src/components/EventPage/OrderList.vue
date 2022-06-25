<template>
  <div class="order_list">
    <div class="order_item_wrapper">
      <order-item
        v-for="item in orders"
        :key="item.id"
        :order="item"
      />
    </div>
  </div>
</template>

<script>

import OrderItem from './OrderItem'

export default {
  name: 'OrderList',
  props: {
    orders: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  },
  components: {
    OrderItem
  }
}
</script>

<style scoped>

</style>
