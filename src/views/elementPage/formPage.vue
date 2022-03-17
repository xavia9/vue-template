<template>
  <div class="form-page">
    <common-form />
  </div>
</template>

<script>
export default {
  name: 'formPage',
  components: {
    CommonForm: () =>
      import(
        /* webpackChunkName: "common_form_component" */ '@/components/content/CommonForm.vue'
      ),
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

<style></style>
