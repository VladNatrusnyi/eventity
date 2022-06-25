<template>
  <div v-for="item in this.CURRENT_COMMENTS" :key="item.commentId">
    <comment-item :commentData="item"/>
  </div>
</template>

<script>
import CommentItem from './CommentItem'

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    CURRENT_COMMENTS: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    allComments: Boolean
  },
  computed: {
    // comments () {
    //   if (this.allComments) {
    //     return this.CURRENT_COMMENTS
    //   } else {
    //     return this.CURRENT_COMMENTS[0]
    //   }
    // }
  }
}
</script>

<style scoped>

</style>
