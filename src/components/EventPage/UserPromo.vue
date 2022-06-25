<template>
  <div class="creator_section" >
    <div class="avatar_wrapper" :style="'width:'+ size + 'px;'">
      <img :src=" require('../../assets/img/unnamed.png')" alt="" class="avatar">
    </div>
    <div class="creator_info_wrapper">
      <p class="creator_name">{{ user_info.name }} {{ user_info.surname }}</p>
      <p class="creator_info">{{user_info.age}} років, {{ user_info.location.country }}/{{ user_info.location.city }}</p>
      <Rating v-model="rating" :cancel="false" :readonly="true"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserPromo',
  props: {
    user_info: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    size: {
      type: Number,
      default: 100
    }
  },
  computed: {
    rating () {
      const rating = this.user_info.rating
      return rating
    }
  }
}
</script>

<style scoped>
.creator_section{
  display: flex;
  align-items: flex-start;
  margin: 15px 0px 20px 0px;
}
.avatar_wrapper{

  object-fit: cover;
  margin-right: 20px;
}
.avatar{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.creator_info_wrapper{}
.creator_name{
  font-weight: 700;
  font-size: 22px;
  margin-bottom: 7px;
}
.creator_info{
  margin-bottom: 7px;
}
/deep/.p-rating-icon.pi.pi-star-fill{
  color: gold;
}
</style>
