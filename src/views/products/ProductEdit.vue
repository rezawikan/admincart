<template lang="html">
  <div class="">
    <div class="vx-col w-full mb-base">
      <vx-card :title="'Update '+this.product.name">
          <div class="vx-row mb-6">
            <div class="vx-col w-full mb-5">
              <label>Status</label>
              <vs-switch class="mt-2" v-model="isLive"/>
            </div>
            <div class="vx-col w-full">
              <vs-input class="w-full" label="Name" v-model="product.name" />
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col w-full" v-if="!custom">
              <vs-input class="w-full" type="number" label="base price" v-model="product.base_price" name="base price" ref="base price" v-validate="'required|numeric'" data-vv-validate-on="blur"/>
              <span class="text-danger text-sm" :show="errors.has('base price')">{{ errors.first('base price') }}</span>
            </div>
          </div>
          <div class="vx-row mb-6" v-if="!custom">
            <div class="vx-col w-full">
              <vs-input class="w-full" type="number" label="Price" v-model="product.price" name="price" ref="price" v-validate="'required|numeric'" data-vv-validate-on="blur"/>
              <span class="text-danger text-sm" :show="errors.has('price')">{{ errors.first('price') }}</span>
            </div>
          </div>
          <div class="vx-row mb-6" v-if="!custom">
            <div class="vx-col w-full">
              <vs-input class="w-full" type="number" label="Weight" v-model="product.weight" name="weight" ref="weight" v-validate="'required|numeric'" data-vv-validate-on="blur" />
              <span class="text-danger text-sm" :show="errors.has('weight')">{{ errors.first('weight') }}</span>
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col w-full">
              <Upload :productID="product.id" :folder="'products'" :images="product.images"/>
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col w-full">
              <vs-textarea label="Summary" v-model="product.description" name="description" ref="description" v-validate="'required'" data-vv-validate-on="blur" />
              <span class="text-danger text-sm" :show="errors.has('description')">{{ errors.first('description') }}</span>
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col w-full">
              <p>Add or create a new type</p>
              <ProductType :options="producttytpe | serialize"  @typeCreated="addType"/>
            </div>
          </div>

          <div class="mt-5">
            <vx-card title="Details" no-shadow card-border>
              <div class="mb-5">
                <label for="">Custom Variation</label>
                <vs-switch :disabled="variations.length == 0" class="mt-2" v-model="custom"/>
              </div>
              <div v-for="(variation, key) in variations" :key="key">
                <div class="pb-3">
                  <h6 class="inline pr-3">{{ variation.name }}</h6>
                  <font-awesome-icon icon="trash" @click="removeType(key, variation.variations)" v-if="deleteAble(variation) == false"></font-awesome-icon>
                </div>
                <div class="vx-row" v-for="(variant, index) in variation.variations" :key="variant.id">
                  <div :class="custom ? 'sm:w-1/4' : 'sm:w-1/2'" class="vx-col w-full mb-2">
                    <vs-input class="w-full" label-placeholder="Name"  v-model="variant.name" :name="'variant ' + variant.type.name.toLowerCase().trim() + ' on index ' + index" :ref="'variant ' + variant.type.name.toLowerCase().trim() + ' on index ' + index" v-validate="'required|max:10'" data-vv-validate-on="blur"/>
                    <span class="text-danger text-sm" :show="errors.has('variant ' + variant.type.name.toLowerCase().trim() + ' on index ' + index)">{{ errors.first('variant ' + variant.type.name.toLowerCase().trim() + ' on index ' + index) }}</span>
                  </div>
                  <div class="vx-col sm:w-1/6 w-full mb-2" v-if="custom">
                    <vs-input class="w-full" label-placeholder="base price" v-model="variant.base_price" :name="'base price ' + variant.type.name.toLowerCase().trim() + ' on index ' + index" :ref="'base price ' + variant.type.name.toLowerCase().trim() + ' on index ' + index"  v-validate="'required|numeric'" data-vv-validate-on="blur" />
                    <span class="text-danger text-sm" :show="errors.has('base price ' + variant.type.name.toLowerCase().trim() + ' on index ' + index)">{{ errors.first('base price ' + variant.type.name.toLowerCase().trim() + ' on index ' + index) }}</span>
                  </div>
                  <div class="vx-col sm:w-1/6 w-full mb-2" v-if="custom">
                    <vs-input class="w-full" label-placeholder="price" v-model="variant.price" :name="'price ' + variant.type.name.toLowerCase().trim() + ' on index ' + index" :ref="'price ' + variant.type.name.toLowerCase().trim() + ' on index ' + index"  v-validate="'required|numeric'" data-vv-validate-on="blur" />
                    <span class="text-danger text-sm" :show="errors.has('price ' + variant.type.name.toLowerCase().trim() + ' on index ' + index)">{{ errors.first('price ' + variant.type.name.toLowerCase().trim() + ' on index ' + index) }}</span>
                  </div>
                  <div class="vx-col sm:w-1/6 w-full mb-2" v-if="custom">
                    <vs-input class="w-full" label-placeholder="Weight in gram" v-model="variant.weight" :name="'weight ' + variant.type.name.toLowerCase().trim() + ' on index ' + index" :ref="'weight ' + variant.type.name.toLowerCase().trim() + ' on index ' + index"  v-validate="'required|numeric'" data-vv-validate-on="blur"/>
                    <span class="text-danger text-sm" :show="errors.has('weight ' + variant.type.name.toLowerCase().trim() + ' on index ' + index)">{{ errors.first('weight ' + variant.type.name.toLowerCase().trim() + ' on index ' + index) }}</span>
                  </div>
                  <div :class="custom ? 'sm:w-1/6' : 'sm:w-1/3'" class="vx-col w-full mb-2">
                    <vs-input class="w-full" label-placeholder="Stock" v-model="variant.stock_count" :name="'stock ' + variant.type.name.toLowerCase().trim() + ' on index ' + index" :ref="'stock ' + variant.type.name.toLowerCase().trim() + ' on index ' + index"  v-validate="'required|numeric'" data-vv-validate-on="blur"/>
                    <span class="text-danger text-sm" :show="errors.has('stock ' + variant.type.name.toLowerCase().trim() + ' on index ' + index)">{{ errors.first('stock ' + variant.type.name.toLowerCase().trim() + ' on index ' + index) }}</span>
                  </div>
                  <div :class="custom ? 'sm:w-1/8' : 'sm:w-1/8 md:w-1/8'" class="vx-col mb-2">
                    <div class="remove">
                        <font-awesome-icon v-if="variant.deleteable" icon="trash" @click="removeItem(index,key)"></font-awesome-icon>
                    </div>
                  </div>
                </div>
                <div class="w-full mb-2">
                  <vs-input icon-pack="feather" icon="icon-plus" label-placeholder="Add new variation" @keyup.enter="addItem(key, $event.target.value, variation.variations[0].type)" />
                </div>
                <vs-divider/>
              </div>
            </vx-card>
          </div>
      </vx-card>
    </div>

    <div class="vx-row">
      <div class="vx-col w-full">
        <vs-button type="relief" vslor="primary" id="button-save-product" class="vs-con-loading__container mr-3 mb-2" @click="submit" :disabled="this.errors.items.length == 0 ? false : true" >Save Changes</vs-button>
        <vs-button color="warning" type="border" class="mb-2" @click="resetForm">Reset</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProductType from '@/components/product-type/ProductType.vue'
