<template>
  <button class="change_event_btn" :disabled="disabledBtn"><slot></slot></button>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    disabled: Boolean
  },
  computed: {
    disabledBtn () {
      if (this.disabled === undefined) {
        return false
      } else {
        return this.disabled
      }
    }
  }
}
</script>

<style scoped>
.change_event_btn{
  padding: 15px 20px;
  width: 250px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 16px;
}
</style>
