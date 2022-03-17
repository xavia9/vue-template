export default function barLineChartOption(conditions) {
  /*
   * legendList图例组件data数组,数组长度须要跟seriesDatas长度一致
   * units悬浮层每行文字单位,例如['件', '件', '%'],数组的长度须要跟seriesDatas长度一致
   * xAxisData横轴数据
   * seriesDatas纵轴数据
   * seriesDatas: [
      [102, 129, 271, 534, 470, 350],
      [122, 329, 21, 54, 100, 790],
      [12, 179, 164, 209, 133, 73],
    ],
   *
   */
  const {
    legendList = [],
    units = [],
    xAxisData,
    barSeriesDatas,
    lineSeriesDatas,
  } = {
    ...conditions,
  }
  // 柱状图色值
  const linearGradientColors = [
    ['#5689FF', 'rgba(86,137,255,0.5)'],
    ['#25C6B9', 'rgba(67,213,175,0.5)'],
    ['#6D73FF', 'rgba(109,115,255,0.5)'],
    ['#FFD23C', 'rgba(255,210,60,0.5)'],
    ['#FF8F3E', 'rgba(255,143,62,0.5)'],
    ['#FF7862', 'rgba(255,120,98,0.5)'],
    ['#FE2525', 'rgba(254,187,37,0.5)'],
    ['#ED3828', 'rgba(237,56,40,0.5)'],
  ]
  const colors = [
    '#5689FF',
    '#25C6B9',
    '#6D73FF',
    '#FFD23C',
    '#FF8F3E',
    '#FF7862',
    '#FE2525',
    '#ED3828',
  ]

  let lineIntialIndex = barSeriesDatas.length
  //柱状图统一配置
  const barSeriesDefaultConfig = {
    type: 'bar',
    // name: '完成事项数', //必须与legend中data的name对应
    barWidth: '20.33%',
    // barMinWidth: 12,
    // barMaxWidth: 20,
    barGap: '0%',
    // barCategoryGap: '1%',
    // data: seriesData,
    itemStyle: {
      normal: {
        barBorderRadius: [4, 4, 0, 0],
        label: {
          show: true,
          formatter: '{c}',
          position: 'top',
        },
        color: (params) => {
          // 根据横轴柱子的数量
          let index = params.seriesIndex
          return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: linearGradientColors[index][0],
            },
            {
              offset: 1,
              color: linearGradientColors[index][1],
            },
          ])
        },
      },
    },
  }
  //折线图统一配置
  const lineSeriesDefaultConfig = {
    type: 'line',
    // name: '完成事项数', //必须与legend中data的name对应
    xAxisIndex: 0,
    // yAxisIndex: 1,
    symbol: 'circle',
    symbolSize: 1,
  }
  // 柱状图series综合配置
  const barSeriesConfig = barSeriesDatas.map((item, index) => {
    return {
      name: legendList[index] ? legendList[index].name : '',
      data: item,
      ...barSeriesDefaultConfig,
    }
  })
  // 折线图series综合配置
  const lineSeriesConfig = lineSeriesDatas.map((item, index) => {
    return {
      name: legendList[barSeriesDatas.length + index]
        ? legendList[barSeriesDatas.length + index].name
        : '',
      lineStyle: {
        color: colors[barSeriesDatas.length + index],
      },
      itemStyle: {
        normal: {
          // label: {
          //   show: true,
          //   formatter: '{c}',
          //   position: 'top',
          // },
          color: colors[barSeriesDatas.length + index],
        },
        emphasis: {
          //鼠标上移后出现圆点
          borderWidth: 2,
          borderColor: colors[barSeriesDatas.length + index],
          shadowBlur: 3,
          shadowColor: colors[barSeriesDatas.length + index],
        },
      },
      data: item,
      ...lineSeriesDefaultConfig,
    }
  })
  const series = [...barSeriesConfig, ...lineSeriesConfig]
  // 图例组件默认配置
  const legendDefaultConfig = {
    // type: 'scroll', //'plain' | 'scroll'
    // orient: 'horizontal', //可选'vertical' | 'horizontal'
    top: '40',
    itemWidth: 20, //图例图形宽度
    itemHeight: 12, //图例图形高度
    // backgroundColor: '#ccc',
    // textStyle: {
    //   color: '#ccc',
    // },
  }
  // 图例组件综合配置
  const legendConfig = () => {
    if (legendList.length !== 0) {
      return {
        ...legendDefaultConfig,
        data: legendList,
        // data: [
        //   {
        //     name: '完成事项数',
        //     icon: 'roundRect',
        //   },
        //   {
        //     name: '发起+关联事项总数',
        //     icon: 'roundRect',
        //   },
        //   {
        //     name: '完成事项数',
        //     icon: 'line',
        //   },
        // ],
      }
    } else {
      return {}
    }
  }
  // const getColor = (index) => {
  //   // 根据横轴柱子的数量自动生成颜色
  //   // let index = params.seriesIndex
  //   // 1, 0, 0, 0图例图形从左到右由浅变深
  //   return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
  //     {
  //       offset: 0,
  //       color: colorList[index][0],
  //     },
  //     {
  //       offset: 1,
  //       color: colorList[index][1],
  //     },
  //   ])
  // }
  // 生成options阶段
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line', // 默认为直线，可选'none'|"line" | "shadow"
        lineStyle: {
          axis: 'auto',
          type: 'dashed',
          width: 1,
          color: '#E8E8E8',
        },
      },
      extraCssText:
        'background-color:#fff;box-shadow:0 2px 16px 0 rgba(0,0,0,0.15);border-radius: 6px', //背景色及阴影
      formatter: (params) => {
        let circle = '',
          text = '',
          paragraph = '',
          unit = ''
        params.forEach((item, index) => {
          // color = colors[index]
          // 有单位则赋值无单位则为''
          unit = units[index] ? units[index] : ''
          circle = `<span style="display: inline-block;width: 6px; height: 6px;margin-right: 5px;background-color:${colors[index]};border-radius: 3px;"></span>`
          text = `<span style="font-size:12px;color:#666">${item.seriesName}</span>&nbsp<span style="font-size:14px;color:#333">${item.value}${unit}</span><br/>`
          paragraph = paragraph + circle + text
        })
        if (params.length > 1) {
          let title = `<span style="font-size:14px;color:#333">${params[0].axisValue}</span><br/>`
          return title + paragraph
        } else if (params.length === 1) {
          return paragraph
        } else {
          return
        }
      },
    },
    grid: {
      top: 80,
      width: '98%',
      height: '70%',
      left: '3%',
      right: '4%',
      bootom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          formatter: (value) => {
            let res = value
            // 超出固定长度截取
            if (res.length > 5) {
              res = res.substring(0, 4) + '...'
            }
            return res
          },
        },
        boundaryGap: true,
      },
    ],
    yAxis: [
      {
        name: '', //y轴单位
        type: 'value',
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          interval: 0,
          textStyle: {
            color: '#242F57',
            fontSize: '12px',
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#EAEDF7',
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#eee',
          },
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['#FBFBFC', '#fff'],
          },
        },
      },
    ],
    series: series,
    legend: legendConfig(),
    color: (params) => {
      // 根据横轴柱子的数量自动生成颜色
      let index = params.seriesIndex
      // 1, 0, 0, 0图例图形从左到右由浅变深
      return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
        {
          offset: 0,
          color: linearGradientColors[index][0],
        },
        {
          offset: 1,
          color: linearGradientColors[index][1],
        },
      ])
    },
    // color: (params) => {
    //   // 根据横轴柱子的数量自动生成颜色
    //   let index = params.seriesIndex
    //   getColor(index)
    // },
    backgroundColor: '#fff', //画布背景色
  }
}
