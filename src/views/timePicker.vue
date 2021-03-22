<template>
  <div>
    时间组件
    <TimePicker
      @changeDateTime="changeEventStartTime"
      :dateTime="eventStartTime"
      ref="eventStartTime"
    ></TimePicker>
  </div>
</template>
<script>
import TimePicker from "../components/TimePicker.vue";

export default {
  name: "timePicker",
  components: { TimePicker },
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