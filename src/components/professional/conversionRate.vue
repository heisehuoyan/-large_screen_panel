<template>
    <div class="convers">
        <p class="box-title">{{ name }}转化率</p>
        <el-carousel indicator-position="none"  arrow="never" :interval="6000"   @change="handleChange">
      <el-carousel-item v-for="(item,index) in convertRateList" :key="index" >
        <div class="conver-chart">
                    <div class="conver-pie">
                    <div id="convers0" v-if="index===0" style="width: 3rem; height:3rem;display: inline-block;right:-0.4rem"/>
                    <div :id="'convers'+index" v-else style="width: 3rem; height: 3rem;display: inline-block;right:-0.4rem"/>
                        <span class="totalRate">{{ totalRate }}
                            <br>
                            <span style="">总体转化率</span>
                        </span>
                    </div>

                </div>
                <div class="conver-ul">
                    <div class="canvasBox" style="padding:0 0 0 1.02rem;display: inline-block;">
                         <canvas :id="'cvs' +index" ></canvas>
                    </div>
                    <div v-show="subject.length>1" class="img-1" style="" :id="'rateGrab'+index">
                        <div style="clear:both;"></div>
                        <img src="../../assets/images/professional/funnel_1.png" alt="">
                        <span>{{ rateAnalysis}}</span>
                    </div>
                    <div v-show="subject.length>2" class="img-2" style="" :id="'rateAnalysis'+index">
                        <img src="../../assets/images/professional/funnel_2.png" alt="">
                        <span>{{ rateGrab }}</span>
                    </div>
                </div>
      </el-carousel-item>
    </el-carousel>
    </div>
</template>

