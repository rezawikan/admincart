<template lang="html">
  <ul class="centerx">
    <li v-for="paymentMethod in paymentMethods" :key="paymentMethod.id">
      <vs-radio @input="changed" v-model="payment" :vs-value="paymentMethod.id">{{ paymentMethod.type }}</vs-radio>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    paymentMethods: {
      required: true
    }
  },

  data() {
    return {
      payment: null
    }
  },

  methods: {
    changed(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
