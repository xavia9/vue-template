<template>
  <div>
    <el-select>
      <el-option
        v-for="option in handleOperatorOpts"
        :label="option.label"
        :value="option.value"
        :key="option.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'mapPage',
  components: {},
  data() {
    return {}
  },
  props: {},
  created() {},
  mounted() {},
  methods: {
    handleOperatorOpts(formAreaIdx, variableType) {
      const OperatorOpts = new Map([
        ['0_number', numberOperatorOpts],
        ['0_string', stringOperatorOpts],
        ['1_number', [numberOperatorOpts.find((item) => item.value === '=')]],
        ['2_number', [numberOperatorOpts.find((item) => item.value === '=')]],
        ['1_sring', [stringOperatorOpts.find((item) => item.value === '=')]],
        ['2_sring', [stringOperatorOpts.find((item) => item.value === '=')]],
        ['default', []],
      ])
      const mapKey = `${formAreaIdx}_${variableType}`
      const optFunction =
        OperatorOpts.get(mapKey) || OperatorOpts.get('default')
      return optFunction
    },
  },
}
</script>

<style></style>
