<template>
  <div>
    <el-button @click="openDialogAdd">打开对话框</el-button>
    <dialog-form
      :dialogConfig="dialogAddConfig"
      :dialogForm="addForm"
      :formList="formList"
      @closeDialog="closeDialogAdd"
      @submitForm="addCodeTable"
      ref="dialogAddConfig"
    ></dialog-form>
  </div>
</template>

<script>
// import FormComp from '@/components/content/FormComp.vue'
const addForm = {
  paramName: '',
  paramExplain: '',
  paramType: '',
  paramInOut: '',
  remarks: '',
}
const formList = [
  {
    type: 'input',
    colNum: 24,
    placeholder: '请输入参数名称',
    label: '参数名称',
    prop: 'paramName',
    rules: [
      {
        required: true,
        message: '参数名称不能为空！',
      },
    ],
  },
  {
    type: 'input',
    colNum: 24,
    placeholder: '请输入参数说明',
    label: '参数说明',
    prop: 'paramExplain',
    rules: [
      {
        required: true,
        message: '参数说明不能为空！',
      },
    ],
  },
  {
    type: 'select',
    colNum: 24,
    placeholder: '请选择数据类型',
    selectOptions: [
      { label: '字符', value: 'string' },
      { label: '数字', value: 'number' },
    ],
    label: '数据类型',
    prop: 'paramType',
    rules: [
      {
        required: true,
        message: '参数类型不能为空！',
      },
    ],
  },
  {
    type: 'select', //表单类型
    colNum: 24, //参考el-col
    placeholder: '请选择数据输入输出',
    selectOptions: [
      { label: '输入', value: 'in' },
      { label: '输出', value: 'out' },
      { label: '输入&输出', value: 'inAndOut' },
    ],
    label: '数据输入输出',
    prop: 'paramInOut',
    rules: [
      {
        required: true,
        message: '输入输出不能为空！',
      },
    ],
  },
  {
    type: 'textarea',
    label: '备注',
    prop: 'remarks',
    placeholder: '请输入备注',
  },
]
export default {
  name: 'formPage',
  components: {
    DialogForm: () =>
      import(
        /* webpackChunkName: "common_form_component" */ '@/components/content/DialogForm.vue'
      ),
  },
  data() {
    return {
      // dialogTitle,
      // dialogVisible: false,
      dialogAddConfig: {
        dialogTitle: '新增码值表',
        dialogVisible: false,
      },
      addForm,
      formList,
    }
  },
  props: {},
  mounted() {},
  methods: {
    openDialogAdd() {
      this.dialogAddConfig.dialogVisible = true
    },
    closeDialogAdd() {
      this.dialogAddConfig.dialogVisible = false
    },
    addCodeTable() {
      // 验证表单
      if (!this.$refs.dialogAddConfig.validateForm) {
        return
      }
      // 接口调用
      // 关闭对话框
      this.closeDialogAdd()
    },
  },
}
</script>

<style></style>
