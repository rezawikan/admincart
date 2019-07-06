<template lang="html">
  <v-select @input="changed" :options="provinces | serialize"></v-select>
</template>

<script>
import vSelect from 'vue-select'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
      return {
        selected: []
      }
  },

  components: {
      vSelect
  },

  filters: {
    serialize: function (value) {
      return value.map(filter => {
        return ({label: filter.name, value: filter.id})
      })
    }
  },

  computed: {
    ...mapGetters({
      provinces: 'addresses/provinces'
    })
  },

  methods: {
    ...mapActions('addresses', [
      'getProvinces'
    ]),
    changed(value){
      if (value) {
        this.$emit('input', value.value)
      } else {
        this.$emit('input', null)
      }
    }
  },
  created() {
    this.getProvinces()
  }
}
</script>
