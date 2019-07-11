<template>
  <div id="load-product-listing" class="">
    <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
      <div class="customize-search w-full">
        <div class="con-input-search vs-table--search w-full">
          <input type="text" class="input-search vs-table--search-input w-full" v-model="search">
          <i class="material-icons">search</i>
        </div>
        <div class="reset" v-if="reset" @click.prevent="resetSearch">
          Reset
        </div>
      </div>
    </div>
    <vs-table @selected="handleSelected" v-model="selected" :data="variations">

      <template slot="thead">
        <!-- <vs-th>Image</vs-th> -->
        <vs-th>Product Name</vs-th>
        <vs-th>Base Price</vs-th>
        <vs-th>Price</vs-th>
        <vs-th>Weight</vs-th>
        <vs-th>Action</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody ref="tbody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">

            <vs-td :data="data[i].name">
              {{ data[i].name }} / {{ data[i].product.name}} / {{ data[i].type.name}}
            </vs-td>

            <vs-td :data="data[i].base_price">
              {{ data[i].base_price }}
            </vs-td>

            <vs-td :data="data[i].price">
              {{ data[i].price }}
            </vs-td>

            <vs-td :data="data[i].weight">
              {{ data[i].weight | kilograms }} kg
            </vs-td>

            <vs-td :data="data[i].id">
              <vs-button v-if="data[i].stock == 0" color="warning" size="small" :disabled="true">Out of Stock</vs-button>
              <vs-button v-if="!hasCart(data[i].id) && data[i].stock != 0" size="small" @click.prevent="add(data[i].id)" :disabled="customer.id == undefined">Add Cart</vs-button>
              <vs-button v-if="hasCart(data[i].id)" size="small" @click.prevent="add(data[i].id)" :disabled="customer.id == undefined">Add Cart ({{countCart(data[i].id).quantity}})
              </vs-button>
            </vs-td>

          </vs-tr>
        </tbody>
      </template>
    </vs-table>
    <PaginationWithoutRoute :meta="metavariations" @change="movePage"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PaginationWithoutRoute from '@/components/pagination/PaginationWithoutRoute.vue'
export default {
  components: {
    PaginationWithoutRoute
  },

  data() {
    return {
      selected: [],
      search: '',
      reset: false
    }
  },

  watch: {
    'search'(query) {
      this.reset = query.length > 0 ? true : false

      if (query.length >= 3) {
          this.getProductVariations({ name: query, status: 'live' })
      }

      if (query.length == 0) {
          this.getProductVariations({ status: 'live' })
      }
    }
  },

  computed: {
    ...mapGetters({
        variations: 'products/variations',
        metavariations: 'products/metavariations',
        customer: 'users/customer',
        carts: 'cart/products'
    }),
    selectedID() {
      return this.carts.map((x) => { return x.id })
    },
  },

  methods: {
    ...mapActions({
      getProductVariations: 'products/getProductVariations',
      cartStore: 'cart/store'
    }),
    handleSelected(tr) {
      this.$vs.notify({
        title: 'Added',
        text: `${tr.name} / ${tr.product.name} / ${tr.type.name}`
      })
    },
    hasCart(value) {
      return this.selectedID.some((x) => {
        if (x === value) {
            return true
        }
         return false
      })
    },
    countCart(value) {
      return this.carts.find((x) => {
        if (x.id == value) {
            return x.quantity
        }
      })
    },
    resetSearch() {
      if (this.search >= 3) {
          this.getProductVariations({ status: 'live' })
      }

      this.search = ''

    },
    movePage(query) {
      this.$vs.loading({
        container: '#load-product-listing',
        scale: 0.45
      })

      let data = { status: 'live', page: query.query.page }
      if (this.search) {
          data = Object.assign({ name: this.search }, data)
      }

      this.getProductVariations(data).then(() => {
        this.$vs.loading.close('#load-product-listing > .con-vs-loading')
      })

    },
    add(variationID) {
      this.cartStore({
        products: {
          products: {
            id: variationID,
            quantity: 1
          }
        },
        user_id: this.customer.id
      })
    }
  },

  created() {
    this.getProductVariations({ status: 'live' })
  }
}
</script>

<style lang="scss" scoped>
.customize-search {
  .reset {
    padding: .5em;
    text-align: left;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
.vs-table--search{
  padding-top: 0;
  max-width: 100% !important;

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
