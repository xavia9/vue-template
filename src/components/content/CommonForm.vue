<template>
  <div class="common-form">
    <el-form :model="commonForm" ref="commonForm">
      <el-row :gutter="50" v-for="formItem in formList" :key="formItem.prop">
        <el-col :span="formItem.colNum">
          <!-- <el-form-item
            v-for="formItem in formList"
            :key="formItem.prop"
            :prop="formItem.prop"
            :rules="formItem.rules"
            :label="formItem.label"
            :label-width="formLabelWidth"
          > -->
          <el-form-item
            :prop="formItem.prop"
            :rules="formItem.rules"
            :label="formItem.label"
            :label-width="formLabelWidth"
          >
            <!-- 输入框 -->
            <el-input
              v-if="formItem.type === 'input'"
              v-model="commonForm[formItem.prop]"
              :placeholder="formItem.placeholder"
              autocomplete="off"
            ></el-input>
            <!-- 下拉框 -->
            <el-select
              v-if="formItem.type === 'select'"
              v-model="commonForm[formItem.prop]"
              :placeholder="formItem.placeholder"
            >
              <el-option
                v-for="item in formItem['selectOptions']"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
            <!-- 文本框 -->
            <el-input
              v-if="formItem.type === 'textarea'"
              type="textarea"
              v-model="commonForm[formItem.prop]"
              :placeholder="formItem.placeholder"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CommonForm',
  components: {},
  props: {
    commonForm: {
      type: Object,
      required: true,
    },
    formList: {
      type: Array,
      required: true,
    },
  },
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
