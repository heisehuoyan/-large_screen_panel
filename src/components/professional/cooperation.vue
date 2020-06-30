<template>
    <div class="coop-main">
        <p class="coop-title">合作方调用排行</p>
        <div style=" width: 7.67rem; height: 5.95rem;padding: 0 0.76rem 0 0.62rem;">
            <el-carousel  arrow="never" :interval="6000" @change="handleChange">
                <el-carousel-item v-for="(item,index) in cooperationList" :key="index">
                    <div id="coo0" v-if="index ===0" style="width: 7.67rem; height: 6rem" />
                    <div :id="'coo'+index" v-else style="width: 7.67rem; height: 6rem" />
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        cooperationList: {
            type: Array,
            default: () => {}
        }
    },
    data() {
        return {
            itemData: []
        };
    },

    watch: {
        cooperationList: function() {
            this.$nextTick(function() {
                //  this.drawLine(0,1);
            });
        }
    },
    methods: {
        handleChange(index, k) {
            this.drawLine(index, k);
        },
        drawLine(index, k) {
            var _this = this;
            var fontRate = parseFloat(
                document.documentElement.style.fontSize.replace("px", " ")
            );
            this.itemData = this.cooperationList[index];
            var data = this.itemData.seriesData;
            if (this.itemData.categories.length < 9) {
                var dataXF = Array.apply(null, Array(9 - data.length)).map(
                    () => ""
                );
                this.itemData.categories = this.itemData.categories.concat(
                    dataXF
                );
            }
            var max = Math.max.apply(null, data);
            var backList = [...data];
            backList.map((currenData, index, arr) => {
                arr[index] = max + 30500;
            });
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(
                document.getElementById("coo" + index)
            );
            // 绘制图表

            this.itemData.categories.f;
            var max = this.itemData.categories[0];
            for (let i = 0; i < this.itemData.categories.length - 1; i++) {
                max =
                    max.length < this.itemData.categories[i + 1].length
                        ? this.itemData.categories[i + 1]
                        : max;
            }
            var gridLenMax = max.length;
            var X = "0%";
            if (gridLenMax < 5) {
                X = "78%";
            } else if (gridLenMax > 5 && gridLenMax < 10) {
                X = "75%";
            } else {
                X = "65%";
            }
            myChart.setOption(
                {
                    color: ["#3398DB"],
                    grid: {
                        top: "3%",
                        left: "100%",
                        right: X,
                        //right: "65%",
                        bottom: "12%"
                    },
                    xAxis: {
                        type: "value",
                        boundaryGap: true, // 从0开始
                        data: backList,
                        max: max + 30500,
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false // 是否显示刻度线
                        }
                    },
                    yAxis: {
                        boundaryGap: false, // 从0开始
                        inverse: true, // 坐标倒置
                        type: "category",
                        data: this.itemData.categories,
                        axisLabel: {
                            textStyle: {
                                color: "#7E8898", // 坐标值得具体的颜色
                                fontSize: fontRate * 0.28,
                                fontFamily: "PingFangHK-Medium",
                                letterspacing: "0"
                            }
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false // 坐标刻度不显示
                        }
                    },
                    series: [
                        {
                            show: true,
                            type: "bar",
                            animation: false,
                            barGap: "-100%",
                            animation: false,
                            animationDuration: 1000,
                            barWidth: fontRate * 0.15, // 统计条宽度
                            itemStyle: {
                                normal: {
                                    barBorderRadius: [0, 20, 20, 0],
                                    color: "rgba(255, 255, 255, 0.05)"
                                }
                            },
                            data: backList
                        },
                        {
                            data: data,
                            barGap: "-100%",
                            type: "bar",
                            animation: false,
                            barWidth: fontRate * 0.15, // 统计条宽度
                            animation: false,
                            itemStyle: {
                                normal: {
                                    barBorderRadius: [0, 20, 20, 0],
                                    color: {
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: "#21ADF0" // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: "#2FECCF" // 100% 处的颜色
                                            }
                                        ],
                                        globalCoord: false // 缺省为 false
                                    }
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: "right",
                                    fontSize: fontRate * 0.3,
                                    fontWeight: "600",
                                    color: "#21ADF0",
                                    fontFamily: "SuiNumberMedium",
                                    letterspacing: 0
                                }
                            }
                        }
                    ]
                },
                true
            );
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.coop-main {
    padding-right: 0.76rem;
    text-align: left;
    height: 7.67rem;
    margin-top: 0.27rem;
    background: rgba(255, 255, 255, 0.07);
    border-radius: 0.12rem;
    -webkit-box-shadow: 0 0.02rem 0.2rem 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0 0.02rem 0.2rem 0 rgba(0, 0, 0, 0.2);
    .coop-title {
        font-family: PingFangHK-Medium;
        font-size: 0.42rem;
        color: #9b9b9b;
        letter-spacing: -0.8px;
        text-align: left;
        margin-block-start: 0em;
        margin-block-end: 0em;
        padding: 0.37rem 0 0.45rem 0.62rem;
    }
}
.coop-main .el-carousel {
    height: 6.4rem;
    overflow: hidden;
}
.coop-main .el-carousel .el-carousel__container {
    height: 100% !important;
}
</style>

