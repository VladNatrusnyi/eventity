<template>
  <Toast />
  <board class="board" :title="'Облікові дані'" :isActive="true">
    <template v-slot:main_content>
      <div class="main_data_item">
        <p class="main_data_title">Прізвище:</p>
        <div class="main_data_input">
          <div class="field">
            <span class="p-float-label">
              <InputText id="inputtext" class="input_width" type="text" v-model="userInfo.surname" />
              <label for="inputtext">Введіть ваше прізвище</label>
            </span>
          </div>
        </div>
      </div>

      <div class="main_data_item">
        <p class="main_data_title">Ім'я:</p>
        <div class="main_data_input">
          <div class="field">
            <span class="p-float-label">
              <InputText id="inputname" class="input_width" type="text" v-model="userInfo.name" />
              <label for="inputname">Введіть ваше ім'я</label>
            </span>
          </div>
        </div>
      </div>

      <div class="main_data_item">
        <div class="main_data_title">Аватар:
          <div class="avatar_field"></div>
        </div>
        <div class="main_data_input">
          <FileUpload mode="basic" name="demo[]" url="./upload" :auto="true" />
        </div>
      </div>

      <div class="main_data_item">
        <p class="main_data_title">Вік:</p>
        <div class="main_data_input">
          <div class="field">
            <span class="p-float-label">
              <InputNumber id="inputage" class="input_width" v-model="userInfo.age" />
              <label for="inputage">Введіть ваш вік</label>
            </span>
          </div>
        </div>
      </div>

      <div class="main_data_item">
        <p class="main_data_title">Країна:</p>
        <div class="main_data_input">
          <div class="field">
            <span class="p-float-label">
              <InputText id="inputcountry" class="input_width" type="text" v-model="userInfo.location.country" />
              <label for="inputcountry">Введіть вашу країну</label>
            </span>
          </div>
        </div>
      </div>

      <div class="main_data_item">
        <p class="main_data_title">Місто:</p>
        <div class="main_data_input">
          <div class="field">
            <span class="p-float-label">
              <InputText id="inputcity" class="input_width" type="text" v-model="userInfo.location.city" />
              <label for="inputcity">Введіть ваше місто</label>
            </span>
          </div>
        </div>
      </div>

<!--      <div class="btn_wrapper">-->
<!--        <my-button class="btn" @click="sendResponse" :class="{error: errorSignal}">Зберегти зміни</my-button>-->
<!--      </div>-->
    </template>
  </board>
  <board class="board" :title="'Контакти / Про мене / Різне'" :isActive="true">
    <template v-slot:main_content>
      <div class="contact_block">
        <p class="contact_block_title">Контакти</p>
        <div class="contact_block_wrapper">
          <div class="left_section">
            <div class="contact_item">
              <div class="contact_item_input">
                <label for="contact-email" class="input_label">E-mail:</label>
                <InputText id="contact-email" class="input_width" type="text" v-model="userInfo.contacts.email" />
              </div>
            </div>
            <div class="contact_item">
              <div class="contact_item_input">
                <label for="phonenumber" class="input_label">Мобільний телефон:</label>
                <InputMask id="phonenumber" v-model="userInfo.contacts.phone" class="input_width" mask="(+380) 999-999-999" />
              </div>
            </div>
            <div class="contact_item">
              <div class="contact_item_input">
                <label for="website" class="input_label">Сайт:</label>
                <InputText id="website" class="input_width" type="text" v-model="userInfo.contacts.website" />
              </div>
            </div>
          </div>
          <div class="right_section">
            <div class="contact_item">
              <div class="contact_item_input">
                <label for="skype" class="input_label">Skype:</label>
                <InputText id="skype" class="input_width" type="text" v-model="userInfo.contacts.skype" />
              </div>
            </div>
            <div class="contact_item">
              <div class="contact_item_input">
                <label for="instagram" class="input_label">Instagram:</label>
                <InputText id="instagram" class="input_width" type="text" v-model="userInfo.contacts.instagram" />
              </div>
            </div>
            <div class="contact_item">
              <div class="contact_item_input">
                <label for="telegram" class="input_label">Telegram:</label>
                <InputText id="telegram" class="input_width" type="text" v-model="userInfo.contacts.telegram" />
              </div>
            </div>
          </div>
        </div>
      <div class="contact_block">
        <p class="contact_block_title">Заголовок вашої сторінки</p>
        <div class="contact_item">
          <div class="contact_item_input">
            <InputText id="page_title" style="width: 80%;" type="text" v-model="userInfo.profileTitle" />
          </div>
        </div>
      </div>
        <div class="contact_block">
          <p class="contact_block_title">Про мене</p>
          <p class="contact_block_subtitle">Ця інформація буде відображатися при перегляді вашого профілю</p>
          <div class="contact_item">
            <div class="contact_item_input">
              <Editor v-model="userInfo.aboutInfo" editorStyle="height: 320px" class="editor" style="width: 80%;"/>
            </div>
          </div>
        </div>
      </div>
      <div class="btn_wrapper">
        <my-button data-title="Ви не зробили ніяких змін" :disabled="btnDisabled" :class="[btnDisabled ? 'disable' : 'btn', '']" @click="changeUserInfo">Зберегти зміни</my-button>
      </div>
    </template>
  </board>
