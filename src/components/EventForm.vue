<template>
  <!--Конструктор івента-->
  <div class="event_designer">
    <h1 class="event_designer_title">Вибір події</h1>
    <form @submit.prevent>
      <el-form-item label="Назва події" class="event_designer_name_label block">
        <el-input style="width: 350%" v-model="post.EventName" placeholder="Введіть назву події"></el-input>
      </el-form-item>

      <el-form-item label="Вид події" class="event_designer_type_label el-form-item">
        <el-select v-model="post.TypeOfEvent" class="event_designer_type_input" placeholder="Виберіть тип вашої події" >
          <el-option v-for="type in EventTypes" :key="type.id" :label="type" :value="type"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item  class="event_designer_date_time_label el-form-item" label="Дата і час проведення">
        <el-col :span="11">
          <el-date-picker class="event_designer_date_time_input" type="date" placeholder="Оберіть дату"
                          v-model="DateOfEvent" style="margin-right: 20px;"
          @change="formatDate"></el-date-picker>
        </el-col>
        <el-col :span="11">
          <el-time-picker  placeholder="Оберіть час" v-model="TimeOfEvent" style="margin-left: 20px;"
          @change="formatTime"></el-time-picker>
        </el-col>
      </el-form-item>

      <p>{{ post.realData }}  {{ post.realTime }}</p>

      <el-form-item label="Необхідний персонал" class="event_designer_worker_label el-form-item">
        <el-select class="event_designer_worker_input"  v-model="post.workers" multiple placeholder="Виберіть необхідний персонал">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <div class="event_designer_necessary_personal_list_wrapper">
        <ul class="event_designer_necessary_personal_list">
          <li v-for="(worker, index) in post.workers" :key="worker">
            <div class="event_designer_necessary_personal_list_item">
              <p>{{ worker }}</p>
              <div class="counter">
                <el-input-number :min="1" :max="10" size="mini" v-model="post.num[index]"></el-input-number>
                <div class="work_salary">
                  <el-input type="number" v-model="post.PersonSalary[index]" size="mini" style="width: 220px;" placeholder="Плата виконавцю">
                    <template v-slot:append>
                      <el-select v-model="post.selectedCurrency" style="width: 70px;" placeholder=" ">
                        <el-option label="грн" value="1">грн</el-option>
                        <el-option label="$" value="2">$</el-option>
                        <el-option  label="€" value="3">€</el-option>
                        <el-option selected label="рубль" value="4">рубль</el-option>
                      </el-select>
                    </template>
                  </el-input>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <el-form-item label="Загальний бюджет" class="event_designer_budget_label block">
        <el-input type="number" v-model="post.EventBudget" placeholder="Введіть бюджет події" >
          <template v-slot:append>
            <el-select v-model="post.selectedCurrency" style="width: 100px;">
              <el-option label="грн" value="1">грн</el-option>
              <el-option label="$" value="2">$</el-option>
              <el-option  label="€" value="3">€</el-option>
              <el-option selected label="рубль" value="4">рубль</el-option>
            </el-select>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item label="Місто проведення події" class="event_designer_venue_label block">
        <el-select
          v-model="post.EventCity"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Введіть ваше місто">
          <el-option
            v-for="item in cities"
            :key="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Інформація про локацію" class="event_designer_about_location_label block">
      <el-input placeholder="Введіть площу локації" type="number" v-model="post.EventLocationArea" class="input-with-select">
        <template v-slot:prepend>
        <el-select v-model="post.EventLocationType"  placeholder="Тип локації" style="width: 150px;">
          <el-option label="Ресторан" value="1"></el-option>
          <el-option label="Квартира" value="2"></el-option>
          <el-option label="Природа" value="3"></el-option>
        </el-select>
        </template>
        <template v-slot:append>кв.м.</template>
      </el-input>
      </el-form-item>

      <el-form-item label="Кількість гостей" class="event_designer_number_guests_label block">
      <el-input placeholder="Введіть кількість гостей" type="number" v-model="post.EventNumberGuests" style="width: 113%;">
        <template v-slot:append>осіб</template>
      </el-input>
      </el-form-item>

      <el-form-item label="Опис події" class="event_designer_about_event_label block">
      <el-input
        type="textarea"
        placeholder="Введіть детальний опис події"
        :autosize="{ minRows: 4, maxRows: 8}"
        v-model="post.EventAboutInfo"
        maxlength="500"
        show-word-limit
        style="width: 227%;"
      >
      </el-input>
      </el-form-item>
