<template lang="html">
  <vue-simple-suggest
    pattern="\w+"
    v-model="selected"
    :list="getList"
    :max-suggestions="10"
    :min-length="3"
    :debounce="200"
    :filter-by-query="false"
    :prevent-submit="true"
    :controls="{
      selectionUp: [38, 33],
      selectionDown: [40, 34],
      select: [13, 36],
      hideList: [27, 35]
    }"
    :mode="mode"
    :nullable-select="true"
    ref="suggestComponent"
    placeholder="Search information..."
    value-attribute="id"
    display-attribute="name"
    @select="changed">

    <div class="g">
      <input v-model="text" type="text">
    </div>

    <template slot="misc-item-above" slot-scope="{ suggestions, query }">
      <div class="misc-item">
        <span>You're searching for '{{ query }}'.</span>
      </div>

      <template v-if="suggestions.length > 0">
        <div class="misc-item">
          <span>{{ suggestions.length }} suggestions are shown...</span>
        </div>
        <hr>
      </template>

      <div class="misc-item" v-else-if="!loading">
        <span>No results</span>
      </div>
    </template>

    <div slot="suggestion-item" slot-scope="scope" :title="scope.suggestion.description">
      <div class="text">
        <span class="mt-2" v-html="boldenSuggestion(scope)"></span>
      </div>
    </div>

    <div class="misc-item" slot="misc-item-below" slot-scope="{ suggestions }" v-if="loading">
      <span>Loading...</span>
    </div>
  </vue-simple-suggest>
</template>

<script>
import VueSimpleSuggest from 'vue-simple-suggest';
import 'vue-simple-suggest/dist/styles.css'
import axios from 'axios'
export default {
  props: {
      mode: {
        type: String,
        required: true
      }
  },

  components: {
    VueSimpleSuggest
  },

  data() {
      return {
        customer: null,
        model: null,
        loading: false,
        text: '',
        selected: ''
      }
  },

  methods: {
    changed(event) {
      this.$emit('input', event)
    },

    getList(inputValue) {
      this.loading = true
      return new Promise((resolve, reject) => {
        return axios.get(`${process.env.API_URL}users?name=${inputValue}`)
        .then((response) => {
            resolve(response.data.data)
            this.loading = false
        }, (error) => {
            this.loading = false
            reject(error)
        })
      })
    },

    boldenSuggestion(scope) {
      if (!scope) return scope;
      const { suggestion, query } = scope;
      let result = this.$refs.suggestComponent.displayProperty(suggestion);
      if (!query) return result;
      const texts = query.split(/[\s-_/\\|.]/gm).filter(t => !!t) || [''];
      return result.replace(new RegExp('(.*?)(' + texts.join('|') + ')(.*?)','gi'), '$1<b>$2</b>$3');
    }
  }
}
</script>

<style lang="css" scoped>
</style>
