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
      <template slot="thead">
        <vs-th>
          ID
        </vs-th>
        <vs-th>
          Total Product
        </vs-th>
        <vs-th>
          Subtotal
        </vs-th>
        <vs-th>
          Discount
        </vs-th>
        <vs-th>
          Shipping
        </vs-th>
        <vs-th>
          Total
        </vs-th>
        <vs-th>
          Status
        </vs-th>
        <vs-th>
          Order Date
        </vs-th>
        <vs-th>
          Details
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
          <vs-td :data="data[indextr].subtotal">
            {{data[indextr].subtotal | rupiah }}
          </vs-td>
          <vs-td :data="data[indextr].discount">
            {{data[indextr].discount | rupiah}}
          </vs-td>
          <vs-td :data="data[indextr].id">
            {{data[indextr].shipping_price | rupiah}}
          </vs-td>
          <vs-td :data="data[indextr].total">
            {{data[indextr].total | rupiah}}
          </vs-td>
          <vs-td :data="data[indextr].status">
            {{data[indextr].status}}
          </vs-td>
          <vs-td :data="data[indextr].created_at">
            {{data[indextr].created_at}}
          </vs-td>
          <vs-td :data="data[indextr].id">
          <vs-button :href="'/orders/'+data[indextr].id+'/show'" color="primary" type="filled">Detail Order</vs-button>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <Pagination :meta="meta"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Pagination from '@/components/pagination/Pagination.vue'
export default {
  metaInfo() {
    let status = null
    if (this.status != null) {
        status = this.status.charAt(0).toUpperCase() + this.status.slice(1)
    }

    return {
      title: 'Ummu Zayn',
      titleTemplate: `%s - Orders ${status != null ? status : 'All'}`,
      htmlAttrs: {
        lang: 'en',
        amp: true
      }
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
    }),
    status() {
      return this.$route.query.status || null
    },
  },

  methods: {
    ...mapActions({
      getOrder : 'orders/getOrder'
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
