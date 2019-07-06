<template lang="html">
  <div id="load-stocks-listing" class="data-list-container">
    <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

      <div class="flex flex-wrap-reverse items-center">
        <!-- ADD NEW -->
        <!-- <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary">
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
            <span class="ml-2 text-base text-primary">Add New</span>
        </div> -->
      </div>

      <div class="customize-search">
        <div class="con-input-search vs-table--search">
          <input type="text" class="input-search vs-table--search-input" v-model="search" @keyup="keyupSearch">
          <i class="material-icons">search</i>
        </div>
        <div class="reset" v-if="reset" @click.prevent="resetSearch">
          Reset
        </div>
      </div>
    </div>
    <vs-table :data="stocks">
      <template slot="header">

      </template>
      <template slot="thead">
        <vs-th>
          Product Name
        </vs-th>
        <vs-th>
          Type
        </vs-th>
        <vs-th>
           Sub Type
        </vs-th>
        <vs-th>
          Stock
        </vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="data[indextr].name">
            {{data[indextr].name}}
          </vs-td>

          <vs-td :data="data[indextr].type">
            {{data[indextr].type}}
          </vs-td>

          <vs-td :data="data[indextr].sub_type">
            {{data[indextr].sub_type}}
          </vs-td>

          <vs-td :data="data[indextr].stock">
            {{data[indextr].stock}}
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
  metaInfo: {
    title: 'Ummu Zayn',
    titleTemplate: '%s - Stocks',
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
    Pagination
  },

  watch: {
    '$route.query'(query){
      this.$vs.loading({
        container: '#load-stocks-listing',
        scale: 0.45
      })

      this.getLiveStock({ ...this.$route.params, ...query }).then(() => {
        this.$vs.loading.close('#load-stocks-listing > .con-vs-loading')
      })
    }
  },

  methods: {
    ...mapActions('stocks',[
      'getLiveStock'
    ]),
    keyupSearch($event) {
      this.reset = true
      this.$router.replace({query: {
        name :$event.target.value,
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
      stocks: 'stocks/stocks',
      meta: 'stocks/meta'
    })
  },

  created () {
    this.getLiveStock({ ...this.$route.params, ...this.$route.query })
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
