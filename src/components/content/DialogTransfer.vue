<template>
  <div class="dialog-transfer">
    <el-dialog
      :title="dialogConfig.dialogTitle"
      :visible.sync="dialogConfig.dialogVisible"
      :before-close="closeAndReset"
      :close-on-click-modal="false"
    >
      <!-- :left-default-checked="leftChecked"
        :right-default-checked="rightChecked" -->
      <el-transfer
        style="text-align: left;display:inline-block;width:100%"
        v-model="transferValue"
        :data="globalIndicatorList"
        :titles="['全局指标', '局部指标']"
        :button-texts="['', '']"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}',
        }"
        @change="handleChange"
        @right-check-change="rightChange"
        filterable
        :filter-method="searchGlobalIndicator"
        ref="transfer"
      >
        <!-- {{ option.paramName }} - {{ option.paramExplain }} -->
        <span slot-scope="{ option }">{{ option.paramName }}</span>
        <!-- <el-button class="transfer-footer" slot="left-footer" size="small"
          >操作</el-button
        >
        <el-button class="transfer-footer" slot="right-footer" size="small"
          >操作</el-button
        > -->
        <div class="pagin" slot="left-footer">
          <el-pagination
            small
            :current-page.sync="currentPage"
            :page-size.sync="pageSize"
            :page-sizes="pageSizes"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="sizes,total,jumper"
            :total="total"
          >
          </el-pagination>
        </div>
        <div class="right-footer" slot="right-footer">
          <el-button
            type="primary"
            size="mini"
            style="margin-left:120px"
            @click="importGlobalIndicator"
          >
            确定
          </el-button>
        </div>
      </el-transfer>
    </el-dialog>
  </div>
</template>

<script>
const generateData = (_) => {
  const data = []
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `备选项 ${i}`,
      // disabled: i % 4 === 0,
      paramName: `名称 ${i}`,
      paramExplain: `说明 ${i}`,
    })
  }
  return data
}
export default {
  name: 'DialogTransfer',
  components: {},
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
  },
  data() {
    return {
      dialogVisible: true,
      data: generateData(),
      globalIndicatorList: [],
      leftChecked: [],
      rightChecked: [],
      transferValue: [],
      currentPage: 1,
      pageSize: 40,
      total: 50,
      pageSizes: [20, 40, 60],
    }
  },
  computed: {},
  watch: {
    'dialogConfig.dialogVisible': {
      handler(newVal) {
        this.dialogVisible = newVal
        // 通过false控制对话框关闭
        if (newVal === false) {
          const transferChildren = this.$refs.transfer.$children
          console.log(this.transferValue)
          console.log(transferChildren[0].checked)
          console.log(transferChildren[3].checked)
          this.transferValue = []
          this.rightChecked = []
          transferChildren[0].checked = []
          transferChildren[3].checked = []
        }
      },
      deep: true,
    },
  },
  created() {
    this.initData()
  },
  mounted() {},
  methods: {
    closeAndReset() {
      // this.$refs.dialogForm.resetFields()
      this.$emit('closeDialog')
    },
    validateForm() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          this.$emit('submitForm')
        } else {
          this.$message.warning('请把信息填写完整！')
        }
      })
    },
    searchGlobalIndicator(query, item) {
      if (query === '') return true
      const params = {}
      const { res, code } = this.$request.post('', params)
      if (code === '0000') {
        return true
      }
      console.log(query)
      return true
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    },
    // 将勾选的变量赋值
    rightChange(key) {
      this.rightChecked = key
    },
    initData() {
      let globalIndicatorList = []
      for (var i = 0; i < this.pageSize; i++) {
        globalIndicatorList.push({
          id: i,
          key: i,
          paramName: `名称${i + 1}`,
        })
      }
      this.globalIndicatorList = globalIndicatorList
    },
    handleSizeChange() {
      // console.log('发送请求')
      let globalIndicatorList = [],
        startNum = (this.currentPage - 1) * this.pageSize,
        endNum = startNum + this.pageSize
      for (var i = startNum; i < endNum; i++) {
        // debugger
        globalIndicatorList.push({
          id: i,
          key: i,
          paramName: `名称${i + 1}`,
        })
      }
      this.globalIndicatorList = globalIndicatorList
    },
    handleCurrentChange() {
      let globalIndicatorList = [],
        startNum = (this.currentPage - 1) * this.pageSize,
        endNum = startNum + this.pageSize
      for (var i = startNum; i < endNum; i++) {
        globalIndicatorList.push({
          id: i,
          key: i,
          paramName: `名称${i + 1}`,
        })
      }
      this.globalIndicatorList = globalIndicatorList
    },
    // 引入全局变量
    importGlobalIndicator() {
      const { systemUser, systemOrg, packageId } = this.$store.state
      const params = {
        user: 'systemUser',
        org: 'systemOrg',
        data: {
          rulePackageId: 'packageId',
          globalId: this.rightChecked,
        },
      }
      const { code, msg } = this.$request.post('/importVariable', params)
      if (code === '0000') {
        this.$message.success(msg)
      }
      this.$message.success('导入全局变量成功')
      this.closeAndReset()
    },
  },
}
</script>

<style lang="scss" scoped>
.pagin {
  width: 100%;
  background: #fff;
}
.right-footer {
  // height: 30px;
  padding: 8px;
}
.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
}
::v-deep {
  .el-pagination__jump {
    margin-left: 0 !important;
  }
  .el-transfer-panel {
    width: 350px;
  }
  .el-transfer-panel__body {
    height: 300px;
  }
  .el-transfer-panel .el-transfer-panel__footer {
    border: none;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  // .el-transfer-panel {
  //   width: 900px;
  // }
}
</style>
