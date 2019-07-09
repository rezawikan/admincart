<template lang="html">
  <div class="centerx">
    <vs-button  @click="popupActivo=true" color="primary" type="border">Add Subdistrict</vs-button>
    <vs-popup class="holamundo"  title="Add Province" :active.sync="popupActivo">
      <form @submit.prevent="submit">
        <div class="vx-col w-full mb-base">
          <div class="vx-row">
            <div class="vx-col w-full mb-6">
              <vs-input class="inputx" label-placeholder="Subdistrict" v-model="subdistrict" />
            </div>
          </div>
          <vs-button type="relief" vslor="primary" id="button-add-subdistrict" class="vs-con-loading__container mt-3">Add</vs-button>
        </div>
      </form>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data(){
    return {
      popupActivo:false,
      subdistrict: '',
    }
  },

  methods: {
    ...mapActions({
      saveSubdistrict: 'shipment/saveSubdistrict'
    }),
    submit(){
      this.$vs.loading({
        container: '#button-add-subdistrict',
        scale: 0.45
      })

      this.saveSubdistrict(this.city).then(() => {
        this.$vs.loading.close('#button-add-subdistrict > .con-vs-loading')
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
