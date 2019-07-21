<template lang="html">
  <v-select @input="changed" :options="filterSubdistricts" :resetOnOptionsChange="resetOnOptionsChange"></v-select>
</template>

<script>
import vSelect from 'vue-select'
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    city: {
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
    'city'(){
      this.getSubdistricts({city: this.city})
    }
  },

  data() {
    return {
      selected : []
    }
  },

  computed: {
    filterSubdistricts() {
      return this.subdistricts.filter((v) => { return v.city_id == this.city} ).map((t) => { return { label: t.subdistrict_name, value: t.subdistrict_id } })
    },
    ...mapGetters({
      subdistricts: 'ongkir/subdistricts'
    })
  },
  methods: {
    ...mapActions({
      getSubdistricts: 'ongkir/getSubdistricts'
    }),
    changed(value){
      if (value) {
        this.$emit('input', value.value)
      } else {
        this.$emit('input', null)
      }
    }
  }
}
</script>