<!--Прикріплення файлів (нада доробить)-->
      <div class="input__wrapper">
        <input  type="file" id="files" ref="files" name="file" class="input input__file" multiple v-on:change="handleFileUploads()">
        <label for="files" class="input__file-button">
          <span class="input__file-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25px" version="1.1" height="512px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" class=""><g><g>
    <g fill="#1D1D1B">
      <path d="M64,41.733c0-1.345-1.089-2.435-2.435-2.435c-1.347,0-2.436,1.09-2.436,2.435v14.115H4.946V41.733    c0-1.345-1.089-2.435-2.437-2.435c-1.346,0-2.435,1.09-2.435,2.435v15.535c0,0.18,0.067,0.338,0.103,0.507    c-0.035,0.169-0.103,0.328-0.103,0.507c0,1.345,1.089,2.436,2.435,2.436h59.056c1.346,0,2.435-1.091,2.435-2.436    c0-0.179-0.064-0.338-0.102-0.507C63.936,57.606,64,57.448,64,57.269V41.733z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#909399"/>
      <path d="m32.19,2.967c-1.346,0-2.437,1.091-2.437,2.436v35.576l-10.605-10.607c-0.951-0.951-2.492-0.951-3.443,0s-0.951,2.493 0,3.444l14.764,14.764c0.475,0.476 1.099,0.713 1.722,0.713 0.622,0 1.245-0.238 1.722-0.713l14.764-14.764c0.951-0.951 0.951-2.493 0-3.444-0.952-0.951-2.493-0.951-3.443,0l-10.609,10.607v-35.576c0-1.345-1.089-2.436-2.435-2.436z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#909399"/>
    </g>
  </g></g> </svg>
          </span>
          <span v-if="files.length<1" class="input__file-button-text">Прикріпити файли</span>
          <span v-else class="input__file-button-text">Прикріплених файлів:{{ files.length }}</span>
        </label>
        <ul class="file_list">
          <li  v-for="file in files" :key="file" v-on:mouseenter="show = true" v-on:mouseleave="show = false">
                <a><i class="document_icon far fa-file-alt"></i>{{ file.name }}</a>
                <div>
                  <transition name="fade">
                <i v-if="show" class="far fa-trash-alt"></i>
                  </transition>
                </div>
          </li>
        </ul>
      </div>
    </form>
    <button @click="created">Створити подію</button>
    <p> {{ post.EventName }}</p>
    <div>
      <ul>
        <li v-for="(worker, index) in post.workers" :key="worker">
          <p>{{ worker }} {{ num[index] }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import im from '../assets/img/event-img.png'
export default {
  name: 'EventForm',
  data () {
    return {
      post: {
        EventName: '',
        TypeOfEvent: '',
        realData: '',
        realTime: '',
        workers: [],
        num: [1, 1, 1, 1, 1, 1, 1, 1],
        PersonSalary: [],
        selectedCurrency: '',
        EventBudget: '',
        EventCity: '',
        EventLocationArea: '',
        EventLocationType: '',
        EventNumberGuests: '',
        EventAboutInfo: '',
        image: im
      },
      options: [{
        value: 'Тамада',
        label: 'Тамада'
      }, {
        value: 'Музикант',
        label: 'Музикант'
      }, {
        value: 'Арендатор',
        label: 'Арендатор'
      }, {
        value: 'Постачальник продуктів',
        label: 'Постачальник продуктів'
      }, {
        value: 'Аніматор',
        label: 'Аніматор'
      }, {
        value: 'Декоратор',
        label: 'Декоратор'
      }, {
        value: 'Інше',
        label: 'Інше'
      }],
      im,
      EventTypes: ['День народження', 'Весілля', 'Корпоратив', 'Фестиваль'],
      cities: [{ value: 'Київ' }, { value: 'Харків' }, { value: 'Полтава' }, { value: 'Львів' }, { value: 'Одеса' }],
      files: [],
      show: '',
      DateOfEvent: '',
      TimeOfEvent: ''
    }
  },
  methods: {
    created () {
      // передаємо пости в action
      this.$store.dispatch('addNewPost', this.post)
      this.post = {
        EventName: '',
        TypeOfEvent: '',
        realData: '',
        realTime: '',
        workers: [],
        PersonSalary: [],
        selectedCurrency: '',
        EventBudget: '',
        EventCity: '',
        EventLocationArea: '',
        EventLocationType: '',
        EventNumberGuests: '',
        EventAboutInfo: '',
        image: im
      }
    },
    // createPost () {
    //   this.post.id = Date.now()
    //   this.$emit('create', this.post)
    //   this.post = {
    //     EventName: ''
    //   }
    // },
    handleFileUploads () {
      this.files = this.$refs.files.files
      console.log(this.files)
    },
    formatDate () {
      let dd = this.DateOfEvent.getDate()
      if (dd < 10) dd = '0' + dd

      let mm = this.DateOfEvent.getMonth() + 1
      if (mm < 10) mm = '0' + mm

      let yy = this.DateOfEvent.getFullYear() % 100
      if (yy < 10) yy = '0' + yy

      this.post.realData = dd + '.' + mm + '.' + yy
    },
    formatTime () {
      // this.realTime = this.post.TimeOfEvent.toTimeString().replace(/ .*/, '')
      let dd = this.TimeOfEvent.getHours()
      if (dd < 10) dd = '0' + dd

      let mm = this.TimeOfEvent.getMinutes()
      if (mm < 10) mm = '0' + mm
      this.post.realTime = dd + ':' + mm
    }
  }
}
</script>

<style scoped>
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
.el-form-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 22px;
}
.event_designer_necessary_personal_list{
  list-style: none;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 80%;
}
.event_designer_necessary_personal_list_item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.event_designer_worker_input{
  width: 140%;
}
.counter{
  display: flex;
  align-items: center;
}
.work_salary{
  margin-left: 20px;
}
.input__wrapper {
  width: 100%;
  position: relative;
  margin: 15px 0;
  text-align: center;
}

.input__file {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}

.input__file-icon-wrapper {
  height: 40px;
  width: 60px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #DCDFE6;
}

.input__file-button-text {
  line-height: 1;
  margin-top: 1px;
}

.input__file-button {
  width: 100%;
  max-width: 245px;
  height: 40px;
  background: #F5F7FA;
  color: #909399;
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 3px;
  border: 1px solid #DCDFE6;
  cursor: pointer;
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
.document_icon{
  margin-right: 5px;
}
</style>
