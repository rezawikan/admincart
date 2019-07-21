export default {
	provinces: state => state.provinces,
	cities: state => state.cities,
	subdistricts: state => state.subdistricts,
	cost: state => state.cost,
	filteredCost: state => {
		let courier = []
		state.cost.forEach((el, index) => {
			return el.costs.map((x) => {
				courier.push({
					courier: el.name,
					type: x.description,
					code: x.service,
					price: x.cost[0].value,
					estimation: x.cost[0].etd ? x.cost[0].etd : 'Not Available'
				})
			})
		})
    return courier
	}
}
