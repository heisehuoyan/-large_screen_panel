<template>
    <div class="su-main">
        <p class="summary-title">登入成功率实时趋势</p>
        <div style=" width: 16.42rem; height: 6.03rem;padding: 0 0.82rem 0.39rem 0.49rem;">
        <div id="suChart" style="width: 100%; height: 100%;" />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        importSuccRate: {
            type: Object,
            default: val => {}
        }
    },
    watch: {
        importSuccRate: function() {
            this.$nextTick(function() {
                this.drawLine();
            });
        }
    },
    methods: {
        drawLine() {
            var _this = this;
            var fontRate = parseFloat(
                document.documentElement.style.fontSize.replace("px", " ")
            );
            var date = new Date();
            var hours = date.getHours();
            var currentTime = hours + ":00";
            var xIndex = this.importSuccRate.lastCategories.indexOf(
                currentTime
            );
            this.importSuccRate.lastCategories.splice(0, xIndex + 1);
            this.importSuccRate.lastCategories.map(function(
                currentValue,
                index,
                arr
            ) {
                _this.importSuccRate.categories.push(currentValue);
            });
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(
                document.getElementById("suChart")
            );
            var color = [
                "#FF5028",
                "#9A4900",
                "#FFA9C9",
                "#DFA579",
                "#F5A623",
                "#EFDE1C",
                "#C44FC3",
                "#6E7FF3",
                "#21ADF0",
                "#2FECCF"
            ];
            var data = this.importSuccRate.seriesData.concat();
            var realData = [];
            var solidList = JSON.parse(JSON.stringify(data));
            var dottedList = JSON.parse(JSON.stringify(data));

            var lastSeriesDataCp = JSON.parse(
                JSON.stringify(this.importSuccRate.lastSeriesData)
            );

            for ( var j = 0; j < this.importSuccRate.lastSeriesData.length;j++) {
                var yIndex = this.importSuccRate.lastSeriesData[j].data[xIndex];
                lastSeriesDataCp[j].data.map(function(currentValue,index,arr) {
                    if (index < xIndex) {arr[index] = "-";}
                });
                //今日与昨日交界点，以今日的为准
                data[j].data.map(function( currentValue,index,arr) {
                lastSeriesDataCp[j].data.map(function(currentValue,i, a) {
                    if (index = xIndex) {
                        a[index] = arr[index];
                    }
                });
                });
            }
            var dataArr2 = [{ coord: [xIndex + 1 + ":00", 50] }];
            for (var i = 0; i < data.length; i++) {
                var yIndex = this.importSuccRate.seriesData[i].data[xIndex];
                realData.push(
                    {
                        name: data[i].name,
                        type: "line",
                        symbol: "none",
                        clickable: false,
                        data: data[i].data,
                        itemStyle: {
                            normal: {
                                barBorderRadius: [20, 20, 0, 0],
                                lineStyle: {
                                    width: fontRate * 0.02 //
                                },
                                color: color[i]
                            }
                        }
                    },
                    {
                        name: lastSeriesDataCp[i].name,
                        type: "line",
                        clickable: false,
                        smooth: false, // 关键点，为true是不支持虚线，实线就用true
                        symbol: "none",
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    width: fontRate * 0.02, //
                                    type: "dashed", // 'dotted'虚线 'solid'实线
                                    opacity: 0.3
                                },
                                color: color[i]
                            }
                        },
                        data: lastSeriesDataCp[i].data
                    }
                );
            }
            myChart.setOption({
                tooltip: {
                    trigger: "axis",
                    show: true,
                    stack: "总量",
                    symbolSize: 120,
                    backgroundColor: "rgba(255,255,255,0)",
                    alwaysShowContent: true,
                    textStyle: {
                        align: "left",
                        fontSize: fontRate * 0.28,
                        fontFamily: "PingFangHK-Medium"
                    },
                    axisPointer: {
                        type: "line",
                        lineStyle: {
                            color: new this.$echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: "rgb(255,255,255,0.3)"
                                    },
                                    {
                                        // 100% 处的颜色
                                        offset: 0.5,
                                        color: "rgb(255,255,255,1)"
                                    },
                                    {
                                        offset: 1,
                                        color: "rgb(255,255,255,0.3)"
                                    }
                                ],
                                false
                            ),
                            width: fontRate * 0.02
                        }
                    },
                    position: function(point, params, dom, rect, size) {
                        var result = [];
                        var X = point[0] + fontRate * 0.25;
                        for (var i = 0; i < params.length; i++) {
                            for (var j = i + 1; j < params.length; j++) {
                                if (
                                    params[i].seriesName ===
                                    params[j].seriesName
                                ) {
                                    params.splice(j, 1);
                                    j--;
                                    const br = i > 0 ? "<br/>" : "";
                                    result.push(
                                        br +
                                            '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:' +
                                            fontRate * 0.19 +
                                            "px;height:" +
                                            fontRate * 0.19 +
                                            "px;background-color:" +
                                            color[j] +
                                            ';"></span>' +
                                            '<div style="display: inline-block;width:50%;margin-right : 0.28rem"><span style="line-height: 0.46rem;color:#7E8898;font-size: 0.3rem">' +
                                            params[i].seriesName +
                                            "</span></div>" +
                                            '<div style="display: inline-block;inline-block;width:1.2rem;""><span style=" line-height: 0.46rem;font-size: 0.3rem;color: #FFFFFF;font-family:SuiNumberMedium; text-align: right;">' +
                                            params[i].data +
                                            "%</span></div>"
                                    );
                                }
                            }
                        }
                        dom.innerHTML =
                            '    <div style="position: relative;">' +
                            '<div style="z-index: 2;border-left:1px solid #464C55;border-bottom: 1px solid #464C55;position: absolute;top: ' +
                            (size.contentSize[1] / 2 - fontRate * 0.3) +
                            "px;left:3px;width: " +
                            fontRate * 0.35 +
                            "px;height: " +
                            fontRate * 0.35 +
                            'px;background: #29303a;transform: rotate(45deg);box-shadow: 1px 0px 1px 0px 4px #888888;"></div>' +
                            '<div style="padding: ' +
                            fontRate * 0.3 +
                            "px  " +
                            fontRate * 0.37 +
                            'px;border: 1px solid #464C55; box-shadow: 1px 1px 4px #000000; background: #29303a;border-radius: 6px;display: inline-block; margin-left: 10px;position: relative;">' +
                            result +
                            "</div>" +
                            "</div>";
                        if (
                            xIndex >
                            _this.importSuccRate.categories.length - 6
                        ) {
                            dom.innerHTML =
                                '    <div style="position: relative;border: 1px solid rgba(255, 255, 255, 0.42);">' +
                                '<div style="z-index: 2;border-right:1px solid #4E535A;border-top: 1px solid #4E535A;position: absolute;top: ' +
                                // (size.contentSize[1]/2  - fontRate * 1.42) +
                                (size.contentSize[1] / 2 - fontRate * 0.3) +
                                "px;right: " +
                                -fontRate * 0.2 +
                                "px;width: " +
                                fontRate * 0.43 +
                                "px;height: " +
                                fontRate * 0.43 +
                                'px;background: #29303a;transform: rotate(45deg);"></div>' +
                                '<div style="border: 1px solid #4E535A;background-color: #29303a;padding: ' +
                                fontRate * 0.3 +
                                "px  " +
                                fontRate * 0.37 +
                                'px;border-radius: 6px;display: inline-block;position: relative; box-shadow: 1px 1px 4px #000000;">' +
                                result +
                                "</div>" +
                                "</div>";

                            X =
                                point[0] -
                                size.contentSize[0] -
                                fontRate * 0.25 ;
                        }
                        dom.innerHTML = dom.innerHTML.replace(/,/g, "");

                        return [X, "5%"];
                    }
                },
                legend: {
                    show: false,
                    data: this.importSuccRate.legends,
                    top: "4%",
                    width: fontRate * 3.06,
                    textStyle: {
                        color: "#DDE0E4",
                        fontWeight: "600",
                        fontSize: 15
                    }
                },
                grid: {
                    left: "0%",
                    right: "0%",
                    bottom: "0%",
                    top: "6%",
                    containLabel: true
                },

                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: this.importSuccRate.categories,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        // interval: 0,
                        margin: fontRate * 0.2,
                        textStyle: {
                            color: "#7E8898", // 坐标值得具体的颜色
                            fontSize: fontRate * 0.24,
                            fontFamily: "SuiNumberMedium"
                        }
                    },
                    axisTick: {
                        show: false // 坐标刻度不显示
                    }
                },
                yAxis: {
                    type: "value",
                    splitLine: {
                        lineStyle: {
                            color: "rgba(255, 255, 255, 0.04)"
                        }
                    },
                    // min: 0, //坐标最小值
                    max: 100, //坐标最大值
                    interval: 25, // 坐标间隔
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: function(value) {
                            return value + "%";
                        },
                        textStyle: {
                            //color: "#7E8898", // 坐标值得具体的颜色
                            fontSize: fontRate * 0.24,
                            fontFamily: "SuiNumberMedium",
                            color: function(value) {
                                return value === "125"
                                    ? "rgba(155,155,155,0)"
                                    : "#7E8898";
                            }
                        }
                    },
                    axisTick: {
                        show: false // 坐标刻度不显示
                    }
                },
                series: realData
            });
           var time = setInterval(() => {
            myChart.dispatchAction({
                type: "showTip", //默认显示江苏的提示框
                seriesIndex: 1,
                dataIndex: xIndex
            });
           
            }, 500)
        //    setTimeout(()=>{
        //    clearInterval(time)
        //    },1000)
            window.onresize = function() {
                myChart.resize();
            };
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.su-main {
    height: 7.67rem;
    margin: 0.27rem 0 0 0;
    background: rgba(255, 255, 255, 0.07);
    border-radius: 0.12rem;
    -webkit-box-shadow: 0 0.02rem 0.2rem 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0 0.02rem 0.2rem 0 rgba(0, 0, 0, 0.2);
    .summary-title {
        font-family: PingFangHK-Medium;
        font-size: 0.42rem;
        color: #9b9b9b;
        letter-spacing: -0.8px;
        text-align: left;
        margin-block-start: 0em;
        margin-block-end: 0em;
        padding: 0.37rem 0 0.35rem 0.62rem;
    }
}
</style>

