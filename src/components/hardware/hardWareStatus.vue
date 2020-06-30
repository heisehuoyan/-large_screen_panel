<template>
    <div class="box">
        <p class="box-title">硬件状态分布</p>
        <div class="box-body">
            <ul>
                <li v-for="(item,index) in hardwareStatusList" :key="index">
                    <div :class="{ 'class_0': item.rank == 0, 'class_1': item.rank == 1 ,'class_2': item.rank == 2, 'class_3': item.rank == 3 ,'class_4': item.rank == 4, 'class_5': item.rank == 5 }" class="background">
                        <!-- <img :src="item.rank|changeImg" alt="">
                        <img src="../../assets/hardWare/fatal.png" alt=""> -->
                        <div :class="{ 'img_0': item.rank == 0, 'img_1': item.rank == 1 ,'img_2': item.rank == 2, 'img_3': item.rank == 3 ,'img_4': item.rank == 4, 'img_5': item.rank == 5 }" class="img" />
                        <div>
                            <p>{{ item.count }}</p>
                            <p>{{ item.rank|changeRank }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="box-chart">
            <div id="myChart" style="width: 100%; height: 100%" />
        </div>
    </div>

</template>

<script>
import common from '@/utils/common'
export default {
    filters: {
        changeRank(item) {
            switch (item) {
                case 0:
                    return "未知";
                    break;
                case 1:
                    return "一般信息";
                    break;

                case 2:
                    return "警告";
                    break;
                case 3:
                    return "一般问题";
                    break;
                case 4:
                    return "严重";
                    break;
                case 5:
                    return "致命";
                    break;
            }
        },
        changeImg(item) {
            switch (item) {
                case 0:
                    return "@/assets/404_images/404.png";
                    break;
                case 1:
                    return "../../assets/images/hardWare/generalInfo.png";
                    break;

                case 2:
                    return "../../assets/images/hardWare/warn.png";
                    break;
                case 3:
                    return "../../assets/images/hardWare/generalProblem.png";
                    break;
                case 4:
                    return "../../assets/images/hardWare/serious.png";
                    break;
                case 5:
                    return "../../assets/images/hardWare/fatal.png";
                    break;
            }
        }
    },
    props: {
        hardwareStatusList: Array
    },
    data() {
        return {};
    },
    watch: {
        hardwareStatusList(value) {
            this.$nextTick(function() {
                this.drawLine();
            });
        }
    },
    mounted() {},
    methods: {
        deepCopy(obj) {
            if (typeof obj !== "object") {
                return obj;
            }
            var newobj = {};
            for (var attr in obj) {
                newobj[attr] = obj[attr];
            }
            return newobj;
        },
        drawLine(event) {
            var fontRate = parseFloat(
                document.documentElement.style.fontSize.replace("px", " ")
            );
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(
                document.getElementById("myChart")
            );
            var data = [...this.hardwareStatusList];
            var xData = [];
            var yData = [];
            data.map((a, b) => {
                xData.push(a.rank);
                yData.push(a.count);
            });
            var startColor = [
                "#E37E7E ",
                "#FFBF66",
                "#A3ECFF",
                "#FFFE78",
                "#508740",
                "#ACACAC"
            ];
            var endColor = [
                "#DE3940 ",
                "#FF7D00 ",
                "#137EB1",
                "#FFEB00 ",
                "#82C363",
                "#DCDCDC"
            ];
            var borderStartColor = [
                "#AB4345 ",
                "#F87B00 ",
                "#097AA7 ",
                "#D9B80E ",
                "#5A9245",
                "#898989"
            ];
            var RealData = [];
            var borderData = [];
            data.map((item, index) => {
                var newobj = this.deepCopy(item);
                var newobj1 = this.deepCopy(item);
                RealData.push(newobj);
                borderData.push(newobj1);
            });
            RealData.map((item, index) => {
                switch (item.rank) {
                    case 0:
                        item.name = "未知";
                        break;
                    case 1:
                        item.name = "一般信息";
                        break;

                    case 2:
                        item.name = "警告";
                        break;
                    case 3:
                        item.name = "一般问题";
                        break;
                    case 4:
                        item.name = "严重";
                        break;
                    case 5:
                        item.name = "致命";
                        break;
                }
                item.value = item.count === 0 ? null : item.count;
                item.color0= startColor[index],
                item.color1= endColor[index]
                // item.itemStyle = {
                //     normal: {
                //         color: {
                //             type: "linear",
                //             x: 0.5,
                //             y: 0.8,
                //             x2: 0.5,
                //             y2: 0.1,
                //             colorStops: [
                //                 {
                //                     offset: 0,
                //                     color: startColor[index] // 0% 处的颜色
                //                 },
                //                 {
                //                     offset: 1,
                //                     color: endColor[index] // 100% 处的颜色
                //                 }
                //             ],
                //             globalCoord: false // 缺省为 false
                //         }
                //     }
                // };
            });
            borderData.map((item, index) => {
                item.name = item.rank;
                item.value = item.count;
                item.itemStyle = {
                    normal: {
                        color: borderStartColor[index]
                    }
                };
            });
   // 计算总数
            var total = RealData.map(v => v.value).reduce((o, n) => o + n);
            // 计算每一个data的其实角度和末了角度 θ1和θ2
            RealData.reduce((o, v) => {
                v.theta1 = o;
                v.theta2 = o + v.value / total;
                return v.theta2;
            }, 0);
            // 添加渐变
            RealData.forEach((v, i) => {
                var ops = common.calc(v.theta1 * 2 * Math.PI, v.theta2 * 2 * Math.PI);
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
            myChart.setOption({
                grid: {
                    left: "5%",
                    right: "10%",
                    bottom: "10%",
                    top: "80%",
                    containLabel: true
                },
                series: [
                    // 主要展示层的
                    {
                        radius: [fontRate * 0.77, fontRate * 1.5],
                        center: ["50%", "50%"],
                        type: "pie",
                        //startAngle: 180,
                        label: {
                            normal: {
                                formatter: function(value) {
                                    return (
                                        "{d|" +
                                        value.percent.toFixed(0) +
                                        "%}\n{c|" +
                                        value.name +
                                        "}"
                                    );
                                },
                                rich: {
                                    d: {
                                        fontSize: fontRate * 0.36,
                                        color: "#E0E0E0",
                                        align: "right",
                                        fontFamily: "SuiNumberMedium",
                                        padding: [1, 0, 0, 0]
                                    },
                                    c: {
                                        fontSize: fontRate * 0.28,
                                        color: "#7E8898",
                                        align: "right",
                                        fontFamily: "PingFangHK-Regular"
                                    }
                                }
                            }
                        },
                        animation: true,
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: "#979797"
                                },
                                smooth: 0.2,
                                length: 0.5
                            }
                        },
                        data: RealData
                    },
                    // 边框的设置
                    {
                        radius: [fontRate * 0.61, fontRate * 0.78],
                        center: ["50%", "50%"],
                        type: "pie",
                        itemStyle: {
                            show: false,
                            borderColor: "rgba(0,0,0,0)",
                            borderWidth: 0
                        },
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        animation: true,
                        tooltip: {
                            show: false
                        },
                        data: borderData
                    }
                ]
            });
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.class_0 {
    background: url("../../assets/images/hardWare/backUn.png") 0 0 repeat;
    background-size: 100% 100%; //会适应浏览器大小
}
.class_1 {
    background: url("../../assets/images/hardWare/backPressed.png") 0 0 repeat;
    background-size: 100% 100%; //会适应浏览器大小
}
.class_2 {
    background: url("../../assets/images/hardWare/backWarn.png") 0 0 repeat;
    background-size: 100% 100%; //会适应浏览器大小
}
.class_3 {
    background: url("../../assets/images/hardWare/backPro.png") 0 0 repeat;
    background-size: 100% 100%; //会适应浏览器大小
}
.class_4 {
    background: url("../../assets/images/hardWare/backSer.png") 0 0 repeat;
    background-size: 100% 100%; //会适应浏览器大小
}
.class_5 {
    background: url("../../assets/images/hardWare/backFatal.png") 0 0 repeat;
    background-size: 100% 100%; //会适应浏览器大小
}
.img_0 {
    background: url("../../assets/images/hardWare/unknow.png") 0 0 repeat;
    background-size: 100% 100%; //会适应浏览器大小
}
.img_1 {
    background: url("../../assets/images/hardWare/generalInfo.png") 0 0 repeat;
    background-size: 100% 100%; //会适应浏览器大小
}
.img_2 {
    background: url("../../assets/images/hardWare/warn.png") 0 0 repeat;
    background-size: 100% 100%; //会适应浏览器大小
}
.img_3 {
    background: url("../../assets/images/hardWare/generalProblem.png") 0 0
        repeat;
    background-size: 100% 100%; //会适应浏览器大小
}
.img_4 {
    background: url("../../assets/images/hardWare/serious.png") 0 0 repeat;
    background-size: 100% 100%; //会适应浏览器大小
}
.img_5 {
    background: url("../../assets/images/hardWare/fatal.png") 0 0 repeat;
    background-size: 100% 100%; //会适应浏览器大小
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
    width: 15.68rem;
    margin-bottom: 0.67rem;
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
    .box-body {
        width: 7.905rem;
        margin: 0.67rem 0 0 1.35rem;
        float: left;
        // height: 100%;
        ul {
            margin-block-start: 0em;
            margin-block-end: 0em;
            padding-inline-start: 0;
            li:nth-child(3n) {
                margin: 0 0rem 0.53rem 0;
            }
            li {
                list-style: none;
                float: left;
                margin: 0 0.315rem 0.53rem 0;
                width: 2.42rem;
                height: 1.7rem;
                .background {
                    width: 2.425rem;
                    height: 1.7rem;
                    display: flex;
                    align-items: center;
                    align-content: center;
                    .img {
                        width: 0.86rem;
                        height: 0.86rem;
                        margin-left: 0.23rem;
                    }
                    div {
                        display: inline-block;
                        margin-left: 0.19rem;
                        p {
                            margin-block-start: 0em;
                            margin-block-end: 0em;
                            font-family: PingFangHK-Regular;
                            font-size: 0.28rem;
                            color: #7e8898;
                            letter-spacing: 0;
                            text-align: left;
                            overflow: hidden; /*超出部分隐藏*/
                            text-overflow: ellipsis;
                            -o-text-overflow: ellipsis; /*超出部分文字以...显示*/
                            white-space: nowrap; /*不换行*/
                        }
                        p:first-child {
                            font-family: Sui-Number-Regular;
                            font-size: 0.6rem;
                            color: #E0E0E0;
                            letter-spacing: 0;
                            line-height: 0.7rem
                        }
                    }
                }
            }
        }
    }
    .box-chart {
        float: left;
        width: 5.68rem;
        height: 3.93rem;
        margin: 0.67rem 0.5rem 0 0.2rem;
    }
}
</style>

