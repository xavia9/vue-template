<template>
  <div class="dialog-form">
    <el-dialog
      :title="dialogConfig.dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="closeAndReset"
    >
      <el-form :model="dialogForm" ref="dialogForm">
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
                v-model="dialogForm[formItem.prop]"
                :placeholder="formItem.placeholder"
                autocomplete="off"
              ></el-input>
              <!-- 下拉框 -->
              <el-select
                v-if="formItem.type === 'select'"
                v-model="dialogForm[formItem.prop]"
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
                v-model="dialogForm[formItem.prop]"
                :placeholder="formItem.placeholder"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="closeAndReset">
          取消
        </el-button>
        <el-button type="primary" @click="validateForm">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'dialogForm',
  data() {
    return {
      dialogVisible: false,
      url: '',
      formLabelWidth: '140px',
    }
  },
  props: {
    dialogConfig: {
      type: Object,
      default: () => {
        return {
          dialogTitle: '对话框',
          dialogVisible: false,
        }
      },
    },
    dialogForm: {
      type: Object,
      required: true,
    },
    formList: {
      type: Array,
      required: true,
    },
  },
  watch: {
    // dialogVisible(newVal) {
    //   this.dialogFormVisible = newVal
    // },
    'dialogConfig.dialogVisible': {
      handler(newVal) {
        this.dialogVisible = newVal
        // 通过false控制对话框关闭
        if (newVal === false) {
          this.$nextTick(() => {
            this.$refs.dialogForm.resetFields()
          })
        }
      },
      deep: true,
    },
  },
  // computed: {
  //   dialogVisible2: {
  //     get() {
  //       return this.dialogVisible
  //     },
  //     set() {},
  //   },
  // },
  mounted() {},
  methods: {
    //提交时验证表单，直接在父级调用
    // submitForm() {
    //   let formValidate = Boolean
    //   this.$refs.dialogForm.validate((valid) => {
    //     if (valid) {
    //       formValidate = true
    //     } else {
    //       this.$message.warning('请把信息填写完整！')
    //       formValidate = false
    //     }
    //   })
    //   return formValidate
    // },
    // 点击确定按钮
    validateForm() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          this.$emit('submitForm')
        } else {
          this.$message.warning('请把信息填写完整！')
        }
      })
    },
    // 重置表单
    resetForm() {
      this.$refs.dialogForm.resetFields()
    },
    closeAndReset() {
      this.$refs.dialogForm.resetFields()
      this.$emit('closeDialog')
    },
    confirm() {
      // this.submitForm()
    },
    beforeClose(done) {
      this.$refs.dialogForm.resetFields()
      done()
    },
    // 计算总行数
    totalRow() {},
    // resetForm(uploadArr) {
    //   this.$refs.ruleForm.resetFields();
    //   if (uploadArr) {
    //     for (let i = 0; i < uploadArr.length; i++) {
    //       this.$refs[uploadArr[i]][0].clearFiles();
    //       let index = this.formObj.findIndex(item => item.prop == uploadArr[i]);
    //       this.formObj[index].uploadObj.hideUpload = false;
    //     }
    //   }
    // }
  },
}
</script>

<style>
.dialog-form {
  /* width: 300px; */
}
</style>
