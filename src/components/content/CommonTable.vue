<template>
  <div class="common-table flex-column">
    <!-- <el-button type="success" icon="el-icon-refresh-right" size="mini"
      >重置测试</el-button
    > -->
    <div class="flex1" :id="tableIdName">
      <!-- 主题el-table一些设置表头可根据情况添加 -->
      <!-- stripe -->
      <!-- :header-cell-style="{ background: '#f8fbff' }" -->
      <el-table
        v-if="tableHeight !== 0"
        :data="tableData"
        @selection-change="handleSelectionChange"
        :height="tableHeight"
      >
        <!-- 全选单选 -->
        <el-table-column
          v-if="configFlag.selection"
          align="center"
          width="40"
          type="selection"
        />
        <!-- 序号列 -->
        <el-table-column
          v-if="configFlag.index"
          align="center"
          width="70"
          type="index"
          :index="1"
          :label="configFlag.indexName || '序号'"
        />
        <!-- 循环遍历表头展示数据 -->
        <template v-for="item in tableHeadList">
          <el-table-column
            :key="item.value"
            :label="item.label"
            :prop="item.value || ''"
            :sortable="item.sortable || false"
            :width="item.width || ''"
            :align="item.align || 'center'"
            header-align="center"
            show-overflow-tooltip
          >
            <!-- 匿名插槽 -->
            <!-- <template> -->
            <!-- <slot>默认内容</slot> -->
            <!-- </template> -->
            <template slot-scope="scope">
              <!-- 作用域插槽与匿名插槽必须隐藏一个 否则使用作用域插槽 父级组件中无法正常取值 -->
              <!-- <slot v-if="item.slotName == 'status'" :name="item.slotName">
                {{ item.slotName }}
              </slot> -->
              <!-- 作用域插槽 -->
              <slot
                v-if="item.slotName"
                :name="item.slotName"
                :slotData="scope.row"
              >
                {{ item.slotName }}
              </slot>
              <!-- 普通文本渲染改进 -->
              <div v-else>
                <span>{{ scope.row[item.value] }}</span>
              </div>
            </template>
          </el-table-column>
          <!-- 普通文本数据渲染 -->
          <!-- <el-table-column
            v-else
            :key="item.value"
            :label="item.label"
            :prop="item.value || ''"
            :sortable="item.sortable || ''"
           :width="item.width || ''"
            :align="item.align || 'center'"
            header-align="center"
          >
          </el-table-column> -->
        </template>
      </el-table>
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        v-if="configFlag.needPagination"
        :current-page.sync="paginationConfig.currentPage"
        :page-size="paginationConfig.pageSize"
        :page-sizes="paginationConfig.pageSizes || [1]"
        :total="paginationConfig.total"
        @size-change="sizeChange"
        @current-change="currentChange"
        style="display: flex; justify-content: flex-end; margin-top: 8px"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "CommonTable",
  data() {
    return {
      tableHeight: 0,
    };
  },
  props: {
    // 避免同一个页面有多个表格组件，高度渲染不正确
    tableIdName: {
      type: String,
      default: () => "table-area",
    },
    tableHeadList: {
      // 表头数据  文案和绑定值，以及需要特殊处理的slot
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array, // 后台数据
      default: () => [],
    },
    // 分页数据
    paginationConfig: {
      type: Object,
      default: () => {
        return {
          currentPage: 1,
          pageSize: 10,
          pageSizes: [10, 20, 30, 40],
          total: 0,
        };
      },
    },
    configFlag: {
      // 配置  其他table配置依次添加
      type: Object,
      default: () => {
        return {
          needPagination: false, // 是否需要分页器
          selection: false, // 是否需要单选多选框
          index: false, // 是否需要序号
          // 这里不全面，可根据实际情况添加
        };
      },
    },
    // tableHeight: {
    //   // 可以监听屏幕高度获取。
    //   // 高度
    //   type: Number,
    //   default: () => null,
    // },
  },
  mounted() {
    this.initTableHeight();
  },
  methods: {
    initTableHeight() {
      let rec = document
        .getElementById(this.tableIdName)
        .getBoundingClientRect();
      // 减去分页器的高度
      this.tableHeight = rec.height - 32;
    },
    // 发送自定义事件给父元素
    // 每页条数
    sizeChange(val) {
      this.$emit("pageSizeChange", { pageSize: val });
    },
    // 当前页
    currentChange(val) {
      this.$emit("currentPageChange", { pageNum: val });
    },
    // 多选
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
  },
};
</script>
<style>
.common-table {
  height: 100%;
}
</style>
