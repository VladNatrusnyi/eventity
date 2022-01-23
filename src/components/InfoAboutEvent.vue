<template>
    <div class="info_about_event">
      <h3 class="info_about_event_sub">Назва події</h3>
      <h4 class="info_about_event_title">  </h4>
      <p class="info_about_event_subtitle">Вид події</p>
      <h4 class="info_about_event_type"></h4>
      <p class="info_about_event_subtitle">Дата і час проведення події</p>
      <h4 class="info_about_event_date_time">
      </h4>
      <h4 class="info_about_event_description">  </h4>
      <br>
      <br>
      <br>
      <br><br>
      <br>
    </div>
</template>

<script>
export default {
  name: 'InfoAboutEvent'
}
</script>

<style scoped>
.info_about_event{
  width: 25%;
  background: #FFFFFF;
  box-shadow: 0px 4px 100px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 15px;
}
.info_about_event_title{
  text-align: center;
}
.info_about_event_subtitle{
  margin-top: 10px;
}
</style>
