<template>
  <div class="con-tablex vs-table--content">
    <div class="con-pagination-table vs-table--pagination">
      <div class="con-vs-pagination vs-pagination-primary">
        <nav class="vs-pagination--nav">
           <a href="#" class="vs-pagination--buttons btn-prev-pagination vs-pagination--button-prev" v-if="meta.current_page != 1" @click.prevent="changed({ query: { page : meta.current_page - 1 } })">
             <!-- :to="{ query: { page : meta.current_page - 1 } }"  -->
             <i class="vs-icon notranslate icon-scale material-icons null">chevron_left</i>
           </a>
          <ul class="vs-pagination--ul">
            <template v-if="section > 1">
              <li class="item-pagination vs-pagination--li" :class="{ 'is-current' : meta.current_page === 1 }">
                <a href="#" @click.prevent="changed({ query: Object.assign({}, queries, { page :1 }) })">
                  <span>1</span>
                  <div class="effect"></div>
                </a>
              </li>
              <li>
                <a href="#" class="item-pagination vs-pagination--li" @click.prevent="changed({ query: Object.assign({}, queries, { page : back }) })">
                  <span>...</span>
                  <div class="effect"></div>
                </a>
              </li>
            </template>

            <li v-for="page in pages" :key="page">
              <a href="#" class="item-pagination vs-pagination--li" :class="{ 'is-current' : meta.current_page === page }" @click.prevent="changed({ query: Object.assign({}, queries,{ page :page }) })">
                <span>{{page}}</span>
                <div class="effect"></div>
              </a>
            </li>

            <template v-if="section < sections">

              <li class="item-pagination vs-pagination--li">
                <a href="#"  @click.prevent="changed({ query: Object.assign({}, queries, { page : forward }) })">
                  <span>...</span>
                  <div class="effect"></div>
                </a>
              </li>
              <li class="item-pagination vs-pagination--li" :class="{ 'is-current' : meta.current_page === meta.last_page }">
                <a href="#" @click.prevent="changed({ query: Object.assign({}, queries, { page : meta.last_page }) })">
                  <span>{{ meta.last_page }}</span>
                  <div class="effect"></div>
                </a>
              </li>

            </template>

          </ul>
          <a href="#" @click.prevent="changed({ query: { page : meta.current_page + 1 } })" class="vs-pagination--buttons btn-next-pagination vs-pagination--button-next" v-if="meta.current_page != meta.last_page">
            <i class="vs-icon notranslate icon-scale material-icons null">chevron_right</i>
          </a>
              <!---->
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import qs from 'qs'
export default {
  props: {
    meta: {
      type: Object/Array,
      required: true
    },
    queries: {
      type: Object/Array
    }
  },

  data() {
    return {
      sectionPerPage: 4,
    }
  },


  computed: {
    back: {
      get() {
        return this.goBackASection()
      },
      set(value) {
        return value
      }
    },
    forward: {
      get() {
        return this.goForwardASection()
      },
      set(value) {
        return value
      }
    },
    section () {
      return Math.ceil(this.meta.current_page / this.sectionPerPage)
    },
    sections() {
      return Math.ceil(this.meta.last_page / this.sectionPerPage)
    },
    lastPage() {
      let lastPage = ((this.section -1 ) * this.sectionPerPage) + this.sectionPerPage

      if (this.section === this.sections) {
          lastPage = this.meta.last_page
      }

      return lastPage
    },
    pages () {
      return _.range((this.section - 1) * this.sectionPerPage + 1, this.lastPage + 1)
    }
  },
  methods: {
      goBackASection() {
        return this.firstPageOfSection(this.section - 1)
      },
      goForwardASection(){
        return this.firstPageOfSection(this.section + 1)
      },
      firstPageOfSection(section){
        return (section - 1) * this.sectionPerPage + 1
      },
      changed(query) {
        this.$emit('change', query)
      }
  }
}
</script>

<style lang="css" scoped>
.pagination-ellipsis {
  color: $pagination-ellipsis-color;
  pointer-events:visible;
}
</style>
