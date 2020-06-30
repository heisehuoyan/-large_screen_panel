<template>
    <div class="import">
         <div style="height: 4.32rem; padding: 0.35rem 0 0 0; width:8.1rem">
              <el-carousel  arrow="never" :interval="6000" @change="handleChange">
                <el-carousel-item v-for="(item,index) in importDataList" :key="index">
                    <div id="import0" v-if="index ===0" style="width: 8.1rem; height: 4.1rem" />
                    <div :id="'import'+index" v-else style="width: 100%; height: 4.1rem" />
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        importDataList: {
            type: Array,
            default: val => {}
        },
    },
    data() {
        return {
            itemData: [],
        };
    },

    watch: {
        importDataList: function() {
            this.$nextTick(function() {
              //  this.drawLine("import0");
            });
        }
    },
    methods: {
        handleChange(index, k) {
            this.drawLine(index, k);
        },
        drawLine(index,k) {
            var fontRate = parseFloat(
                document.documentElement.style.fontSize.replace("px", " ")
            );
            this.itemData = this.importDataList[index];
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(
                document.getElementById('import'+index),
                null,
                { renderer: "svg" }
            );
            var data = [];
            var colorStart = ["#2FECCF", "#DD69EB"];
            var colorEnd = ["#21ADF0", "#7028E4"];
            var arrValue = [];
            var arrNmae = [];
            for (var i = 0; i < this.itemData.seriesData.length; i++) {
                if (this.itemData.seriesData[i].name === "请求数") {
                    arrValue[0] = this.itemData.seriesData[i];
                } else {
                    arrValue[1] = this.itemData.seriesData[i];
                }
            }
            for (var i = 0; i < this.itemData.legends.length; i++) {
                if (this.itemData.seriesData[i].name === "请求数") {
                    arrNmae[0] = this.itemData.legends[i];
                } else {
                    arrNmae[1] = this.itemData.legends[i];
                }
            }
            this.itemData.seriesData = JSON.parse(JSON.stringify(arrValue));
            this.itemData.legends = JSON.parse(JSON.stringify(arrNmae));
            for (var i = 0; i < this.itemData.seriesData.length; i++) {
                data.push({
                    name: this.itemData.seriesData[i].name,
                    type: "bar",
                    barGap: 0,
                    barWidth: fontRate * 0.14,
                    data: this.itemData.seriesData[i].data,
                    animation: false,
                    animationEasing: this.itemData.seriesData[i].name,
                    animationDuration: 1000,
                    itemStyle: {
                        normal: {
                            barBorderRadius: [20, 20, 0, 0],
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: colorStart[i] // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: colorEnd[i] // 100% 处的颜色
                                    }
                                ],
                                globalCoord: false // 缺省为 false
                            }
                        }
                    }
                });
            }
            var maxInterval1 = Math.max(...this.itemData.seriesData[0].data)
            var maxInterval2 = Math.max(...this.itemData.seriesData[1].data)
            var maxInterval3 = Math.max( maxInterval1,maxInterval2 );
            var interval = 0
            if(maxInterval3%5===0){
                maxInterval3=maxInterval3
            }else{
                maxInterval3 = Math.round(maxInterval3/5)*5
            }
            interval = maxInterval3/5
            // 绘制图表
            myChart.setOption({
                title: {
                    text: this.itemData.sourceName + "业务数据导入数",
                    left: "left",
                    top: "0%",
                    textStyle: {
                        color: "#9b9b9b",
                        fontFamily: "PingFangHK-Medium",
                        fontSize: fontRate * 0.42,
                        letterspacing: "0",
                        fontWeight:'normal'
                    }
                },

                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: this.itemData.legends,
                    icon: "circle",
                    itemHeight: fontRate * 0.22,
                    itemWidth: fontRate * 0.22,
                    right:'0%',
                    top: "10%",
                    itemGap: 18,
                    textStyle: {
                        color: "#7E8898",
                        fontFamily: "PingFangHK-Regular",
                        fontSize: fontRate * 0.24,
                        letterspacing: "-0.8px"
                    }
                },
                grid: {
                    left: "0%",
                    right: "2%",
                    bottom: "10%",
                    top: "25%",
                    containLabel: true
                },
                xAxis: [
                    {
                        type: "category",
                        boundaryGap: true, // 从0开始
                        data: this.itemData.categories,
                        axisLabel: {
                            margin: fontRate * 0.18,
                            formatter: function(value) {
                                return value.replace(/-/g, ".");
                            },
                            textStyle: {
                                color: "#7E8898", // 坐标值得具体的颜色
                                fontSize: fontRate * 0.24,
                                fontFamily: "SuiNumberMedium"
                            }
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false // 是否显示刻度线
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                         interval: interval,//坐标间隔
                         min: 0, //坐标最小值
                         max: maxInterval3, //坐标最大值
                        axisLabel: {
                            margin: fontRate * 0.225,
                            formatter: function(value) {
                                return value + "次";
                            },
                            textStyle: {
                                color: "#7E8898", // 坐标值得具体的颜色
                                fontSize: fontRate * 0.24,
                                fontFamily: "SuiNumberMedium"
                            }
                        },
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgba(255, 255, 255, 0.05)"
                            }
                        },
                        axisTick: {
                            show: false // 坐标刻度不显示
                        }
                    }
                ],
                series: data
            });
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.import {
    margin-bottom: 0.27rem;
    height: 4.94rem;
    background: rgba(255, 255, 255, 0.07);
    border-radius: 0.12rem;
    -webkit-box-shadow: 0 0.02rem 0.2rem 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0 0.02rem 0.2rem 0 rgba(0, 0, 0, 0.2);
    padding: 0 0 0 0.43rem;
}
.import .el-carousel {
    height: 4.55rem;
    overflow: hidden;
}
.import .el-carousel .el-carousel__container {
    height: 100% !important;
}
</style>