import Upload from '@/components/upload/Upload.vue'
import { slugString } from '../../helpers/slug'
import axios from 'axios'

export default {
  metaInfo: {
    title: 'Ummu Zayn',
    titleTemplate: '%s - Edit Product',
    htmlAttrs: {
      lang: 'en',
      amp: true
    }
  },

  data () {
    return {
      delete: [],
      loading: false,
      product: [],
      variations:[],
      error: null,
      temp: {},
      custom: false,
      isLive: false,
      action: `${process.env.API_URL}images`,
    }
  },

  filters: {
    serialize: function (value) {
      return value.map(filter => {
        return ({label: filter.name, value: filter.id})

      })
    }
  },

  components: {
    ProductType,
    Upload
  },

  computed: {
    ...mapGetters({
      producttytpe: 'products/producttype',
    })
  },

  created () {
    this.showProduct()
    this.getProductTypes()
  },

  watch: {
    'product.name'() {
      this.product.slug = slugString(this.product.name)
    }
  },

  methods: {
    ...mapActions('products',[
      'saveProduct',
      'getProductTypes'
    ]),
    deleteAble(data){
      return data.variations.map(x => { return x.deleteable }).filter(x => { return x == false })
    },
    submit() {
      this.$vs.loading({
        container: '#button-save-product',
        scale: 0.45
      })
      this.$validator.validateAll().then(result => {
        if(result) {
          if (this.custom) {
              this.product.price = null
              this.product.weight = null
              this.product.base_price = null
          }

          this.saveProduct({
              name: this.product.name,
              slug: this.product.slug,
              stock: this.product.stock_count,
              description: this.product.description,
              weight: this.product.weight,
              price: this.product.price,
              base_price: this.product.base_price,
              variations: this.variations,
              delete: this.delete,
              origin: this.$route.params.slug,
              status: this.isLive
          }).then(() => {
              this.$router.replace({ name: 'products', query: { status: this.isLive ? 'live' : 'draft' }})
          })
        } else {
            this.$vs.loading.close('#button-save-product > .con-vs-loading')
        }
      })
      this.$vs.loading.close('#button-save-product > .con-vs-loading')
    },
    resetForm() {
      this.showProduct()
    },
    convertVariations(value) {
      let variations = []
      let keys = Object.keys(value)
      for (var i = 0; i < keys.length; i++) {
        value[keys[i]]
        variations.push(keys[i] = {
          name: keys[i],
          variations: _.orderBy(value[keys[i]], 'name', 'asc')
        })
      }
      return variations
    },

    addType(value) {
      this.variations.push({
        name:value.name,
        variations: [{
          id: null,
          name:null,
          price:null,
          base_price:null,
          stock_count:null,
          product: {
            id: this.product.id,
            name: this.product.name
          },
          type: value,
          weight: null
        }]
      })
    },

    removeType(index, variations) {
      this.delete.push(variations.map((x) => { return x.id}))
      this.variations.splice(index,1)
    },

    addItem(index, name, type) {
      this.variations[index].variations.push({
        id: null,
        name:name,
        price:null,
        base_price:null,
        stock_count:null,
        product: {
          id: this.product.id,
          name: this.product.name
        },
        type: type,
        weight:null
      })
    },

    removeItem(index, key) {
      this.delete.push(this.variations[key].variations[index].id)
      this.variations[key].variations.splice(index,1)
    },

    async showProduct() {
      return axios.get(`${process.env.API_URL}products/${this.$route.params.slug}/edit`)
      .then((response) => {
        this.product    = JSON.parse(JSON.stringify(response.data.data))
        this.variations = this.convertVariations(this.product.variations)
        this.custom     = (this.product.price == null || this.product.base_price == null || this.product.weight == null)
        this.isLive     = this.product.status
      }, (error) => {
          this.error = error.response.data.errors
      })
    }
  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/vuesax/pages/switch.scss";
.remove {
  width: 100%;
  position: relative;
  height: 5px;
  @media(max-width: 575px) {
    position: inherit;
    height: auto;
    padding-bottom: 20px;
  }
  svg {
      position: absolute;
      top: 30px;
      right: 0;
      cursor: pointer;
      @media(max-width: 575px) {
        position: inherit;
        top: 0px;
      }
  }
}

.pb-3 {
  svg {
    cursor: pointer;
  }
}
</style>
