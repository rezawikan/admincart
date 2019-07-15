<template lang="html">
  <div class="centerx">
    <vs-button  @click="popupActivo=true" color="primary" type="filled">Overview</vs-button>
    <vs-popup class="holamundo"  title="Return Product" :active.sync="popupActivo">
      <div class="vx-col w-full mb-base" v-if="current_return.length != 0">
        <div class="vx-row mb-6">
          <div class="vx-col w-full">
              <vs-input label-placeholder="Order ID" :value="current_return.order_id" disabled="true"/>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col w-full">
              <vs-input label-placeholder="Product Name" :value="`${current_return.product_name} / ${current_return.product_type} / ${current_return.variation_name}`" disabled="true"/>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col w-full sm:w-1/3">
              <label for="" class="vs-select--label">Quantity</label>
              <vs-input-number v-model="form.quantity" min="1" :max="maxQuantity" />
          </div>
          <div class="vx-col w-full sm:w-2/3">
            <vs-select v-model="form.status" class="w-full select-large" label="Status">
                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in options" class="w-full" />
            </vs-select>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col w-full">
              <vs-input label-placeholder="Info" v-model="form.info"/>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col w-full sm:w-1/2">
              <vs-button color="primary" type="filled">Update Return</vs-button>
          </div>
          <div class="vx-col w-full sm:w-1/2">
              <vs-button color="primary" type="filled" @click="cancelReturn(current_return.id)">Cancel Return</vs-button>
          </div>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
import vSelect from 'vue-select'

export default {
  props: {
      id: {
        required: true
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
        info: ''
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

      return parseInt(quantity)
    }
  },

  watch:{

  },

  methods: {
    ...mapActions({
      updateReturn: 'returns/updateReturn'
    }),
    showReturn(id) {
      return axios.get(`${process.env.API_URL}returns/${id}`)
      .then((response) => {
          this.current_return = response.data.data
          this.form.quantity = this.current_return.quantity
          this.form.status = this.current_return.status
          this.form.info = this.current_return.info
          this.order = response.data.data.order
      }, (error) => {
          this.messages = error.response
      })
    },
    cancelReturn(id) {
      console.log(id);
      // let data = {
      //   origin: id,
      //   payload: {
      //     order_id: current_return.order_id,
      //     product_variation_id: current_return.product_variation_id,
      //     quantity: form.quantity, 
      //     original_price: current_return.original_price
      //   }
      // }
      // this.updateReturn(data)
    }
  },

  created() {
    this.showReturn(this.id)
  }
}
</script>
<style lang="scss" scoped>
.vs-con-input-label {
  width: 100%;
}
table tr td {
  text-align: center;
  &:nth-child(1) {
    text-align: left;
  }
}

table tr th {
  text-align: center;
  &:nth-child(1) {
    text-align: left;
  }
}

</style>
