<template lang="html">
   <v-select @input="changed" :options="filterCities | serialize" :resetOnOptionsChange="resetOnOptionsChange"></v-select>
</template>

<script>
import vSelect from 'vue-select'
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    province: {
      required: true,
    },
    resetOnOptionsChange: {
      type: Boolean, default: false
    }
  },

  components: {
      vSelect
  },

  watch: {
    'province'(){
      this.getCities({province: this.province})
    }
  },

  data() {
    return {
      selected: []
    }
  },

  filters: {
    serialize: function (value) {
      return value.map(filter => {
        return ({label: filter.name+ ' - '+filter.capital, value: filter.id})

      })
    }
  },

  computed: {
    filterCities() {
      return _.filter(this.cities, (v) => v.province_id == this.province)
    },
    ...mapGetters({
      cities: 'addresses/cities'
    })
  },
  methods: {
    ...mapActions('addresses', [
      'getCities'
    ]),

    changed(value) {
      if (value) {
        this.$emit('input', value.value)
      } else {
        this.$emit('input', null)
      }
    }
  }
}
</script>
