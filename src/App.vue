<template>
  <div id="app">
    <table-data
      :tableTitleData="tableTitleData"
      :tableData="tableData"
      :pageValue="pageValue"
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
    </table-data>
  </div>
</template>

<script>
import tableData from "./components/tableData/index.vue";

export default {
  name: "App",
  components: { tableData },
  data() {
    return {
      tableTitleData: [
        { label: "日期", value: "date", sortable: true },
        { label: "姓名", value: "name", sortable: true },
        { label: "地址", value: "address", sortable: true },
        {
          label: "禁启用状态",
          value: "status",
          // slotname用于判断是否渲染为插槽
          slotname: "status",
        },
        {
          label: "操作",
          value: "handel",
          slotname: "handel",
          handelType: "type",
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎A",
          address: "上海市普陀区金沙江路 1518 弄",
          status: true,
          type: 0,
          errMsg: "发布时间为xxx",
        },
        {
          date: "2016-05-04",
          name: "王小虎B",
          address: "上海市普陀区金沙江路 1517 弄",
          status: false,
          type: 1,
        },
        {
          date: "2016-05-01",
          name: "王小虎C",
          address: "上海市普陀区金沙江路 1519 弄",
          status: true,
          type: 1,
        },
        {
          date: "2016-05-03",
          name: "王小虎D",
          address: "上海市普陀区金沙江路 1516 弄",
          status: true,
          type: 0,
        },
        {
          date: "2016-05-08",
          name: "王小A",
          address: "上海市普陀区金沙江路 1518 弄",
          status: false,
          type: 0,
        },
        {
          date: "2016-05-06",
          name: "王小B",
          address: "上海市普陀区金沙江路 1517 弄",
          status: true,
          type: 1,
        },
        {
          date: "2016-05-13",
          name: "王小C",
          address: "上海市普陀区金沙江路 1519 弄",
          status: false,
          type: 1,
        },
        {
          date: "2016-05-10",
          name: "王小D",
          address: "上海市普陀区金沙江路 1516 弄",
          status: false,
        },
      ],
      pageValue: {
        //当前页数
        pageNum: 1,
        // 用户选择每页显示几条数据
        pageSizes: [3, 5],
        // 每页显示几条数据
        pageSize: 1,
        // 总共有多少条
        total: 8,
      },
      configFlag: {
        //根据需求设置
        selection: true,
        needPage: true, // 需要分页
        index: true, // 需要序号
        // 其他table配置依次添加
      },
    };
  },
  methods: {
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

<style>
</style>
