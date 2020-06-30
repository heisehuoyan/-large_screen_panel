<template>
  <div class="box">
    <p class="box-title">今日内存使用率TOP10</p>
    <div id="memory" style="width: 100%; height: 90%"/>
  </div>

</template>

<script>
export default {
    props: {
        MemoryUsageList: Array
    },
    data() {
        return {
            itemData: [],
            index: 0
        }
    },

    watch: {
        MemoryUsageList: function(val) {
            this.drawLine('memory')
        }
    },
    methods: {
        drawLine(event) {
            var fontRate = parseFloat(
                document.documentElement.style.fontSize.replace('px', ' ')
            )
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById(event))
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    icon: 'circle',
                    right: '8%',
                    textStyle: {
                        color: '#DDE0E4',
                        fontWeight: '600',
                        fontSize: 15
                    }
                },
                grid: {
                    left: '96%',
                    right: '100%',
                    bottom: '15%',
                    top: '13%',
                    containLabel: true
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        data: this.MemoryUsageList[0].dataAxis,
                        boundaryGap: false,
                        axisLabel: {
                            interval: 0,
                            rotate: 40,
                            textStyle: {
                                color: '#7E8898', // 坐标值得具体的颜色
                                fontSize: fontRate * 0.24,
                                fontFamily: 'SuiNumberMedium'
                            }
                        },
                        axisLine: {
                            show:false,
                            lineStyle: {
                                color: 'rgba(126, 136, 153, 0.3)',
                                opacity: 0.3
                            }
                        },
                        axisTick: {
                            show: false // 是否显示刻度线
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        // interval: 500,//坐标间隔
                        min: 0, // 坐标最小值
                        interval: 25, // 坐标间隔
                        axisLabel: {
                            margin: 21,
                            formatter: function(value) {
                                return value + '%'
                            },
                            textStyle: {
                                color: '#7E8898', // 坐标值得具体的颜色
                                fontSize: fontRate * 0.24,
                                fontFamily: 'SuiNumberMedium'
                            }
                        },
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.05)',
                                width: fontRate * 0.01
                            }
                        }
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        data: this.MemoryUsageList[0].data,
                        barWidth: fontRate * 0.25, // 统计条宽度
                        markLine: {
                        },
                        itemStyle: {
                            normal: {
                                barBorderRadius: [20, 20, 0, 0],
                                label: {
                                    show: true, // 开启显示
                                    position: 'top', // 在上方显示

                                    formatter: function(data) {
                                        return data.value.toFixed(2)
                                    },

                                    textStyle: {
                                        // 数值样式
                                        color: '#21ADF0',
                                        fontSize: parseInt(fontRate * 0.28),
                                        fontFamily: 'SuiNumberMedium'
                                    }
                                },
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [

                                        {
                                            offset: 0,
                                            color: '#21ADF0' // 100% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(69,214,249,0.00)' // 0% 处的颜色
                                        }
                                    ],
                                    globalCoord: false // 缺省为 false
                                }
                            }
                        }
                    }
                ]
            })
        }
    }
}
</script>
<style >
.swiper-container {
    height: 80%;
}
.swiper-pagination {
}
.swiper-pagination > .swiper-pagination-bullet {
    /* background: #fff !important; */
    bottom: 0.4rem !important;
    width: 0.13rem;
    height: 0.13rem;
    opacity: 0.7;
    border: 1px solid #7e8898;
    margin: 0rem 0.13rem 0rem 0rem !important;
}
.swiper-pagination-bullet-active {
    width: 0.13rem;
    height: 0.13rem;
    background-image: linear-gradient(
        -38deg,
        #21adf0 11%,
        #2feccf 94%
    ) !important;
    box-shadow: 0 0 0.1rem 0 rgba(33, 173, 240, 0.8);
    border: none !important;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.box {
    width: 8.65rem;
    margin-left: 0.54rem;
    margin-right: 1.32rem;
    .box-title {
        font-family: PingFangHK-Medium;
        font-size: 0.42rem;
        color: #9b9b9b;
        letter-spacing: 0;
        text-align: left;
        // margin-top: 1.22rem;
        margin-block-start: 0em;
        margin-block-end: 0em;
        margin-top: 1.22rem;
    }
}
</style>

