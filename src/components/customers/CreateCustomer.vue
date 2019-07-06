<template lang="html">
  <div class="centerx">
    <vs-button  @click="popupActivo=true" color="primary" type="border">Add Customer</vs-button>
    <vs-popup class="holamundo"  title="Create Customer" :active.sync="popupActivo">
        <div class="vx-col w-full mb-base">
          <div class="vx-row mb-6">
            <div class="vx-col w-full">
              <vs-input label-placeholder="Email" v-validate="'email|required'" data-vv-as="email" type="text" name="email" v-model="form.email"/>
              <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col w-full">
              <vs-input label-placeholder="Name" v-validate="'required|alpha_spaces'" name="name" type="text" ref="name" v-model="form.name"/>
              <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col w-full">
              <vs-input label-placeholder="Password" v-validate="'required'" name="password" type="password" ref="password" v-model="form.password"/>
              <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col w-full">
              <vs-input label-placeholder="Password Confirmation" v-validate="'required|confirmed:password'" name="password_confirmation" type="password" v-model="form.password_confirmation" data-vv-as="password"/>
              <span class="text-danger text-sm" v-show="errors.has('password_confirmation')">{{ errors.first('password_confirmation') }}</span>
            </div>
          </div>
         <div v-if="notify" class="flex flex-wrap justify-between my-5">
           <ul>
             <li v-for="(message, key) in messages" :key="key">{{messages[key][0]}}</li>
           </ul>
         </div>
         <vs-button type="relief" vslor="primary" id="button-create-user" class="vs-con-loading__container mt-3" color="primary" @click="submit">Create</vs-button>
       </div>

    </vs-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { isEmpty } from 'lodash'
export default {
  data(){
    return {
      popupActivo:false,
      messages: [],
      notify: false,
      form: {
        email: '',
        name: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    ...mapActions('users',[
      'createUser'
    ]),
    submit() {
        this.$vs.loading({
          container: '#button-create-user',
          scale: 0.45
        })

        this.createUser({
              ...this.form
        }).then((response) => {

            if (isEmpty(response.data.errors)) {
              this.popupActivo = false

            } else {
              this.messages = response.data.errors
              this.notify = true
            }

            this.$vs.loading.close('#button-create-product > .con-vs-loading')
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.vs-con-input-label {
  width: 100%;
}
</style>
