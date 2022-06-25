<template>
  <div class="left_side_bar">
    <div class="left_side_bar_title_wrapper">
      <p class="left_side_bar_title" @click="sortByTypes">Всі доступні івенти</p>
      <p class="left_side_bar_all_amount_event">{{EVENTS.length}}</p>
    </div>
    <div class="left_side_bar_main_wrapper">
      <h4 class="filter_title">Тип події:</h4>
      <div v-for="type in availableTypes" :key="type" class="checkbox_wrapper">
        <Checkbox name="typeOfEvent" :value="type" v-model="filteringItems.selectedEventType" />
        <div class="checkbox_label">{{type}}</div>
      </div>
      <h4 class="filter_title">Тип виконавця:</h4>
      <div v-for="type in availableWorkers" :key="type" class="checkbox_wrapper">
        <Checkbox name="typeOfWorker" :value="type" v-model="filteringItems.selectedWorkerType" />
        <div class="checkbox_label">{{type}}</div>
      </div>
      <h4 class="filter_title">Дата:</h4>
      <Calendar v-model="filteringItems.selectedDateType" :showButtonBar="true" selectionMode="range" dateFormat="dd.mm.yy"  class="calendar"/>
      <h4 class="filter_title">Місто:</h4>
      <div v-for="type in availableCity" :key="type" class="checkbox_wrapper">
        <Checkbox name="typeOfWorker" :value="type" v-model="filteringItems.selectedCityType" />
        <div class="checkbox_label">{{type}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'FilterSidebar',
  data () {
    return {
      filteringItems: {
        selectedEventType: [],
        selectedWorkerType: [],
        selectedCityType: [],
        selectedDateType: []
      }
    }
  },
  props: {
    events: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    prop: {
      type: Boolean
    },
    paramToRemove: {
      type: String
    }
  },
  methods: {
    ...mapActions([
      'GET_FILTERED_EVENTS'
    ]),
    checkOnDate (param) {
      const res = param.split('.')
      if (res[0].length === 2 && res[1].length === 2) {
        return true
      } else {
        return false
      }
    }
  },
  computed: {
    ...mapGetters([
      'EVENTS',
      'filteredEvents'
    ]),
    availableTypes () {
      const res = this.filteredEvents.map((item) => {
        return item.TypeOfEvent.name
      })
      return Array.from(new Set(res))
    },
    availableWorkers () {
      const res = []
      this.filteredEvents.map((item) => {
        item.workers.forEach((el) => {
          res.push(el.value)
        })
      })
      return Array.from(new Set(res))
    },
    availableCity () {
      const res = this.filteredEvents.map((item) => {
        return item.EventCity
      })
      return Array.from(new Set(res))
    }
  },
  watch: {
    filteringItems: {
      handler (newValue, oldValue) {
        if (newValue.selectedDateType === null) {
          this.filteringItems.selectedDateType = []
        }
        this.GET_FILTERED_EVENTS(newValue)
        this.$emit('sortParams', newValue)
        console.log('NEW', newValue)
      },
      deep: true
    },
    prop (newValue) {
      if (newValue) {
        this.filteringItems = { selectedEventType: [], selectedWorkerType: [], selectedCityType: [], selectedDateType: [] }
      }
    },
    paramToRemove (newValue) {
      for (const item in this.filteringItems) {
        if (item === 'selectedDateType' && this.checkOnDate(newValue)) {
          this.filteringItems[item] = []
          console.log('checkOnDate', newValue)
        }
        if (this.filteringItems[item].includes(newValue)) {
          this.filteringItems[item].splice(this.filteringItems[item].indexOf(newValue), 1)
        }
      }
    }
  }
}
</script>

<style scoped>
.filter_title{
  margin-top: 10px;
  margin-bottom: 5px;
}
.checkbox_wrapper{
  display: flex;
  align-items: center;
}
.checkbox_label{
  margin-left: 10px;
  font-size: 16px;
  font-weight: 500;
}
.left_side_bar{
  width: 26%;
  background-color: #FFFFFF;
  margin-top: 20px;
  filter: drop-shadow(0px 4px 10px rgba(1, 0, 0, 0.25));
  border-radius: 10px;
}
.left_side_bar_title_wrapper{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  border-bottom: 3px solid #7567F8;
  padding: 0px 20px;
}
.left_side_bar_title{
  font-weight: normal;
  font-size: 19px;
}
.left_side_bar_all_amount_event{
  font-weight: normal;
  font-size: 19px;
  color: #726C6C;
}
.left_side_bar_main_wrapper{
  padding: 0px 20px 20px 20px;
}
.calendar{
  position: relative;
}
</style>
