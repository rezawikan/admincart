<template lang="html">
  <div class="centerx">
    <vs-button  @click="popupActivo=true" color="primary" type="border">Add Shipment</vs-button>
    <vs-popup class="holamundo"  title="Add Shipment" :active.sync="popupActivo">
      <div class="vx-col w-full mb-base">
        <div class="vx-row">
          <div class="vx-col w-full mb-6">
            <p>Province</p>
            <ProvinceDropdown v-model="province_id"/>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full mb-6">
            <p>City</p>
            <CityDropdown v-model="city_id" :province="province_id" :resetOnOptionsChange="resetCity" />
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full mb-6">
            <p>Subdistrict</p>
            <SubdistrictDropdown v-model="form.subdistrict_id" :city="city_id" :resetOnOptionsChange="resetSubdistrict" />
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-6">
            <vs-input class="inputx" label-placeholder="Code" v-model="form.code" />
            <vs-input class="inputx" label-placeholder="Type" v-model="form.type" />
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-6">
            <vs-input class="inputx" label-placeholder="Courier" v-model="form.courier" />
            <vs-input class="inputx" label-placeholder="Price" v-model="form.price" />
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full mb-6">
            <vs-input class="inputx" label-placeholder="Estimation" v-model="form.estimation" />
          </div>
        </div>
        <vs-button type="relief" vslor="primary" id="button-add-shipment" class="vs-con-loading__container mt-3" @click="submit">Add Shipment</vs-button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import ProvinceDropdown from '@/components/form/ProvinceDropdown'
import CityDropdown from '@/components/form/CityDropdown'
import SubdistrictDropdown from '@/components/form/SubdistrictDropdown'
import { mapActions, mapGetters  } from 'vuex'
export default {
  components: {
     ProvinceDropdown,
     CityDropdown,
     SubdistrictDropdown,
  },

  data(){
    return {
      popupActivo:false,
      resetCity: false,
      resetSubdistrict: false,
      province_id: '',
      city_id: '',
      form: {
        code: '',
        type: '',
        courier: '',
        price: '',
        estimation: '',
        subdistrict_id: '',
      }
    }
  },

  watch: {
    'province_id'() {
      this.resetCity = true
      this.resetSubdistrict = true
    },
    'city_id'() {
      this.resetSubdistrict = true
    }
  },

  methods: {
    ...mapActions({
      createShippingCourier: 'shippings/createShippingCourier'
    }),
    submit(){
      this.$vs.loading({
        container: '#button-add-shipment',
        scale: 0.45
      })

      this.createShippingCourier(this.form).then(() => {
        this.$vs.loading.close('#button-add-shipment > .con-vs-loading')
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
