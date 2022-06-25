<template>
  <Toast />
  <!--Конструктор івента-->
  <div class="content">
    <info-about-event
    :new_event_data="newEventData"
    />
    <div class="event_designer">
      <h1 class="event_designer_title">Вибір події</h1>
      <form @submit.prevent>
        <div class="input_section">
          <label for="inputtext" class="input_label">Назва події</label>
          <InputText
            id="inputtext"
            type="text"
            v-model="newEventData.EventName"
            class="inputs"
            placeholder="Введіть назву події"
          />
        </div>

        <div class="input_section">
          <label class="input_label">Виберіть тип вашої події</label>
          <Dropdown
            v-model="newEventData.TypeOfEvent"
            :options="EventTypes"
            optionLabel="name"
            class="inputs"
            placeholder="Виберіть тип ваої події"/>
        </div>

        <div class="input_section">
          <label class="input_label">Дата і час проведення</label>
          <Calendar
            v-model="eventTime"
            :showTime="true"
            :showButtonBar="true"
            dateFormat="dd.mm.yy"
            class="inputs"
            placeholder="Введіть дату і час події" />
        </div>

        <div class="input_section">
          <label class="input_label">Необхідний персонал</label>
          <div style="display:flex; align-items:center; gap:20px">
            <MultiSelect
              v-model="newEventData.workers"
              :options="options"
              :filter="true"
              optionLabel="value"
              class="inputs"
              display="chip"
              placeholder="Оберіть тип виконавця"/>
            <div style="display:flex; align-items:center; gap:10px">
              <InputText
                type="text"
                v-model="myNewWorker.value"
                class="inputs own_worker_input"
                placeholder="Введіть власний варіант"
              />
              <button class="add_own_worker" @click="addOwnWorker" >Додати</button>
            </div>
          </div>
          <div class="active_workers_list">
            <div
              v-for="(item, index) in newEventData.workers"
              :key="item.value"
              class="active_workers_list_item"
            >
              <p style="font-size: 18px; flex: 1 0 30%;">{{ item.value }}</p>
              <InputNumber
                v-model="item.couple"
                showButtons buttonLayout="horizontal"
                decrementButtonClass="p-button-danger"
                incrementButtonClass="p-button-success"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                :min="1"
              />
              <div style="display:flex; align-items: center; margin: 0px 20px;">
                <InputText
                  type="number"
                  v-model="item.salary"
                  class="salary_to_worker_input"
                  placeholder="Введіть власний варіант"
                />
                <div class="p-inputgroup-addon">грн</div>
              </div>
              <i @click="deleteFromWorkerList(index)" class="pi pi-times-circle"></i>
            </div>
          </div>
        </div>

        <div class="input_section" >
          <label  class="input_label block">Загальний бюджет</label>
          <div style="display:flex; align-items: center;">
            <InputText
              type="number"
              v-model="newEventData.EventBudget"
              class="inputs"
              placeholder="Введіть бюджет події"
              style=" border-top-right-radius: 0px;border-bottom-right-radius: 0px;"
            />
            <span class="p-inputgroup-addon" style="height: 46px;">
             грн
          </span>
          </div>
        </div>

        <div class="input_section">
          <label class="input_label">Місто проведення події</label>
          <InputText
            type="text"
            v-model="newEventData.EventCity"
            class="inputs"
            placeholder="Введіть ваше місто"
          />
        </div>

        <div class="input_section">
          <label class="input_label">Інформація про локацію</label>
          <div style="display:flex; align-items: center;">
            <Dropdown
              v-model="newEventData.EventLocationType"
              :options="LocationTypes"
              optionLabel="name"
              placeholder="Тип локації"
              style="background: #e9ecef;border-top-right-radius: 0px;border-bottom-right-radius: 0px;"
            />
            <InputText
              type="number"
              v-model="newEventData.EventLocationArea"
              class="inputs"
              placeholder="Введіть площу локації"
              style=" border-radius: 0px!important; max-width: 220px;"
            />
            <span class="p-inputgroup-addon" style="height: 46px;">
             кв.м.
          </span>
          </div>
        </div>

        <div class="input_section" >
          <label  class="input_label block">Кількість гостей</label>
          <div style="display:flex; align-items: center;">
            <InputText
              type="number"
              v-model="newEventData.EventNumberGuests"
              class="inputs"
              placeholder="Введіть кількість гостей"
              style=" border-top-right-radius: 0px;border-bottom-right-radius: 0px;"
            />
            <span class="p-inputgroup-addon" style="height: 46px;">
             осіб
          </span>
          </div>
        </div>

        <div class="input_section">
          <label for="inputtext" class="input_label">Опис події</label>
          <Editor id="inputtext" v-model="newEventData.EventAboutInfo" editorStyle="height: 300px" class="editor" placeholder="Введіть детальний опис події"/>
        </div>

        <div class="input_section  upload_section">
          <input id="file-input" type="file" name="file" multiple>
          <label class="upload_label" for="file-input"><i class="pi pi-upload"></i>Прикріпити файли</label>
        </div>
      </form>
      <div class="send_buttom_wrapper">
        <button class="send_btn" @click="createNewEvent">Створити подію</button>
      </div>
    </div>
  </div>
</template>

