<template>
  <vs-table :data="products">

    <template slot="thead">
      <vs-th>Product Name</vs-th>
      <vs-th>Stock</vs-th>
      <vs-th>Quantity</vs-th>
      <vs-th>Weight</vs-th>
      <vs-th>Total</vs-th>
      <vs-th>Action</vs-th>
    </template>

    <template slot-scope="{data}">
      <vs-tr :key="indextr" v-for="(tr, indextr) in data">

        <vs-td :data="tr.name">
        {{ tr.product.name }} / {{ tr.type.name }} / {{ tr.name }}
        </vs-td>

        <vs-td :data="tr.product.in_stock">
          {{ tr.product.in_stock ? 'Available' : 'Not Available'}}
        </vs-td>

        <vs-td :data="tr.quantity">
          {{ tr.quantity }}
          <template slot="edit">
            <vs-input-number :value="tr.quantity" :max="tr.product.stock_count" @input="changed(tr.id, $event)"/>
          </template>
        </vs-td>

        <vs-td :data="tr.weight">
          {{ tr.weight | kilograms }}
        </vs-td>

        <vs-td :data="tr.total">
          {{ tr.total | rupiah }}
        </vs-td>

        <vs-td :data="tr.id">
          <font-awesome-icon icon="trash" @click.prevent="destroyCart({productID: tr.id, user_id: customer.id})"></font-awesome-icon>
        </vs-td>

      </vs-tr>
    </template>
  </vs-table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {

    }
  },

  computed: {
    ...mapGetters({
      products: 'cart/products',
      subtotal: 'cart/subtotal',
      customer: 'users/customer'
    })
  },


  methods: {
    ...mapActions({
      updateCart: 'cart/update',
      destroyCart: 'cart/destroy',
    }),
    changed(id, $event) {
      if ($event) {
          this.updateCart({ productID: id, quantity: $event, user_id: this.customer.id })
      }
    }
  }
}
</script>
