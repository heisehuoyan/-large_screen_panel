<template>
    <div class="success">
        <div style="height: 4.7rem;padding: .35rem 0 0; width:8.1rem">
            <el-carousel arrow="never" :interval="6000" @change="handleChange">
                <el-carousel-item v-for="(item,index) in list" :key="index">
                    <div id="success0" v-if="index ===0" style="width: 8.1rem; height: 4.3rem" />
                    <div :id="'success'+index" v-else style="width: 100%; height: 4.3rem" />
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
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
        list: function(val) {
            this.$nextTick(function() {
                // this.drawLine("success0");
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
            this.itemData = this.list[index];
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(
                document.getElementById("success" + index)
            );
            var data = [];
            var colorStart = ["112,40,228", "33,173,240", "255,167,133"];
            var colorEnd = ["221,105,235", "47,236,207", "255,110,77"];
            var textColor = ["#FF65A0", "#21ADF0", "#FFA785 "];
            var shadowColor = [
                "rgba(255, 161, 89, 0.5)",
                "rgba(33, 173, 240, 0.5)",
                "rgba(67, 233, 123, 0.5)"
            ];
            var legendData = [];
            var iconList = [
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAABL1BMVEUAAADXae2CMundaezeaey2Uureae3eaex1K+XcaeyGNed4Lujhb/CIOOmMOeeCM+bdaexyKeWPO+beauvKX+qhRuh1K+XeauuxUOlyKeXVZOuYP+d8L+bdauzBWOmrTOlyKuXNYOt2K+beaevdauyGNebFW+unSulzK+bebOzeaezSZeyeROmoSeiWQOiAMeV+MOS8Vuq7Veq/WOq+V+qvTeiuTOiTPOeSPOefRuieROjea+3eaezdbezdaeyJN+bHXOrEWurBWOq+Vum6VOm3Uum0UOmxT+muTeiqS+jNYOvKXuqkR+ihReieQ+ebQefXZevUY+uYP+eUPufaZ+uNOeaoSejQYuuENOaRO+aBMuZ7LuV4LOV+MOV1K+WnSefRYuuHNuV/MeWRPOelSOiy5uPvAAAAPnRSTlMAOERE/PPuwcGtbTgiIvz88/Pu5+fn59nZ2cPDraWlpaWampmQkIODg21tREQ4OO7u2dm/v7+/ra2amYODRGuQNrAAAAGDSURBVDjLjZXnVsJAEIUXE0rEgiLYFQUVEHtvG3vF3iJBYsT3fwYzBFhSNjvz+zv33Jm9O0PctbQwvTUSDq9tTs2HSGCV9lNl4+b66vLi/Oz05HhoZpGLLo8/PtyXPxh8d/s55i/fu/v64oWfn5QeL9s1WLdhwwW/RSQ32933/uWj/GPBVC442TlVZbBLmVKac+hqDDY8ylYVO/z2A1znK1P5qD2HlYoWZAMq0prJxHdFM1V+g41SbDauO2DDRxnKfp2Y/iuyARVtdFfVxTag4G1mAUYo06wFp6tgwxTDSau9mlP5jwdDi3kLthtkQeLAhyRTw3qmkySGh6NkFGCcjWEyAJ5Rc6YJgLE2EswGP8/MRox5FjeYAc/Y0eVBGdfgATy3MM8s0WmsjSREFGsjC+HHzllqfysT961IHJfnUHMVYPKstJbMKn7JwPoSwbLUsRhFNgqOlRs855xomTNlueg9E7w8RySfA7SDPUD408aqtJcCWHw02Tnets7x+obPOf4Hcoit1pLalkUAAAAASUVORK5CYII=",
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAA/1BMVEUAAAAqyuUw6NUozeAu6NIv69EkuOwozeAir/ApzuEjuOwmsvAmwOst3tox69QksvEmuPAt4dYu69Eu5dUirvAitO4kvOot39YhsPAmw+Uoy+Ip0N8ise8mwOchr/AoyeIp0d8mw+Yr19sw69Ajt+wu5NUhr/Ax7dAt4do16dIv69Av7NAr1twr1dsir/EirvAv69Ev69Ar2tkr2tkv49ckvucmx+Mo0N4q1dsp090ozt8mxOQr2tkkvOkt5dMis+0q19onyeIlweYs4dUjueojt+wny+EnzOAmwuYr3Ngs3tYr3dcu6NIhsO8t49Qite0u6tEs4Ncku+omxeUr2doZYxffAAAANXRSTlMAODjz68GtpZ+DbUREREQ4Iq2obfPu7u7n59nZw8O/v7+ampmQkIODIiLz8ufn2dnZ2cPCbWxh/90AAAHJSURBVDjLjZXneoIwFIYjddRabdW2di/r6J6KAwEZLW5Q7v9aSkhCREbk9/t8z5fw5hyw+SWymZvznZ2L20w2AWK//buzfrs9/P3r8Tzf7bze5yPRxJVi9DHcg7BsC99cKHqYbrUUY+XB3W6nIwvCqNgMaXAycGCFJPMIloXRpBLosrccQNgwaA2cPBmrP372QdcQ7CQPcQ0KqzVfrq4R2F/DhvBYnZcpm5N0nKysaA3S2bLUuVjw7uF44SUb/mQBJ4vJRwynpUVsDZgsFhF7IEmSri3pAcOSxSn6O5eSkwzpQGfZ7TxWXTjlnm7mJsdcneXCJjzj7owm+92AME2eVh34FMLhybIt085m0jneDCdDOCgSTTZNDtQRrJEa1GdfZ0g3nMrRnWV7vbNZAtfMGhapkQJvpMYg3Gd6deYnOMJwpM+0xhOBo32m8DN4R3Csz7jGBzogw2ecnEJXx/AZJ5dAnV2DJDfg72b6jGGOiMT2eZqEim7rcxXKv63PBe9ZsX1OoQe7nc8cHQVMn0t0yLB8pkMG5Ng+F9YGI8vnsm/kxvtc2xjmcT6Xg2siSqRKPmwBhftcbEastqDPXxxraRL4JXppstfxP/fDc9OIiNGhAAAAAElFTkSuQmCC",
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAA/1BMVEUAAAD/n33/d1n/o3//h2b/dlb/cVD/i2n/eFb/clL/ooT/fFb/n3v/p4X/jGn/imn/b07/ooD/elr/dFP/pYP/lHL/gmD/b0//p4X/jWz/iGf/bk7/pIL/mHX/fl3/cVD/p4T/j2z/iGb/b0//ooD/mXf/fFv/p4X/lXL/gV//cU//pYT/n37/d1b/p4T/kHD/b1D/n37/mnn/mnj/hmP/hGP/oX7/n3z/e1r/jmz/knD/imj/iGb/g2H/lnT/jGr/f17/mHb/kG7/hWP/eFf/mnj/lHL/flz/nHr/nnz/dFP/hmX/oH7/dlX/gWD/clH/ooD/cE//pYL/o4H/b086tNh5AAAAOHRSTlMAREQ4OPyppW04IiL88/Pz8+7u7ufn5+fZ2dnZw8PDw7+/v7+tra2lmpqamZCQg4ODbe7ug4NtbY0Am2sAAAHlSURBVDjLjZXZVsIwFEWLZZDBAUVFAUUFUUHFucxQZih0gP//Fm8SmrS2IfR5r73OvTlNpP9f8Ctyd3V0eHkbeQtKW7+9p/NWf95sNhqdTk2tnz0GuGjwurtctvpAA1wDuD5q52RfNP6gjLvdFjYTWAW43SvGfBKcKGOAkRngzsY8avd6n54s+yFFUcbA2jA1D4eJdzf7MhgQGMxzZ2YwDyeTisu7QPAYmSmsUng4mTrceyEMswFZZmKeajR3/HTGYMfqVGaeJu2dhGezxWITY+k0kwGxWSsQNqpjeEDM7gFHtlkzyOncAExYBHv3jFnNyOLpTF0nMRQag2xDdcYwLDTjs0nM7FDmfpmNVRngC4DpgEDTPbPMU5TZSsF4psnN7I5hyVJ1zWIQM+szOxQwr6xXKQxmnZpZn72ZrZJ0Dyw1e/vMzJaVlzJraub0mZrT0rFJt8HrM4gxfAAwjcHvsw1n8DYEfSaZ034D8jLn8epmoj4Tc0mqIljcZ3Io0bW+U58Blu0iifu8SqGK7trnMir/rn0O0N9K3Ocs+2HFfZbpVSDuc4FeMuI+J2Ps+hL1ORFwXIyiPv+4rtztfa54LnN+n3+9zwSvzx8BwQPkyFyMcZ42b59zsvjRBLPg0ST6b/5z/AepE4B+di9MWgAAAABJRU5ErkJggg=="
            ];
            for (var i = 0; i < this.itemData.seriesData.length; i++) {
                var falg;
                for (var j = 0;j < this.itemData.seriesData[i].data.length;j++) {
                    if (this.itemData.seriesData[i].data[j] === 0) {
                        falg = false;
                    } else {
                        falg = true;
                        break;
                    }
                }
                if (falg && i != 0) {
                    this.itemData.seriesData.unshift(
                        this.itemData.seriesData.splice(i, 1)[0]
                    );
                }
            }
            for (var i = 0; i < this.itemData.seriesData.length; i++) {
                legendData.push({
                    name: this.itemData.seriesData[i].name,
                    icon: iconList[i],
                    textStyle: {
                        color: "#7E8898",
                        fontFamily: "PingFangHK-Regular",
                        fontSize: fontRate * 0.24
                    }
                });
                data.push({
                    name: this.itemData.seriesData[i].name,
                    data: this.itemData.seriesData[i].data,
                    type: "line",
                    smooth: true,
                    animation: false,
                    symbol: "circle", // 设定为实心点
                    symbolSize: fontRate * 0.014, // 设定实心点的大小
                    itemStyle: {
                        normal: {
                            color: new this.$echarts.graphic.LinearGradient(
                                0,
                                0,
                                1,
                                0,
                                [
                                    {
                                        offset: 0.05,
                                        color: "rgba(" + colorStart[i] + ",0.2)"
                                    },

                                    {
                                        // 100% 处的颜色
                                        offset: 0.1,
                                        color: "rgba(" + colorStart[i] + ",0.3)"
                                    },
                                    {
                                        offset: 0.3,
                                        color: "rgba(" + colorStart[i] + ",1)"
                                    },
                                    {
                                        // 100% 处的颜色
                                        offset: 0.4,
                                        color: "rgba(" + colorStart[i] + ",1)"
                                    },
                                    {
                                        // 100% 处的颜色
                                        offset: 0.5,
                                        color: "rgba(" + colorEnd[i] + ",1)"
                                    },
                                    {
                                        // 100% 处的颜色
                                        offset: 0.6,
                                        color: "rgba(" + colorEnd[i] + ",1)"
                                    },
                                    {
                                        // 100% 处的颜色
                                        offset: 0.8,
                                        color: "rgba(" + colorEnd[i] + ",1)"
                                    },
                                    {
                                        // 100% 处的颜色
                                        offset: 0.9,
                                        color: "rgba(" + colorEnd[i] + ",1)"
                                    },
                                    {
                                        // 100% 处的颜色
                                        offset: 1,
                                        color: "rgba(" + colorEnd[i] + ",0.2)"
                                    }
                                ],
                                false
                            ),

                            lineStyle: {
                                width: fontRate * 0.07, //
                                opacity: 1
                            },
                            label: {
                                show: true,
                                formatter: function(value) {
                                    return value.data;
                                },
                                textStyle: {
                                    color: textColor[i],
                                    fontFamily: "SuiNumberMedium",
                                    fontSize: fontRate * 0.28
                                }
                            }
                        }
                    }
                });
            }

            // 绘制图表
            myChart.setOption({
                title: {
                    text: this.itemData.sourceName + "业务数据导入成功率",
                    left: "left",
                    textStyle: {
                        color: "#9b9b9b",
                        fontFamily: "PingFangHK-Medium",
                        fontSize: fontRate * 0.42,
                        letterspacing: "-0.8px",
                        fontWeight: "normal"
                    }
                },

                tooltip: {
                    trigger: "axis",
                    show: true,
                    stack: "总量",
                    symbolSize: 120,
                    backgroundColor: "rgba(255,255,255,0)",
                    textStyle: {
                        align: "left",
                        fontSize: fontRate * 0.28,
                        fontFamily: "PingFangHK-Medium"
                    },
                    axisPointer: {
                        type: "none"
                    },
                    position: function(point, params, dom, rect, size) {
                        var result = [];
                        var X = point[0] + fontRate * 0.35;

                        dom.innerHTML = "";
                        return [X, "20%"];
                    }
                },
                legend: {
                    itemGap: 18,
                    itemHeight: fontRate * 0.22,
                    itemWidth: fontRate * 0.22,
                    right: "0%",
                    top: "11%",
                    formatter: function(name) {
                        if (name.length > 2) {
                            name = `${name.slice(0, 2)}`;
                        }

                        return name;
                    },
                    data: legendData
                },
                grid: {
                    left: "0%",
                    right: "4%",
                    bottom: "10%",
                    top: "26%",
                    containLabel: true
                },
                xAxis: [
                    {
                        type: "category",
                        boundaryGap: false, // 从0开始
                        data: this.itemData.categories,
                        axisLine: {
                            show: false
                        },
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
                        axisTick: {
                            show: false // 坐标刻度不显示
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        min: 0, // 坐标最小值
                        max: 100, //坐标最大值
                        interval: 25, //坐标间隔
                        splitLine: {
                            lineStyle: {
                                color: "rgba(255, 255, 255, 0.05)"
                            }
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            margin: fontRate * 0.18,
                            textStyle: {
                                color: "#7E8898", // 坐标值得具体的颜色
                                fontSize: fontRate * 0.24,
                                fontFamily: "SuiNumberMedium"
                            },
                            formatter: function(value) {
                                return value + "%";
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
.success {
    margin: 0 0 0.19rem 0rem;
    height: 5.08rem;
    background: rgba(255, 255, 255, 0.07);
    border-radius: 0.12rem;
    -webkit-box-shadow: 0 0.02rem 0.2rem 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0 0.02rem 0.2rem 0 rgba(0, 0, 0, 0.2);
    padding: 0rem 0 0 0.43rem;
    .success-title {
        font-family: PingFangHK-Medium;
        font-size: 0.4rem;
        color: #9b9b9b;
        letter-spacing: -0.8px;
        text-align: left;
        margin-block-start: 0em;
        margin-block-end: 0em;
        padding: 0.35rem 0 0 0.43rem;
    }
}
.success .el-carousel {
    height: 4.8rem;
    overflow: hidden;
}
.el-carousel__container {
    height: 100% !important;
}
</style>

