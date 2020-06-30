<template>
    <div class="failure">
        <p class="failure-title">{{ name }}导入失败分布Top5</p>
         <div style="">
              <el-carousel  arrow="never" :interval="6000" @change="handleChange">
                <el-carousel-item v-for="(item,index) in failureList" :key="index">
                    <div id="class0" v-if="index ===0" style="width: 8.1rem; height: 8rem" />
                    <div :id="'class'+index" v-else style="width: 100%; height: 8rem" />
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
import common from "@/utils/common";
export default {
    name: "Failure",
    props: {
        failureList: {
            type: Array,
            default: () => {}
        },
    },
    data() {
        return {
            itemData: [],
            name: "",
        };
    },
    watch: {
        failureList: function() {
            this.$nextTick(function() {
              //  this.drawLine("class0");
            });
        }
    },
    methods: {
         handleChange(index, k) {
            this.name = this.failureList[index].sourceName;
            this.drawLine(index, k);
        },
        drawLine(index, k) {
            var fontRate = parseFloat(
                document.documentElement.style.fontSize.replace("px", " ")
            );
            this.itemData = this.failureList[index];
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('class'+index));
            // 绘制图表
            var data = [];
            var borderData = [];
            var endColor = [
                "#137EB1",
                "#49CAC4",
                "#7028E4",
                "#FF9A9E ",
                "#FFF378",
                "#FF6E4D"
            ];
            var startColor = [
                "#A3ECFF",
                "#7BDFD9",
                "#C86CD3",
                "#FFB5B5",
                "#FFD500",
                "#FFA785"
            ];

            var borderColor = [
                "#097AA7",
                "#3EA8A3",
                "#894EC7",
                "#D0797B ",

                "#FFD500",
                "#DE6347 "
            ];
            const arr_length = this.itemData.data.length;
            const top6 = [];
            let valueMoch = 0;
            top6.push(this.itemData.data.slice(0, 5));
            if (arr_length > 5) {
                const newArr = this.itemData.data.slice(5, arr_length);
                for (let i = 0; i < newArr.length; i++) {
                    valueMoch += newArr[i].value;
                }

                top6[0].push({
                    name: "其他",
                    value: valueMoch
                });
            }
            for (var i = 0; i < top6[0].length; i++) {
                if (top6[0][i].value != 0) {
                    data.push({
                        name: top6[0][i].name,
                        value: top6[0][i].value,
                        color0: startColor[i],
                        color1: endColor[i]
                    });
                    borderData.push({
                        name: top6[0][i].name,
                        value: top6[0][i].value,
                        itemStyle: {
                            borderWidth: 65,
                            normal: {
                                shadowBlur: "0",
                                color: borderColor[i]
                            }
                        }
                    });
                }
            }
            // 计算总数
            var total = data.map(v => v.value).reduce((o, n) => o + n);
            // 计算每一个data的其实角度和末了角度 θ1和θ2
            data.reduce((o, v) => {
                v.theta1 = o;
                v.theta2 = o + v.value / total;
                return v.theta2;
            }, 0);
            // 添加渐变
            data.forEach((v, i) => {
                var ops = common.calc(
                    v.theta1 * 2 * Math.PI,
                    v.theta2 * 2 * Math.PI
                );
                if (v.value)
                    v.itemStyle = {
                        color: {
                            type: "radial",
                            x: ops.center[0],
                            y: ops.center[1],
                            r: ops.radius,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: v.color0
                                },
                                {
                                    offset: 0.5,
                                    color: v.color0
                                },
                                {
                                    offset: 0.3,
                                    color: v.color1
                                },
                                {
                                    offset: 1,
                                    color: v.color1
                                }
                            ],
                            globalCoord: false // 缺省为 false
                        }
                    };
            });

            var scale = 1;
            var rich = {
                yellow: {
                    color: "#ffc72b",
                    fontSize: parseInt(fontRate * 0.3),
                    align: "center"
                },
                total: {
                    color: "#ffc72b",
                    fontSize: parseInt(fontRate * 0.4),
                    align: "center"
                },
                white: {
                    color: "#fff",
                    align: "center",
                    fontSize: parseInt(fontRate * 0.14)
                },
                blue: {
                    color: "#49dff0",
                    fontSize: parseInt(fontRate * 0.16),
                    align: "center"
                },
                hr: {
                    borderColor: "#979797",
                    width: "30%",
                    borderWidth: parseInt(fontRate * 0.05),
                    height: 0
                }
            };
            myChart.setOption({
                grid: {
                    top: "0%",
                    left: "100%",
                    right: "100%",
                    bottom: "15%"
                },

                series: [
                    {
                        name: this.itemData.sourceName + "导入失败分布",
                        type: "pie",
                        minAngle: 10, // 最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
                        avoidLabelOverlap: true, // 是否启用防止标签重叠策略
                        radius: [fontRate * 0.77, fontRate * 1.6],
                        center: ["50%", "50%"],
                        data: data,
                        label: {
                            normal: {
                                formatter(v) {
                                    var text =
                                        "{gray|" +
                                        v.percent.toFixed(0) +
                                        "%\n}{green|" +
                                        v.name +
                                        "}";
                                    if (v.name.length <= 8) {
                                        return text;
                                    } else if (v.name.length > 8) {
                                        v.name = `${v.name.slice(0, 8)}`;
                                        return (
                                            "{gray|" +
                                            v.percent.toFixed(0) +
                                            "%\n}{green|" +
                                            v.name +
                                            "}"
                                        );
                                    }
                                },
                                rich: {
                                    lineHeight: 56,
                                    gray: {
                                        color: "#e0e0e0",
                                        fontFamily: "SuiNumberMedium",
                                        fontSize: parseInt(fontRate * 0.36),
                                        align: "right"
                                    },
                                    green: {
                                        color: "#7E8898 ",
                                        fontFamily:
                                            "PingFangHK-Regular,sans-serif",
                                        fontSize: parseInt(fontRate * 0.28),
                                        align: "right",
                                        letterSpacing: 10,
                                        itemGap: 20
                                    }
                                },
                                textStyle: {
                                    color: "#DDE0E4",
                                    fontSize: parseInt(fontRate * 0.28)
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: "#979797"
                                },
                                smooth: 0.1,
                                length: 1
                            }
                        },
                        animation: false,
                        animationType: "scale",
                        animationEasing: "elasticOut",
                        animationDelay: function(idx) {
                            return Math.random() * 100;
                        }
                    },
                    {
                        type: "pie",
                        radius: [fontRate * 0.61, fontRate * 0.78],
                        center: ["50%", "50%"],
                        animation: false,
                        minAngle: 10, // 最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
                        data: borderData,
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                ]
            });
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.failure {
    height: 10.216rem;
    background: rgba(255, 255, 255, 0.07);
    border-radius: 0.12rem;
    -webkit-box-shadow: 0 0.02rem 0.2rem 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0 0.02rem 0.2rem 0 rgba(0, 0, 0, 0.2);
    .failure-title {
        font-family: PingFangHK-Medium;
        font-size: 0.42rem;
        color: #9b9b9b;
        letter-spacing: -0.8px;
        text-align: left;
        margin-block-start: 0em;
        margin-block-end: 0em;
        padding: 0.37rem 0 0 0.62rem;
    }
}
.failure .el-carousel {
    height: 9.35rem;
    overflow: hidden;
}
.failure .el-carousel .el-carousel__container {
    height: 100% !important;
}
</style>

