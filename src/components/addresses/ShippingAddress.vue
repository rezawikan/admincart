<template>
  <div class="">
    <template v-if="selecting">
      <ShippingAddressSelector
      :addresses="addresses"
      :selectedAddress="selectedAddress"
      @click="addressSelected"
      />
    </template>

    <template v-else-if="creating">
      <ShippingAddressCreator
      @cancel="creating = false"
      @created="created"
      />
    </template>

    <template v-else>
      <template v-if="selectedAddress">
        <p>
          {{ selectedAddress.name }}<br>
          {{ selectedAddress.address_1 }}<br>
          {{ selectedAddress.subdistrict.subdistrict }}<br>
          {{ selectedAddress.subdistrict.city }}<br>
          {{ selectedAddress.subdistrict.province}}
        </p>
        <br/>

      </template>
      <div class="vx-row">
        <div class="vx-col w-full mb-6">
          <vs-button v-if="localAddresses.length" class="mr-3 mb-6" @click.prevent="selecting = true">Change Shipping address</vs-button>
          <vs-button color="warning" type="border" class="mb-2" @click.prevent="creating = true">Add an address</vs-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import ShippingAddressSelector from './ShippingAddressSelector'
  import ShippingAddressCreator from './ShippingAddressCreator'
  export default {
    components: {
      ShippingAddressSelector,
      ShippingAddressCreator,
    },

    props: {
      addresses : {
        required: true,
        type: Array
      }
    },

    data() {
      return {
        selecting: false,
        selectedAddress: null,
        currentEdit: [],
        creating: false
      }
    },

    watch: {
      selectedAddress(address) {
        this.$emit('input', address.id)
      }
    },

    computed: {
      defaultAddresses() {
        return this.localAddresses.find( a =>  a.default === true)
      },
      localAddresses: {
        get() {
          return this.addresses
        },
        set(value) {
          this.addresses = value
        }
      }
    },

    methods: {
      editAddresses(address){
        this.selecting = false
        this.editing = true
        this.currentEdit = address
      },
      addressSelected(address){
        this.switchAddress(address)
        this.selecting = false
        this.currentEdit = address
      },
      switchAddress(address){
        this.selectedAddress = address
      },
      created(address){
        this.creating = false
        this.switchAddress(address)
      }
    },

    created() {
      if (this.addresses.length) {
        this.switchAddress(this.defaultAddresses)
      }
    }
  }
</script>
