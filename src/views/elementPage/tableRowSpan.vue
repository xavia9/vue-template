<template>
  <div class="table-page">
    <common-table
      :tableHeadList="tableHeadList"
      pageValue
      :tableData="tableData"
      :paginationConfig="paginationConfig"
      :configFlag="configFlag"
      @pageSizeChange="pageSizeChange"
      @currentPageChange="currentPageChange"
    >
      <!-- <template>
        <div>匿名插槽替换内容</div>
      </template> -->
      <!-- 作用域插槽 -->
      <template #handel="{ slotData }">
        <el-tooltip
          v-if="slotData.type === 0"
          effect="dark"
          placement="right-end"
          :content="slotData.errMsg"
        >
          <!-- v-if只能出现一次 -->
          <el-button v-if="slotData.type === 0" style="color: red"
            >待发布</el-button
          >
        </el-tooltip>
        <el-button v-else-if="slotData.type === 1">已发布</el-button>
        <el-button v-else>已下架</el-button>
      </template>
      <!-- 具名插槽 -->
      <!-- v-model的值不能为数字 -->
      <template #status="{ slotData }">
        <el-switch
          v-model="slotData.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </template>
    </common-table>
  </div>
</template>
<script>
import CommonTable from "components/table/table-rowspan.vue";

export default {
  name: "tablePage",
  components: { CommonTable },
  data() {
    return {
      // tableHeight: 0,
      tableHeadList: [
        { label: "日期", value: "date", sortable: true },
        { label: "姓名", value: "name", sortable: true },
        { label: "地址", value: "address", sortable: true },
        {
          label: "禁启用状态",
          value: "status",
          // slotname用于判断是否渲染为插槽
          slotName: "status",
        },
        {
          label: "操作",
          value: "type",
          slotName: "handel",
          // handelType: "type",
        },
      ],
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎A",
          address: "上海市普陀区金沙江路 1518 弄",
          status: true,
          type: 0,
          errMsg: "发布时间为xxx",
        },
        {
          id: 1,
          date: "2016-05-04",
          name: "王小虎B",
          address: "上海市普陀区金沙江路 1517 弄",
          status: false,
          type: 1,
        },
        {
          id: 2,
          date: "2016-05-03",
          name: "王小虎D",
          address: "上海市普陀区金沙江路 1516 弄",
          status: true,
          type: 0,
        },
        {
          id: 2,
          date: "2016-05-08",
          name: "王小A",
          address: "上海市普陀区金沙江路 1518 弄",
          status: false,
          type: 0,
        },
        {
          id: 2,
          date: "2016-05-06",
          name: "王小B",
          address: "上海市普陀区金沙江路 1517 弄",
          status: true,
          type: 1,
        },
        {
          id: 3,
          date: "2016-05-13",
          name: "王小C",
          address: "上海市普陀区金沙江路 1519 弄",
          status: false,
          type: 1,
        },
        {
          id: 4,
          date: "2016-05-10",
          name: "王小D",
          address: "上海市普陀区金沙江路 1516 弄",
          status: false,
        },
        {
          id: 5,
          date: "2016-05-10",
          name: "王小D",
          address: "上海市普陀区金沙江路 1516 弄",
          status: false,
        },
        {
          id: 6,
          date: "2016-05-10",
          name: "王小D",
          address: "上海市普陀区金沙江路 1516 弄",
          status: false,
        },
        {
          id: 7,
          date: "2016-05-10",
          name: "王小D",
          address: "上海市普陀区金沙江路 1516 弄",
          status: false,
        },
        {
          id: 8,
          date: "2016-05-10",
          name: "王小D",
          address: "上海市普陀区金沙江路 1516 弄",
          status: false,
        },
        {
          id: 8,
          date: "2016-05-01",
          name: "王小虎C",
          address: "上海市普陀区金沙江路 1519 弄",
          status: true,
          type: 1,
        },
        {
          id: 9,
          date: "2016-05-10",
          name: "王小D",
          address: "上海市普陀区金沙江路 1516 弄",
          status: false,
        },
        {
          id: 10,
          date: "2016-05-10",
          name: "王小D",
          address: "上海市普陀区金沙江路 1516 弄",
          status: false,
        },
        {
          id: 11,
          date: "2016-05-10",
          name: "王小D",
          address: "上海市普陀区金沙江路 1516 弄",
          status: false,
        },
      ],
      paginationConfig: {
        //当前页数
        currentPage: 1,
        // 每页显示几条数据
        pageSize: 10,
        // 用户选择每页显示几条数据
        pageSizes: [10, 20, 30, 40],
        // 总共有多少条
        total: 8,
      },
      configFlag: {
        //根据需求设置
        selection: true, //需要复选框
        needPagination: true, // 需要分页
        index: true, // 需要序号
        // 其他table配置依次添加
      },
    };
  },
  mounted() {
    // this.initTableHeight()
  },
  methods: {
    // initTableHeight() {
    //   let rec = document.getElementById('app').getBoundingClientRect()
    //   this.tableHeight = rec.height
    // },
    pageSizeChange(obj) {
      console.log("pageSize变化，请求新数据", obj);
      // pageValue.pageSize = obj.pageSize;
    },
    currentPageChange(obj) {
      console.log("currentPage变化，请求新数据", obj);
    },
  },
};
</script>
<style lang="scss">
.table-page {
  height: 100%;
  .red {
    background: red;
  }
}
</style>
