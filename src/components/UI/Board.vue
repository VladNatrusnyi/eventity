<template>
  <div class="board_wrapper shadow">
    <div class="board_header">
      <div @click="openBoard" class="board_header_title" :class="{active: customStyle}">{{ title }}<slot name="icons"></slot> </div>
      <div class="board_header_sub_element"><slot name="sub_element"></slot></div>
    </div>
    <div v-if="active">
      <decor-line />
      <div class="board_main_content"><slot name="main_content"></slot></div>
    </div>
  </div>
</template>

<script>
import DecorLine from './DecorLine'

export default {
  name: 'Board',
  data () {
    return {
    }
  },
  components: {
    DecorLine
  },
  props: {
    title: String,
    isActive: Boolean,
    customStyle: Boolean
  },
  methods: {
    openBoard () {
      this.$emit('openBoard')
    }
  },
  computed: {
    active () {
      if (this.isActive === undefined) {
        return true
      } else {
        return this.isActive
      }
    }
  }
}
</script>

<style scoped>
.shadow{
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);
}
.board_wrapper{
  width: 100%;
}
.board_header{
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 60px;
}
.board_header_title{
  font-size: 25px;
  color: #000000;
  font-weight: 500;
  display: flex;
  align-items: center;
}
.board_header_title.active:hover {
  cursor: pointer;
  color: #7568F8;
}
.board_main_content{
  padding: 40px 60px;
}

</style>
