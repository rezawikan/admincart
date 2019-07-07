<template lang="html">
  <div>
    <vs-table stripe :data="shippings">
      <template slot="header">
        <h7>
          Courier Details
        </h7>
      </template>
      <template slot="thead">
        <vs-th>
          Code
        </vs-th>
        <vs-th>
          Type
        </vs-th>
        <vs-th>
          Courier
        </vs-th>
        <vs-th>
          Price
        </vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="data[indextr].code">
            {{data[indextr].code}}
          </vs-td>

          <vs-td :data="data[indextr].type">
            {{data[indextr].type}}
          </vs-td>

          <vs-td :data="data[indextr].id">
            {{data[indextr].courier}}
          </vs-td>

          <vs-td :data="data[indextr].id">
            {{data[indextr].price}}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
export default {
  props: {
    shippings: {
      required: true,
      value: Array | Object
    }
  }
}
</script>

<style lang="css" scoped>
</style>
