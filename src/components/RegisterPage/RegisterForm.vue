<template>
  <div class="validation_wrapper">
    <div class="form-demo">
      <Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
        <div class="flex align-items-center flex-column pt-6 px-3">
          <i class="pi pi-check-circle" :style="{fontSize: '5rem', color: 'var(--green-500)' }"></i>
          <h5>Registration Successful!</h5>
          <p :style="{lineHeight: 1.5, textIndent: '1rem'}">
            Your account is registered under name <b>{{name}}</b> ; it'll be valid next 30 days without activation. Please check <b>{{email}}</b> for activation instructions.
          </p>
        </div>
        <template #footer>
          <div class="flex justify-content-center">
            <Button label="OK" @click="toggleDialog" class="p-button-text" />
          </div>
        </template>
      </Dialog>

      <div class="flex justify-content-center">
        <div class="card">
          <h2 class="text-center">Реєстрація</h2>
          <decor-line class="decor_line" />
          <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
            <div class="field">
              <div class="p-float-label">
                <InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" />
                <label for="name" :class="{'p-error':v$.name.$invalid && submitted}">Name*</label>
              </div>
              <small v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error">{{v$.name.required.$message.replace('Value', 'Name')}}</small>
            </div>
            <div class="field">
              <div class="p-float-label">
                <InputText id="surname" v-model="v$.surname.$model" :class="{'p-invalid':v$.surname.$invalid && submitted}" />
                <label for="surname" :class="{'p-error':v$.surname.$invalid && submitted}">Surname*</label>
              </div>
              <small v-if="(v$.surname.$invalid && submitted) || v$.surname.$pending.$response" class="p-error">{{v$.surname.required.$message.replace('Value', 'Surname')}}</small>
            </div>
            <div class="field">
              <div class="p-float-label">
                <InputNumber id="age" v-model="v$.age.$model" :class="{'p-invalid':v$.age.$invalid && submitted}" />
                <label for="age" :class="{'p-error':v$.age.$invalid && submitted}">Age*</label>
              </div>
              <small v-if="(v$.age.$invalid && submitted) || v$.age.$pending.$response" class="p-error">{{v$.age.required.$message.replace('Value', 'Age')}}</small>
            </div>
            <div class="field">
              <div class="p-float-label">
                <InputText id="country" v-model="v$.location.country.$model" :class="{'p-invalid':v$.location.country.$invalid && submitted}" />
                <label for="country" :class="{'p-error':v$.location.country.$invalid && submitted}">Country*</label>
              </div>
              <small v-if="(v$.location.country.$invalid && submitted) || v$.location.country.$pending.$response" class="p-error">{{v$.location.country.required.$message.replace('Value', 'Country')}}</small>
            </div>
            <div class="field">
              <div class="p-float-label">
                <InputText id="country" v-model="v$.location.city.$model" :class="{'p-invalid':v$.location.city.$invalid && submitted}" />
                <label for="country" :class="{'p-error':v$.location.city.$invalid && submitted}">City*</label>
              </div>
              <small v-if="(v$.location.city.$invalid && submitted) || v$.location.city.$pending.$response" class="p-error">{{v$.location.city.required.$message.replace('Value', 'City')}}</small>
            </div>
            <div class="field">
              <div class="p-float-label p-input-icon-right">
                <i class="pi pi-envelope" />
                <InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"/>
                <label for="email" :class="{'p-error':v$.email.$invalid && submitted}">Email*</label>
              </div>
              <span v-if="v$.email.$error && submitted">
                            <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                            <small class="p-error">{{error.$message}}</small>
                            </span>
                        </span>
              <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">{{v$.email.required.$message.replace('Value', 'Email')}}</small>
            </div>
            <div class="field">
              <div class="p-float-label">
                <Password id="password" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask>
                  <template #header>
                    <h6>Pick a password</h6>
                  </template>
                  <template #footer="sp">
                    {{sp.level}}
                    <Divider />
                    <p class="mt-2">Suggestions</p>
                    <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                      <li>At least one lowercase</li>
                      <li>At least one uppercase</li>
                      <li>At least one numeric</li>
                      <li>Minimum 6 characters</li>
                    </ul>
                  </template>
                </Password>
                <label for="password" :class="{'p-error':v$.password.$invalid && submitted}">Password*</label>
              </div>
              <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">{{v$.password.required.$message.replace('Value', 'Password')}}</small>
            </div>
            <Button @click="register" type="submit" label="Зареєструватися" class="mt-2" />
            <div class="error_info_wrapper" v-if="error.includes('auth/email-already-in-use')">
              <p>Цей email вже використовується іншим акаунтом</p>
            </div>
            <p class="link_to_login" @click="toLogin">Я вже зареєстрований</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import DecorLine from '../UI/DecorLine'

export default {
  name: 'RegisterForm',
  components: {
    DecorLine
  },
  setup: () => ({ v$: useVuelidate() }),
  data () {
    return {
      name: '',
      surname: '',
      age: null,
      location: {
        country: '',
        city: ''
      },
      rating: 0,
      email: '',
      password: '',
      accept: null,
      submitted: false,
      showMessage: false
    }
  },
  validations () {
    return {
      name: {
        required
      },
      surname: {
        required
      },
      age: {
        required
      },
      location: {
        country: '',
        city: ''
      },
      email: {
        required,
        email
      },
      password: {
        required
      },
      accept: {
        required
      }
    }
  },
  methods: {
    ...mapActions([
      'registerUser'
    ]),
    register () {
      this.registerUser({
        email: this.email,
        password: this.password,
        name: this.name,
        surname: this.surname,
        age: this.age,
        location: {
          country: this.location.country,
          city: this.location.city
        },
        rating: this.rating
      })
    },
    toLogin () {
      this.$router.push('/login')
    },
    handleSubmit (isFormValid) {
      this.submitted = true

      if (!isFormValid) {
        return
      }
      this.toggleDialog()
    },
    toggleDialog () {
      this.showMessage = !this.showMessage

      if (!this.showMessage) {
        this.resetForm()
      }
    },
    resetForm () {
      this.name = ''
      this.surname = ''
      this.age = ''
      this.location = {
        country: '',
        city: ''
      }
      this.email = ''
      this.password = ''
      this.accept = null
      this.submitted = false
    }
  },
  computed: {
    ...mapGetters([
      'error',
      'user'
    ])
  },
  watch: {
    user (newValue) {
      if (newValue !== null) {
        this.$router.push(`/UserProfile/${this.user}/settings`)
      }
    }
  }
}
</script>
<style scoped>
.validation_wrapper{
  background-color: #FFFFFF;
  filter: drop-shadow(0px 4px 10px rgba(1, 0, 0, 0.25));
  border-radius: 10px;
  padding: 20px;
  width: 500px;
  margin: 40px auto;
}
.decor_line{
  margin: 1rem 0px;
}
.link_to_login{
  text-align: center;
  margin-top: 20px;
}
.link_to_login:hover{
  color: #7568F8;
  cursor: pointer;
}
  .card {
    min-width: 450px;
  }
  /*form{*/
  /*  margin-top: 2rem;*/
  /*}*/
  .field {
      margin-bottom: 1.5rem;
  }

  @media screen and (max-width: 960px) {
    .card {
      width: 80%;
    }
  }
.error_info_wrapper{
  width: 300px;
  margin: 20px auto;
}
.error_info_wrapper p{
  text-align: center;
  color: red;
}
</style>
