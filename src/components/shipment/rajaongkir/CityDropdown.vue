<template lang="html">
   <v-select @input="changed" :options="filterCities | serialize" :resetOnOptionsChange="resetOnOptionsChange"></v-select>
</template>

<script>
import vSelect from 'vue-select'
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
export default {
	props: {
		province: {
			required: true,
		},
		type: {
			required: true,
			type: String
		},
		resetOnOptionsChange: {
			type: Boolean,
			default: false
		}
	},

	components: {
		vSelect
	},

	watch: {
		'province'() {
			this.getCities({
				province: this.province,
				type: this.type
			})
		}
	},

	data() {
		return {
			selected: []
		}
	},

	filters: {
		serialize: function(value) {
			return value.map(filter => {
				return ({
					label: filter.city_name,
					value: filter.city_id
				})

			})
		}
	},

	computed: {
		filterCities() {
			return _.filter(this.cities, (v) => v.province_id == this.province)
		},
		...mapGetters({
			cities: 'ongkir/cities'
		})
	},
	methods: {
		...mapActions({
			getCities: 'ongkir/getCities',
		}),
		changed(value) {
			if (value) {
				this.$emit('input', value.value)
			} else {
				this.$emit('input', null)
			}
		}
	}
}
</script>