</template>

<script>
import Board from '../UI/Board'
import MyButton from '../UI/MyButton'
import Toast from 'primevue/toast'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProfileSettings',
  props: {
    prop: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      userInfo: {
        name: this.prop.name,
        surname: this.prop.surname,
        avatar: this.prop.avatar,
        age: this.prop.age,
        location: {
          city: this.prop.location.city,
          country: this.prop.location.country
        },
        contacts: {
          email: this.prop.contacts.email,
          phone: this.prop.contacts.phone,
          website: this.prop.contacts.website,
          skype: this.prop.contacts.skype,
          instagram: this.prop.contacts.instagram,
          telegram: this.prop.contacts.telegram
        },
        profileTitle: this.prop.profileTitle,
        aboutInfo: this.prop.aboutInfo,
        rating: this.prop.rating
      },
      btnDisabled: true
    }
  },
  components: {
    Board,
    MyButton,
    Toast
  },
  mounted () {
    this.$toast.add({ severity: 'info', summary: 'Будьте уважні', detail: 'Не забувайте зберігати внесені вами зміни', life: 5000 })
  },
  methods: {
    ...mapActions([
      'CHANGE_USER_INFO'
    ]),
    changeUserInfo () {
      this.CHANGE_USER_INFO(this.userInfo)
      if (this.UPDATE_USER_INFO_ERROR) {
        this.$toast.add({ severity: 'error', summary: 'Помилка', detail: 'На жаль, при внесенні змін до вашого профілю виникли неполадки. Перезавантажте сторінку і спробуйте знову', life: 3000 })
      } else {
        this.$toast.add({ severity: 'success', summary: 'Вітаємо', detail: 'Всі зміни успішно внесені', life: 3000 })
      }
    }
  },
  watch: {
    userInfo: {
      handler (newValue, oldValue) {
        console.log('changedProfile')
        this.btnDisabled = false
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters([
      'UPDATE_USER_INFO_ERROR'
    ])
  }
}
</script>

<style scoped>
.board{
  margin: 25px 0px 40px 0px;
}
.main_data_item{
  display:flex;
  align-items: center;
  margin-bottom: 40px;
}
.main_data_title{
  flex: 0 1 400px;
  color: #5B5B5B;
  font-weight: 400;
  font-size: 20px;
  line-height: 95.19%;
}
.main_data_input{
  flex: 1 1 100%;
}
.input_width{
  width: 300px;
}
.avatar_field{
  width: 100px;
  height: 100px;
  background: #C4C4C4;
  border-radius: 50%;
  margin-top: 7px;
}
.btn_wrapper{
  display: flex;
  justify-content: center;
}
.btn{
  background: white;
  border: 2px solid #7567F8;
  color: #7567F8;
  display: block;
}
.btn:hover {
  background: #7567F8;
  color: white;
  cursor: pointer;
}
.disable{
  background: white;
  border: 2px solid #5B5B5B;
  color: #5B5B5B;
  display: block;
  position: relative;
}
.disable:hover{
  cursor: not-allowed;
}
.disable:hover::after {
  width: 140px;
  content: attr(data-title);
  position: absolute;
  left: 50px;
  right: 0;
  bottom: 55px;
  z-index: 1;
  background: #5B5B5B;
  color: #fff; /* Цвет текста */
  text-align: center; /* Выравнивание текста по центру */
  font-family: Arial, sans-serif; /* Гарнитура шрифта */
  font-size: 11px; /* Размер текста подсказки */
  padding: 5px 10px; /* Поля */
  border: 1px solid #333; /* Параметры рамки */
  border-radius: 5px;
}
.btn.error{
  border: 2px solid red;
}

.contact_block_title{
  font-weight: 600;
  font-size: 20px;
  line-height: 95.19%;
  color: #5B5B5B;
  margin-bottom: 20px;
}
.input_label{
  display: block;
  font-weight: 400;
  font-size: 18px;
  line-height: 95.19%;
  color: #5B5B5B;
  margin-bottom: 10px;
}
.contact_item_input{
  margin-bottom: 30px;
}
.contact_block_wrapper{
  display: flex;
  align-items: center;
}
.right_section{
  flex: 0 1 50%;
}
.left_section{
  flex: 0 1 50%;
}
.contact_block_subtitle{
  font-weight: 400;
  font-size: 16px;
  line-height: 95.19%;
  color: #5B5B5B;
  margin-bottom: 10px;
}
</style>
