<template>
  <!-- <div> -->
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
  </div>
  <!-- </div> -->
</template>

<script>
// import { Swiper, SwiperItem } from "@/components/swiper";

// import "swiper/dist/css/swiper.css";
// 注意下边引入的swiper和swiperSlide第一个字母s都是小写的，大写会报错
// import { swiper, swiperSlide } from "vue-awesome-swiper";

// import Swiper from "swiper";
import "swiper/css/swiper.min.css";

export default {
  name: "HomeSwiper",
  // 接收父组件传过来的banners数组
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      // 设置关闭的变量
      isLoad: false,
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
  components: {
    // Swiper,
    // SwiperItem,
    // Swiper,
    // SwiperSlide,
  },
  mounted() {
    new Swiper(".swiper-container", {
      direction: "vertical", // 垂直切换选项
      loop: true, // 循环模式选项

      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // 如果需要滚动条
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });
  },
  methods: {
    // imageLoad() {
    //   // 只需要加载一张轮播图就可以发送自定义事件 因为每张轮播图高度都相同
    //   if (!this.isLoad) {
    //     this.$emit("swiperImageLoad");
    //     this.isLoad = true;
    //   }
    // },
  },
};
</script>

<style scoped>
.swiper {
  width: 600px;
  height: 300px;
}
</style>
