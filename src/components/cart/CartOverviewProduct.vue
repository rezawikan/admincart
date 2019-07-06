<template>
<tr>
  <td>
    {{ product.product.name }} - {{ product.name }}
  </td>
  <td>
    {{ product.product.in_stock ? 'In Stock' : 'Out of Stock'  }}
  </td>
  <td>
    <div class="field">
      <div class="control">
        <div class="select is-fullwidth">
          <select v-model="quantity">
            <option value="0" v-if="product.stock_count === 0">0</option>
            <option
              :value="x"
              v-for="x in product.stock_count"
              :key="x"
              :selected="x == product.quantity"
            >
              {{ x }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </td>
  <td>
    {{ product.weight }} gram
  </td>
  <td>
    {{ product.total }}
  </td>
  <td>
    <!-- <a href="#" @click.prevent="destroy(product.id)">Remove</a> -->
    <font-awesome-icon icon="trash" @click.prevent="destroy({productID: product.id, user_id: customer.id})"></font-awesome-icon>
  </td>
</tr>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      customer: 'users/customer'
    }),
    quantity: {
      get() {
        return this.product.quantity
      },
      set(quantity) {
        this.update({ productID: this.product.id, quantity, user_id: this.customer.id })
      }
    }
  },
  methods: {
    ...mapActions({
      destroy: 'cart/destroy',
      update: 'cart/update'
    }),

  }
}
</script>
