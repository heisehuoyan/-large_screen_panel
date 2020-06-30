<template>
    <div class="box">
        <p class="box-title">
            主机性能
        </p>
        <ul class="conten-head">
            <li>
                <div>
                    <span>状态：</span>
                    <span v-if="totalStatus.status === 1">正常
                    </span>
                    <span v-if="totalStatus.status != 1">异常
                        <i class="statuIcon" />
                    </span>
                </div>

            </li>
            <li>
                <div>
                    <span>IP地址：</span>
                    <span>{{ totalStatus.ip }}</span>
                </div>
            </li>
        </ul>
        <swiper ref="totalSwiper" :options="swiperOption">
            <swiper-slide v-for="(item,index) in arr" :key="index">
                <div style="margin: 0 0.54rem;height: 8.58rem;">
                    <div id="totalId" style=" width:35%;height: 8.58rem;display: inline-block;">
                        <div :id="'totalpie' + index" style="width: 100%; height: 100%"></div>
                    </div>
                    <div id="totalLineId" style=" width:55%;height: 8.58rem;display: inline-block;margin-left:0.5rem">
                        <div :id="'totalLine' + index " style="width: 95%; height: 100%"></div>
                    </div>
                </div>
            </swiper-slide>

            <div slot="pagination" class="swiper-pagination" style="display: none;" />
        </swiper>
    </div>
</template>

