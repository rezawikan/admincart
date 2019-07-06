<template lang="html">
  <div id="load-customers-listing" class="data-list-container">
    <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

      <div class="flex flex-wrap-reverse items-center">
        <div class="centerx">
          <CreateCustomer/>
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
    <vs-table :data="users">
      <template slot="header">

      </template>
      <template slot="thead">
        <vs-th>
          ID
        </vs-th>
        <vs-th>
          Name
        </vs-th>
        <vs-th>
          Email
        </vs-th>
        <vs-th>
          Joined Day
        </vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="data[indextr].id">
            {{data[indextr].id}}
          </vs-td>

          <vs-td :data="data[indextr].name">
            {{data[indextr].name}}
          </vs-td>

          <vs-td :data="data[indextr].email">
            {{data[indextr].email}}
          </vs-td>

          <vs-td :data="data[indextr].created_at">
            {{data[indextr].created_at | moment("from", "now", true) }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <Pagination :meta="meta"/>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import CreateCustomer from '@/components/customers/CreateCustomer.vue'
import Pagination from '@/components/pagination/Pagination.vue'
export default {
  metaInfo: {
    title: 'Ummu Zayn',
    titleTemplate: '%s - Customers',
    htmlAttrs: {
      lang: 'en',
      amp: true
    }
  },
  components: {
    Pagination,
    CreateCustomer
  },

  data() {
    return {
      search: this.$route.query.id,
      reset: false
    }
  },

  watch: {
    '$route.query'(query){
      this.$vs.loading({
        container: '#load-customers-listing',
        scale: 0.45
      })

      this.getAllUsers({ ...this.$route.params, ...query }).then(() => {
        this.$vs.loading.close('#load-customers-listing > .con-vs-loading')
      })
    }
  },

  computed: {
    ...mapGetters({
      users: 'users/users',
      meta: 'users/meta'
    })
  },

  methods: {
    ...mapActions({
      getAllUsers : 'users/getAllUsers'
    }),
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

  created() {
    this.getAllUsers({...this.$route.params, ...this.$route.query})
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
