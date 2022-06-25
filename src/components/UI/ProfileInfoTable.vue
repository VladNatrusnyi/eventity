<template>
  <div class="about_section" ref="information">
    <div class="description_part shadow">
        <h2 class="description_part_title">{{user.profileTitle}}</h2>
        <div v-html="user.aboutInfo" class="description_part_text"></div>
      </div>
      <div class="nav_part shadow">
        <div class="nav_link"
             v-for="(item, index) in nav_links"
             :key="index"
             :class="{active: item.isActive}"
             @click="activateLink(item)"
        >
          <div>{{ item.name }}</div>
        </div>
     </div>
    <div class="contacts_part shadow">
      <h2 class="contacts_part_title">Контакти</h2>
      <div class="contacts_part_item"
           v-for="item in contacts"
           :key="item.title"
      >
        <div v-if="item.content !== ''">
          <p class="contacts_part_item_title">{{ item.title }}</p>
          <p class="contacts_part_item_content">{{ item.content }}</p>
        </div>
      </div>
    </div>
  </div>
  <br><br>
  <div ref="reviews" class="reviews_section">
    <comments :recipient="user.id"/>
  </div>
</template>

<script>
import Comments from '../UserProfile/Comments'

export default {
  name: 'ProfileInfoTable',
  data () {
    return {
      nav_links: [{ name: 'Інформація', isActive: true }, { name: 'Відгуки', isActive: false }],
      contacts: [
        { title: 'E-mail', content: this.user.contacts.email },
        { title: 'Мобільний телефон', content: this.user.contacts.phone },
        { title: 'Сайт', content: this.user.contacts.website },
        { title: 'Skype', content: this.user.contacts.skype },
        { title: 'Instagram', content: this.user.contacts.instagram },
        { title: 'Telegram', content: this.user.contacts.telegram }
      ]
    }
  },
  components: {
    Comments
  },
  props: {
    user: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  methods: {
    activateLink (item) {
      const active = this.nav_links.find((i) => { return i.isActive })
      active && (active.isActive = false)

      item.isActive = !item.isActive
      if (item.name === 'Відгуки') {
        this.$refs.reviews.scrollIntoView({ block: 'center', behavior: 'smooth' })
      }
      if (item.name === 'Інформація') {
        this.$refs.information.scrollIntoView({ block: 'center', behavior: 'smooth' })
      }
    }
  }
}
</script>

<style scoped>
.shadow{
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);
  padding: 20px;
}
.about_section{
  display: grid;
  grid-template-columns: 10fr 3fr;
  grid-template-rows: auto 1fr;
  grid-template-areas: "description nav" "description contacts";
  gap: 15px;
}
.description_part{
  grid-area: description;
}
.nav_part{
  grid-area: nav;
}
.contacts_part{
  grid-area: contacts;
}
.nav_link{
  margin-bottom: 10px;
  font-weight: 400;
  text-decoration: none;
  color: black;
  display: block;
}
.nav_link:hover{
  cursor: pointer;
  /*color: #7567F8;*/
}
.active{
  font-weight: 600;
}
.description_part_title{
  margin-bottom: 15px;
}

.contacts_part_title{
  display: flex;
  justify-content: center;
}
.contacts_part_item{
  margin-top: 10px;
}
.contacts_part_item_title{
  font-weight: 600;
  margin-bottom: 5px;
}
.contacts_part_item_content{
  color: #5B5B5B;
}
</style>
