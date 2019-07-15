<template lang="html">
  <div class="">
    <div class="vx-col w-full mb-base">
      <vx-card>
        <div class="vx-row mb-6">
          <div class="vx-col w-full">
            <label class="vs-input--label">Customer</label>
            <CustomerDropdown
            mode="select"
            v-model="customer"
            name="customer"
            v-validate="'required'"
            />
            <span class="text-danger text-sm" :show="errors.has('customer')">{{ errors.first('customer') }}</span>
          </div>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base">
      <vx-card>
        <div class="vx-row mb-6">
          <div class="vx-col w-full">
            <label class="vs-input--label">Order Date</label>
            <flat-pickr
            class="vs-inputx vs-input--input normal"
            :config="configdateTimePicker"
            v-model="created_at"
            name="order date"
            v-validate="'required'"
            />
            <span class="text-danger text-sm" :show="errors.has('order date')">{{ errors.first('order date') }}</span>
          </div>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base">
      <vx-card>
        <div class="vx-row mb-6">
          <div class="vx-col w-full">
            <h4 class="mb-6">Select Products</h4>
            <ProductList/>
          </div>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base" v-if="addressShow">
      <vx-card title="Shipping Detail">
        <ShippingAddress
        :addresses="publicAddress"
        v-model="form.address_id"
        />
      </vx-card>
    </div>

    <div class="vx-col w-full mb-base" v-if="customer">
      <vx-card title="Cart Details">
        <CartOverview/>
        <template v-if="shippingMethodId">
          <table class="mt-3">
            <tr>
              <td class="has-text-weight-bold">Discount</td>
              <td>:</td>
              <td>{{ discount | rupiah }}</td>
            </tr>
            <tr>
              <td class="has-text-weight-bold">Shipping</td>
              <td>:</td>
              <td>{{ shipping.price * weight | rupiah }}</td>
            </tr>
            <tr>
              <td class="has-text-weight-bold">Total</td>
              <td>:</td>
              <td>{{ total | rupiah }}</td>
            </tr>
          </table>
        </template>
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base" v-if="customer">
      <vx-card title="Discount">
        <div class="vx-row">
          <div class="vx-col w-full mb-6">
             <vs-input class="w-full" type="number" label="Discount" v-model="discount" name="discount" ref="discount"  v-validate="'required'" data-vv-validate-on="blur" />
             <span class="text-danger text-sm" :show="errors.has('discount')">{{ errors.first('discount') }}</span>
          </div>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base" v-if="shippingMethodId">
      <vx-card title="Shipping Detail">
        <div class="vx-row">
          <div class="vx-col w-full mb-6">
             <ShippingMethodsDropdown :selectedID="shippingMethodId" :options="shippingMethods" v-model="shippingMethodId" name="shippimg method" ref="shippimg method"  v-validate="'required'" data-vv-validate-on="blur"/>
             <span class="text-danger text-sm" :show="errors.has('shippimg method')">{{ errors.first('shippimg method') }}</span>
          </div>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base" v-if="customer">
      <vx-card title="PaymentMethods">
        <div class="vx-row">
          <div class="vx-col w-full mb-6">
            <PaymentMethods
            :paymentMethods="paymentMethods"
            v-model="form.payment_method_id"
            name="payment method"
            v-validate="'required'"
            />
            <span class="text-danger text-sm" :show="errors.has('payment method')">{{ errors.first('payment method') }}</span>
          </div>
          <div class="vx-col w-full mb-6">
            <template v-if="defaultPayment">
              <vs-collapse v-if="defaultPayment.type == 'Bank Transfer'">
                <vs-collapse-item>
                  <div slot="header">
                    Bank Mandiri
                  </div>
                  Lorem....metus.
                </vs-collapse-item>

                <vs-collapse-item>
                  <div slot="header">
                    Bank BCA
                  </div>
                  Nunc....maximus.
                </vs-collapse-item>

                <vs-collapse-item>
                  <div slot="header">
                    Bank BRI
                  </div>
                  Suspendisse....eu
                </vs-collapse-item>

                <vs-collapse-item>
                  <div slot="header">
                    Bank Syariah
                  </div>
                  Suspendisse....finibus.
                </vs-collapse-item>
              </vs-collapse>

              <div class="flex items-center" v-if="defaultPayment.type == 'Shopee'" >
                  <span>Transaction ID</span>
                  <vs-input name="shopee_id" class="mr-3 ml-2" />
              </div>
            </template>
          </div>
        </div>
      </vx-card>
    </div>
    <vs-button id="create-order" class="vs-con-loading__container" type="relief" vslor="primary" color="primary" @click.prevent="order" :disabled="this.errors.items.length == 0 ? false : true">Place Order</vs-button>
  </div>
