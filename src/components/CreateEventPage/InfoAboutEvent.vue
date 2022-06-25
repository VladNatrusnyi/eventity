<template>
    <div class="info_about_event_wrapper">
      <div>
        <h3 class="info_about_event_sub">Назва події:</h3>
        <p class="info_about_event">{{ new_event_data.EventName }}</p>
      </div>
      <div v-if="new_event_data.TypeOfEvent !== '' ">
        <h4 class="info_about_event_subtitle">Тип події:</h4>
        <p class="info_about_event">{{ new_event_data.TypeOfEvent.name }}</p>
      </div>
      <div v-if="eventTime !== ''">
        <h4 class="info_about_event_subtitle">Дата і час проведення події:</h4>
        <p class="info_about_event">{{ eventTime }}</p>
      </div>
      <div v-if="new_event_data.workers !== ''">
        <h4 class="info_about_event_subtitle">Необхідний персонал:</h4>
        <ul>
          <li v-for="worker in new_event_data.workers"
              :key="worker.value">
            <p
              class="info_about_event">
              {{ worker.value }}
            </p>
          </li>
        </ul>
      </div>
      <div v-if="new_event_data.EventBudget !== ''">
        <h4 class="info_about_event_subtitle">Загальний бюджет:</h4>
        <p class="info_about_event">{{ new_event_data.EventBudget.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') }} грн</p>
      </div>
      <div v-if="new_event_data.EventCity !== ''">
        <h4 class="info_about_event_subtitle">Місто проведення:</h4>
        <p class="info_about_event">{{ new_event_data.EventCity }}</p>
      </div>
      <div v-if="new_event_data.EventLocationType !== ''">
        <h4 class="info_about_event_subtitle">Локація:</h4>
        <p class="info_about_event">{{ new_event_data.EventLocationType.name }}
          <span v-if="new_event_data.EventLocationArea !== ''">, площа:{{ new_event_data.EventLocationArea }} кв.м</span>
        </p>
      </div>
      <div v-if="new_event_data.EventNumberGuests !== ''">
        <h4 class="info_about_event_subtitle">Кількість гостей:</h4>
        <p class="info_about_event">{{ new_event_data.EventNumberGuests }} осіб</p>
      </div>
      <div v-if="new_event_data.EventAboutInfo !== ''">
        <h4 class="info_about_event_subtitle">Опис події:</h4>
        <div v-html="new_event_data.EventAboutInfo" class="info_about_event"></div>
      </div>
      <br>
    </div>
</template>

<script>
export default {
  name: 'InfoAboutEvent',
  methods: {
  },
  props: {
    new_event_data: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  computed: {
    eventTime () {
      const time = this.new_event_data.realTime
      const prefix = ''
      return typeof time === 'object' ? prefix + time.toLocaleDateString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''
    }
  }
}
</script>

<style scoped>
.info_about_event_wrapper{
  width: 25%;
  background: #FFFFFF;
  box-shadow: 0px 4px 100px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 15px;
}
.info_about_event_subtitle{
  margin-top: 5px;
}
.info_about_event{
  margin-top: 2px;
}
ul{
  margin-left: 20px;
}
</style>
