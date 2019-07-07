<template lang="html">
  <div id="load-returns-listing" class="data-list-container">
    <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

      <div class="flex flex-wrap-reverse items-center">
        <ShipmentCreate class="p-3 mb-4 mr-4 cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary"/>
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
    <vs-table :data="shippings">
      <template slot="header">

      </template>
      <template slot="thead">
        <vs-th>
          Destination
        </vs-th>
        <vs-th>
           Number of Shipment
        </vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="data[indextr].id">
            {{data[indextr].province}} - {{data[indextr].city}} - {{data[indextr].subdistrict}}
          </vs-td>

          <vs-td :data="data[indextr].id">
            {{data[indextr].shipping_methods}}
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
import ShipmentCreate from '@/components/shipment/ShipmentCreate.vue'
export default {
  metaInfo: {
    title: 'Ummu Zayn',
    titleTemplate: '%s - Returns',
    htmlAttrs: {
      lang: 'en',
      amp: true
    }
  },

  data() {
      return {
        search: this.$route.query.order_id,
        reset: false
      }
  },

  components: {
    ShipmentCreate,
    Pagination
  },

  watch: {
    '$route.query'(query){
      this.$vs.loading({
        container: '#load-returns-listing',
        scale: 0.45
      })

      this.getShippingCourier({ ...this.$route.params, ...query }).then(() => {
        this.$vs.loading.close('#load-returns-listing > .con-vs-loading')
      })
    }
  },

  methods: {
    ...mapActions('shippings',[
      'getShippingCourier'
    ]),
    keyupSearch($event) {
      this.reset = true
      this.$router.replace({query: {
        order_id :$event.target.value,
        page: 1
      }})
    },
    resetSearch() {
      this.reset = false
      this.search = ''
      this.$router.replace({query: {}})
    }
  },

  computed: {
    ...mapGetters({
      shippings: 'shippings/shippings',
      meta: 'shippings/meta'
    })
  },

  created () {
    this.getShippingCourier({ ...this.$route.params, ...this.$route.query })
    if (this.$route.query.order_id) {
        this.reset = true
    }
  },
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
