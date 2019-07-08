<template lang="html">
  <div class="centerx">
    <vs-button  @click="popupActivo=true" color="primary" type="border">Add Product</vs-button>
    <vs-popup class="holamundo"  title="Create Product Name" :active.sync="popupActivo">
        <div class="centerx default-input">
          <form class="" @submit.prevent="submit">
            <vs-input label-placeholder="Product Name" v-model="form.name" autofocus="true"/>
            <div v-if="notify" class="flex flex-wrap justify-between my-5">
              <ul>
                <li v-for="(message, key) in messages" :key="key">{{messages[key][0]}}</li>
              </ul>
            </div>
            <vs-button type="relief" vslor="primary" id="button-create-product" class="vs-con-loading__container mt-3" color="primary">Create</vs-button>
          </form>
       </div>

    </vs-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { isEmpty } from 'lodash'
import { slugString } from '../../helpers/slug'
export default {
  data(){
    return {
      popupActivo:false,
      messages: [],
      notify: false,
      form: {
        name: ''
      }
    }
  },
  methods: {
    ...mapActions('products',[
      'createProduct'
    ]),
    submit() {
        this.$vs.loading({
          container: '#button-create-product',
          scale: 0.45
        })

        this.createProduct({
              name: this.form.name,
              slug: slugString(this.form.name)
        }).then((response) => {
            if (isEmpty(response.data.errors)) {
              this.popupActivo = false
              this.$router.replace({ name: 'product-edit', params: { slug: response.data.data.slug }  })
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
