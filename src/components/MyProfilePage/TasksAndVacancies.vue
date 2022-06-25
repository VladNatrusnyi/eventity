<template>
<!--Мої події  -->
  <board :title="'Мої події'" :is-active="isActive" :customStyle="true" @openBoard="openBoard" class="my_events">
    <template v-slot:icons>
      <i v-if="!isActive" class="pi pi-angle-down"></i> <i v-else class="pi pi-angle-up"></i>
    </template>
    <template v-slot:sub_element>
      <div class="field">
        <span v-if="isActive" class="p-float-label">
          <MultiSelect id="multiselect" v-model="selectedEventType" :options="myEventsFilterItems" optionLabel="value" />
          <label for="multiselect">Фільтрація по типу події</label>
        </span>
      </div>
    </template>
    <template v-slot:main_content>
      <event-list :events="MY_EVENTS" />
    </template>
  </board>
<!--Відправлені заявки -->
  <board :title="'Мої заявки'" :is-active="isActive2" :customStyle="true" @openBoard="openBoard2">
    <template v-slot:icons>
      <i v-if="!isActive2" class="pi pi-angle-down"></i> <i v-else class="pi pi-angle-up"></i>
    </template>
    <template v-slot:main_content>
      <my-orders-list />
    </template>
  </board>
</template>

<script>
import Board from '../UI/Board'
import { mapActions, mapGetters } from 'vuex'
import EventList from '../AllEventsPage/EventList'
import MyOrdersList from '../MyOrders/MyOrdersList'

export default {
  name: 'TasksAndVacancies',
  data () {
    return {
      selectedEventType: null,
      isActive: false,
      isActive2: false
    }
  },
  components: {
    Board,
    EventList,
    MyOrdersList
  },
  props: {
    prop: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  methods: {
    ...mapActions([
      'GET_MY_EVENTS_FROM_API',
      'GET_FILTERED_MY_EVENTS_FROM_API',
      'GET_MY_ORDERS_FROM_API'
    ]),
    openBoard () {
      if (this.isActive) {
        this.isActive = false
      } else {
        this.isActive = true
      }
    },
    openBoard2 () {
      if (this.isActive2) {
        this.isActive2 = false
      } else {
        this.isActive2 = true
      }
    }
  },
  mounted () {
    this.GET_MY_EVENTS_FROM_API()
    this.GET_MY_ORDERS_FROM_API()
  },
  computed: {
    ...mapGetters([
      'EVENTS',
      'MY_EVENTS'
    ]),
    myEventsFilterItems () {
      const final = []
      const res = this.EVENTS.map((item) => {
        return item.TypeOfEvent.name
      })
      const result = res.filter((el, id) => res.indexOf(el) === id)
      result.forEach(item => {
        final.push({ value: item })
      })
      return final
    }
  },
  watch: {
    selectedEventType (newValue) {
      this.GET_FILTERED_MY_EVENTS_FROM_API(newValue)
      if (this.selectedEventType.length === 0) {
        this.GET_MY_EVENTS_FROM_API()
      }
    }
  }
}
</script>

<style scoped>
#multiselect{
  width: 250px;
}
.field{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pi{
  font-size: 24px;
  margin-left: 5px;
}
.my_events{
  margin-bottom: 20px;
}
</style>
