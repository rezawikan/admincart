<template lang="html">
  <v-select @input="changed" :options="provinces | serialize"></v-select>
</template>

<script>
import vSelect from 'vue-select'
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
export default {
	props: {
		type: {
			required: true,
			type: String
		}
	},
  
	data() {
		return {
			selected: []
		}
	},

	components: {
		vSelect
	},

	watch: {
		'type'() {
			this.getProvinces({
				type: this.type
			})
		}
	},

	filters: {
		serialize: function(value) {
			return value.map(filter => {
				return ({
					label: filter.province,
					value: filter.province_id
				})
			})
		}
	},

	computed: {
		...mapGetters({
			provinces: 'ongkir/provinces'
		})
	},

	methods: {
		...mapActions({
			getProvinces: 'ongkir/getProvinces'
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
