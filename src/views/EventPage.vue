<template>
  <Toast />
<!--  Попапи для зміни статусу івента-->
  <Dialog v-if="this.CURRENT_EVENT.isActive" v-model:visible="displayPopup" :modal="true" :dismissableMask="true">
    <template #header>
      <h3>Ви впевнені, що хочете закрити завдання?</h3>
    </template>
    <p class="popup_text">Якщо ви закриєте завдання, то <br> ніхто вже не зможе побачити і відгукнутися на вішу подію</p>
    <template #footer>
      <Button label="Ні" icon="pi pi-times" class="p-button-text" @click="() => {this.displayPopup = false}"/>
      <Button label="Так" @click="closeEvent" icon="pi pi-check" autofocus />
    </template>
  </Dialog>
  <Dialog v-if="!this.CURRENT_EVENT.isActive" v-model:visible="displayPopup" :modal="true" :dismissableMask="true">
    <template #header>
      <h3>Ви впевнені, що хочете відкрити завдання?</h3>
    </template>
    <p class="popup_text">Якщо ви відкриєте завдання, то <br> воно стане видимим для всіх <br> і відкриється можливість відгукнутися на вашу подію</p>
    <template #footer>
      <Button label="Ні" icon="pi pi-times" class="p-button-text" @click="() => {this.displayPopup = false}"/>
      <Button label="Так" @click="openEvent" icon="pi pi-check" autofocus />
    </template>
  </Dialog>
<!--  Попап для ВИДАЛЕННЯ івента-->
  <Dialog v-model:visible="displayDeletePopup" :modal="true" :dismissableMask="true">
    <template #header>
      <h3>Видалити подію</h3>
    </template>
    <div class="popup_text"><i class="pi pi-info-circle"></i>Ви справді хочете безповоротно видалити подію?</div>
    <template #footer>
      <Button label="Ні" icon="pi pi-times" class="p-button-text" @click="() => {this.displayDeletePopup = false}"/>
      <Button label="Так" @click="deleteEvent" icon="pi pi-check" autofocus />
    </template>
  </Dialog>
  <div class="loader" v-if="loader">
    <preloader />
  </div>
  <div v-else>
    <div class="container">
      <user-promo :user_info="CURRENT_USER" @click="toUserPage"/>
      <p class="event_name">{{ CURRENT_EVENT.EventName}}</p>
      <div class="decor_line"></div>
    </div>
    <div class="content">
      <div class="container shadow">
        <div class="info_section">
          <event-info-cart :event_data="CURRENT_EVENT" />
        </div>
        <div v-if="CURRENT_USER.id === user">
          <section class="change_event_section">
            <MyButton class="edit_btn" @click="editEvent">Редагувати завдання</MyButton>
            <MyButton v-if="this.CURRENT_EVENT.isActive" class="close_btn" @click="openPopupCloseEvent">Закрити завдання</MyButton>
            <MyButton v-else class="close_btn" @click="openPopupCloseEvent">Відкрити завдання</MyButton>
            <MyButton @click="openPopupDeleteEvent" class="delete_btn">Видалити подію</MyButton>
          </section>
          <section class="applications_event_section">
            <div class="filter_left_section">
              <h3 class="applications_event_title">Заявки</h3>
              <span class="filter_link" @click="loadNewOrders">Нові заявки</span>
              <span class="filter_link" @click="loadAllOrders">Всі заявки</span>
            </div>
            <div class="filter_right_section">
              <div>
                    <span class="p-float-label">
                        <Dropdown id="dropdown" v-model="selectedWorkerType" :options="dropdownList"  optionLabel="value"  class="dropdown"  />
                        <label for="dropdown">Виберіть спеціальність</label>
                    </span>
              </div>
            </div>
          </section>
          <section class="orders_event_section">
            <order-list :orders="CURRENT_ORDERS" v-if="CURRENT_ORDERS.length !== 0"/>
            <div v-else>Заявок не знайдено</div>
          </section>
        </div>
        <div v-else>
          <response-field v-if="CURRENT_EVENT.isActive" :eventIdNumber="CURRENT_EVENT.id" :creatorId="user" :workersArray="CURRENT_EVENT.workers"/>
          <h3 class="closed_message" style="color:#7567F8;" v-else>Ця подія закрита організатором.</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UserPromo from '../components/EventPage/UserPromo'
import EventInfoCart from '../components/EventPage/EventInfoCart'
import Preloader from '../components/UI/Preloader'
import OrderList from '../components/EventPage/OrderList'
import MyButton from '../components/UI/MyButton'
import ResponseField from '../components/EventPage/ResponseField'

