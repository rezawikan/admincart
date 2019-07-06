<template>
  <div class="vx-col w-full mb-base">
    <vx-card>
      <div class="vx-row mb-6">
        <div class="vx-col w-1/2 sm:w-full" v-for="address in addresses" :key="address.id">
          <p class="mb-4" :class="{ 'bold' : address.id === selectedAddress.id} ">
            {{ address.name }} <br>
            {{ address.address_1 }}<br>
            {{ address.subdistrict.subdistrict }}<br>
            {{ address.subdistrict.city }}<br>
            {{ address.subdistrict.province}}<br>
            {{ address.phone }}
          </p>
          <div class="demo-alignment">
            <vs-button color="primary" type="border" @click.prevent="$emit('click', address)" class="mb-6">Set Default</vs-button>
          </div>

        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
export default {
  props: {
    addresses: {
      required: true,
      type: Array
    },
    selectedAddress: {
      required: true,
      type: Object
    }
  }
}
</script>
