<template>
  <div class="main_page">
<!--    <img class="head_bg_img" src="./../assets/Rectangle3.png" alt="">-->
    <div class="container">
      <div class="head_wrapper">
        <div class="head_text_part">
          <h1 class="head_title">Зробіть ваше <br> свято незабутнім</h1>
          <p class="head_subtitle">Lorem ipsum dolor sit amet, consectetur <br> adipiscing elit, sed do amm</p>
          <div @click="onClickCreate" class="head_button">Створити подію</div>
        </div>
        <img class="head_img" src="./../assets/Landing.png" alt="">
      </div>
  </div>
  </div>
  <div class="tab_section">
    <div class="container">
      <div style="display: flex">
<!--        інформація для виконавця-->
        <div v-if="artist" class="info_part">
          <div class="first_title">Виконавцеві</div>
          <p class="tab_title">Знайдіть роботу по своїм навичкам</p>
          <div class="search_work_block">
            <p class="search_work_block_text">Розміщуйте свої вміння, навички та <br> вудгукуйтеся на підходящий вам проект</p>
            <div class="search_work_block_btn">Знайти роботу</div>
          </div>
          <div class="task_block">
            <div class="task_block_btn">Всі завдання і вакансії</div>
            <p class="task_link bold">День народження</p>
            <p class="task_link bold">Весілля</p>
            <p class="task_link">Корпоративи</p>
            <p class="task_link">Річниці</p>
            <p class="task_link">Фестивалі</p>
            <p class="task_link">Карнавали</p>
            <p class="task_link">Корпоративи</p>
            <p class="task_link">Річниці</p>
            <p class="task_link">Фестивалі</p>
            <p class="task_link">Карнавали</p>
          </div>
        </div>
<!--        інформація для замовника-->
        <div v-if="customer" class="info_part">
          <div class="first_title">Замовнику</div>
          <p class="tab_title">Розмісти завдання за 3 хвилини</p>
          <div class="search_work_block">
            <p class="search_work_block_text">Розміщуйте завдання, проект або <br> вакансію-це безкоштовно</p>
            <div class="search_work_block_btn">Створити подію</div>
          </div>
          <div class="task_block">
            <div class="task_block_btn">Каталог виконавців</div>
            <p class="task_link bold">День народження</p>
            <p class="task_link bold">Весілля</p>
            <p class="task_link">Корпоративи</p>
            <p class="task_link">Річниці</p>
            <p class="task_link">Фестивалі</p>
            <p class="task_link">Карнавали</p>
            <p class="task_link">Корпоративи</p>
            <p class="task_link">Річниці</p>
            <p class="task_link">Фестивалі</p>
            <p class="task_link">Карнавали</p>
          </div>
        </div>
        <div class="tab_part">
          <div class="tabs_btn_wrap">
            <div class="customer_btn tab_button" :class="{active:customer}" @click="openCustomer">Замовник </div>
            <p style="font-size: 24px; margin: 0px 5px;"> / </p>
            <div class="artist_btn tab_button" :class="{active:artist}" @click="openArtist"> Виконавець</div>
          </div>
<!--          Таб лінки для виконавця-->
          <div v-if="artist" class="tab_section_link_wrapper">
            <div class="tab_section_link">Знайти роботу</div>
            <div class="tab_section_link">Розмістити портфоліо</div>
          </div>
<!--          Таб лінки для виконавця-->
          <div v-if="customer" class="tab_section_link_wrapper">
            <div class="tab_section_link">Розмістити завдання</div>
            <div class="tab_section_link">Знайти виконавця</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <img style="width: 100%;" src="./../assets/Rectangle4.png" alt="">
</template>
<script>
export default {
  name: 'MainPage',
  data () {
    return {
      customer: false,
      artist: true
    }
  },
  methods: {
    openCustomer () {
      this.customer = true
      this.artist = false
    },
    openArtist () {
      this.customer = false
      this.artist = true
    },
    onClickCreate () {
      this.$router.push('/CreateEvent')
    }
  }
}
</script>
<style scoped>
.tab_section{
  margin-top: 20px;
  margin-bottom: 20px;
}
.tab_part{
  flex: 0 1 30%;
  padding: 20px;
  border-left: 3px solid #7567F8;
  margin-left: 20px;
}
.tabs_btn_wrap{
  display:flex;
  align-items: center;
  margin-bottom: 20px;
}
.tabs_btn_wrap:hover{
  cursor: pointer;
}
.customer_btn{}
.tab_button{
  font-size: 24px;
  text-decoration-line: underline;
  color: #7567F8;
}
.active{
  font-weight: 700;
  font-size: 24px;
  color: black;
  text-decoration-line: none;
}
.artist_btn{}
.tab_section_link{
  font-weight: 300;
  font-size: 18px;
  text-decoration-line: underline;
  color: #3D2C2C;
  margin-bottom: 15px;
}
.tab_section_link:hover{
  color: #000;
  cursor:pointer;
}
.info_part{
  flex: 0 1 70%;
}
.first_title{
  font-weight: 400;
  font-size: 16px;
  color: #535166;
}
.tab_title{
  font-weight: 700;
  font-size:28px;
  margin-bottom: 30px;
}
.search_work_block{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}
.search_work_block_text{
  font-weight: 400;
  font-size: 18px;
}
.search_work_block_btn{
  display: inline-block;
  padding: 15px 40px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 16px;
  background: #7567F8;
}
.task_block{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 20px;
}
.task_block_btn{
  display: inline-block;
  padding: 15px 40px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 16px;
  background: #F8C828;
  margin-right: 30px;
  margin-bottom: 15px;
}
.task_link{
  margin-right: 30px;
  color: #3D2C2C;
  text-decoration-line: underline;
}
.task_link:hover{
  cursor:pointer;
}
.bold{
  text-decoration-line: underline;
  font-weight: 600;
  color: #000;
}
.main_page{
  background-image: url("./../assets/Rectangle3.png");
  width: 100%;
  height: 625px;
}
.head_wrapper{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.head_title{
  font-weight: 700;
  font-size: 50px;
  color:#fff;
  margin-bottom: 30px;
}
.head_subtitle{
  font-weight: 700;
  font-size: 16px;
  line-height: 28px;
  color:#fff;
  margin-bottom: 30px;
}
.head_button{
  display: inline-block;
  padding: 15px 40px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 16px;
  background: #08D9DC;
}
.head_button:hover{
  cursor:pointer;
  background: #08d9dcb3;
}
.head_img{
  width: 600px;
  height: 486px;
  margin-top: 15px;
}
</style>
