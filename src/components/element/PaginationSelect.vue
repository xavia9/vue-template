<template>
  <div class="page-select">
    <!-- :disabled="
        noChange[index] == true ||
          applyDataItem.processKey == 'componentFastAdd'
      " -->
    <!-- v-model="chooseUser[index]" -->
    <el-select
      style="width:68%"
      v-model="chooseUser"
      clearable
      filterable
      placeholder="请选择全局变量"
    >
      <div class="option">
        <el-option
          v-for="user in allUsers"
          :key="user.id"
          :label="user.userName"
          :value="user.id"
        >
          <span style="float: left">{{ user.userName }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{
            user.id
          }}</span>
        </el-option>
      </div>
      <div class="pagin">
        <!-- layout="prev, pager,next,sizes,total" -->
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
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'PaginationSelect',
  components: {},
  props: {},
  data() {
    return {
      chooseUser: '',
      allUsers: [
        {
          id: 0,
          userName: 'name1',
        },
        {
          id: 2,
          userName: 'name2',
        },
      ],
      currentPage: 1,
      pageSize: 40,
      total: 50,
      pageSizes: [20, 40, 60],
    }
  },
  computed: {},
  watch: {},
  created() {
    this.initData()
  },
  mounted() {},
  methods: {
    initData() {
      let allUsers = []
      for (var i = 0; i < this.pageSize; i++) {
        allUsers.push({
          id: i,
          userName: `名称${i + 1}`,
        })
      }
      this.allUsers = allUsers
    },
    handleSizeChange() {
      // console.log('发送请求')
      let allUsers = [],
        startNum = (this.currentPage - 1) * this.pageSize,
        endNum = startNum + this.pageSize
      for (var i = startNum; i < endNum; i++) {
        // debugger
        allUsers.push({
          id: i,
          userName: `名称${i + 1}`,
        })
      }
      this.allUsers = allUsers
    },
    handleCurrentChange() {
      let allUsers = [],
        startNum = (this.currentPage - 1) * this.pageSize,
        endNum = startNum + this.pageSize
      for (var i = startNum; i < endNum; i++) {
        allUsers.push({
          id: i,
          userName: `名称${i + 1}`,
        })
      }
      this.allUsers = allUsers
    },
  },
}
</script>

<style lang="scss" scoped>
.option {
  min-height: 100px;
  height: auto;
  max-height: 200px;
  overflow-y: auto;
}
.pagin {
  background: #fff;
}
::-webkit-scrollbar {
  width: 2px;
}
</style>
<style lang="css">
.pagin .el-pagination__jump {
  margin-left: 0 !important;
}
</style>
