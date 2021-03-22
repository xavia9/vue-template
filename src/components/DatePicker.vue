<template>
  <div>
    <el-date-picker
      v-model="time"
      type="datetime"
      placeholder="选择日期时间"
      align="right"
      :picker-options="pickerOptions"
      @change="changeTime"
    >
    </el-date-picker>
  </div>
</template>
<script>
export default {
  name: "PublicTimePicker",
  data() {
    return {
      time: this.$attrs.dateTime || "",
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              const date = new Date();
              // const dataTwo = new Date(data.toLocaleDateString());
              // dataTwo.setTime(dataTwo.getTime());
              picker.$emit("pick", date.getTime());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              // picker.$emit("pick", date.removeDays(1));
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "2天前",
            onClick(picker) {
              const date = new Date();
              // picker.$emit("pick", date.removeDays(1));
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一个月前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", date);
            },
          },
          {
            text: "三个月前",
            onClick(picker) {
              const date = new Date();
              picker.$emit("pick", date.removeMonths(3));
            },
          },
          {
            text: "半年前",
            onClick(picker) {
              const date = new Date();
              picker.$emit("pick", date.removeMonths(6));
            },
          },
          {
            text: "一年前",
            onClick(picker) {
              const date = new Date();
              picker.$emit("pick", date.removeYears(1));
            },
          },
        ],
      },
    };
  },
  methods: {
    changeTime(val) {
      console.log(12);
      var oval = this.moment(val).format("YYYY-MM-DD HH:mm:ss");
      this.$emit("changeDateTime", oval);
    },
  },
};
</script>