<template>
  <div class="table-comp flex-column">
    <div class="flex1" id="table-area">
      <el-table
        v-if="tableHeight !== 0"
        :data="tableData"
        border
        stripe
        :header-cell-style="{ background: '#f8fbff' }"
        @selection-change="handleSelectionChange"
        :height="tableHeight"
      >
        <!-- 全选单选 -->
        <el-table-column
          v-if="configFlag.selection"
          align="center"
          width="55"
          type="selection"
        />
        <!-- 序号列 -->
        <el-table-column
          v-if="configFlag.index"
          align="center"
          width="100"
          type="index"
          :index="1"
          :label="configFlag.indexName || '序号'"
        />
        <!-- 循环遍历表头展示数据 -->
        <template v-for="item in tableTitleData">
          <el-table-column
            :key="item.value"
            :label="item.label"
            :prop="item.value || ''"
            :sortable="item.sortable || ''"
            :width="item.width || ''"
            :align="item.align || 'center'"
            header-align="center"
          >
            <!-- 匿名插槽 -->
            <!-- <template> -->
            <!-- <slot>默认内容</slot> -->
            <!-- </template> -->
            <template slot-scope="scope">
              <!-- 作用域插槽与匿名插槽必须隐藏一个 否则使用作用域插槽 父级组件中无法正常取值 -->
              <!-- <slot v-if="item.slotname == 'status'" :name="item.slotname">
                {{ item.slotname }}
              </slot> -->
              <!-- 作用域插槽 -->
              <slot
                v-if="item.slotname"
                :name="item.slotname"
                :slotData="scope.row"
              >
                {{ item.slotname }}
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

      <!-- layout表示需要显示哪几项功能 total总页数 sizes用户选择每页显示多少条 prev上一页 pager分页 next下一页 jumper跳转至指定页 page-size每页显示几条数据 page-sizes用户选择每页显示几条数据(默认显示一条) -->
      <!-- @current-change 当前页改变时触发 @size-chang (pagesize改变时触发)-->
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        v-if="configFlag.needPage"
        :current-page.sync="pageValue.pageNum"
        :page-size="pageValue.pageSize"
        :page-sizes="pageValue.pageSizes || [1]"
        :total="pageValue.total"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Table',
  data() {
    return {
      tableHeight: 0,
    }
  },
  props: {
    tableTitleData: {
      // 表头数据  文案和绑定值，以及需要特殊处理的slot
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array, // 后台数据
      default: () => [],
    },
    // 分页数据
    pageValue: {
      type: Object,
      default: () => {
        return {
          pageNum: 1,
          pageSize: 1,
          total: 1,
        }
      },
    },
    configFlag: {
      // 配置  其他table配置依次添加
      type: Object,
      default: () => {
        return {
          needPage: false, // 是否需要排序
          selection: false, // 是否需要单选多选框
          index: false, // 是否需要序号
          // 这里不全面，可根据实际情况添加
        }
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
    this.initTableHeight()
  },
  methods: {
    initTableHeight() {
      let rec = document.getElementById('table-area').getBoundingClientRect()
      // 减去分页器的高度
      this.tableHeight = rec.height - 32
    },
    // 发送自定义事件给父元素
    // 每页条数
    sizeChange(val) {
      this.$emit('pageSizeChange', { pageSize: val })
    },
    // 当前页
    currentChange(val) {
      this.$emit('currentPageChange', { pageNum: val })
    },
    // 多选
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
  },
}
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
