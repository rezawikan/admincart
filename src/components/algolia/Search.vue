<template>
  <ais-instant-search
  :search-client="searchClient"
  index-name="products_index"
>
  <ais-search-box placeholder="Search contacts..."></ais-search-box>
  <ais-hits></ais-hits>
</ais-instant-search>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';

export default {
  // props: {
  //   index: {
  //     type:String,
  //     required: true
  //   }
  // },
  data() {
    return {
      searchClient: algoliasearch(
        process.env.MIX_ALGOLIA_APP_ID,
        process.env.MIX_ALGOLIA_SEARCH
      ),
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~instantsearch.css/themes/algolia-min';
</style>
