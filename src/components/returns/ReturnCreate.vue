<template lang="html">
  <div class="centerx">
    <vs-button  @click="popupActivo=true" color="primary" type="border">Return Product</vs-button>
    <vs-popup class="holamundo"  title="Return Product" :active.sync="popupActivo">
      <div class="vx-col w-full mb-base">
        <div class="vx-row mb-6">
          <div class="vx-col w-full">
            <label class="vs-input--label">Order ID</label>
            <OrderIdDropdown mode="select" v-model="form.id" @input="setCurrentReturn"/>
          </div>
        </div>
      </div>
      <div class="vx-col w-full mb-base">
        <vx-card>
          <div class="vx-row mb-6">
            <div class="vx-col w-full">
              <h4 class="mb-6">Select Products to Return</h4>
              <table class="w-full" v-if="order.products">
                <tr>
                  <th>Product Name</th>
                  <th>Current</th>
                  <th>Returned</th>
                  <!-- <th>Discount</th> -->
                </tr>
                <tr :key="product.id" v-for="(product, index) in order.products">
                  <td>{{ product.name }}</td>
                  <td>
                    <vs-input-number min="0" :max="product.quantity" v-model="products[index].quantity" icon-inc="expand_less" icon-dec="expand_more"/>
                  </td>
                  <td>
                    {{ product.quantity - products[index].quantity}}
                  </td>
                  <!-- <td>
                    <vs-input class="inputx" placeholder="Discount" v-model="product[index].discount" />
                  </td> -->
                </tr>
              </table>
            </div>
            <div class="vx-col w-full">
              <div class="centerx labelx">
                <vs-input type="number" label="Discount" placeholder="0" v-model="discount"/>
              </div>
              <vs-button type="relief" vslor="primary" id="button-save-return" class="vs-con-loading__container mt-3" @click="submit" v-if="order.products">Submit Return</vs-button>
            </div>
          </div>
        </vx-card>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import OrderIdDropdown from '@/components/form/OrderIdDropdown.vue'
import { mapActions } from 'vuex'
export default {
  components: {
     OrderIdDropdown
  },

  data(){
    return {
      popupActivo:false,
      messages: [],
      notify: false,
      form: {
        id: ''
      },
      order: [],
      products: [],
      discount: null
    }
  },

  computed: {
    current_quantity() {
      return this.order.products.map((x) => {
        return { quantity:x.quantity, id: x.id, original_price: x.original_price }
      })
    },
    change_quantity() {
      return this.products.map((x) => {
        return { quantity:x.quantity, id: x.id, original_price: x.original_price }
      })
    },
    return_values() {
      const maxLen = Math.max(this.current_quantity.length,this.change_quantity.length)
      let values = [];
      for (var i = 0; i < maxLen; i++) {
        if (this.current_quantity[i].id == this.change_quantity[i].id) {
            let val = this.current_quantity[i].quantity - this.change_quantity[i].quantity
            values.push({
              id: this.current_quantity[i].id,
              quantity: val,
              original_price: this.current_quantity[i].original_price,
              discount: this.current_quantity[i].discount
            })
        }
      }
      return values
    }
  },

  methods: {
    ...mapActions({
      createReturn: 'returns/createReturn'
    }),
    setCurrentReturn(query){
      if (query) {
        this.order = query
        this.products = JSON.parse(JSON.stringify(query.products))
      }
    },
    submit(){
      this.$vs.loading({
        container: '#button-save-return',
        scale: 0.45
      })

      this.createReturn({
        order_id: this.order.id,
        updated_products: this.products,
        return_values: this.return_values,
        discount: this.discount
      }).then(() => {
        this.$vs.loading.close('#button-save-return > .con-vs-loading')
        this.popupActivo = false
      })
    }
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
