<template>
  <div class="multi-bar">
    <div class="subtitle" style="margin-left:8px;text-align:center;">
      多柱状图
    </div>
    <div class="chart-bar" ref="barChart"></div>
    <!-- <div class="chart-bar" ref="barChart2" style="display:none"></div> -->
  </div>
</template>

<script>
import { multiBarChartOption } from '../../components/widgets/quickCharts/index.js'
export default {
  data() {
    return {
      file: {}, //柱状图文件对象
    }
  },
  mounted() {
    this.initBarChart()
  },
  methods: {
    initBarChart() {
      let options = multiBarChartOption({
        legendList: [
          {
            name: '完成事项数',
            icon: 'roundRect',
          },
          {
            name: '发起+关联事项总数',
            icon: 'roundRect',
          },
          {
            name: '完成事项比例',
            icon: 'roundRect',
          },
        ],
        // units: ['件', '件', '%'],
        xAxisData: ['银行', '租赁', '金融', '证券', '寿险', '理财'],
        seriesDatas: [
          [102, 129, 271, 534, 470, 350],
          [122, 329, 21, 54, 100, 790],
          [12, 179, 164, 209, 133, 73],
        ],
      })
      const barChart = echarts.init(this.$refs.barChart)
      options = {
        ...options,
        title: [
          {
            text: '平均评级调整时长分布情况',
            top: '10',
            left: '10',
            textStyle: {
              fontSize: 14,
              color: '#333',
              fontWeight: 'bold',
            },
          },
        ],
      }
      //绘制图表
      barChart.setOption(options, true)
      barChart.on('finished', () => {
        // if (!showLabel) return
        // this.file = this.$dataURLtoFile(barChart.getDataURL(), '')
      })
    },
  },
}
</script>

<style>
.multi-bar {
}
.chart-bar {
  width: 98%;
  height: 500px;
  margin: 0 auto;
}
</style>