<script>
import { dom_2 } from "@/utils/common";
import "zrender/lib/svg/svg";
export default {
    name: "",
    props: {
        totalHostIdList: Object,
        flag: {
            type: Number,
            default: 0
        }
    },
    data() {
        var _this = this;
        return {
            activeIndex: 0,
            swiperOption: {
                pagination: ".swiper-pagination",
                speed: 200,
                //autoplay: 5000,
                // 使用es6的箭头函数，使this指向vue对象
                onSlideChangeEnd: function(swiper) {
                 
                },
            },
            totalStatus: {},
            index: 0,
            currentTime: "",
            arr: []
        };
    },
    computed: {
        swiper() {
            return this.$refs.totalSwiper.swiper;
        }
    },
    watch: {
        flag: {
            handler(newval, oldval) {
                const eventPie = "totalpie" + newval;
                const eventLine = "totalLine" + newval;
                this.index = newval;
                if (this.index === this.arr.length - 1) {
                        this.arr.push(this.totalHostIdList.hostids.shift());
                    }
                 this.getTotalStatus(this.index);
                this.drawLine(eventPie);
                this.drawImage(eventLine);
                 this.swiper.slideTo(newval, 0, false); // 切换到第一个slide，速度为1秒
            }
        },
        totalHostIdList(val) {
            this.arr.push(val.hostids.shift());
            this.arr.push(val.hostids.shift());
            this.$nextTick(function() {
                this.index = this.activeIndex;
                this.getTotalStatus(this.index);
            });
          
        }
    },
    mounted() {
        var _this = this;
        var data = new Date();
        var hours = data.getHours();
        _this.currentTime = hours + ":00";
        setInterval(function() {
            var data = new Date();
            var hours = data.getHours();
            _this.currentTime = hours + ":00";
        }, 6000);
    },
    methods: {
        getTotalStatus(index) {
            this.$get("hardWare/getTotalStatus", {
                time: this.totalHostIdList.time,
                refreshPeriod: 600000,
                hostid: this.totalHostIdList.hostids[index]
            }).then(this.getTotalStatusSucc);
        },
        getTotalStatusSucc(res) {
            if (res.data.succ) {
                const value = res.data.charts;
                this.totalStatus = value;
                const eventPie = "totalpie" + this.index;
                const eventLine = "totalLine" + this.index;
                this.drawLine(eventPie);
                this.drawImage(eventLine);
            }
        },
        drawImage(event) {
            var xIndex = this.totalStatus.subChartDatas[1].categories.indexOf(
                this.currentTime
            );
            var yIndex_0 = this.totalStatus.subChartDatas[0].seriesData[xIndex];
            var yIndex_1 = this.totalStatus.subChartDatas[1].seriesData[xIndex];
            var yIndex_2 = this.totalStatus.subChartDatas[2].seriesData[xIndex];
            this.totalStatus.subChartDatas[0].seriesData =
                xIndex === -1
                    ? this.totalStatus.subChartDatas[0].seriesData
                    : this.totalStatus.subChartDatas[0].seriesData.slice(
                          0,
                          xIndex + 1
                      );
            this.totalStatus.subChartDatas[1].seriesData =
                xIndex === -1
                    ? this.totalStatus.subChartDatas[1].seriesData
                    : this.totalStatus.subChartDatas[1].seriesData.slice(
                          0,
                          xIndex + 1
                      );
            this.totalStatus.subChartDatas[2].seriesData =
                xIndex === -1
                    ? this.totalStatus.subChartDatas[2].seriesData
                    : this.totalStatus.subChartDatas[2].seriesData.slice(
                          0,
                          xIndex + 1
                      );
            var fontRate = parseFloat(
                document.documentElement.style.fontSize.replace("px", " ")
            );
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById(event));
            var lineItemStyle = {
                normal: {
                    lineStyle: {
                        width: fontRate * 0.04, //
                        opacity: 1
                    },
                    color: new this.$echarts.graphic.LinearGradient(
                        0,
                        0,
                        1,
                        0,
                        [
                            {
                                offset: 0.5,
                                color: "rgb(33,167,240,1)"
                            },
                            {
                                // 100% 处的颜色
                                offset: 1,
                                color: "rgb(47,236,207,1)"
                            }
                        ],
                        false
                    )
                }
            };
            var lineAraeStyle = {
                normal: {
                    color: new this.$echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: "rgba(82, 191, 255, 0.3)"
                            },
                            {
                                offset: 1,
                                color: "rgba(82, 191, 255, 0)"
                            }
                        ]
                    )
                }
            };
            var directiveAreaStyle = {
                markLine: {
                    symbol: "none", // 去掉箭头
                    data: [
                        {
                            yAxis: 90
                        },
                        {
                            yAxis: 90
                        }
                    ],
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    lineStyle: {
                        normal: {
                            type: "dotted",
                            color: "rgba(247,0,8,0.10)"
                        }
                    }
                },
                markArea: {
                    itemStyle: {
                        normal: {
                            color: " rgba(247,0,8,0.10)"
                        }
                    },
                    data: [
                        [
                            {
                                yAxis: 90
                            },
                            {
                                yAxis: 100
                            }
                        ]
                    ]
                }
            };
            var lineY = {
                type: "value",
                min: 0, // 坐标最小值
                max: 100, // 坐标最大值
                interval: 50, // 坐标间隔
                splitLine: {
                    lineStyle: {
                        color: "rgba(255, 255, 255, 0.05)"
                    }
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    formatter: function(value) {
                        return value + "%";
                    },
                    textStyle: {
                        color: "#7E8898",
                        fontFamily: "SuiNumberMedium",
                        fontSize: fontRate * 0.24
                    }
                }
            };
            var lineX = {
                type: "category",
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "rgba(255, 255, 255, 0.05)"
                    }
                },
                axisLabel: {
                    //interval: 0,
                    textStyle: {
                        color: "#7E8898",
                        fontFamily: "SuiNumberMedium",
                        fontSize: fontRate * 0.24
                    }
                }
            };
            myChart.setOption({
                title: [
                    {
                        top: 0,
                        left: "0%",
                        text: "CPU使用趋势",
                        textStyle: {
                            color: "#9b9b9b",
                            fontSize: fontRate * 0.28,
                            fontWeight: "normal"
                        }
                    },
                    {
                        text: "磁盘使用趋势",
                        textStyle: {
                            color: "#9b9b9b",
                            fontSize: fontRate * 0.28,
                            fontWeight: "normal"
                        },
                        left: "0%",
                        top: "34%"
                    },
                    {
                        text: "内存使用趋势",
                        textStyle: {
                            color: "#9b9b9b",
                            fontSize: parseInt(fontRate * 0.28),
                            fontWeight: "normal"
                        },
                        left: "0%",
                        top: "69%"
                    }
                ],
                grid: [
                    { x2: "0%", y: "9%", width: "86%", height: "15%" },
                    { x2: "0%", y2: "41%", width: "86%", height: "15%" },
                    { x2: "0%", y2: "7%", width: "86%", height: "15%" }
                ],
                tooltip: {
                    formatter: ""
                },
                xAxis: [
                    {
                        gridIndex: 0,
                        boundaryGap: false, // 从0开始
                        data: this.totalStatus.subChartDatas[0].categories,
                        ...lineX
                    },
                    {
                        gridIndex: 1,
                        boundaryGap: false, // 从0开始
                        data: this.totalStatus.subChartDatas[1].categories,
                        ...lineX
                    },
                    {
                        gridIndex: 2,
                        boundaryGap: false, // 从0开始
                        data: this.totalStatus.subChartDatas[2].categories,
                        ...lineX
                    }
                ],
                yAxis: [
                    {
                        gridIndex: 0,
                        ...lineY
                    },
                    {
                        gridIndex: 1,
                        ...lineY
                    },
                    { gridIndex: 2, ...lineY }
                ],
                series: [
                    {
                        data: this.totalStatus.subChartDatas[0].seriesData,
                        type: "line",
                        showSymbol: false,
                        animationDuration: 500,
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        itemStyle: lineItemStyle,
                        areaStyle: lineAraeStyle,
                        ...directiveAreaStyle
                    },

                    {
                        data: this.totalStatus.subChartDatas[1].seriesData,
                        type: "line",
                        showSymbol: false,
                        animationDuration: 500,
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        itemStyle: lineItemStyle,
                        areaStyle: lineAraeStyle,
                        ...directiveAreaStyle
                    },
                    {
                        data: this.totalStatus.subChartDatas[2].seriesData,
                        type: "line",
                        showSymbol: false,
                        animationDuration: 500,
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        itemStyle: lineItemStyle,
                        areaStyle: lineAraeStyle,
                        ...directiveAreaStyle
                    }
                ]
            });
        },
        drawLine(event) {
            var fontRate = parseFloat(
                document.documentElement.style.fontSize.replace("px", " ")
            );
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(
                document.getElementById(event),
                null,
                { renderer: "svg" }
            );
            var linear_red = {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                        offset: 0,
                        color: "#DF0022"
                    },
                    {
                        offset: 1,
                        color: "#ED5169"
                    }
                ]
            };
            var linear_color = {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                        offset: 0,
                        color: "#21ADF0"
                    },
                    {
                        offset: 1,
                        color: "#2FECCF"
                    }
                ]
            };
            var cpuUsedRate = this.totalStatus.cpuUsedRate / 100;
            var diskUsedRate = this.totalStatus.diskUsedRate / 100;
            var memoryUsedRate = this.totalStatus.memoryUsedRate / 100;
            var cpuColor = cpuUsedRate > 0.9 ? linear_red : linear_color;
            var diskColor = diskUsedRate > 0.9 ? linear_red : linear_color;
            var memoryColor = memoryUsedRate > 0.9 ? linear_red : linear_color;
            var pieStyle = [
                {
                    label: {
                        normal: {
                            show: true,
                            position: "center",
                            textStyle: {
                                color: "#fff",
                                fontSize: fontRate * 0.56,
                                fontFamily: "SuiNumberMedium"
                            }
                        }
                    }
                },
                {
                    itemStyle: {
                        normal: {
                            borderColor: "#4D5359",
                            borderWidth: fontRate * 0.22
                        }
                    }
                },
                {
                    value: 180,
                    itemStyle: {
                        normal: {
                            color: "rgba(0,0,0,0)"
                        }
                    }
                }
            ];
            myChart.setOption({
                grid: [
                    { x: "0%", y: "0%", width: "38%", height: "20%" },
                    { x2: "1%", y: "9%", width: "54%", height: "15%" },
                    { x: "0%", y2: "39%", width: "38%", height: "20%" },
                    { x2: "1%", y2: "40%", width: "54%", height: "15%" },
                    { x: "0%", y2: "12%", width: "38%", height: "20%" },
                    { x2: "1%", y2: "4%", width: "54%", height: "15%" }
                ],
                tooltip: {
                    formatter: ""
                },
                xAxis: [
                    {
                        gridIndex: 0,
                        axisLine: {
                            show: false
                        }
                    },
                    {
                        gridIndex: 2,
                        axisLine: {
                            show: false
                        }
                    },
                    {
                        gridIndex: 4,
                        axisLine: {
                            show: false
                        }
                    }
                ],
                yAxis: [
                    {
                        gridIndex: 0,
                        axisLine: {
                            show: false
                        }
                    },
                    {
                        gridIndex: 2,
                        axisLine: {
                            show: false
                        }
                    },
                    {
                        gridIndex: 4,
                        axisLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        type: "pie",
                        radius: [fontRate * 1.6, fontRate * 1.63],
                        center: ["50%", fontRate * 1.8],
                        startAngle: 180,
                        animation: false,
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        labelLine: {
                            show: false
                        },
                        data: [
                            {
                                value: 180,
                                itemStyle: pieStyle[1].itemStyle
                            },
                            pieStyle[2]
                        ]
                    },
                    {
                        type: "pie",
                        radius: [fontRate * 1.6, fontRate * 1.63],
                        center: ["50%", fontRate * 1.8],
                        startAngle: 180,
                        xAxisIndex: 0,
                        animation: false,
                        yAxisIndex: 0,
                        labelLine: {
                            show: false
                        },
                        data: [
                            {
                                value: cpuUsedRate * 180,
                                label: {
                                    normal: {
                                        formatter: cpuUsedRate.toFixed(2) + "%",
                                        ...pieStyle[0].label.normal
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        borderColor: cpuColor,
                                        borderWidth: fontRate * 0.22
                                    }
                                }
                            },
                            {
                                value: 180,
                                label: {
                                    normal: {
                                        show: true,
                                        position: "center",
                                        formatter: '\n \n\n CPU平均使用率',
                                          rich: {
                           
                            a: {
                                align: 'center',
                                color: 'rgb(98,137,169)',
                                fontSize: 45,
                                height: 100
                            },
                        },
                                        textStyle: {
                                            color: "#7E8898",
                                            fontSize: fontRate * 0.28,
                                            fontFamily: "PingFangHK-Regular"
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: "rgba(0,0,0,0)"
                                    }
                                }
                            }
                        ]
                    },
                    {
                        type: "pie",
                        radius: [fontRate * 1.6, fontRate * 1.63],
                        startAngle: 180,
                        center: ["50%", "55%"],
                        animation: false,
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        labelLine: {
                            show: false
                        },
                        data: [
                            {
                                value: 180,
                                itemStyle: pieStyle[1].itemStyle
                            },
                            pieStyle[2]
                        ]
                    },
                    {
                        type: "pie",
                        radius: [fontRate * 1.6, fontRate * 1.63],
                        startAngle: 180,
                        center: ["50%", "55%"],
                        animation: false,
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        labelLine: {
                            show: false
                        },
                        data: [
                            {
                                value: diskUsedRate * 180,
                                label: {
                                    normal: {
                                        formatter:
                                            (diskUsedRate * 100).toFixed(2) +
                                            "%",
                                        ...pieStyle[0].label.normal
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        borderColor: diskColor,
                                        borderWidth: fontRate * 0.22
                                    }
                                }
                            },
                            {
                                value: 180,
                                label: {
                                    normal: {
                                        show: true,
                                        position: "center",
                                        formatter: "\n \n \n  磁盘平均使用率",
                                        textStyle: {
                                            color: "#7E8898",
                                            fontSize: fontRate * 0.28,
                                            fontFamily: "PingFangHK-Regular"
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: "rgba(0,0,0,0)"
                                    }
                                }
                            }
                        ]
                    },
                    {
                        type: "pie",
                        radius: [fontRate * 1.6, fontRate * 1.63],
                        center: ["50%", "91%"],
                        startAngle: 180,
                        animation: false,
                        xAxisIndex: 4,
                        yAxisIndex: 4,
                        labelLine: {
                            show: false
                        },
                        data: [
                            {
                                value: 180,
                                itemStyle: pieStyle[1].itemStyle
                            },
                            pieStyle[2]
                        ]
                    },
                    {
                        type: "pie",
                        radius: [fontRate * 1.6, fontRate * 1.63],
                        center: ["50%", "91%"],
                        startAngle: 180,
                        animation: false,
                        xAxisIndex: 4,
                        yAxisIndex: 4,
                        labelLine: {
                            show: false
                        },
                        data: [
                            {
                                value: memoryUsedRate * 180,
                                label: {
                                    normal: {
                                        formatter:
                                            (memoryUsedRate * 100).toFixed(2) +
                                            "%",
                                        ...pieStyle[0].label.normal
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        borderColor: memoryColor,
                                        borderWidth: fontRate * 0.22
                                    }
                                }
                            },
                            {
                                value: 180,
                                label: {
                                    normal: {
                                        show: true,
                                        position: "center",
                                        formatter: "\n \n \n 内存平均使用率",
                                        textStyle: {
                                            color: "#7E8898",
                                            fontSize: fontRate * 0.28,
                                            fontFamily: "PingFangHK-Regular"
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: "rgba(0,0,0,0)"
                                    }
                                }
                            }
                        ]
                    }
                ]
            });
        }
    }
};
</script>
<style>
#totalId path {
    stroke-linejoin: round;
    clip-path: none;
    stroke-linecap: round;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
