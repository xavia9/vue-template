<template>
  <div class="table-scope flex-column">
    <div class="flex-area">
      <el-table :data="tableData">
        <el-table-column prop="name">
          <template slot="header">类型 <i class="icon"></i></template>
        </el-table-column>
        <el-table-column prop="address">
          <template slot-scope="scope">
            <div>
              <i v-if="scope.row.status" class="icon"></i>
              {{ scope.row.address }}
            </div>
            <div>
              <i class="icon"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tableScope',
  components: {},
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎A',
          address: '上海市普陀区金沙江路 1518 弄',
          status: true,
          type: 0,
          errMsg: '发布时间为xxx',
        },
        {
          date: '2016-05-04',
          name: '王小虎B',
          address: '上海市普陀区金沙江路 1517 弄',
          status: false,
          type: 1,
        },
        {
          date: '2016-05-01',
          name: '王小虎C',
          address: '上海市普陀区金沙江路 1519 弄',
          status: true,
          type: 1,
        },
        {
          date: '2016-05-03',
          name: '王小虎D',
          address: '上海市普陀区金沙江路 1516 弄',
          status: true,
          type: 0,
        },
        {
          date: '2016-05-08',
          name: '王小A',
          address: '上海市普陀区金沙江路 1518 弄',
          status: false,
          type: 0,
        },
        {
          date: '2016-05-06',
          name: '王小B',
          address: '上海市普陀区金沙江路 1517 弄',
          status: true,
          type: 1,
        },
        {
          date: '2016-05-13',
          name: '王小C',
          address: '上海市普陀区金沙江路 1519 弄',
          status: false,
          type: 1,
        },
        {
          date: '2016-05-10',
          name: '王小D',
          address: '上海市普陀区金沙江路 1516 弄',
          status: false,
        },
        {
          date: '2016-05-10',
          name: '王小D',
          address: '上海市普陀区金沙江路 1516 弄',
          status: false,
        },
        {
          date: '2016-05-10',
          name: '王小D',
          address: '上海市普陀区金沙江路 1516 弄',
          status: false,
        },
        {
          date: '2016-05-10',
          name: '王小D',
          address: '上海市普陀区金沙江路 1516 弄',
          status: false,
        },
        {
          date: '2016-05-10',
          name: '王小D',
          address: '上海市普陀区金沙江路 1516 弄',
          status: false,
        },
        {
          date: '2016-05-10',
          name: '王小D',
          address: '上海市普陀区金沙江路 1516 弄',
          status: false,
        },
        {
          date: '2016-05-10',
          name: '王小D',
          address: '上海市普陀区金沙江路 1516 弄',
          status: false,
        },
        {
          date: '2016-05-10',
          name: '王小D',
          address: '上海市普陀区金沙江路 1516 弄',
          status: false,
        },
      ],
    }
  },
  props: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style>
.table-scope {
  height: 100%;
}
</style>
