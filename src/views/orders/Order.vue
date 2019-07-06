<template lang="html">
  <div id="load-orders-listing" class="data-list-container">
    <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

      <div class="flex flex-wrap-reverse items-center">
        <div class="centerx">
          <vs-button href="/orders/create" color="primary" type="border">Add Order</vs-button>
        </div>
      </div>

      <div class="customize-search">
        <div class="con-input-search vs-table--search">
          <input type="text" class="input-search vs-table--search-input" v-model="search" @keyup.enter="keyupSearch">
          <i class="material-icons">search</i>
        </div>
        <div class="reset" v-if="reset" @click.prevent="resetSearch">
          Reset
        </div>
      </div>
    </div>
    <vs-table :data="orders">
      <template slot="header">

      </template>
      <template slot="thead">
        <vs-th>
          ID
        </vs-th>
        <vs-th>
          Total Product
        </vs-th>
        <!-- <vs-th>
           Courier
        </vs-th> -->
        <vs-th>
          Subtotal
        </vs-th>
        <vs-th>
          Total
        </vs-th>
        <vs-th>
          Status
        </vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="data[indextr].id">
            {{data[indextr].id}}
          </vs-td>

          <vs-td :data="data[indextr].products.length">
            {{data[indextr].quantity}}
          </vs-td>

          <!-- <vs-td :data="data[indextr].shippingMethod.courier">
            {{data[indextr].shippingMethod.courier}}
          </vs-td> -->

          <vs-td :data="data[indextr].subtotal">
            {{data[indextr].subtotal | rupiah }}
          </vs-td>

          <vs-td :data="data[indextr].total">
            {{data[indextr].total | rupiah}}
          </vs-td>
          <vs-td :data="data[indextr].status">
            {{data[indextr].status}}
          </vs-td>
          <template class="expand-user" slot="expand">
            <div class="con-expand-users w-full">
              <vs-list>
                <vs-list-header icon="verified_user" title="Accepted" color="success"></vs-list-header>
                <vs-list-item
                :key="product.id"
                v-for="product in tr.products"

                :subtitle="product.product.name+ ' / ' + product.name + ' / ' + product.type.name"
                >
                  <vs-chip color="primary">
                    {{product.quantity}}
                  </vs-chip>
                </vs-list-item>
              </vs-list>

              <vs-list v-if="tr.returns.length > 0">
                <vs-list-header icon="verified_user" title="Returned" color="danger"></vs-list-header>
                <vs-list-item
                :key="returnin.id"
                v-for="returnin in tr.returns"
                :subtitle="returnin.product_name+ ' / ' + returnin.variation_name + ' / ' + returnin.type_name"
                >
                  <vs-chip color="warning">
                    {{returnin.quantity}}
                  </vs-chip>
                </vs-list-item>
              </vs-list>

              <vs-list>
                <vs-list-header icon="map" title="Address" color="success"></vs-list-header>
                <vs-list-item
                :title="tr.address.name"
                :subtitle="tr.address.address_1 + ', ' + tr.address.subdistrict.subdistrict + ', ' + tr.address.subdistrict.city + ', ' + tr.address.subdistrict.province"
                >
                </vs-list-item>
              </vs-list>

              <vs-list>
                <vs-list-header icon="map" title="Payment" color="success"></vs-list-header>
                <vs-list-item :title="tr.payment_method" >
                </vs-list-item>
              </vs-list>

              <vs-list>
                <vs-list-header icon-pack="feather" icon="icon-box" title="Shipping" color="success"></vs-list-header>
                <vs-list-item
                :title="tr.shipping_method.courier + ' - '+ tr.shipping_method.code"
                :subtitle="tr.shipping_method.estimation">
                </vs-list-item>
              </vs-list>

              <!-- <vs-list>
                <vs-list-header icon-pack="feather" icon="icon-truck" title="Delivery" color="success"></vs-list-header>
                <vs-list-item
                :title="tr.shipping_method.courier"
                :subtitle="tr.address.address_1 + ', ' + tr.address.subdistrict.subdistrict + ', ' + tr.address.subdistrict.city + ', ' + tr.address.subdistrict.province"
                >
                </vs-list-item>
              </vs-list> -->
            </div>
          </template>
        </vs-tr>
      </template>
    </vs-table>
    <Pagination :meta="meta"/>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Pagination from '@/components/pagination/Pagination.vue'
export default {
  metaInfo: {
    title: 'Ummu Zayn',
    titleTemplate: '%s - Orders',
    htmlAttrs: {
      lang: 'en',
      amp: true
    }
  },

  components: {
    Pagination
  },

  data() {
    return {
      search: this.$route.query.id,
      reset: false,
      selected: []
    }
  },

  watch: {
    '$route.query'(query){
      this.$vs.loading({
        container: '#load-orders-listing',
        scale: 0.45
      })

      this.getOrder({ ...this.$route.params, ...query }).then(() => {
          this.$vs.loading.close('#load-orders-listing > .con-vs-loading')
      })
    }
  },

  computed: {
    ...mapGetters({
      orders: 'orders/orders',
      meta: 'orders/meta'
    })
  },

  methods: {
    ...mapActions({
      getOrder : 'orders/getLiveOrder'
    }),
    keyupSearch($event) {
      this.reset = true
      this.$router.replace({query: {
        id :$event.target.value,
        page: 1
      }})
    },
    resetSearch() {
      this.reset = false
      this.search = ''
      this.$router.replace({query: {}})
    }
  },

  created() {
    this.getOrder({...this.$route.params, ...this.$route.query})
    if (this.$route.query.id) {
        this.reset = true
    }
  }
}
</script>

<style lang="scss" scoped>
.customize-search {
  .reset {
    padding: .5em;
    text-align: right;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
.vs-table--search{
  padding-top: 0;

  .vs-table--search-input {
    padding: 0.9rem 2.5rem;
    font-size: 1rem;
    margin-bottom: 1em;

    &+i {
      left: 1rem;
      top: 1em;
    }

    &:focus+i {
      left: 1rem;
    }
  }
}
</style>
