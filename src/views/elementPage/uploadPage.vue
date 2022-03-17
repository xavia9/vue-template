<template>
  <div class="upload-page">
    <multipart-upload :uploadUrl="uploadUrl" :uploadedUrl="uploadedUrl" />
  </div>
</template>

<script>
import MultipartUpload from '@/components/element/MultipartUpload.vue'
export default {
  name: 'uploadPage',
  components: {
    MultipartUpload,
  },
  props: {},
  data() {
    return {
      uploadUrl: '',
      uploadedUrl: '',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped></style>
