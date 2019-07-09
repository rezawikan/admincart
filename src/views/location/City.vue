<template lang="html">
  <div id="load-cities-listing" class="data-list-container">
    <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

      <div class="flex flex-wrap-reverse items-center">
        <CreateCity class="p-3 mb-4 mr-4 cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary"/>
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
    <vs-table :data="cities">
      <template slot="thead">
        <vs-th>
          ID
        </vs-th>
        <vs-th>
           Name
        </vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="data[indextr].id">
            {{data[indextr].id}}
          </vs-td>

          <vs-td :data="data[indextr].id">
            {{data[indextr].name}}
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
import CreateCity from '@/components/location/LocationCreateCity.vue'
export default {
  metaInfo: {
    title: 'Ummu Zayn',
    titleTemplate: '%s - Cities',
    htmlAttrs: {
      lang: 'en',
      amp: true
    }
  },

  data() {
      return {
        search: this.$route.query.name,
        reset: false
      }
  },

  components: {
    CreateCity,
    Pagination
  },

  watch: {
    '$route.query'(query){
      this.$vs.loading({
        container: '#load-cities-listing',
        scale: 0.45
      })

      this.getCities({ ...this.$route.params, ...query, pagination: true }).then(() => {
        this.$vs.loading.close('#load-cities-listing > .con-vs-loading')
      })
    }
  },

  methods: {
    ...mapActions('shipment',[
      'getCities'
    ]),
    keyupSearch($event) {
      if (!$event.target.value) {
            this.resetSearch()
      } else {
          this.reset = true
          this.$router.replace({query: {
            name :$event.target.value,
            page: 1
          }})
      }
    },
    resetSearch() {
      this.reset = false
      this.search = ''
      this.$router.replace({query: {}})
    }
  },

  computed: {
    ...mapGetters({
      cities: 'shipment/cities',
      meta: 'shipment/metaCities'
    })
  },

  created () {
    this.getCities({ ...this.$route.params, ...this.$route.query, pagination: true })
    if (this.$route.query.name) {
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