export default {
  name: 'EventPage',
  data () {
    return {
      loader: true,
      selectedWorkerType: null,
      displayPopup: false,
      displayDeletePopup: false
    }
  },
  components: {
    UserPromo,
    EventInfoCart,
    Preloader,
    OrderList,
    MyButton,
    ResponseField
  },
  methods: {
    ...mapActions([
      'GET_CURRENT_EVENT_FROM_API',
      'GET_SORTED_ORDERS_FROM_API',
      'CLEAR_CURRENT_RESPONSE',
      'GET_CURRENT_ORDERS_FROM_API',
      'SHOW_NEW_ORDERS',
      'CHANGE_EVENT_STATUS',
      'DELETE_EVENT'
    ]),
    showContent () {
      this.loader = false
    },
    toUserPage () {
      this.$router.push(`/UserProfile/${this.CURRENT_USER.id}/MyProfileInfo`)
    },
    loadAllOrders () {
      this.GET_CURRENT_ORDERS_FROM_API(this.eventId)
      this.selectedWorkerType = this.dropdownList[0]
    },
    loadNewOrders () {
      this.SHOW_NEW_ORDERS()
    },
    editEvent () {
      this.$router.push(`/Events/${this.eventId}/EditEvent`)
    },
    openPopupCloseEvent () {
      this.displayPopup = true
    },
    closeEvent () {
      this.displayPopup = false
      this.CHANGE_EVENT_STATUS(false)
    },
    openEvent () {
      this.displayPopup = false
      this.CHANGE_EVENT_STATUS(true)
    },
    openPopupDeleteEvent () {
      this.displayDeletePopup = true
    },
    deleteEvent () {
      this.DELETE_EVENT()
      if (this.DELETE_EVENT_ERROR) {
        this.$toast.add({ severity: 'error', summary: 'Помилка видалення', detail: 'На жаль, при видаленні події виникли проблеми. Перезавантажте сторвнку і спробуйте знову', life: 3000 })
      } else {
        this.$router.push('/')
      }
    }
  },
  mounted () {
    this.GET_CURRENT_EVENT_FROM_API(this.$route.params.id)
    setTimeout(() => {
      this.showContent()
    }, 1000)
  },
  computed: {
    ...mapGetters([
      'CURRENT_EVENT',
      'CURRENT_USER',
      'CURRENT_ORDERS',
      'user',
      'CLOSE_EVENT_ERROR',
      'DELETE_EVENT_ERROR'
    ]),
    eventId () {
      return this.$route.params.id
    },
    dropdownList () {
      return [
        { value: 'Всі спеціальності', optionDisabled: true },
        ...this.CURRENT_EVENT.workers
      ]
    }
  },
  watch: {
    selectedWorkerType () {
      this.GET_SORTED_ORDERS_FROM_API(this.selectedWorkerType.value)
    }
  }
}
</script>

<style scoped>
.shadow{
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);
  padding: 0px 40px 20px 40px;
}
.event_name{
  font-size: 24px;
  font-weight: 700;
}
.decor_line{
  background: #7567F8;
  height: 4px;
  margin-top: 10px;
}

.content{
  background-color: #F3F3F3;
  padding-top: 10px;
}

.change_event_section{
  padding: 20px 0px;
  border-top: 1px solid #787474;
  border-bottom: 1px solid #787474;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.edit_btn{
  background: white;
  border: 2px solid #7567F8;
  color: #7567F8;
}
.edit_btn:hover {
  background: #7567F8;
  color: white;
  cursor: pointer;
}
.close_btn{
  background: white;
  border: 2px solid #7567F8;
  color: #7567F8;
}
.close_btn:hover {
  background: #7567F8;
  color: white;
  cursor: pointer;
}
.delete_btn{
  background: white;
  border: 2px solid #FF0000;
  color: #FF0000;
}
.delete_btn:hover{
  background: #FF0000;
  color: white;
  cursor: pointer;
}

.applications_event_section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0px;
  border-bottom: 1px solid #787474;
}
.filter_left_section {
}
.applications_event_title {
  margin-bottom: 7px;
}
.filter_link {
  margin-right: 15px;
}
.filter_link:hover {
  cursor: pointer;
  color: #7567F8;
}
.filter_right_section {
}

.orders_event_section{
  margin-top: 30px;
}
.dropdown{
  width: 300px;
}
.popup_text{
  text-align: center;
  font-size: 18px;
}
.closed_message{
  display: flex;
  justify-content: center;
}
</style>
