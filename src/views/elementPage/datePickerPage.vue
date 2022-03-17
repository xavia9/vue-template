<template>
  <div>
    时间组件
    <date-picker
      @changeDateTime="changeEventStartTime"
      :dateTime="eventStartTime"
      ref="eventStartTime"
    ></date-picker>
  </div>
</template>
<script>
import DatePicker from "@/components/element/DatePicker.vue";

export default {
  name: "timepicker",
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