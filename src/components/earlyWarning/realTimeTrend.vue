<template>
    <div class="box">
        <p class="box-title">实时预警趋势</p>
        <div id="realChart" style="width: 100%; height: 100%;" />
    </div>
</template>

<script>
export default {
    props: {
        realTimeTrendInfo: {
            type: Object,
            default: val => {}
        }
    },
    data() {
        return {
            currentTime: null
        };
    },
    watch: {
        realTimeTrendInfo(val) {
            this.$nextTick(function() {
                this.drawLine(this.currentTime);
            });
        },
        currentTime(val, old) {
            if(Object.keys(this.realTimeTrendInfo).length !== 0){
             this.drawLine(val)
            }
          
        }
    },
    mounted() {
        var _this = this;
        var data = new Date();
        var hours = data.getHours();
        _this.currentTime =
            parseInt(hours / 3) * 3 < 10
                ? "0" + parseInt(hours / 3) *3 + ":00"
                : parseInt(hours /3) * 3 + ":00";

        setInterval(function() {
            var data = new Date();
            var hours = data.getHours();
            _this.currentTime =
                parseInt(hours / 3) * 3  < 10
                    ? "0" + parseInt(hours / 3) *3 + ":00"
                    : parseInt(hours /3) * 3 + ":00";
        }, 20000);
    },

    methods: {
        drawLine(currentTime) {
            var fontRate = parseFloat(
                document.documentElement.style.fontSize.replace("px", " ")
            );
            var serx = [];
            for (var i = 0; i < this.realTimeTrendInfo.categories.length; i++) {
                if (i % 3 == 0) {
                    serx.push(this.realTimeTrendInfo.categories[i]);
                }
            }

            var serY = [];
            for (var i = 0;i < this.realTimeTrendInfo.seriesData[0].data.length;i++) {
                if (i % 3 == 0) {
                    serY.push(this.realTimeTrendInfo.seriesData[0].data[i]);
                }
            }
            var serYy = [];
            for (var i = 0;i < this.realTimeTrendInfo.seriesData[1].data.length;i++) {
                if (i % 3 == 0) {
                    serYy.push(this.realTimeTrendInfo.seriesData[1].data[i]);
                }
            }
            var xIndex = serx.indexOf(currentTime);
            var yIndex = serY[xIndex];
            var barData = [...serY];
            var tadayData = [...serY];
            var whiteColor = '255,255,255'
            tadayData =
                xIndex === -1 ? tadayData : tadayData.slice(0, xIndex + 1);
            barData.map((value, index, array) => {
                if (index === xIndex) {
                    array[xIndex] = yIndex;
                } else {
                    array[index] = 0;
                }
                return array;
            });
            var markPointLabelDistance = fontRate * 0.2;
            var arr = [];
            for (var i = 0; i < serx.length; i++) {
                if (serx[i] !== currentTime) {
                    arr.push({
                        value: serx[i],
                        textStyle: {}
                    });
                } else {
                    arr.push({
                        value: serx[i],
                        textStyle: {
                            fontSize: fontRate * 0.24
                        }
                    });
                }
            }
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(
                document.getElementById("realChart"),
                null,
                { renderer: "svg" }
            );
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    show: false
                },
                legend: {
                    itemGap: 18,
                    itemHeight: fontRate * 0.22,
                    itemWidth: fontRate * 0.22,
                    right: "10%",
                    top: "20%",
                    bottom: "25%",
                    data: [
                        {
                             
                            name: "今天",
                            icon:
                                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAA/1BMVEUAAAAqyuUw6NUozeAu6NIv69EkuOwozeAir/ApzuEjuOwmsvAmwOst3tox69QksvEmuPAt4dYu69Eu5dUirvAitO4kvOot39YhsPAmw+Uoy+Ip0N8ise8mwOchr/AoyeIp0d8mw+Yr19sw69Ajt+wu5NUhr/Ax7dAt4do16dIv69Av7NAr1twr1dsir/EirvAv69Ev69Ar2tkr2tkv49ckvucmx+Mo0N4q1dsp090ozt8mxOQr2tkkvOkt5dMis+0q19onyeIlweYs4dUjueojt+wny+EnzOAmwuYr3Ngs3tYr3dcu6NIhsO8t49Qite0u6tEs4Ncku+omxeUr2doZYxffAAAANXRSTlMAODjz68GtpZ+DbUREREQ4Iq2obfPu7u7n59nZw8O/v7+ampmQkIODIiLz8ufn2dnZ2cPCbWxh/90AAAHJSURBVDjLjZXneoIwFIYjddRabdW2di/r6J6KAwEZLW5Q7v9aSkhCREbk9/t8z5fw5hyw+SWymZvznZ2L20w2AWK//buzfrs9/P3r8Tzf7bze5yPRxJVi9DHcg7BsC99cKHqYbrUUY+XB3W6nIwvCqNgMaXAycGCFJPMIloXRpBLosrccQNgwaA2cPBmrP372QdcQ7CQPcQ0KqzVfrq4R2F/DhvBYnZcpm5N0nKysaA3S2bLUuVjw7uF44SUb/mQBJ4vJRwynpUVsDZgsFhF7IEmSri3pAcOSxSn6O5eSkwzpQGfZ7TxWXTjlnm7mJsdcneXCJjzj7owm+92AME2eVh34FMLhybIt085m0jneDCdDOCgSTTZNDtQRrJEa1GdfZ0g3nMrRnWV7vbNZAtfMGhapkQJvpMYg3Gd6deYnOMJwpM+0xhOBo32m8DN4R3Csz7jGBzogw2ecnEJXx/AZJ5dAnV2DJDfg72b6jGGOiMT2eZqEim7rcxXKv63PBe9ZsX1OoQe7nc8cHQVMn0t0yLB8pkMG5Ng+F9YGI8vnsm/kxvtc2xjmcT6Xg2siSqRKPmwBhftcbEastqDPXxxraRL4JXppstfxP/fDc9OIiNGhAAAAAElFTkSuQmCC",
                            textStyle: {
                                color: "#7E8898",
                                fontSize: fontRate * 0.24,
                                fontFamily: "PingFangHK-Regular"
                            }
                        },
                        {
                            name: "昨天",
                            icon: "circle",
                            textStyle: {
                                color: "#7E8898",
                                fontSize: fontRate * 0.24,
                                fontFamily: "PingFangHK-Regular"
                            }
                        }
                    ]
                },
                grid: {
                    left: "12%",
                    right: "12%",
                    bottom: "3%",
                    top: "35%",
                    containLabel: true
                },

                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: arr,
                    nameLocation: "start",
                    axisLine: {
                        lineStyle: {
                            color: "#2F303F"
                        }
                    },
                    axisLabel: {
                        interval: "auto",
                        textStyle: {
                            color: function(value) {
                                return value === currentTime
                                    ? "#e0e0e0"
                                    : "#7E8898";
                            },
                            fontFamily: "SuiNumberMedium",
                            fontSize: fontRate * 0.24,
                            letterspacing: "0",
                            margin: 11
                        }
                    },
                    axisTick: {
                        show: false // 坐标刻度不显示
                    }
                },
                yAxis: {
                    type: "value",
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false // 坐标刻度不显示
                    }
                },
                series: [
                    {
                        name: this.realTimeTrendInfo.seriesData[1].name,
                        type: "line",
                        symbol: "none",
                        smooth: true, // 平滑曲线
                        smoothMonotone: "x",
                        data: serYy,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    width: fontRate * 0.07 // 0.1的线条是非常细的了
                                }
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
                                            color: 'rgba('+whiteColor+', 0.1)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba('+whiteColor+', 0)'
                                        }
                                    ]
                                )
                            }
                        },
                        color: new this.$echarts.graphic.LinearGradient(
                            0,
                            0,
                            1,
                            0,
                            [
                                {
                                    offset: 0.05,
                                    color: 'rgba('+whiteColor+', 0.2)'
                                },
                                {
                                    offset: 0.1,
                                    color: 'rgba('+whiteColor+', 0.3)'
                                },
                                {
                                    offset: 0.5,
                                    color: 'rgba('+whiteColor+', 0.4)'
                                },
                                {
                                    // 100% 处的颜色
                                    offset: 0.9,
                                    color: 'rgba('+whiteColor+', 0.4)'
                                },
                                {
                                    // 100% 处的颜色
                                    offset: 1,
                                    color: 'rgba('+whiteColor+', 0.2)'
                                }
                            ],
                            false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.4)"
                    },
                    {
                        name: this.realTimeTrendInfo.seriesData[0].name,
                        type: "line",
                        symbol: "none",
                        smooth: true, // 平滑曲线
                        data: tadayData,
                        itemStyle: {
                            normal: {
                                borderRadius: "50%",
                                lineStyle: {
                                    width: fontRate * 0.07, // 0.1的线条是非常细的了
                                    opacity: 1
                                },
                                label: {
                                    show: true
                                }
                            }
                        },
                        areaStyle: {//线条颜色与区域颜色数组对象一致，不然打包会出问题
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "rgba(82, 191, 255, 0.2)"
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(82, 191, 255, 0)"
                                        }
                                    ]
                                )
                            }
                        },
                        color: new this.$echarts.graphic.LinearGradient(
                            0,
                            0,
                            1,
                            0,
                            [
                                {
                                    offset: 0.05,
                                    color: "rgba(33,167,240,0.2)"
                                },
                                {
                                    offset: 0.1,
                                    color: "rgba(33,167,240,0.3)"
                                },
                                {
                                    offset: 0.5,
                                    color: "rgba(33,167,240,1)"
                                },
                                {
                                    // 100% 处的颜色
                                    offset: 1,
                                    color: "rgba(47,236,207,1)"
                                }
                            ],
                            false
                        ),

                        markPoint: {
                            symbolSize: fontRate * 0.5,
                            symbol:
                                "image://data:image/png;base64,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",
                            label: {
                                position: "top",
                                distance: markPointLabelDistance,
                                formatter: function(data) {
                                    return (
                                        // '{gray|预警数为：}{green|' +
                                        "预警数：" + data.data.yAxis
                                        // '}'
                                    );
                                },
                                textStyle: {
                                    color: "#e0e0e0",
                                    fontFamily: "PingFangHK-Regular",
                                    fontSize: fontRate * 0.34,
                                    align: "center",
                                    padding: [25, 0, 1, 10],
                                    letterSpacing: -0.56 * fontRate
                                }
                            },
                            data: [
                                {
                                    value: "",
                                    xAxis: currentTime,
                                    yAxis: yIndex,
                                    offset: [50, 65]
                                }
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
#realChart path {
    clip-path: none;
    stroke-linecap: round;
}
#realChart text:last-child > tspan {
    stroke: aliceblue;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
tspan {
    color: aliceblue;
}
.box:before {
    position: absolute;
    content: "";
    float: left;
    display: block;
    width: 0.02rem;
    height: 4.23rem;
    margin: 2.22rem 0 1.24rem 0;
    opacity: 0.42;
    background: -webkit-linear-gradient(#1c212c, #75777d, #1c212c);
    background: -moz-linear-gradient(#1c212c, #75777d, #1c212c);
    background: linear-gradient(#1c212c, #75777d, #1c212c);
}
.box {
    width: 10.86rem;
    position: relative;
    .box-title {
        font-family: PingFangHK-Medium;
        font-size: 0.42rem;
        color: #9b9b9b;
        letter-spacing: 0;
        text-align: left;
        margin-block-start: 0em;
        margin-block-end: 0em;
        margin-top: 1.22rem;
        position: absolute;
    }
}
</style>

