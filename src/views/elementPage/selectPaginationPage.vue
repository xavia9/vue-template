<template>
  <div class="select-pagination-Page">
    <PaginationSelect />
  </div>
</template>

<script>
import PaginationSelect from '@/components/element/PaginationSelect.vue'
export default {
  name: 'selectPaginationPage',
  components: {
    PaginationSelect,
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.select-pagination-Page {
  width: 280px;
}
</style>
