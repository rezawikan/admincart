<template>
<div id="dashboard-analytics">
  <div class="vx-row">

		<!-- CARD 2: SUBSCRIBERS GAINED -->
    <div class="vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-base">
      <statistics-card-line icon="ShoppingBagIcon" :statistic="amountPending" statisticTitle="Pending" :chartData="pending" color='warning' type='area'></statistics-card-line>
    </div>

    <!-- CARD 2: SUBSCRIBERS GAINED -->
    <div class="vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-base">
      <statistics-card-line icon="DropletIcon" :statistic="amountCompleted" statisticTitle="Completed" :chartData="completed" color='success' type='area'></statistics-card-line>
    </div>

    <!-- CARD 3: ORDER RECIEVED -->
    <div class="vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-base">
      <statistics-card-line icon="LoaderIcon" :statistic="amountProcessing" statisticTitle="Processing" :chartData="processing" color='danger' type='area'></statistics-card-line>
    </div>
  </div>

  <div class="vx-row">
    <div class="vx-col w-full mb-base">
  			<vx-card title="Revenue Last Month">
  					<div slot="no-body" class="p-6 pb-0">
  							<div class="flex">
  									<div>
  											<p class="mb-1 font-semibold">Total</p>
  											<p class="text-3xl"><sup class="text-base mr-1">$</sup>{{ lastMonthamountRevenue }}</p>
  									</div>
  							</div>
  							<vue-apex-charts type=line height=266 :options="revenueLastMonth.chartOptions" :series="revenueLastMonth.series" />
  					</div>
  			</vx-card>
  	</div>

    <div class="vx-col w-full mb-base">
  			<vx-card title="Revenue This Month">
  					<div slot="no-body" class="p-6 pb-0">
  							<div class="flex">
  									<div>
  											<p class="mb-1 font-semibold">Total</p>
  											<p class="text-3xl"><sup class="text-base mr-1">$</sup>{{ thisMonthamountRevenue }}</p>
  									</div>
  							</div>
  							<vue-apex-charts type=line height=266 :options="revenueThisMonth.chartOptions" :series="revenueThisMonth.series" />
  					</div>
  			</vx-card>
  	</div>
  </div>

</div>
</template>

