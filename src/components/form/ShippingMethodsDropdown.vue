<template lang="html">
   <v-select @input="changed" :value="selected" :options="filtered"></v-select>
</template>

<script>
import vSelect from 'vue-select'
import { mapGetters } from 'vuex'
export default {
  props: {
    options: {
      required: true,
    },
    selectedID : {
      required: true,
    }
  },

  components: {
      vSelect
  },

  data() {
    return {

    }
  },

  computed: {
    ...mapGetters({
      weight: 'cart/weight'
    }),
    filtered() {
      return this.options.map(filter => {
        let price = filter.price*this.weight
        let data  = filter.courier+' - '+filter.type+' - '+filter.estimation+' - '+price.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.")
        return ({label: data, value: filter.id})
      })
    },
    selected() {
      return this.options.filter((x) => { return x.id == this.selectedID }).map(filter => {
        let price = filter.price*this.weight
        let data  = filter.courier+' - '+filter.type+' - '+filter.estimation+' - '+price.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.")
        return ({label: data, value: filter.id})
      })
    }
  },
  methods: {
    changed(value) {
      this.$emit('input', value.value)
    }
  }
}
</script>
