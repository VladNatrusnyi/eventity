<template>
    <div class="event_item">
      <div class="title">
        <h3 @click="toEventPage" class="event_name">{{ this.order_data.currentEventData.EventName }}</h3>
        <p class="date">{{date}}</p>
      </div>
      <div @click="openAnswer" class="detail_feedback_wrapper">
        <i v-if="isActive" class="pi pi-chevron-down"></i>
        <i v-else class="pi pi-angle-right"></i>
        <p class="detail_btn">Ваша заявка</p>
      </div>
      <div v-if="isActive" v-html="this.order_data.responseText" class="answer_text_wrapper"></div>
    </div>
</template>

<script>
import formatDate from '../../filters/DateTimeFormater'

export default {
  name: 'MyOrdersItem',
  data () {
    return {
      isActive: false
    }
  },
  props: {
    order_data: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  methods: {
    openAnswer () {
      if (this.isActive) {
        this.isActive = false
      } else {
        this.isActive = true
      }
    },
    toEventPage () {
      this.$router.push(`/Events/${this.order_data.eventId}`)
    }
  },
  computed: {
    eventTime () {
      const time = this.event_data.realTime
      const prefix = ''
      return typeof time === 'object' ? prefix + time.toLocaleDateString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''
    },
    date () {
      return formatDate(this.order_data.publicationTime)
    }
  }
}
</script>

<style scoped>
.title{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.date{}
.event_item{
    margin-bottom: 25px;
    padding: 15px 20px;
    background: #FFFFFF;
    filter: drop-shadow(0px 4px 10px rgba(1, 0, 0, 0.25));
    border-radius: 10px;
}
.event_name{
}
.event_name:hover{
  color: #7568F8;
  cursor: pointer;
}
/*.event_text:after {*/
/*  content: "";*/
/*  position: absolute;*/
/*  left: 0;*/
/*  bottom: 0;*/
/*  width: 100%;*/
/*  height: 40px;*/
/*  background: linear-gradient(180deg, transparent, #e7e7e7e6 50%);*/
/*  border-bottom-right-radius: 10px;*/
/*  border-bottom-left-radius: 10px;*/
/*}*/
.detail_feedback_wrapper{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 25px;
  margin-top: 10px;
}
.detail_btn_wrapper{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 25px;
}
.detail_btn{
  color: #7567F8;
  font-weight: normal;
  font-size: 16px;
  text-align: center;
  margin-top: 5px;
  padding-right: 5px;
  border-bottom: 1px dashed transparent;
}
.detail_btn:hover{
  cursor:pointer;
  border-bottom: 1px dashed #7567F8;
}
.pi{
  color: #7567F8;
  font-weight: normal;
  font-size: 16px;
}
.answer_text_wrapper{
  background: white;
  border-radius: 6px;
  box-shadow: 0px 4px 60px rgba(0, 0, 0, 0.1);
  padding: 20px 25px;
  margin-top: 20px;
}
</style>