<script>
import { mapActions } from 'vuex'
import VueApexCharts from 'vue-apexcharts'
import analyticsData from './analyticsData.js'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
export default {
  metaInfo: {
    title: 'Ummu Zayn',
    titleTemplate: '%s - Home',
    htmlAttrs: {
      lang: 'en',
      amp: true
    }
  },
	components: {
		StatisticsCardLine,
		VueApexCharts
	},

  methods:{
    ...mapActions({
      analyticsGraphicCount: 'analytics/analyticsGraphicCount',
      analyticsGraphicRevenue: 'analytics/analyticsGraphicRevenue',

    })
  },

  computed: {
    thisMonthamountRevenue() {
      return this.thisMonth.revenue.reduce((a, b) => a + b)
    },
    lastMonthamountRevenue() {
      return this.lastMonth.revenue.reduce((a, b) => a + b)
    },
    amountPending() {
      return this.pendingData.reduce((a, b) => a + b) ? this.pendingData.reduce((a, b) => a + b) : 0
    },
    amountCompleted() {
      return this.completedData.reduce((a, b) => a + b) ? this.completedData.reduce((a, b) => a + b) : 0
    },
    amountProcessing() {
      return this.processingData.reduce((a, b) => a + b) ? this.processingData.reduce((a, b) => a + b) : 0
    },
    pending(){
      return Object.assign({}, {
        chartOptions: {
          grid: {
              show: false,
              padding: {
                  left: 0,
                  right: 0
              }
          },
          chart: {
              toolbar: {
                  show: false,
              },
              sparkline: {
                  enabled: true
              }
          },
          dataLabels: {
              enabled: false
          },
          stroke: {
              curve: 'smooth',
              width: 2.5
          },
          fill: {
              type: 'gradient',
              gradient: {
                  shadeIntensity: 0.9,
                  opacityFrom: 0.7,
                  opacityTo: 0.5,
                  stops: [0, 80, 100]
              }
          },
          xaxis: {
              type: 'numeric',
              lines: {
                  show: false,
              },
              axisBorder: {
                  show: false,
              },
              labels: { show: false }
          },
          yaxis: [{
              y: 0,
              offsetX: 0,
              offsetY: 0,
              padding: { left: 0, right: 0 },
          }],
          tooltip: {
              x: { show: false }
          }
        }
      },
      {
        series: [{
            name: 'Pending',
            data: this.pendingData ? this.pendingData : [0,0,0,0,0]
        }]
      })
    },
    completed(){
      return Object.assign({}, { chartOptions: {
          grid: {
              show: false,
              padding: {
                  left: 0,
                  right: 0
              }
          },
          chart: {
              toolbar: {
                  show: false,
              },
              sparkline: {
                  enabled: true
              }
          },
          dataLabels: {
              enabled: false
          },
          stroke: {
              curve: 'smooth',
              width: 2.5
          },
          fill: {
              type: 'gradient',
              gradient: {
                  shadeIntensity: 0.9,
                  opacityFrom: 0.7,
                  opacityTo: 0.5,
                  stops: [0, 80, 100]
              }
          },
          xaxis: {
              type: 'numeric',
              lines: {
                  show: false,
              },
              axisBorder: {
                  show: false,
              },
              labels: { show: false }
          },
          yaxis: [{
              y: 0,
              offsetX: 0,
              offsetY: 0,
              padding: { left: 0, right: 0 },
          }],
          tooltip: {
              x: { show: false }
          }
        }
      },
      {
        series: [{
          name: 'Completed',
          data: this.completedData ? this.completedData : [0,0,0,0,0]
        }]
      })
    },
    processing(){
      return Object.assign({}, { chartOptions: {
          grid: {
              show: false,
              padding: {
                  left: 0,
                  right: 0
              }
          },
          chart: {
              toolbar: {
                  show: false,
              },
              sparkline: {
                  enabled: true
              }
          },
          dataLabels: {
              enabled: false
          },
          stroke: {
              curve: 'smooth',
              width: 2.5
          },
          fill: {
              type: 'gradient',
              gradient: {
                  shadeIntensity: 0.9,
                  opacityFrom: 0.7,
                  opacityTo: 0.5,
                  stops: [0, 80, 100]
              }
          },
          xaxis: {
              type: 'numeric',
              lines: {
                  show: false,
              },
              axisBorder: {
                  show: false,
              },
              labels: { show: false }
          },
          yaxis: [{
              y: 0,
              offsetX: 0,
              offsetY: 0,
              padding: { left: 0, right: 0 },
          }],
          tooltip: {
              x: { show: false }
          }
        }
      },
      {
        series: [{
            name: 'Processing',
            data: this.processingData ? this.processingData : [0,0,0,0,0]
        }]
      })
    },
    revenueLastMonth() {
      return Object.assign({}, {series: [{
              name: "Revenue",
              data: this.lastMonth.revenue
          }
      ],
      chartOptions: {
          chart: {
              toolbar: { show: false },
          },
          stroke: {
              curve: 'smooth',
              dashArray: [0, 8],
              width: [4, 2],
          },
          grid: {
              borderColor: '#e7e7e7',
          },
          legend: {
              show: false,
          },
          colors: ['#F97794', '#b8c2cc'],
          fill: {
              type: 'gradient',
              gradient: {
                  shade: 'dark',
                  inverseColors: false,
                  gradientToColors: ['#7367F0', '#b8c2cc'],
                  shadeIntensity: 1,
                  type: 'horizontal',
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [0, 100, 100, 100]
              },
          },
          markers: {
              size: 0,
              hover: {
                  size: 5
              }
          },
          xaxis: {
              labels: {
                  style: {
                      cssClass: 'text-grey fill-current',
                  }
              },
              axisTicks: {
                  show: false,
              },
              categories: this.lastMonth.status,
              axisBorder: {
                  show: false,
              },
          },
          yaxis: {
              tickAmount: 5,
              labels: {
                  style: {
                      cssClass: 'text-grey fill-current',
                  },
                  formatter: function(val) {
                      return val > 99999 ? (val / 1000).toFixed(2) + ' k' : val.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
                  }
              }
          },
          tooltip: {
              x: { show: false }
          }
      }})
    },
    revenueThisMonth() {
      return Object.assign({}, {series: [{
              name: "Revenue",
              data: this.thisMonth.revenue
          }
      ],
      chartOptions: {
          chart: {
              toolbar: { show: false },
          },
          stroke: {
              curve: 'smooth',
              dashArray: [0, 8],
              width: [4, 2],
          },
          grid: {
              borderColor: '#e7e7e7',
          },
          legend: {
              show: false,
          },
          colors: ['#F97794', '#b8c2cc'],
          fill: {
              type: 'gradient',
              gradient: {
                  shade: 'dark',
                  inverseColors: false,
                  gradientToColors: ['#7367F0', '#b8c2cc'],
                  shadeIntensity: 1,
                  type: 'horizontal',
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [0, 100, 100, 100]
              },
          },
          markers: {
              size: 0,
              hover: {
                  size: 5
              }
          },
          xaxis: {
              labels: {
                  style: {
                      cssClass: 'text-grey fill-current',
                  }
              },
              axisTicks: {
                  show: false,
              },
              categories: this.thisMonth.status,
              axisBorder: {
                  show: false,
              },
          },
          yaxis: {
              tickAmount: 5,
              labels: {
                  style: {
                      cssClass: 'text-grey fill-current',
                  },
                  formatter: function(val) {
                      return val > 99999 ? (val / 1000).toFixed(2) + ' k' : val.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
                  }
              }
          },
          tooltip: {
              x: { show: false }
          }
      }})
    }
  },

  created(){
    this.analyticsGraphicCount({
      payload: { period: 'this_month', status: 'pending' },
      timeable: 'week'}).then((response) => {
        if (response != null) {
            this.pendingData = response.numbers
        }

    })

    this.analyticsGraphicCount({
      payload: { period: 'this_month', status: 'completed'},
      timeable: 'week'}).then((response) => {
        if (response != null) {
            this.completedData = response.numbers
        }

    })

    this.analyticsGraphicCount({
      payload: { period: 'this_month', status: 'processing'},
      timeable: 'week'}).then((response) => {
        if (response != null) {
            this.processingData = response.numbers
        }

    })

    this.analyticsGraphicRevenue({
      payload: { period: 'last_month', status: 'completed' },
      timeable: 'day'}).then((response) => {
        if (response != null) {
            this.lastMonth = response
        }
    })

    this.analyticsGraphicRevenue({
      payload: { period: 'this_month', status: 'completed' },
      timeable: 'day'}).then((response) => {
        if (response != null) {
            this.thisMonth = response
        }
    })
  },

	data() {
		return {
      analyticsData: analyticsData,
      lastMonth :{
        status: [0,0,0,0],
        revenue: [0,0,0,0]
      },
      thisMonth :{
        status: [0,0,0,0],
        revenue: [0,0,0,0]
      },
      pendingData: [0,0,0],
      completedData: [0,0,0],
      processingData: [0,0,0],
		}
	}
}
</script>

<style lang="css" scoped>
</style>
