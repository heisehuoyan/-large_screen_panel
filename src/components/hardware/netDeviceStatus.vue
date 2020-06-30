<template>
    <div class="box-net">
        <p class="box-title">
            网络设备状态
        </p>
        <ul class="conten-head">
            <li>
                <div>
                    <span>状态：</span>
                    <span v-if="netDeviceStatus.status === 1">正常
                    </span>
                    <span v-if="netDeviceStatus.status != 1">异常
                        <i class="statuIcon" />
                    </span>
                </div>

            </li>
            <li>
                <div>
                    <span>IP地址：</span>
                    <span>{{ netDeviceStatus.ip }}</span>
                </div>
            </li>
        </ul>
        <swiper ref="netDeviceSwiper" :options="swiperOption">
            <swiper-slide v-for="(item,index) in arr" :key="index">
                <div class="content-body" style="margin: 0 0.54rem;">

                    <div class="conten-pie" style=" width: 4.02rem;height: 4.66rem; vertical-align: top;    float: left;">
                        <div :id="'pie' + index " style="width: 100%; height: 100%"></div>
                    </div>
                    <div class="conten-line" style="width: 6.7rem;height: 4.66rem; vertical-align: top;    float: left;">
                        <div style="height: 2.44rem;width:100%;">
                            <div :id="'line' + index " style="width: 100%; height: 100%"></div>
                        </div>
                        <ul class="conten-line-footer" style="padding: 0.63rem 0 0 0; margin-block-start: 0em;margin-block-end: 0em;padding-inline-start: 0;">
                            <li style=" float: left;list-style: none;height: 0.65rem;margin-right: 0.63rem;">
                                <div style=" height: 0.97rem;display: flex;justify-content: center;align-items: center;">
                                    <div class="img" style="height: 0.97rem;float: left;;margin-right: 0.21rem;">
                                        <img src="../../assets/images/hardWare/tcp.png" alt="" style="width: 0.94rem;height: 0.94rem;">
                                    </div>
                                    <div class="num" style="float: left;">
                                        <p :id="'tcp' + index " style="font-family:SuiNumberMedium;font-size: 0.5rem;color: #ffffff; margin-block-start: 0em;margin-block-end: 0em;font-family: PingFangHK-Regular;letter-spacing: -0.74px;"></p>
                                        <p style="font-size: 0.28rem;color: #7e8898; margin-block-start: 0em;margin-block-end: 0em;font-family: PingFangHK-Regular;letter-spacing: -0.74px;">TCP连接数</p>
                                    </div>
                                </div>
                            </li>
                            <li style=" float: left;list-style: none;height: 0.65rem;">
                                <div style=" height: 100%;margin: 0 0rem;">
                                    <img src="../../assets/images/line.png" alt="" style="height: 0.94rem;width: 0.02rem">
                                </div>
                            </li>
                            <li style=" float: left;list-style: none;height: 0.65rem;margin-left: 0.63rem;">
                                <div style=" height: 0.97rem;display: flex;justify-content: center;align-items: center;">
                                    <div class="img" style="height: 0.97rem;float: left; margin-right: 0.21rem;">
                                        <img src="../../assets/images/hardWare/bandwidth.png" alt="" style="width: 0.94rem;height: 0.94rem;">
                                    </div>
                                    <div class="num" style="float: left;">
                                        <p :id="'bandwidth' + index " style="font-family:SuiNumberMedium;font-size: 0.5rem;color: #ffffff; margin-block-start: 0em;margin-block-end: 0em;font-family: PingFangHK-Regular;letter-spacing: -0.74px;"></p>
                                        <p style="font-size: 0.26rem;color: #7e8898; margin-block-start: 0em;margin-block-end: 0em;font-family: PingFangHK-Regular;letter-spacing: -0.74px;">网络带宽(M)</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </swiper-slide>
            <div slot="pagination" class="swiper-pagination" style="display: none;" />
        </swiper>
    </div>
</template>