<script>
import InfoAboutEvent from './InfoAboutEvent'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'EventForm',
  components: {
    InfoAboutEvent
  },
  data () {
    return {
      eventTime: '',
      myNewWorker: { value: '', couple: 1, salary: '' },
      newEventData: {
        creatorId: '',
        EventName: '',
        TypeOfEvent: '',
        realTime: '',
        workers: '',
        EventBudget: '',
        EventCity: '',
        EventLocationArea: '',
        EventLocationType: '',
        EventNumberGuests: '',
        EventAboutInfo: '',
        CreationDate: '',
        isActive: true
      },
      options: [
        { value: 'Тамада', couple: 1, salary: '' },
        { value: 'Музикант', couple: 1, salary: '' },
        { value: 'Арендатор', couple: 1, salary: '' },
        { value: 'Постачальник продуктів', couple: 1, salary: '' },
        { value: 'Аніматор', couple: 1, salary: '' },
        { value: 'Декоратор', couple: 1, salary: '' }
      ],
      EventTypes: [
        { name: 'День народження', code: 'BD' },
        { name: 'Весілля', code: 'WD' },
        { name: 'Корпоратив', code: 'CD' },
        { name: 'Фестиваль', code: 'FD' }
      ],
      LocationTypes: [
        { name: 'Ресторан', code: '1' },
        { name: 'Природа', code: '1' },
        { name: 'Концертний зал', code: '3' }
      ]
    }
  },
  methods: {
    ...mapActions([
      'ADD_NEW_EVENT'
    ]),
    check () {
      console.log(this.newEventData.realTime.toLocaleTimeString([], { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }))
    },
    addOwnWorker () {
      const vm = this
      vm.newEventData.workers.push(this.myNewWorker)
      vm.myNewWorker = { value: '', couple: 1, salary: '' }
    },
    deleteFromWorkerList (index) {
      this.newEventData.workers.splice(index, 1)
    },
    createNewEvent () {
      if (this.newEventData.EventName === '') {
        this.$toast.add({ severity: 'error', summary: 'Помилка видалення', detail: 'Ви не ввели дані', life: 3000 })
      } else {
        this.newEventData.realTime = JSON.stringify(this.eventTime.toString())
        const creationDate = new Date()
        this.newEventData.CreationDate = JSON.stringify(creationDate.toString())
        this.newEventData.creatorId = this.user
        this.ADD_NEW_EVENT(this.newEventData)
        this.$toast.add({ severity: 'success', summary: 'Вітаємо', detail: 'Ваша подія створена', life: 3000 })
        this.$router.push('/')
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  }
}
</script>

<style scoped>
.content{
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.send_btn{
  font-size: 20px;
  border-radius: 7px;
  border: 2px solid #7568F8;
  background: #fff;
  padding: 7px 15px;
}
.send_btn:hover{
  background: #7568F8;
  color: #fff;
  cursor:pointer;
}
.send_buttom_wrapper{
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.pi-upload{
  margin-right: 10px;
}
.upload_label{
  font-size: 18px;
  padding: 7px 20px;
  background: #e9ecef;
  border-radius: 7px;
  border: 1px solid #ced4da;
}
.upload_label:hover{
  cursor: pointer;
  background: #7568F8;
  color: white;
  border: 1px solid #7568F8;
}
.upload_section{
  position: relative;
  z-index: 10;
}
.upload_section input[type=file]{
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  position: absolute;
  z-index: -10;
}
.pi-times-circle{
  font-size: 1.3rem;
  color: darkgrey;
}
.pi-times-circle:hover{
  color: #7568F8;
  cursor: pointer;
}
.p-inputgroup-addon{
  height: 30px;
  width: 30px;
}
.salary_to_worker_input{
  height: 30px;
  width: 100px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.active_workers_list_item{
  width: 75%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
}
/deep/.p-inputtext.p-component.p-inputnumber-input.p-inputnumber-input{
  width: 40px!important;
  height: 30px;
}
/deep/.p-button{
  width: 30px!important;
  height: 30px;
  background: #dbdbdb!important;
  color: #000!important;
  border: none!important;
}
/deep/.p-button:hover{
  background: #7568F8!important;
}
.own_worker_input{
  flex: 1 1 auto;
}
.add_own_worker{
  width: 100px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid #7568F8;
  background: #ffffff;
  font-size: 16px;
}
.add_own_worker:hover{
  cursor: pointer;
  color: #fff;
  background: #7568F8;
}
.input_label{
  display:block;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
}
.input_section{
  margin-bottom: 20px;
}
.inputs{
  /*height: 40px;*/
  width: 35%;
}
.event_designer{
  width: 73%;
  background: #FFFFFF;
  box-shadow: 0px 4px 100px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 40px;
}
/*Стилі для конструктора*/
.event_designer_title{
  text-align: center;
}
.file_list li{
  list-style: none;
  display: flex;
  justify-content: space-between;
  width: 30%;
  margin-top: 5px;
  padding: 3px 4px;
  transition: all 0.1s ease-out;
}
.file_list li:hover{
  background-color: #F5F7FA ;
  border-radius: 3px;
  transition: all 0.1s ease-out;
}
.block{
  display: block;
}
.input_section{
  max-width: 600px;
}
</style>
