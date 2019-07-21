<template lang="html">
  <div class="centerx">
    <vs-button  @click="popupActivo=true" color="primary" type="border">Add Cashflow</vs-button>
    <vs-popup class="holamundo"  title="Add Cashflow" :active.sync="popupActivo">
      <div class="vx-col w-full mb-base">
        <div class="vx-row">
          <div class="vx-col w-full mb-6">
            <p>Type</p>
            <v-select :options="['debit','credit']" v-model="form.type"></v-select>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full mb-6">
            <p>Amount</p>
            <vs-input type="number" class="inputx" v-model="form.amount" />
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full mb-6">
            <p>Info</p>
            <vs-textarea v-model="form.info" />
          </div>
        </div>
        <vs-button type="relief" vslor="primary" id="button-add-cashflow" class="vs-con-loading__container mt-3" @click="submit">Add Cashflow</vs-button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import { mapActions } from 'vuex'
export default {
  components: {
     'v-select': vSelect,
  },

  data(){
    return {
      popupActivo:false,
      form: {
        type: null,
        amount: null,
        info: null
      }
    }
  },

  watch: {

  },

  methods: {
    ...mapActions({
      saveCashflow: 'cashflow/saveCashflow'
    }),
    submit(){
      this.$vs.loading({
        container: '#button-add-cashflow',
        scale: 0.45
      })

      this.saveCashflow(this.form).then(() => {
        this.$vs.loading.close('#button-add-cashflow > .con-vs-loading')
        this.popupActivo = false
      })
    }
  },


}
</script>
<style lang="scss" scoped>
.vs-con-input-label {
  width: 100%;
}
table tr td {
  text-align: center;
  &:nth-child(1) {
    text-align: left;
  }
}

table tr th {
  text-align: center;
  &:nth-child(1) {
    text-align: left;
  }
}

</style>