<script>
import { dom } from "@/utils/common";
export default {
    name: "",
    props: {
        netDeviceId: {
            type: Object,
            default: val => {}
        },
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
                onSlideChangeEnd: function(swiper) {},
                virtual: {
                    slides: [],
                    renderSlide: (slide, index) => {
                        return dom(index, tcp, bandwidth, line);
                    }
                }
            },
            netDeviceStatus: {},
            index: 0,
            currentTime: "",
            arr: []
        };
    },
    computed: {
        swiper() {
            return this.$refs.netDeviceSwiper.swiper;
        }
    },
    watch: {
        flag: {
            handler(newval, oldval) {
                this.index = newval;
                if (this.index === this.arr.length - 1) {
                    this.arr.push(this.netDeviceId.hostids.shift());
                }

                this.getNetDeviceStatus(this.index);
                this.drawLine("pie" + this.index);
                this.drawChart("line" + this.index);
                this.swiper.slideTo(newval, 0, false); // 切换到第一个slide，速度为1秒
            }
        },
        netDeviceId(val) {
            this.getNetDeviceStatus(this.index);
            this.arr.push(val.hostids.shift());
            this.arr.push(val.hostids.shift());
        },
        netDeviceStatus(val) {
            this.drawLine("pie" + this.index);
            this.drawChart("line" + this.index);
            document.getElementById("tcp" + this.index)
                ? (document.getElementById("tcp" + this.index).innerHTML =
                      val.tcpConnsCount)
                : "";
            document.getElementById(
                "bandwidth" + this.index
            ).innerHTML = val.bandwidth.replace("M", "");
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
        }, 2000);
    },
    methods: {
        getNetDeviceStatus(index) {
            this.$get("hardWare/getNetDeviceStatus", {
                time: this.netDeviceId.time,
                refreshPeriod: 600000,
                hostid: this.netDeviceId.hostids[index]
            }).then(this.getNetDeciveStatusSucc);
        },
        getNetDeciveStatusSucc(res) {
            if (res.data.succ) {
                const value = res.data.charts;
                this.netDeviceStatus = value;
            }
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
            // 绘制图表
            var rate = this.netDeviceStatus.usedRate / 100; // 0.4+0.2*Math.random();
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
            var color = rate > 0.9 ? linear_red : linear_color;
            myChart.setOption({
                grid: {
                    top: "10%",
                    left: "10%",
                    right: "100%",
                    bottom: "100%"
                },

                series: [
                    {
                        type: "pie",
                        hoverAnimation: false,
                        radius: [fontRate * 1.6, fontRate * 1.63],
                        startAngle: 180,
                        center: ["45%", "39%"],
                        animation: false,
                        labelLine: {
                            show: false
                        },
                        data: [
                            {
                                value: 180,
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
                        ]
                    },
                    {
                        type: "pie",
                        hoverAnimation: false,
                        radius: [fontRate * 1.6, fontRate * 1.63],
                        startAngle: 180,
                        center: ["45%", "39%"],
                        animation: false,
                        labelLine: {
                            show: false
                        },
                        data: [
                            {
                                value: rate * 180,
                                label: {
                                    normal: {
                                        show: true,
                                        position: "center",
                                        formatter:
                                            (rate * 100).toFixed(2) + "%",
                                        textStyle: {
                                            color: "#e0e0e0",
                                            fontSize: fontRate * 0.56,
                                            fontFamily: "SuiNumberMedium"
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        borderColor: color,
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
                                        formatter: "\n \n \n 网络带宽使用率",
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
        },
        drawChart(event) {
            var xIndex = this.netDeviceStatus.categories.indexOf(
                this.currentTime
            );
            var yIndex = this.netDeviceStatus.seriesData[xIndex];
            this.netDeviceStatus.seriesData =
                xIndex === -1
                    ? this.netDeviceStatus.seriesData
                    : this.netDeviceStatus.seriesData.slice(0, xIndex + 1);
            var fontRate = parseFloat(
                document.documentElement.style.fontSize.replace("px", " ")
            );
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById(event));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: "网络带宽使用趋势",
                    left: "left",
                    top: "1",
                    textStyle: {
                        color: "#9b9b9b",
                        fontFamily: "PingFangHK-Medium",
                        fontSize: fontRate * 0.28,
                        letterspacing: "0",
                        fontWeight: "normal"
                    }
                },
                grid: {
                    top: "30%",
                    left: "12%",
                    right: "0%",
                    bottom: "25%"
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false, // 从0开始
                    data: this.netDeviceStatus.categories,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "rgba(126, 136, 153, 0.3)"
                        }
                    },
                    axisLabel: {
                        interval: 1,
                        textStyle: {
                            color: "#7E8898",
                            fontFamily: "SuiNumberMedium",
                            fontSize: fontRate * 0.24
                        }
                    }
                },
                yAxis: {
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
                },
                series: [
                    {
                        data: this.netDeviceStatus.seriesData,
                        type: "line",
                        showSymbol: false,
                        // smooth: true,
                        lineStyle: {
                            width: fontRate * 0.04, // 0.1的线条是非常细的了
                            opacity: 1
                        },
                        animationDuration: 500,
                        itemStyle: {
                            normal: {
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
                        },
                        areaStyle: {
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
                        },
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
                    }
                ]
            });
        }
    }
};
</script>
<style>
.conten-pie path {
    stroke-linejoin: round;
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
.box-title {
    padding: 0.29rem 0 0 0.54rem;
    font-family: PingFangHK-Medium;
    font-size: 0.4rem;
    color: #9b9b9b;
    letter-spacing: -0.8px;
    text-align: left;
    margin-block-start: 0em;
    margin-block-end: 0em;
}
// }
.box-net {
    //height: 6.87rem;
    height: 11.23rem - 3.96rem-0.4rem;
    background: rgba(255, 255, 255, 0.07);
    border-radius: 0.12rem;
    box-shadow: 0 0.02rem 0.2rem 0 rgba(0, 0, 0, 0.2);
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
        margin: 0.22rem 0.53rem 0.73rem 0.54rem;
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
            .conten-line-footer {
                margin-block-start: 0em;
                margin-block-end: 0em;
                padding-inline-start: 0;
                li {
                    float: left;
                    list-style: none;
                    height: 0.65rem;
                    vertical-align: text-top;
                    margin: 0.63rem 0 0 0;
                    .img {
                        display: inline-block;
                        img {
                            width: 0.94rem;
                            height: 0.94rem;
                        }
                    }
                    .num {
                        display: inline-block;
                        p {
                            margin-block-start: 0em;
                            margin-block-end: 0em;
                            font-family: PingFangHK-Regular;
                            letter-spacing: 0;
                        }
                        p:nth-child(1) {
                            font-size: 0.6rem;
                            color: #e0e0e0;
                        }
                        p:nth-child(2) {
                            font-size: 0.26rem;
                            color: #7e8898;
                            overflow: hidden; /*超出部分隐藏*/
                            text-overflow: ellipsis;
                            -o-text-overflow: ellipsis; /*超出部分文字以...显示*/
                            white-space: nowrap; /*不换行*/
                        }
                    }
                }
            }
        }
    }
}
</style>

