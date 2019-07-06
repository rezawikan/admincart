<template>
  <div class="con-tablex vs-table--content">
    <div class="con-pagination-table vs-table--pagination">
      <div class="con-vs-pagination vs-pagination-primary">
        <nav class="vs-pagination--nav">
           <router-link class="vs-pagination--buttons btn-prev-pagination vs-pagination--button-prev" :to="{ query: { page : meta.current_page - 1 } }" v-if="meta.current_page != 1">
             <i class="vs-icon notranslate icon-scale material-icons null">chevron_left</i>
           </router-link>
          <ul class="vs-pagination--ul">
            <template v-if="section > 1">
              <li class="item-pagination vs-pagination--li" :class="{ 'is-current' : meta.current_page === 1 }">
                <router-link  :to="{ query: Object.assign({}, queries, { page :1 }) }">
                  <span>1</span>
                  <div class="effect"></div>
                </router-link>
              </li>
              <li>
                <router-link class="item-pagination vs-pagination--li" :to="{ query: Object.assign({}, queries, { page : this.goBackASection() }) }">
                  <span>...</span>
                  <div class="effect"></div>
                </router-link>
              </li>
            </template>

            <li v-for="page in pages" :key="page">
              <router-link class="item-pagination vs-pagination--li" :class="{ 'is-current' : meta.current_page === page }" :to="{ query: Object.assign({}, queries,{ page :page }) }">
                <span>{{page}}</span>
                <div class="effect"></div>
              </router-link>
            </li>

            <template v-if="section < sections">

              <li class="item-pagination vs-pagination--li">
                <router-link :to="{ query: Object.assign({}, queries, { page : this.goForwardASection() }) }">
                  <span>...</span>
                  <div class="effect"></div>
                </router-link>
              </li>
              <li class="item-pagination vs-pagination--li" :class="{ 'is-current' : meta.current_page === meta.last_page }">
                <router-link :to="{ query: Object.assign({}, queries, { page : meta.last_page }) }">
                  <span>{{ meta.last_page }}</span>
                  <div class="effect"></div>
                </router-link>
              </li>

            </template>

          </ul>
          <router-link class="vs-pagination--buttons btn-next-pagination vs-pagination--button-next" :to="{ query: { page : meta.current_page + 1 } }" v-if="meta.current_page != meta.last_page">
            <i class="vs-icon notranslate icon-scale material-icons null">chevron_right</i>
          </router-link>
              <!---->
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: ['meta'],
  data() {
    return {
      sectionPerPage: 4,
      queries: this.$route.query
    }
  },
  computed: {
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
