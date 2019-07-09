<template lang="html">
  <div id="load-products-listing" class="data-list-container">
    <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

      <div class="flex flex-wrap-reverse items-center">
        <ProductCreate class="p-3 mb-4 mr-4 cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary"/>
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
    <vs-table :data="products">
      <template slot="header">

      </template>
      <template slot="thead">

        <vs-th>
          Image
        </vs-th>
        <vs-th>
          Product Name
        </vs-th>
        <vs-th>
           Price
        </vs-th>
        <vs-th>
          Price Varies
        </vs-th>
        <vs-th>
          Stocks
        </vs-th>
        <vs-th>
          Actions
        </vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="data[indextr].id" v-if="data[indextr].images != 0">
            <img :src="data[indextr].images[0].location | DO_SPACES" alt="">
          </vs-td>
          <vs-td :data="data[indextr].id" v-else>
            <img :src="require('@/assets/images/logo/logo.png')" alt="">
          </vs-td>
          <vs-td :data="data[indextr].name">
            {{data[indextr].name}}
          </vs-td>
          <vs-td :data="data[indextr].price" v-if="data[indextr].price != null">
            <div class="" v-if="data[indextr].price.min != data[indextr].price.max">
              {{data[indextr].price.min | rupiah}} - {{data[indextr].price.max | rupiah}}
            </div>
            <div class="" v-else>
              {{data[indextr].price.min | rupiah}}
            </div>
          </vs-td>
          <vs-td :data="data[indextr].price" v-else>
            {{data[indextr].price | rupiah}}
          </vs-td>
          <vs-td :data="data[indextr].id">
            {{data[indextr].price_varies && data[indextr].price.min != data[indextr].price.max ? 'Ada' : 'Tidak Ada'}}
          </vs-td>
          <vs-td :data="data[indextr].id">
            {{data[indextr].stock_count}}
          </vs-td>
          <vs-td :data="data[indextr].id">
            <router-link :to="{ name: 'product-edit', params: { slug:data[indextr].slug } }">Edit</router-link>
            <vs-divider/>
            <!-- <router-link :to="{ name: 'product-edit', params: { slug:'asd' } }">Delete</router-link> -->
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
import ProductCreate from '@/components/products/ProductCreate.vue'

export default {
    metaInfo: {
      title: 'Ummu Zayn',
      titleTemplate: '%s - Products',
      htmlAttrs: {
        lang: 'en',
        amp: true
      }
    },
    data() {
        return {
          notify: false,
          messages: '',
          search: this.$route.query.name,
          reset: false
        }
    },
    components: {
      Pagination,
      ProductCreate
    },
    watch: {
      '$route.query'(query){
        this.$vs.loading({
          container: '#load-products-listing',
          scale: 0.45
        })

        this.getProducts({ ...this.$route.params, ...query }).then(() => {
          this.$vs.loading.close('#load-products-listing > .con-vs-loading')
        })
      }
    },
    filters: {
      DO_SPACES: function (value) {
        return process.env.DO_SPACES+value
      }
    },
    computed: {
      ...mapGetters({
        products: 'products/products',
        meta: 'products/meta'
      })
    },
    methods: {
        ...mapActions('products', [
          'getProducts'
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
    created(){
      this.getProducts({ ...this.$route.params, ...this.$route.query })
      if (this.$route.query.name) {
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
img {
  width: 80px;
  background-size: cover;
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
