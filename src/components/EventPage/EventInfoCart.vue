<template>
  <div class="info_cart_wrapper">
    <div class="left_section">
      <div class="necessary_personal">
        <h3 class="personal_title title">Необхідний персонал</h3>
        <p class="personal_item text"
           v-for="person in event_data.workers"
           :key="person.id"
        >
          {{person.value}} &nbsp; {{person.couple}} особи &nbsp; {{person.salary}} грн
        </p>
      </div>
      <div class="location">
        <h3 class="location_title title">Локація</h3>
        <p class="location_item text">{{event_data.EventLocationType.name}} - {{event_data.EventLocationArea}} кв/м</p>
      </div>
      <div class="description">
        <h3 class="title">Опис події</h3>
        <div v-html="event_data.EventAboutInfo" class="text"></div>
      </div>
    </div>
    <div class="right_section">
      <div class="right_section_table">
        <div class="table_item">
          <h3 class="title">Інформація по завданню</h3>
        </div>
        <div class="table_item" v-for="item in dataItems" :key="item.value">
          <div class="table_item_info">
            <div class="table_item_key">{{ item.title }}</div>
            <div class="table_item_value">{{ item.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formatDate from '../../filters/DateTimeFormater'
import formatNumber from '../../filters/PrettyNumber'
export default {
  name: 'EventInfoCart',
  data () {
    return {
      dataItems: [
        { title: 'Тип події', value: this.event_data.TypeOfEvent.name },
        { title: 'Дата і час', value: formatDate(this.event_data.realTime) },
        { title: 'Загальний бюджет', value: formatNumber(this.event_data.EventBudget) + ' грн' },
        { title: 'Кількість гостей', value: this.event_data.EventNumberGuests + ' осіб' },
        { title: 'Дата публікації', value: formatDate(this.event_data.CreationDate) }
      ]
    }
  },
  methods: {
  },
  props: {
    event_data: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  computed: {
  }
}
</script>

<style scoped>
.info_cart_wrapper{
  margin: 20px 0px 0px 0px;
  padding: 35px 0px;
  display: grid;
  grid-template-columns: 60% minmax(300px, 1fr);
}
.left_section{
}
.right_section{
}
.title{
  margin-bottom: 7px;
}
.text{
  font-weight: 500;
  font-size: 16px;
  max-width: 600px;
}
.necessary_personal{
  margin-bottom: 15px;
}
.personal_item{
  margin-bottom: 5px;
}
.location{
  margin-bottom: 15px;
}
.right_section_table{
  border: 1px solid #000;
  padding: 20px 25px;
}
.table_item{
  border-bottom: 1px solid #787474 ;
}
.table_item_info{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0px
}
.table_item_key{
  font-weight: 400;
  font-size: 16px;
  color: #6D6969;
}
.table_item_value{
  font-weight: 600;
  font-size: 16px;
}
</style>
