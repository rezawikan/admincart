<template lang="html">
  <div>
    <div class="vx-col w-full mb-base" v-if="current_return.length != 0">
      <vx-card>
        <div class="vx-row mb-6">
          <div class="vx-col w-full sm:w-1/2">
            <label class="vs-input--label">Order ID</label>
            <vs-input class="w-full" :value="current_return.order_id" disabled="true"/>
          </div>
          <div class="vx-col w-full sm:w-1/2">
            <label class="vs-input--label">Product Name</label>
            <vs-input class="w-full" :value="`${current_return.product_name} / ${current_return.product_type} / ${current_return.variation_name}`" disabled="true"/>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col w-full sm:w-1/2">
              <label for="" class="vs-select--label">Quantity</label>
              <vs-input-number v-model="form.quantity" min="1" :max="maxQuantity" />
          </div>
          <div class="vx-col w-full sm:w-1/2">
            <vs-select v-model="form.status" class="w-full select-large" label="Status">
                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in options" class="w-full" />
            </vs-select>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col w-full">
            <label class="vs-input--label">Discount</label>
            <vs-input class="w-full" v-model="form.discount"/>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col w-full">
            <label class="vs-input--label">Info</label>
            <vs-input class="w-full" v-model="form.info"/>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col w-full sm:w-1/2">
              <vs-button name="updateReturn" color="primary" type="filled" @click="update">Update Return</vs-button>
          </div>
          <div class="vx-col w-full sm:w-1/2">
              <!-- <vs-button color="primary" type="filled" @click="cancelReturn(current_return.id)">Cancel Return</vs-button> -->
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
import vSelect from 'vue-select'

export default {
  metaInfo: {
    title: 'Ummu Zayn',
    titleTemplate: '%s - Returns',
    htmlAttrs: {
      lang: 'en',
      amp: true
    }
  },

  components: {
    'v-select': vSelect,
  },

  data() {
    return {
      popupActivo:false,
      messages: [],
      notify: false,
      current_return: [],
      form: {
        quantity: 0,
        status: '',
        info: '',
        discount: null
      },
      order: [],
      options: [
        { text: 'Checking', value: 'checking' },
        { text: 'Processing', value: 'processing' },
        { text: 'Returned', value: 'returned' },
      ]
    }
  },

  computed: {
    maxQuantity() {
      let quantity = this.order.products.filter((x) => {
          return x.id == this.current_return.product_variation_id
        }).map((x) => {
          return x.quantity
        })
        console.log(quantity);
        if (!quantity.length) {
            return 0
        }

      return parseInt(quantity) + this.current_return.quantity
    }
  },

  methods: {
    ...mapActions({
      updateReturn: 'returns/updateReturn'
    }),
    showReturn(id) {
      return axios.get(`${process.env.API_URL}returns/${id}`)
      .then((response) => {
        console.log(response.data.data);
          this.current_return = response.data.data
          this.form.quantity = this.current_return.quantity
          this.form.status = this.current_return.status
          this.form.info = this.current_return.info
          this.order = response.data.data.order
          this.form.discount = response.data.data.discount
      }, (error) => {
          this.messages = error.response
      })
    },
    update() {
      this.updateReturn({
        origin: this.current_return.id,
        order_id: this.current_return.order_id,
        product_variation_id: this.current_return.product_variation_id,
        quantity: this.form.quantity,
        status: this.form.status,
        discount: this.form.discount,
        info: this.form.info,
        original_price: this.current_return.original_price
      }).then((response) => {
        console.log(response);
      })
    }
  },

  created() {
    this.showReturn(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>

</style>
