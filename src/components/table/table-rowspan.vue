<template>
  <div class="table-rowspan flex-column">
    <div class="h100" :id="tableIdName">
      <!-- 主题el-table一些设置表头可根据情况添加 -->
      <!-- stripe -->
      <!-- :header-cell-style="{ background: '#f8fbff' }" -->
      <el-table
        v-if="tableHeight !== 0"
        :data="tableData"
        @selection-change="handleSelectionChange"
        :height="tableHeight"
        :span-method="setRow"
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
  name: "tableRowSpan",
  data() {
    return {
      tableHeight: 0,
      spanArr: [],
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
  },
  mounted() {
    this.initTableHeight();
    this.tableLayout();
  },
  methods: {
    initTableHeight() {
      let rec = document.getElementById("table-area").getBoundingClientRect();
      // 减去分页器的高度
      this.tableHeight = rec.height - 32;
    },
    tableLayout() {
      // console.log(this.tableData);
      let concatDot = 0;
      this.tableData.forEach((row, rowIndex) => {
        if (rowIndex === 0) {
          this.spanArr.push(1);
        } else {
          const lastRow = this.tableData[rowIndex - 1];
          if (row.id === lastRow.id) {
            this.spanArr[concatDot] += 1;
            this.spanArr.push(0);
          } else {
            concatDot = rowIndex;
            this.spanArr.push(1);
          }
        }
      });
    },
    setRow({ row, column, rowIndex, columnIndex }) {
      // 须要合并单元格的对应列
      const columnIndexArr = [1, 2, 4];
      if (columnIndexArr.includes(columnIndex)) {
        const _row = this.spanArr[rowIndex];
        // const _col = _row > 0 ? 1 : 0;
        const _col = _row === 0 ? 0 : 1;
        // console.log({
        //   rowspan: _row,
        //   colspan: _col,
        // });
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
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
.table-comp {
  height: 100%;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.flex1 {
  flex: 1;
}
</style>
