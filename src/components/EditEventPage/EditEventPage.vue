<template>
  <div class="edit_event">
    <div class="container">
      <edit-event-form :CURRENT_EVENT="CURRENT_EVENT" />
    </div>
  </div>
</template>

<script>
import EditEventForm from './EditEventForm'
import { mapGetters } from 'vuex'

export default {
  name: 'EditEventPage',
  components: {
    EditEventForm
  },
  computed: {
    ...mapGetters([
      'CURRENT_EVENT'
    ])
  }
}
</script>

<style scoped>
.edit_event{
  padding-top: 40px;
  background: #F3F3F3;
}
</style>
