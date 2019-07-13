<template>
<form @submit.prevent="store">
    <div class="vx-row">
      <div class="vx-col sm:w-1/2 w-full mb-6">
        <vs-input class="w-full" placeholder="Receiver Name" v-model="form.name" name="receiver name" ref="receiver name"  v-validate="'required|min:4'" data-vv-validate-on="blur" />
        <span class="text-danger text-sm" :show="errors.has('receiver name')">{{ errors.first('receiver name') }}</span>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-6">
        <vs-input class="w-full" placeholder="Phone Number" v-model="form.phone" name="phone number" ref="phone number"  v-validate="'required|numeric|min:11'" data-vv-validate-on="blur" />
        <span class="text-danger text-sm" :show="errors.has('phone number')">{{ errors.first('phone number') }}</span>
      </div>
      <div class="vx-col w-full mb-6">
        <vs-input class="w-full" type="text" placeholder="Address Line" v-model="form.address_1" name="address line" ref="address line"  v-validate="'required|min:15'" data-vv-validate-on="blur" />
        <span class="text-danger text-sm" :show="errors.has('address line')">{{ errors.first('address line') }}</span>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col sm:w-1/2 w-full mb-6">
        <ProvinceDropdown v-model="province_id" name="province" ref="province"  v-validate="'required'" data-vv-validate-on="blur"/>
        <span class="text-danger text-sm" :show="errors.has('province')">{{ errors.first('province') }}</span>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-6">
        <CityDropdown v-model="city_id" :province="province_id" :resetOnOptionsChange="resetCity" name="city" ref="city"  v-validate="'required'" data-vv-validate-on="blur" />
        <span class="text-danger text-sm" :show="errors.has('city')">{{ errors.first('city') }}</span>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col sm:w-1/2 w-full mb-6">
        <SubdistrictDropdown v-model="form.subdistrict_id" :city="city_id" :resetOnOptionsChange="resetSubdistrict" name="subdistrict" ref="subdistrict"  v-validate="'required'" data-vv-validate-on="blur" />
        <span class="text-danger text-sm" :show="errors.has('subdistrict')">{{ errors.first('subdistrict') }}</span>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full mb-6">
        <vs-button class="mr-3 mb-6" id="create-address">Add Address</vs-button>
        <vs-button color="warning" type="border" class="mb-2" @click.prevent="$emit('cancel')">Cancel</vs-button>
      </div>
    </div>
</form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProvinceDropdown from '@/components/form/ProvinceDropdown'
import CityDropdown from '@/components/form/CityDropdown'
import SubdistrictDropdown from '@/components/form/SubdistrictDropdown'

export default {
  components: {
    ProvinceDropdown,
    CityDropdown,
    SubdistrictDropdown
  },

  data() {
    return {
      resetCity: false,
      resetSubdistrict: false,
      province_id: '',
      city_id: '',
      form: {
        name: '',
        phone: '',
        address_1: '',
        subdistrict_id: '',
        default: 'true'
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

  computed: {
    ...mapGetters({
      customer: 'users/customer'
    })
  },

  methods: {
    ...mapActions({
      createPublicAddresses: 'addresses/createPublicAddresses'
    }),
    store() {
      this.$vs.loading({
        container: '#create-address',
        scale: 0.45
      })

      this.$validator.validateAll().then(result => {
        if(result) {
            let data = Object.assign({user_id:this.customer.id},this.form)
            this.createPublicAddresses(data).then((response) => {
              this.$emit('created', response.data.data)
              this.$vs.loading.close('#create-address > .con-vs-loading')
            })
        } else {
            this.$vs.loading.close('#create-address > .con-vs-loading')
        }
      })

      this.$vs.loading.close('#create-address > .con-vs-loading')
    }
  }
}
</script>
