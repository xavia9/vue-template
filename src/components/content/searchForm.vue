<template>
  <div class="common-form">
    <el-form :model="formData" ref="commonForm" style="flex:1">
      <el-row
        :gutter="20"
        v-for="row in totalRow"
        :key="row"
        v-show="row == 1 || !isFold"
      >
        <el-col
          v-for="formItem in handleColData(row)"
          :span="6"
          :key="formItem.prop"
        >
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
          >
            <!-- 输入框 -->
            <el-input
              v-if="formItem.type === 'input'"
              v-model="formData[formItem.prop]"
              :placeholder="formItem.placeholder"
              autocomplete="off"
              size="small"
            ></el-input>
            <!-- 下拉框 -->
            <el-select
              v-if="formItem.type === 'select'"
              v-model="formData[formItem.prop]"
              :placeholder="formItem.placeholder"
              clearable
              size="small"
              style="width:100%"
            >
              <el-option
                v-for="item in formItem['selectOptions']"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
            <!-- 多选框 -->
            <!--  @focus="hideOption" -->
            <el-select
              v-if="formItem.type === 'createTag'"
              v-model="formData[formItem.prop]"
              multiple
              filterable
              allow-create
              default-first-option
              :placeholder="formItem.placeholder"
              class="create-tag"
              size="small"
              style="width:100%"
            >
              <!-- <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                class="hide-option"
              >
              </el-option> -->
            </el-select>
            <!-- 日期时间 -->
            <el-date-picker
              v-if="formItem.type === 'datetime'"
              v-model="formData[formItem.prop]"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              :placeholder="formItem.placeholder"
              size="small"
            >
            </el-date-picker>
            <!-- 多标签输入框 -->
            <multi-tags
              v-if="formItem.type === 'multiTags'"
              v-model="formData[formItem.prop]"
              :placeholder="formItem.placeholder"
              @emitParent="emitParent"
            />
            <!-- 文本框 -->
            <el-input
              v-if="formItem.type === 'textarea'"
              type="textarea"
              inputValue="formData[formItem.prop]"
              :placeholder="formItem.placeholder"
            ></el-input>
            <!-- <div v-else-if="formItem.type === 'slotName'"> -->
            <!-- 作用域插槽与匿名插槽必须隐藏一个 否则使用作用域插槽 父级组件中无法正常取值 -->
            <!-- <slot v-if="item.slotname == 'status'" :name="item.slotname">
                {{ item.slotname }}
              </slot> -->
            <!-- 作用域插槽 -->
            <slot
              v-else-if="formItem.type === 'namedSlot'"
              :name="formItem.slotName"
            >
              {{ formItem.slotName }}
            </slot>
            <!-- </div> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="search-btns">
      <span class="clear-btn" @click="cleanSearchForm"
        ><i class="el-icon-delete"></i
      ></span>
      <el-button size="mini" type="primary" @click="searchForm" class="margr8"
        >搜索</el-button
      >
      <el-button size="mini" @click="foldForm" class="margr8"
        >高级搜索<i v-if="isFold" class="el-icon-caret-top"></i
        ><i v-else class="el-icon-caret-bottom"></i
      ></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searchForm',
  components: {
    MultiTags: () =>
      import(
        /* webpackChunkName: "common_form_component" */ '@/components/element/MultiTags.vue'
      ),
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
    fieldList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      formLabelWidth: '100px',
      totalRow: 0,
      isFold: true,
    }
  },
  computed: {
    fieldListCopy() {
      return this.fieldList.slice()
    },
  },
  watch: {},
  created() {
    this.getTotalRow()
  },
  mounted() {},
  methods: {
    // 计算出总行数
    getTotalRow() {
      // if (this.fieldList.length === 0) return
      const fieldListLength = this.fieldListCopy.length
      this.totalRow =
        fieldListLength % 4 === 0
          ? fieldListLength / 4
          : parseInt(fieldListLength / 4) + 1
    },
    // 返回每行数组
    handleColData(rowIndex) {
      return this.fieldListCopy.slice((rowIndex - 1) * 4, rowIndex * 4)
    },
    // 清空搜索表单
    cleanSearchForm() {
      this.$refs.commonForm.resetFields()
      this.$emit('cleanSearchForm', this.formData)
    },
    // 搜索表单区域
    searchForm() {
      this.$emit('searchForm')
    },
    // 隐藏下拉框
    // hideOption() {
    //   const htmlDom = document.querySelector('.el-select-dropdown')
    //   this.$nextTick(() => {
    //     htmlDom.style.display = 'none'
    //   })
    // },
    foldForm() {
      this.isFold = !this.isFold
    },
    // resetFields() {
    //   this.$refs.commonForm.resetFields()
    // },
    emitParent(tags) {
      this.$emit('tagInput', tags)
    },
  },
}
</script>

<style lang="scss" scoped>
.common-form {
  // width: 80%;
  display: flex;
  margin-left: 16px;
}

.right-btn {
}
::v-deep {
  .create-tag {
    .el-input__suffix {
      display: none !important;
    }
  }
}
</style>
