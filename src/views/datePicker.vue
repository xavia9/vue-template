<template>
  <div>
    <DatePicker @datetimeselected="handleTime"></DatePicker>
  </div>
</template>
<script>
import DatePicker from "../components/DatePicker";
export default {
  name: "datePicker",
  components: { DatePicker },
  data() {
    return {
      start_date: "",
      end_date: "",
    };
  },
  methods: {
    handleTime(val) {
      console.log(val);
      if (val) {
        this.start_date = val[0]; //选择后返回的开始时间
        this.end_date = val[1]; //选择后返回的结束时间
      } else {
        end_date = "";
        end_date = "";
      }
    },
  },
};
</script>