<script>
export default {
    props: {
        convertRateList: {
            type: Array,
            default: () => {}
        },
        flag: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            itemData: [],
            itemTag: 0,
            name: null,
            rateAnalysis: null, //抓取/登入
            rateGrab: null, //解析/抓取
            subject: [],
            numList: [],
            totalRate: 0 //解析/登入
        };
    },

    watch: {
        convertRateList: function() {
            this.numList = this.convertRateList[this.flag].seriesData[0].data;
            this.subject = this.convertRateList[this.flag].categories;
            this.$nextTick(function() {
                this.name = this.convertRateList[this.flag].sourceName;
                var data = this.convertRateList[this.flag].seriesData[0];
                this.rateAnalysis =
                    data.data[1] / data.data[0] * 100 < 100
                        ? (data.data[1] / data.data[0] * 100).toFixed(1) +
                              "%" || 0
                        : "100%";
                this.rateGrab =
                    data.data[2] / data.data[1] * 100 < 100
                        ? (data.data[2] / data.data[1] * 100).toFixed(1) +
                              "%" || 0
                        : "100%";
            });
        }
    },
    mounted() {
       // this.swiper.slideTo(1, 0, false);
       // this.init()
    },
    methods: {
        getPixelRatio(context) {
            var backingStore =
                context.backingStorePixelRatio ||
                context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio ||
                1;
            return (window.devicePixelRatio || 1) / backingStore;
        },
        handleChange(index,k){
            $('#convers0 >div').css('height:87px;width:105px')
            this.drawFrame(index,k)
            this.drawLine(index,k)
        },
        drawFrame(index,k) {
            this.name = this.convertRateList[index].sourceName;
            this.num = this.convertRateList[index].seriesData[0].data;
            this.subject = this.convertRateList[index].categories;
            var data = this.convertRateList[index].seriesData[0];
            this.rateAnalysis =
                    data.data[1] / data.data[0] * 100 < 100
                        ? (data.data[1] / data.data[0] * 100).toFixed(1) +
                              "%" || 0
                        : "100%";
            this.rateGrab =
                    data.data[2] / data.data[1] * 100 < 100
                        ? (data.data[2] / data.data[1] * 100).toFixed(1) +
                              "%" || 0
                        : "100%";
           var fontRate = parseFloat(
                document.documentElement.style.fontSize.replace("px", " ")
            );
            const cvs = document.getElementById('cvs'+index);
            // 计算画布的宽度
            const width = fontRate * 8.05;
            // 计算画布的高度
            const height = fontRate * 3.48;
            const ctx = cvs.getContext("2d");
            // 设置宽高
            cvs.width = width;
            cvs.height = height;
            cvs.style.width = cvs.width + "px";
            cvs.style.height = cvs.height + "px";
            var ratio = this.getPixelRatio(ctx);
            cvs.width = cvs.width * ratio;
            cvs.height = cvs.height * ratio;
            let m = 0;
            const gravity = fontRate * 10;
            var _this = this;
            m = gravity;
            this.dr(m, ctx, fontRate, ratio ,index);
        },
        dr(m, ctx, fontRate, ratio,tag) {
            const data = this.convertRateList[tag];
            var Cone = function(ctx, x, y, w, h, d, color) {
                ctx.save();
                ctx.translate(x, y); // 在X方向和Y方向移动的距离
                var blockHeight = h;
                // 中点
                var x2 = 0;
                var y2 = fontRate * 0.2;
                var k2 = fontRate * 0.1;
                var w2 = w;
                var h2 = h;
                // 递减度
                var decrease = d;
                ctx.beginPath();
                ctx.moveTo(x2 + w2, y2);
                // 椭圆加了边框，所以加1减1
                ctx.bezierCurveTo(
                    x2 + w2,
                    y2 + k2,
                    x2 - w2,
                    y2 + k2,
                    x2 - w2 - 1,
                    y2
                );
                ctx.lineTo(x2 - w2 + decrease, y2 + blockHeight);
                ctx.bezierCurveTo(
                    x2 - w2 + decrease,
                    y2 + blockHeight + k2,
                    x2 + w2 - decrease,
                    y2 + blockHeight + k2,
                    x2 + w2 - decrease,
                    y2 + blockHeight
                );
                ctx.lineTo(x2 + w2 + 1, y2);
                var linear = ctx.createLinearGradient(
                    x2 - w2,
                    y2,
                    x2 + w2 - decrease,
                    y2 + blockHeight
                );
                linear.addColorStop(0, color[0]);
                linear.addColorStop(1, color[1]);
                ctx.fillStyle = linear;
                ctx.strokeStyle = linear;
                ctx.fill();
                // ctx.stroke();
                ctx.closePath();
                // 画椭圆
                ctx.beginPath();
                ctx.moveTo(x2 - w2, y2);
                ctx.bezierCurveTo(
                    x2 - w2,
                    y2 - k2,
                    x2 + w2,
                    y2 - k2,
                    x2 + w2,
                    y2
                );
                ctx.bezierCurveTo(
                    x2 + w2,
                    y2 + k2,
                    x2 - w2,
                    y2 + k2,
                    x2 - w2,
                    y2
                );
                var linear = ctx.createLinearGradient(
                    x2 - w2,
                    y2,
                    x2 + w2 - decrease,
                    y2 + blockHeight
                );
                linear.addColorStop(1, color[0]);
                linear.addColorStop(0, color[1]);
                ctx.fillStyle = linear;
                ctx.strokeStyle = linear;
                ctx.closePath();
                ctx.globalAlpha = 0.3;
                ctx.fill();

                ctx.stroke();

                ctx.restore();
            };
            const colorList = [];
            const colorStart = ["#21ADF0", "#2FECD0", "#2FECD0"];
            const colorEnd = ["#2FECCF", "#FF67A2", "#FF67A2"];
            var total = 0;
            data.categories.forEach((item, index) => {
                total += data.seriesData[0].data[index];
            });
            data.categories.forEach((item, index) => {
                let rateHeight = data.seriesData[0].data[index] / total;
                let totalHeigth = 2.1;
                colorList.push({
                    color: [colorStart[index], colorEnd[index]],
                    height:
                        total == 0
                            ? 0.6 * fontRate
                            : rateHeight * totalHeigth * fontRate,
                    name: item,
                    value: data.seriesData[0].data[index]
                });
            });
            const space = fontRate * 0.2;
            let coneHeight = 0;
            // 间隔
            const gap = fontRate * 0.2;
            const x = fontRate * 4.3;
            const y = fontRate * 0.1;
            const angle = fontRate * 0.8;
            let coneWidth = 0;
            let rateGrabDom = document.getElementById(
                "rateGrab" + tag
            );
            let rateAnalysisDom = document.getElementById(
                "rateAnalysis" + tag
            );
            colorList.forEach(item => {
                coneHeight += item.height + space;
            });

            // 最下面的先画(层级)
            colorList.reverse().forEach((item, index) => {
                const decrease =
                    // Math.PI圆周率
                    Math.tan(Math.PI * angle / (5.5 * fontRate)) *
                    (item.height + space);
                coneWidth = coneWidth + decrease;
                coneHeight = coneHeight - item.height - space;
                // 圆锥
                Cone(
                    ctx,
                    x * ratio,
                    coneHeight * ratio,
                    coneWidth * ratio,
                    item.height * ratio,
                    decrease * ratio,
                    item.color
                );
                // 中点
                const cX = parseInt(x) + fontRate * 0.005;
                const cY =
                    parseInt(coneHeight + space + item.height / 2) +
                    fontRate * 0.005;
                if (index === 2) {
                     ratio>1?
                     
                    rateGrabDom.style.top = item.height-0.2*fontRate   + "px":
                    rateGrabDom.style.top = item.height -0.2*fontRate + "px"
                } else if (index === 0) {
                     ratio>1?
                     rateAnalysisDom.style.bottom = item.height-0.2*fontRate  + "px":
                    rateAnalysisDom.style.bottom = item.height -0.2*fontRate + "px"
                }

                // 文字
                ctx.save();
                ctx.translate(cX * ratio, cY * ratio);
                ctx.textBaseline = "hanging";
                ctx.textAlign = "center";
                const fontSize =
                    item.height / 2 >= fontRate * 0.28
                        ? fontRate * 0.28 * ratio
                        : item.height / 2 * ratio;
                ctx.font = fontSize + "px Sui-Number-Bold";
                ctx.fillStyle = "#ffffff";
                ctx.fillText(item.value, 0, -fontSize / 3 * ratio);
                ctx.restore();
                const xLineA =
                    (parseInt(coneWidth - decrease / 2) + fontRate * 0.1) *
                    ratio;
                const xLine =
                    (parseInt(m + xLineA) >= x ? x : m + xLineA) * ratio;
                // 标题
                ctx.save();
                var grad = ctx.createLinearGradient(0, 0, xLine - xLineA, 0);
                grad.addColorStop(0, "#3B424B");
                grad.addColorStop(0.9, "rgba(28,33,44,0.08)");
                ctx.fillStyle = grad;
                if (colorList.length > 2) {
                    if (index === 0) {
                        ctx.fillRect(
                            0,
                            (colorList[1].height +
                                colorList[2].height +
                                fontRate * 0.56) *
                                ratio,
                            xLine - xLineA,
                            (item.height + fontRate * 0.1) * ratio
                        );
                    } else if (index === 1) {
                        ctx.fillRect(
                            0,
                            (colorList[2].height + fontRate * 0.36) * ratio,
                            xLine - xLineA,
                            (item.height + fontRate * 0.1) * ratio
                        );
                    } else if (index === 2) {
                        ctx.fillRect(
                            0,
                            0.16 * fontRate * ratio,
                            xLine - xLineA,
                            (item.height + fontRate * 0.1) * ratio
                        );
                    }
                } else if (colorList.length < 2) {
                    ctx.fillRect(
                        0,
                        0.16 * fontRate * ratio,
                        xLine - xLineA,
                        (item.height + fontRate * 0.1) * ratio
                    );
                } else {
                    if (index === 0) {
                        ctx.fillRect(
                            0,
                            (colorList[1].height + fontRate * 0.36) * ratio,
                            xLine - xLineA,
                            (item.height + fontRate * 0.1) * ratio
                        );
                    } else if (index === 1) {
                        ctx.fillRect(
                            0,
                            0.16 * fontRate * ratio,
                            xLine - xLineA,
                            (item.height + fontRate * 0.1) * ratio
                        );
                    }
                }
                ctx.save();
                ctx.translate(cX * ratio, cY * ratio);
                ctx.fillStyle = "#9B9B9B";
                ctx.textBaseline = "middle";
                ctx.font = fontRate * 0.28 * ratio + "px PingFangSC-Regular";
                ctx.fillText(item.name + "(人)", -xLine + gap+4*ratio, 0);
                ctx.closePath();
                ctx.restore();
            });
        },
        drawLine(tag, k) {
          
            var fontRate = document.documentElement.style.fontSize.replace(
                "px",
                " "
            );
            this.itemData = this.convertRateList[tag];
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(
                document.getElementById('convers'+tag),
                // null,
                // { renderer: "svg" }
            );
           
            var data = this.convertRateList[tag].seriesData[0];
            var rate = data.data[2] / data.data[0] || 0;
            this.totalRate = (rate * 100).toFixed(2) + "%";
            // 绘制图表
            myChart.setOption({
                grid: {
                    top: "2%",
                    left: "100%",
                    right: "100%",
                    bottom: "10%"
                },
                series: [
                    {
                        name: "Line",
                        type: "pie",
                        animation: false,
                        radius: ["50%", "50%"],
                        center: ["40%", "30%"],
                        //startAngle: 360,
                        labelLine: {
                            show: false
                        },
                        data: [
                            {
                                value: 360 - rate * 360,
                                itemStyle: {
                                    normal: {
                                        borderColor: "#4D5359",
                                        borderWidth: fontRate * 0.1
                                    }
                                }
                            },
                            {
                                value: rate * 360,
                                label: {
                                    normal: {
                                        show: false
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        borderColor: {
                                            type: "linear",
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [
                                                {
                                                    offset: 0,
                                                    color: "#2FECCF"
                                                   
                                                },
                                                {
                                                    offset: 1,
                                                    color: "#21ADF0 "
                                                }
                                            ]
                                        },
                                        borderWidth: fontRate * 0.1
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
.conver-chart path {
    /* // stroke-linecap: round;
    //stroke-linejoin: round; */
}
</style>

<style rel="stylesheet/scss" lang="scss" >
.convers .el-carousel {
    height: 6.2rem;
}
.convers .el-carousel .el-carousel__container {
    height: 100% !important;
}
.convers {
    width: 100%;
    height: 7.66rem;
    background: rgba(255, 255, 255, 0.07);
    border-radius: 0.12rem;
    -webkit-box-shadow: 0 0.02rem 0.2rem 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0 0.02rem 0.2rem 0 rgba(0, 0, 0, 0.2);
    .box-title {
        font-family: PingFangHK-Medium;
        font-size: 0.42rem;
        color: #9b9b9b;
        letter-spacing: -0.8px;
        text-align: left;
        margin-block-start: 0em;
        margin-block-end: 0em;
        padding: 0.37rem 0 0.66rem 0.62rem;
    }
    .conver-chart {
        width: 100%;
        height: 2.5rem;
        display: flex;
        justify-content: center;
        position: relative;
        div {
            width: 5rem;
            position: relative;
        }
        .totalRate {
            position: absolute;
            font-family: "SuiNumberMedium";
            font-size: 0.62rem;
            color: #ffffff;
            letter-spacing: 0;
            text-align: center;
            top: 0.2rem;
            right: 0;
            span {
                font-family: PingFangHK-Regular;
                font-size: 0.28rem;
                color: #9b9b9b;
                position: absolute;
                left: 0px;
                letter-spacing: -0.56px;
                top: 0.8rem;
            }
        }
    }
    .conver-ul {
        height: 2.78rem;
        float: left;
        position: relative;
        width: 7.95rem;
        ul {
            padding-inline-end: 0em;
            margin-block-start: 0em;
            margin-block-end: 0em;
            list-style: none;
            float: left;
            li {
                font-family: PingFangSC-Regular;
                font-size: 0.26rem;
                color: #9b9b9b;
                letter-spacing: 0;
                text-align: center;
                height: 0.68rem;
                margin-bottom: 0.14rem;
                background-image: linear-gradient(
                    44deg,
                    rgba(241, 241, 241, 0.08) 20%,
                    rgba(0, 255, 51, 0) 50%
                );
                width: 1.53rem;
                .img_0 {
                    background: url("../../assets/images/hardWare/funnel_1.png")
                        0 0 repeat;
                    background-size: 100% 100%; //会适应浏览器大小
                    width: 2.36rem;
                    height: 0.6rem;
                }
                .img_1 {
                    background: url("../../assets/images/hardWare/funnel_2.png")
                        0 0 repeat;
                    background-size: 100% 100%; //会适应浏览器大小
                    width: 1.59rem;
                    height: 0.6rem;
                }
                .img_2 {
                    background: url("../../assets/images/hardWare/funnel_3.png")
                        0 0 repeat;
                    background-size: 100% 100%; //会适应浏览器大小
                    width: 0.9rem;
                    height: 0.6rem;
                }
                div {
                    display: inline-block;
                }
                div:nth-child(1) {
                    text-align: left;
                    line-height: 0.7rem;
                    margin-left: 0.14rem;
                }
                img {
                    // width: 2.35rem;
                    height: 0.68rem;
                    z-index: 999;
                    float: right;
                }
            }
        }
        .img-1 {
            position: absolute;
            right: 0rem;
            z-index: 9999;
            img {
                width: 0.38rem;
                height: 0.55rem;
            }
            span {
                font-family: "SuiNumberMedium";
                font-size: 0.34rem;
                color: #ffffff;
                letter-spacing: 0;
            }
        }
        .img-2 {
            position: absolute;
            right: 0rem;
            img {
                width: 0.38rem;
                height: 0.55rem;
            }
            span {
                font-family: "SuiNumberMedium";
                font-size: 0.36rem;
                color: #ffffff;
                letter-spacing: 0;
            }
        }
    }
}
</style>

