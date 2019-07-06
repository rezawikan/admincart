<template lang="html">
  <vue-dropzone ref="myVueDropzone" :destroyDropzone="false" id="dropzone" :options="dropzoneOptions"
  @vdropzone-sending="sendingEvent"
  @vdropzone-removed-file="removeEvent"
  @vdropzone-success="successEvent"
  >
    <input type="hidden" name="productID" :value="productID">
  </vue-dropzone>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import localforage from 'localforage'
import { mapActions } from 'vuex'
import { isEmpty } from 'lodash'
export default {
  props: {
    productID: {
      required: true
    },
    folder: {
      required:true
    },
    images: {
      required: true
    },
  },

  components: {
    vueDropzone: vue2Dropzone
  },

  data() {
    return {
      dropzoneOptions: {
          url: `${process.env.API_URL}images`,
          maxFilesize: 1,
          headers: {
            Authorization : ''
          },
          addRemoveLinks: true,
      },
    }
  },

  updated () {
    this.loadImages()
  },

  created(){
    this.getAuthToken()
  },

  methods: {
    ...mapActions({
      deleteImage: 'products/deleteImage'
    }),
    getAuthToken() {
      return localforage.getItem('authtoken').then((token) => {
          if (isEmpty(token)) {
              return Promise.reject('NO_STORAGE_TOKEN')
          }
          this.dropzoneOptions.headers.Authorization = "Bearer "+token
          return Promise.resolve(token)
      })
    },
    loadImages() {
      if (this.images.length) {
        for (var i = 0; i < this.images.length; i++) {
            this.$refs.myVueDropzone.manuallyAddFile(
              { size: this.images[i]['size'], name: this.images[i]['name'], type: this.images[i]['format'] },
                `${process.env.DO_SPACES}`+this.images[i]['location']
             );
        }
      }
    },
    successEvent (file, response) {
      this.$refs.myVueDropzone.removeFile(file)
      this.$refs.myVueDropzone.manuallyAddFile({ size: file.size, name: response.name, type: file.type }, `${process.env.DO_SPACES}${response.location}`)
    },
    sendingEvent (file, xhr, formData) {
      formData.append('productid', this.productID)
      formData.append('folder', this.folder)
    },
    removeEvent (file) {
      if (file.status != "success") {
          this.deleteImage({ folder: this.folder, file: file })
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
