<template lang="html">
  <div id="load-orders-listing" class="data-list-container">
    <div class="vx-row">
      <div class="vx-col w-full md:w-1/2 mb-base">
        <vx-card class="p-2" title="Cutomer" v-if="customer">
            <vs-avatar class="mx-auto mb-6 block" size="80px" :src="require(`@/assets/images/portrait/small/avatar-s-12.png`)" />
            <div class="text-center">
                <h4>{{ customer.name }}</h4>
                <p class="text-grey">Customer</p>
            </div>
            <div class="flex justify-between flex-wrap">
                <vs-button class="mt-4 shadow-lg" type="gradient" color="#7367F0" gradient-color-secondary="#CE9FFC">Message</vs-button>
                <vs-button class="mt-4" type="border" color="#b9b9b9">Call</vs-button>
            </div>
            <template slot="footer">
                <vs-divider />
                <div class="flex justify-between">
                    <span class="flex items-center">
                        <feather-icon icon="OctagonIcon" svgClasses="h-5 w-5 text-warning stroke-current" />
                        <span class="ml-2">Joined</span>
                    </span>
                    <span class="flex items-center">
                        <span class="ml-2">{{ customer.created_at }}</span>
                    </span>
                </div>
            </template>
        </vx-card>
      </div>
      <div class="vx-col w-full md:w-1/2 mb-base" v-if="shipping">
        <vx-card title="Shipping Detail">
            <table>
              <tr>
                <th colspan="3"><h5>Details</h5></th>
              </tr>
              <tr>
                <th>Code</th>
                <td>:</td>
                <td>{{ shipping.code }}</td>
              </tr>
              <tr>
                <th>Courier</th>
                <td>:</td>
                <td>{{ shipping.courier }}</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>:</td>
                <td>{{ shipping.type }}</td>
              </tr>
              <tr>
                <th>Estimation</th>
                <td>:</td>
                <td>{{ shipping.estimation }}</td>
              </tr>
              <tr>
                <th>Price</th>
                <td>:</td>
                <td>{{ detail.shipping_price }}</td>
              </tr>
            </table>
            <p class=" mt-1"></p>
        </vx-card>
      </div>
      <div class="vx-col w-full mb-base" v-if="detail.products">
        <vx-card title="Order Detail">
          <vs-table :data="detail.products">
            <template slot="thead">
              <vs-th>
                ID
              </vs-th>
              <vs-th>
                Product Name
              </vs-th>
              <vs-th>
                Quantity
              </vs-th>
              <vs-th>
                Price
              </vs-th>
              <vs-th>
                Total
              </vs-th>
            </template>
            <template slot-scope="{data}">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
                <vs-td :data="data[indextr].id">
                  {{ data[indextr].id }}
                </vs-td>
                <vs-td :data="data[indextr].id">
                  {{ data[indextr].product.name }} / {{ data[indextr].type.name }} / {{ data[indextr].name }}
                </vs-td>
                <vs-td :data="data[indextr].id">
                  {{ data[indextr].quantity }}
                </vs-td>
                <vs-td :data="data[indextr].id">
                  {{ data[indextr].original_price | rupiah }}
                </vs-td>
                <vs-td :data="data[indextr].id">
                  {{ data[indextr].original_price * data[indextr].quantity | rupiah }}
                </vs-td>
              </vs-tr>
              <vs-tr >
                <vs-td colspan="3" >
                </vs-td>
                <vs-td>
                  <b>SubTotal</b>
                </vs-td>
                <vs-td>
                  {{ detail.subtotal | rupiah }}
                </vs-td>
              </vs-tr>
              <vs-tr >
                <vs-td colspan="3" >
                </vs-td>
                <vs-td>
                  <b>Discount</b>
                </vs-td>
                <vs-td>
                  {{ detail.discount | rupiah }}
                </vs-td>
              </vs-tr>
              <vs-tr >
                <vs-td colspan="3" >
                </vs-td>
                <vs-td>
                  <b>Shipping</b>
                </vs-td>
                <vs-td>
                  {{ detail.shipping_price | rupiah }}
                </vs-td>
              </vs-tr>
              <vs-tr >
                <vs-td colspan="3" >
                </vs-td>
                <vs-td>
                  <b>Total</b>
                </vs-td>
                <vs-td>
                {{ detail.total | rupiah }}
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </vx-card>
      </div>
      <div class="vx-col w-full mb-base" v-if="detail.returns">
        <vx-card title="Order Return Detail">
          <vs-table :data="detail.returns">
            <template slot="thead">
              <vs-th>
                ID
              </vs-th>
              <vs-th>
                Product Name
              </vs-th>
              <vs-th>
                Info
              </vs-th>
              <vs-th>
                Quantity
              </vs-th>
              <vs-th>
                Price
              </vs-th>
              <vs-th>
                Total
              </vs-th>
            </template>
            <template slot-scope="{data}">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
                <vs-td :data="data[indextr].id">
                  {{ data[indextr].id }}
                </vs-td>
                <vs-td :data="data[indextr].id">
                  {{ data[indextr].product_name }} / {{ data[indextr].type_name }} / {{ data[indextr].variation_name }}
                </vs-td>
                <vs-td :data="data[indextr].id">
                  {{ data[indextr].info }}
                </vs-td>
                <vs-td :data="data[indextr].id">
                  {{ data[indextr].quantity }}
                </vs-td>
                <vs-td :data="data[indextr].id">
                  {{ data[indextr].original_price | rupiah }}
                </vs-td>
                <vs-td :data="data[indextr].id">
                  {{ data[indextr].original_price * data[indextr].quantity | rupiah }}
                </vs-td>
              </vs-tr>
              <vs-tr >
                <vs-td colspan="3" >
                </vs-td>
                <vs-td>
                  <b>Total</b>
                </vs-td>
                <vs-td>
                {{ totalReturns | rupiah }}
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
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {

    }
  },

  computed: {
    ...mapGetters({
      detail: 'orders/detail',
    }),

    customer() {
      return this.detail.customer;
    },
    shipping() {
      return this.detail.shipping
    },
    totalReturns() {
        if (this.detail.returns.length == 0) {
            return 0
        }
        let total = this.detail.returns.map((product) => {
          return product.original_price
        })

        return total.reduce((a, b) => a + b)
    },
  },

  methods: {
    ...mapActions({
      showOrder : 'orders/showOrder'
    })
  },

  created() {
    this.showOrder(this.$route.params.orderId)
  }
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  margin-bottom: 15px;
  border-bottom: 1px solid #dae1e7;
  tr th, tr td {
    padding: 10px;
  }
}
</style>
