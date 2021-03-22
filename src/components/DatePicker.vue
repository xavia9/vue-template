<template>
  <div>
    <el-date-picker
      v-model="dateRange"
      type="datetimerange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      :picker-options="pickerOptions"
      value-format="yyyy-MM-dd HH:mm:ss"
      :default-time="['08:00:00', '12:00:00']"
      @change="setDate"
    >
    </el-date-picker>
  </div>
</template>
<script>
export default {
  name: "DatePicker",
  props: {
    start_date: {
      type: String,
      default: "",
    },
    end_date: {
      type: String,
      default: "",
    },
    index: {
      type: Number,
      require: true,
    },
  },
  mounted() {
    this.dateRange = [this.start_date, this.end_date];
  },
  data: function () {
    return {
      dateRange: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  methods: {
    setDate(val) {
      var selectedtime = {};
      selectedtime.datetime = val;
      selectedtime.index = this.index;
      console.log(selectedtime);
      this.$emit("datetimeselected", selectedtime);
    },
  },
};
</script>