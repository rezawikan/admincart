<template lang="html">
  <div id="load-returns-listing" class="data-list-container">
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 mb-6">
        <vx-card
          title="Destination"
          title-color="primary">
          <div class="vx-col w-full mb-6">
            <p>Type</p>
            <v-select :options="['national','international']" v-model="type"></v-select>
          </div>
          <div class="vx-col w-full mb-6">
            <p>Province</p>
            <ProvinceDropdownRajaOngkir v-model="destination.province_id" :type="type"/>
          </div>
          <div class="vx-col w-full mb-6">
            <p>City</p>
            <CityDropdownRajaOngkir v-model="destination.city_id" :province="destination.province_id" :type="type"/>
          </div>
          <div class="vx-col w-full mb-6">
            <p>Subdistrict</p>
            <SubdistrictDropdownRajaOngkir v-model="destination.subdistrict_id" :city="destination.city_id" :type="type" />
          </div>
        </vx-card>
      </div>
      <div class="vx-col w-full sm:w-1/2 mb-6">
        <vx-card
          title="Our Shipment"
          title-color="primary"
          subtitle="Brownie pastry chocolate pastry chocolate pudding.">
          <div class="vx-col w-full mb-6">
            <p>Province</p>
            <ProvinceDropdown v-model="province_id"/>
          </div>
          <div class="vx-col w-full mb-6">
            <p>City</p>
            <CityDropdown v-model="city_id" :province="province_id" />
          </div>
          <div class="vx-col w-full mb-6">
            <p>Subdistrict</p>
            <SubdistrictDropdown v-model="subdistrict_id" :city="city_id" />
          </div>
          <vs-button id="generate-shipment" type="relief" vslor="primary" color="primary" @click.prevent="generate" :disabled="this.errors.items.length == 0 ? false : true">Generate</vs-button>
        </vx-card>
      </div>
      <div class="vx-col w-full mb-6">
        <vx-card
          title="Shipping List"
          title-color="primary">
          <vs-table :data="filteredCost">

            <template slot="thead">
              <vs-th>Code</vs-th>
              <vs-th>Type</vs-th>
              <vs-th>Courier</vs-th>
              <vs-th>Estimation</vs-th>
              <vs-th>Price</vs-th>
            </template>

            <template slot-scope="{data}">
              <vs-tr :key="indextr" v-for="(tr, indextr) in data">

                <vs-td :data="data[indextr].code">
                  {{ data[indextr].code }}
                </vs-td>

                <vs-td :data="data[indextr].type">
                  {{ data[indextr].type }}
                </vs-td>

                <vs-td :data="data[indextr].courier">
                  {{ data[indextr].courier }}
                </vs-td>

                <vs-td :data="data[indextr].estimation">
                  {{ data[indextr].estimation }}
                </vs-td>

                <vs-td :data="data[indextr].price">
                  {{ data[indextr].price | rupiah }}
                </vs-td>
              </vs-tr>
            </template>

          </vs-table>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import {
	mapActions,
	mapGetters
} from 'vuex'
import ProvinceDropdown from '@/components/form/ProvinceDropdown'
import CityDropdown from '@/components/form/CityDropdown'
import SubdistrictDropdown from '@/components/form/SubdistrictDropdown'
import ProvinceDropdownRajaOngkir from '@/components/shipment/rajaongkir/ProvinceDropdown'
import CityDropdownRajaOngkir from '@/components/shipment/rajaongkir/CityDropdown'
import SubdistrictDropdownRajaOngkir from '@/components/shipment/rajaongkir/SubdistrictDropdown'

export default {
	metaInfo: {
		title: 'Ummu Zayn',
		titleTemplate: '%s - Shipment Auto Generate',
		htmlAttrs: {
			lang: 'en',
			amp: true
		}
	},

	components: {
		ProvinceDropdown,
		CityDropdown,
		SubdistrictDropdown,
		ProvinceDropdownRajaOngkir,
		CityDropdownRajaOngkir,
		SubdistrictDropdownRajaOngkir,
		'v-select': vSelect,
	},

	data() {
		return {
			type: '',
			province_id: '',
			city_id: '',
			subdistrict_id: '',
			destination: {
				province_id: '',
				city_id: '',
				subdistrict_id: ''
			}
		}
	},

	watch: {
		'destination.subdistrict_id'() {
			this.getCost({
        type: this.type,
				destination: this.destination.subdistrict_id,
				courier: 'jne:jnt:pos:tiki'
			})
		}
	},

	methods: {
		...mapActions({
			getCost: 'ongkir/getCost',
			saveCost: 'ongkir/saveCost'
		}),
		generate() {
			this.$vs.loading({
				container: '#generate-shipment',
				scale: 0.45
			})

			this.$validator.validateAll().then(result => {
				if (result) {
					this.saveCost({
						id: this.subdistrict_id,
						payload: this.filteredCost
					}).then(() => {
						this.$vs.loading.close('#generate-shipment > .con-vs-loading')
					})
				}
			})
		}
	},

	computed: {
		...mapGetters({
			cost: 'ongkir/cost',
			filteredCost: 'ongkir/filteredCost'
		})
	}
}
</script>

<style lang="scss" scoped>

</style>
