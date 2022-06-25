<template>
  <div class="container">
    <div class="search_area">
      <div class="search_area_left">
        <p class="search_area_left_title">Доступні івенти</p>
        <p class="search_area_left_subtitle">{{EVENTS.length}} Доступних проектів</p>
      </div>
      <div class="search_area_right"></div>
    </div>
  </div>
  <div class="content">
    <div class="container">
      <div class="content_wrapper">
        <filter-sidebar
          :events="filteredEvents"
          @sortParams="sortParams"
          :prop="prop"
          :param-to-remove="paramToRemove"
        />
        <div class="main_content">
          <div v-if="sortParameters.length" class="info_about_search_params">
            <Chip v-on:click="resetParameters" class="chip delete-chip" label="Скинути"/>
            <div class="chip" v-for="chip in sortParameters" :key="chip">
              <Chip :label="chip" removable v-on:remove="removeFilerParam(chip)" />
            </div>
          </div>
          <event-list :class="{active_list: !sortParameters.length}"
            :events="events"
          />
          <Paginator :rows="1" :totalRecords="totalItemsCount" @page="onPage($event)"></Paginator>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import EventList from '../components/AllEventsPage/EventList'
import FilterSidebar from '../components/AllEventsPage/FilterSidebar'
import formatDateWithoutTime from './../filters/DateWithoutTime'
export default {
  name: 'AllEvents',
  data () {
    return {
      page: 0,
      eventsPerPage: 3,
      sortParameters: [],
      prop: false,
      paramToRemove: ''
    }
  },
  components: {
    EventList,
    FilterSidebar
  },
  methods: {
    ...mapActions([
      'GET_EVENTS_FROM_API',
      'ADD_NEW_EVENT',
      'GET_FILTERED_EVENTS'
    ]),
    onPage (event) {
      this.page = event.page
    },
    sortParams (data) {
      this.prop = false
      let date
      if (data.selectedDateType.length === 0) {
        date = data.selectedDateType
      } else {
        if (!data.selectedDateType[1]) {
          date = [formatDateWithoutTime(data.selectedDateType[0])]
        } else {
          date = [`${formatDateWithoutTime(data.selectedDateType[0])}-${formatDateWithoutTime(data.selectedDateType[1])}`]
        }
      }
      this.sortParameters = [
        ...data.selectedEventType,
        ...data.selectedWorkerType,
        ...data.selectedCityType,
        ...date
      ]
    },
    resetParameters () {
      // this.sortParameters = []
      this.GET_FILTERED_EVENTS({ selectedEventType: [], selectedWorkerType: [], selectedCityType: [], selectedDateType: [] })
      this.prop = true
    },
    removeFilerParam (item) {
      this.paramToRemove = item
      // this.prop = true
    }
  },
  computed: {
    ...mapGetters([
      'EVENTS',
      'filteredEvents'
    ]),
    events () {
      const offset = (this.page) * this.eventsPerPage
      return this.filteredEvents.slice(offset, offset + this.eventsPerPage)
    },
    totalItemsCount () {
      return Math.ceil(this.filteredEvents.length / this.eventsPerPage)
    }
  },
  mounted () {
    this.ADD_NEW_EVENT()
    this.GET_EVENTS_FROM_API()
  }
}
</script>
<style scoped>
.active_list{
  margin-top: 10px;
}
.delete-chip{
  border: 1px solid red;
  background: #FFFFFF;
}
.delete-chip:hover {
  cursor: pointer;
  background: red;
  color: #FFFFFF;
}
.search_area{
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search_area_left{
  padding-left: 15px;
}
.search_area_left_title{
  font-weight: bold;
  font-size: 30px;
  color: #000;
  margin-bottom: 3px;
}
.search_area_left_subtitle{
  font-weight: normal;
  font-size: 13px;
  line-height: 21px;
  color: #000;
}
.content{
  background-color: #F3F3F3 ;
}
.content_wrapper{
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.main_content{
  width: 72%;
}
.info_about_search_params{
  height: 60px;
  background-color: #FFFFFF;
  margin: 20px 10px;
  filter: drop-shadow(0px 4px 10px rgba(1, 0, 0, 0.25));
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
}
.chip{
  margin-right: 10px;
}
/deep/.p-paginator{
  background: #FFFFFF;
  border-radius: 10px;
  margin-bottom: 20px;
  filter: drop-shadow(0px 4px 10px rgba(1, 0, 0, 0.25));
}
/*/deep/.p-panelmenu .p-panelmenu-header > a{*/
/*  background-color: #FFFFFF;*/
/*  border: none;*/
/*  border-bottom: 1px solid #000;*/
/*  border-radius: 0px;*/
/*}*/
/*/deep/.p-accordion .p-accordion-header .p-accordion-header-link{*/
/*  border: 0px;*/
/*  border-bottom: 1px solid #000000;*/
/*  background-color: #FFFFFF;*/
/*  border-radius: 0px;*/
/*  height: 40px;*/
/*  padding-left: 5px;*/
/*}*/
/*/deep/.p-accordion-header .p-highlight{*/
/*  border: 0px*/
/*}*/
/*/deep/.p-accordion .p-accordion-header:not(.p-disabled).p-highlight .p-accordion-header-link{*/
/*  border: 1px solid gray;*/
/*  border-top-left-radius: 5px;*/
/*  border-top-right-radius: 5px;*/
/*}*/
/*/deep/.p-accordion .p-accordion-content{*/
/*  padding: 0px 0px 15px 0px;*/
/*}*/
</style>