@keyframes radar-beam {
    0% {
        opacity: 0.3;
    }
    100% {
        opacity: 1;
    }
}
.box {
    margin-right: 0.41rem;
    width: 11.84rem;
    background: rgba(255, 255, 255, 0.07);
    border-radius: 0.12rem;
    box-shadow: 0 0.02rem 0.2rem 0 rgba(0, 0, 0, 0.2);
    .box-title {
        padding: 0.29rem 0 0 0.54rem;
        font-family: PingFangHK-Medium;
        font-size: 0.42rem;
        color: #9b9b9b;
        letter-spacing: 0;
        text-align: left;
        margin-block-start: 0em;
        margin-block-end: 0em;
    }
    ul {
        margin-block-start: 0em;
        margin-block-end: 0em;
        padding-inline-start: 0;
        li {
            display: inline-block;
            list-style: none;
            height: 0.65rem;
            vertical-align: text-top;
        }
    }
    .conten-head {
        height: 0.65rem;
        background: rgba(255, 255, 255, 0.08);
        border: 0 solid #ffffff;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.05);
        margin: 0.22rem 0.53rem 0.3rem 0.54rem;
        li:nth-child(1) {
            width: 2rem;
            padding-left: 0.2rem;
            div {
                span {
                    .statuIcon {
                        background: url("../../assets/images/hardWare/schedule.png")
                            repeat;
                        background-size: 100% 100%;
                        background-position: center center;
                        display: inline-block;
                        height: 0.24rem;
                        width: 0.24rem;
                    }
                }
            }
        }
        li:nth-child(2) {
            width: 3.2rem;
        }
        li:nth-child(3) {
            width: 2.2rem;
        }
        li:nth-child(4) {
            width: 2.2rem;
        }
        li {
            div {
                display: inline-block;
                height: 100%;
                margin-left: 0.12rem;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                span:nth-child(2) {
                    color: #e0e0e0;
                    display: block;
                    width: 0.9rem;
                }
                span {
                    font-family: "PingFangHK-Regular";
                    font-size: 0.28rem;
                    color: #7e8898;
                    letter-spacing: 0;
                }
            }
        }
    }
    .conten-body {
        margin: 0 0.54rem;
        div {
            height: 4.66rem;
            vertical-align: top;
            display: inline-block;
        }
        .conten-pie {
            width: 4.06rem;
        }
        .conten-line {
            width: 5.83rem;
        }
    }
    // }
}
</style>

