<template>
  <div>
    时间组件
    <DatePicker
      @changeDateTime="changeEventStartTime"
      :dateTime="eventStartTime"
      ref="eventStartTime"
    ></DatePicker>
  </div>
</template>
<script>
import DatePicker from "../components/DatePicker.vue";

export default {
  name: "timePicker",
  components: { DatePicker },
  data() {
    return { eventStartTime: null };
  },
  methods: {
    changeEventStartTime(val) {
      this.eventStartTime = val;
    },
  },
};
</script>