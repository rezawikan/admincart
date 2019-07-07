<template lang="html">
  <v-select :options="options" @input="changed" taggable :resetOnOptionsChange="reset" ></v-select>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vSelect from 'vue-select'
import { isEmpty } from 'lodash'
export default {
  props: {
    options: {
      value: Array | Object,
      required: true
    }
  },

  components: {
    'v-select': vSelect,
  },

  data() {
    return {
      selected: null,
      reset: false
    }
  },

  methods: {
    ...mapActions('products',[
      'saveProductType'
    ]),

    ...mapGetters('products',[
      'producttype'
    ]),

    changed(value) {
      this.reset = true
      if (isEmpty(value))
          return;

          value = value.label ? value.label : value
      if (this.checkLabel(value) != true) {
          this.saveProductType({name: value}).then((response) => (
             this.$emit('typeCreated', response.data)
           ))
      } else {
          this.$emit('typeCreated', this.findLabel(value)[0])
      }
    },

    checkLabel(value) {
      return this.options.some((x) => { if (x.label == value) return true })
    },

    findLabel(value) {
      return this.options.filter((x) => { return x.label.includes(value) }).map((x) => {return { id: x.value, name: x.label}})
    },
  }
}
</script>

<style lang="css" scoped>
</style>