</template>

<script>
import axios from 'axios'
import 'flatpickr/dist/flatpickr.css'
import 'flatpickr/dist/plugins/confirmDate/confirmDate.css';
import ConfirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate.js';
import flatPickr from 'vue-flatpickr-component'
import ProductList from '@/components/products/ProductList'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import CartOverview from '@/components/cart/CartOverview.vue'
import CustomerDropdown from '@/components/form/CustomerDropdown'
import ShippingAddress from '@/components/addresses/ShippingAddress'
import PaymentMethods from '@/components/payments/PaymentMethods.vue'
import ShippingMethodsDropdown from '@/components/form/ShippingMethodsDropdown'

export default {
  metaInfo: {
    title: 'Ummu Zayn',
    titleTemplate: '%s - Create Order',
    htmlAttrs: {
      lang: 'en',
      amp: true
    }
  },
  data() {
      return {
        customer: null,
        form: {
          address_id: null,
          payment_method_id: null
        },
        addressShow: false,
        discount: 0,
        created_at: null,
        configdateTimePicker: {
          plugins: [new ConfirmDatePlugin({
            confirmIcon: "-", // your icon's html, if you wish to override
            confirmText: "Confirm ",
            showAlways: false,
            theme: "light" // or "dark"
          })],
          defaultHour: new Date().getHours(),
          defaultMinute: new Date().getMinutes(),
          enableTime: true,
          dateFormat: 'Y-m-d H:i:S',
          altInput: true,
          enableSeconds: true,
          disableMobile: true

        }
      }
  },

  components: {
    ShippingMethodsDropdown,
    CustomerDropdown,
    ShippingAddress,
    PaymentMethods,
    CartOverview,
    ProductList,
    flatPickr
  },

  computed: {
    ...mapGetters({
      publicAddress: 'addresses/publicAddresses',
      shippingMethods: 'shippings/shippingMethods',
      paymentMethods: 'payments/paymentMethods',
      total: 'cart/total',
      products: 'cart/products',
      empty : 'cart/empty',
      shipping: 'cart/shipping',
      weight: 'cart/weight'
    }),

    defaultPayment() {
      return this.paymentMethods.find((x) => {
        if (x.id == this.form.payment_method_id) {
            return x
        }
      })
    },

    shippingMethodId: {
      get() {
        return this.shipping ? this.shipping.id : ''
      },
      set(shippingMethodId) {
        this.setShipping(
          this.shippingMethods.find(s => s.id == shippingMethodId)
        )
      }
    }
  },

  methods: {
      ...mapActions({
        publicAddresses: 'addresses/publicAddresses',
        setShipping: 'cart/setShipping',
        getCart: 'cart/getCart',
        setDataCustomer: 'users/setDataCustomer',
        getPaymentMethods: 'payments/getPaymentMethods',
        getShippingMethodsForAddress: 'shippings/getShippingMethodsForAddress'
      }),

      order() {
        this.$vs.loading({
          container: '#create-order',
          scale: 0.45
        })

        this.$validator.validateAll().then(result => {
          if (result && this.products.length > 0) {
              axios.post(`${process.env.API_URL}public-orders`, {
                ...this.form,
                shipping_method_id: this.shippingMethodId,
                user_id: this.customer.id,
                discount: this.discount,
                created_at: this.created_at
              }).then(() => {
                  this.$router.replace({ path: '/orders' })
              })
          } else if (result && this.products.length < 1) {
              this.$vs.notify({
                title: 'Cart',
                text: 'Your cart is empty'
              })
              this.$vs.loading.close('#create-order > .con-vs-loading')
          } else {
              this.$vs.loading.close('#create-order > .con-vs-loading')
          }
        })
      }
  },

  watch: {
    'discount'(query){
      if (query) {
          this.getCart({user_id:this.customer.id, shipping_method_id: this.shipping.id, discount: query})
      }
    },
    'customer'(query){
      this.addressShow = false
      this.setDataCustomer(query)
      this.getCart({user_id: query.id})
      this.publicAddresses({user_id: query.id}).then(() => {
        this.addressShow = true
      })
    },
    'form.address_id'(addressId) {
      this.getShippingMethodsForAddress(addressId).then(() => {
        this.setShipping(this.shippingMethods[0])
      })
    },
    shippingMethodId(query) {
      if (query) {
          this.getCart({user_id:this.customer.id, shipping_method_id: query, discount: this.discount})
      }
    }
  },

  created() {
    this.publicAddresses()
    this.getPaymentMethods()
  }
}
</script>

<style lang="css" scoped>
</style>
