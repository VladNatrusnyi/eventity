<template>
    <div class="event_list">
      <event-item
        v-for="item in events"
        :key="item.id"
        :event_data="item"
        @click="toEventPage(item.id)"
      />
    </div>
</template>

<script>
import EventItem from './EventItem'
export default {
  name: 'EventList',
  data () {
    return {
    }
  },
  components: {
    EventItem
  },
  props: {
    events: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  },
  methods: {
    toEventPage (id) {
      console.log(id)
      this.$router.push(`/Events/${id}`)
    }
  }
}
</script>

<style scoped>
.event_list{
  width: 100%;
  padding: 10px;
}
</style>
