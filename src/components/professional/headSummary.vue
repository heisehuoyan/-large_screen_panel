<template>
    <div class="headSummary">
        <div class="summary-body" style="padding:0 0.55rem 0 0.62rem">
            <p class="summary-title">累计导入业务数据总成功数（次）</p>
            <div class="number-grow-warp">
                <ul id="numUl" />
            </div>
           
            <ul class="silb-ul">
                <li>
                    <p class="li-body" id='today'>{{ today }}</p>
                    <p>今日新增</p>
                </li>
                <li>
                    <p class="li-body" id='currMonth'>{{ currMonth }}</p>
                    <p>当月新增</p>
                </li>
                <li>
                    <p class="li-body" id='currYear'>{{ currYear }}</p>
                    <p>当年新增</p>
                </li>
            </ul>
        </div>
        <div class="summary-body" style="height:4.65rem;width: 16.57rem;padding:0 0.55rem 0.25rem 0.62rem">
            <p class="summary-title" style="margin: 0.51rem 0 0.3rem 0rem;">导入业务数据成功趋势</p>
            <div id="summaryChart" style="width: 100%; height: 73%" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        importSuccTimes: Object
    },
    data() {
        return {
            total: 0,
            today: 0,
            currMonth: 0,
            currYear: 0,
            divHtml: [],
            liHtml: [],
        };
    },
    watch: {
        importSuccTimes: function(newvalue, oldvalue) {
            this.total = this.importSuccTimes.total;
            this.total = this.toThousands(this.total);
            this.today = newvalue.today
            this.currMonth = newvalue.currMonth;
            this.currYear = newvalue.currYear;
            this.$nextTick(function() {
                this.drawLine();
            });
            this._list(this.total);
            if (oldvalue.today != newvalue.today) {
                this.NumAutoPlusAnimation("today", {
                    time: 1500,
                    num: parseInt(this.today),
                    regulator: 50
                }, '');
             this.today = this.toThousands(newvalue.today);
            } 
            if (oldvalue.currMonth != newvalue.currMonth) {
                this.NumAutoPlusAnimation("currMonth", {
                    time: 1500,
                    num: parseInt(this.currMonth),
                    regulator: 50
                },'');
            } 
            if (oldvalue.currYear != newvalue.currYear) {
                this.NumAutoPlusAnimation("currYear", {
                    time: 1500,
                    num: parseInt(this.currYear),
                    regulator: 50
                },'');
            }
        }
    },
    methods: {
        toThousands(num) {
            num = (num || 0).toString();
            var temp = num.length % 3;
            switch (temp) {
                case 1:
                    num = "00" + num;
                    break;
                case 2:
                    num = "0" + num;
                    break;
            }
            return num
                .match(/\d{3}/g)
                .join(",")
                .replace(/^0+/, "");
        },
        _list: function(val, params) {
            var valString = val || 1;
            var par = params || {};
            var json = {
                value: valString,
                valueStr: valString.toString(10),
                height: par.height || 1.69,
                interval: par.interval || 5000,
                speed: par.speed || 1000,
                width: par.width || 1.09,
                addMin: par.addMin || 10000,
                addMax: par.addMax || 99999,
                length: String(val).length
            };
            var ulNode = document.getElementById("numUl");
            var liNode = document
                .getElementById("numUl")
                .getElementsByTagName("li");
            var len = String(val).length;
            for (var i = 0; i < len; i++) {
                var newLi = document.createElement("li");
                newLi.setAttribute("style", "float: left;list-style: none;");
                for (var j = 0; j < 10; j++) {
                    newLi.innerHTML =
                        '<div style="height:' +json.height +"rem;width:" +json.width +'rem;">0</div>' +
                        '<div style="height:' +json.height +"rem;width:" +json.width +'rem;">1</div>' +
                        '<div style="height:' + json.height +"rem;width:" +json.width +'rem;">2</div>' +
                        '<div style="height:' +json.height +"rem;width:" +json.width +'rem;">3</div>' +
                        '<div style="height:' +json.height +"rem;width:" +json.width +'rem;">4</div>' +
                        '<div style="height:' +json.height +"rem;width:" +json.width +'rem;">5</div>' +
                        '<div style="height:' +json.height + "rem;width:" +json.width +'rem;">6</div>' +
                        '<div style="height:' +json.height +"rem;width:" +json.width +'rem;">7</div>' +
                        '<div style="height:' +json.height +"rem;width:" + json.width + 'rem;">8</div>' +
                        '<div style="height:' +json.height +"rem;width:" + json.width +'rem;">9</div>';
                }
                if (liNode.length <= i) {
                    if (valString[i] === ",") {
                        newLi.innerHTML =
                            "<span style='line-height: 1.7rem;width: .61rem;display: inline-block;'>,</span>";
                    }
                    ulNode.append(newLi);
                }
            }

            for (var x = 0; x < json.length; x++) {
                if (valString[x] !== ",") {
                    var topPx = valString[x] * json.height;
                    document.getElementById("numUl").getElementsByTagName("li")[
                        x
                    ].style.transform =
                        "translateY(" + -topPx + "rem)";
                }
            }
        },
        //数字自增到某一值动画参数（目标元素,自定义配置）
        NumAutoPlusAnimation(targetEle, options,v) {
            var self = this
            /*可以自己改造下传入的参数，按照自己的需求和喜好封装该函数*/
            //不传配置就把它绑定在相应html元素的data-xxxx属性上吧
            options = options || {};

            var $this = document.getElementById(targetEle),
                time = options.time || $this.data("time"), //总时间--毫秒为单位
                finalNum = options.num || $this.data("value"), //要显示的真实数值
                regulator = options.regulator || 100, //调速器，改变regulator的数值可以调节数字改变的速度
                step = finalNum / (time / regulator) /*每30ms增加的数值--*/,
                count = 0, //计数器
                initial = 0;
             $this.innerHTML =''
            var timer = setInterval(function() {
                count = count + step;

                if (count >= finalNum) {
                    clearInterval(timer);
                    count = finalNum;
                }
                //t未发生改变的话就直接返回
                //避免调用text函数，提高DOM性能
                var t = Math.floor(count);
                if (t == initial) return;

                initial = t;

                $this.innerHTML = initial;
                $this.innerHTML = v+$this.innerHTML 
                 $this.innerHTML = self.toThousands( $this.innerHTML)
            }, 0);
        },
        drawLine() {
            var fontRate = parseFloat(
                document.documentElement.style.fontSize.replace("px", " ")
            );
            // 基于准备好的dom，初始化echarts实例null, { renderer: 'svg' }
            var myChart = this.$echarts.init(
                document.getElementById("summaryChart"),
                null,
                { renderer: "svg" }
            );
            var maxInterval = this.importSuccTimes.seriesData[0]
            for (let i = 0; i < this.importSuccTimes.seriesData.length - 1; i++) {
            maxInterval = maxInterval < this.importSuccTimes.seriesData[i+1] ? this.importSuccTimes.seriesData[i+1] : maxInterval
            }
            var interval = 0
            if(maxInterval%4===0){
                maxInterval=maxInterval
            }else{
                maxInterval = Math.round(maxInterval/4)*4
            }
            interval = maxInterval/4
            // 绘制图表
            myChart.setOption({
                grid: {
                    left: "-1%",
                    right: "2%",
                    bottom: "0%",
                    top: "6%",
                    containLabel: true
                },
                xAxis: [
                    {
                        type: "category",
                        data: this.importSuccTimes.categories,
                        boundaryGap: false, // 从0开始
                        axisLine: {
                            lineStyle: {
                                color: "rgba(255, 255, 255, 0.04)"
                            }
                        },
                        axisLabel: {
                            margin: fontRate * 0.18,
                            interval: 0,
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
                            show: false
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        min: 0, // 坐标最小值
                         max: maxInterval, //坐标最大值
                         interval: interval, //坐标间隔
                         splitLine: {
                            //show:false,
                            lineStyle: {
                                color: "rgba(255, 255, 255, 0.05)"
                            }
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            //show: false,
                            margin: fontRate * 0.2,
                            normal: {
                                formatter: "{d}%"
                            },
                            textStyle: {
                                color: "#7E8898", // 坐标值得具体的颜色
                                fontSize: fontRate * 0.24
                                // fontFamily: 'SuiNumberMedium'
                            }
                        },
                        axisTick: {
                            show: false // 坐标刻度不显示
                        }
                    }
                ],
                series: [
                    {
                        data: this.importSuccTimes.seriesData,
                        symbol: "none", // 不显示圆点
                        type: "line",
                        smooth: true, // 平滑曲线
                        strokeLinecap: "square",
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
                                            color: "rgba(82, 191, 255, 0.1)"
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(82, 191, 255, 0)"
                                        },
                                    ]
                                )
                            }
                        },
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    width: fontRate * 0.07, // 0.1的线条是非常细的了
                                    opacity: 1,
                                    shadowBlur: 30,
                                    shadowColor: "rgba(33,167,240,0.46)"
                                },
                                color: new this.$echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    1,
                                    0,
                                    [
                                        {
                                            offset: 0.05,
                                            color: "rgba(33,167,240,0.2)",
                                        },
                                       
                                         {
                                            // 100% 处的颜色
                                            offset: 0.1,
                                            color: "rgba(33,167,240,0.3)"
                                        },
                                          {
                                            offset: 0.3,
                                            color: "rgba(33,167,240,1)",
                                        },
                                         {
                                            // 100% 处的颜色
                                            offset: 0.4,
                                            color: "rgba(33,167,240,1)"
                                        },
                                         {
                                            // 100% 处的颜色
                                            offset: 0.5,
                                            color: "rgba(47,236,207,1)"
                                        },
                                         {
                                            // 100% 处的颜色
                                            offset: 0.6,
                                            color: "rgba(47,236,207,1)"
                                        },
                                         {
                                            // 100% 处的颜色
                                            offset: 0.8,
                                            color: "rgba(47,236,207,1)"
                                        },
                                            {
                                            // 100% 处的颜色
                                            offset: 0.9,
                                            color: "rgba(47,236,207,1)"
                                        },
                                          {
                                            // 100% 处的颜色
                                            offset: 1,
                                            color: "rgba(47,236,207,0.2)"
                                        }
                                    ],
                                    false
                                )
                            }
                        }
                    }
                ]
            });
        }
    }
};
</script>
<style>
#summaryChart svg path {
    clip-path: none;
    stroke-linecap: round;
}
#numUl {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
}
#numUl li {
    transition: 1s all;
    text-align: center;
    list-style: none;
    float: left;
    margin: 0 0.16rem 0 0;
}
#numUl li div {
    font-family: "SuiNumberMedium";
    font-size: 1.2rem;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    text-shadow: 0 2px 14px #000000;
    background: url("../../assets/images/professional/mad.png") 0 0 repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../assets/styles/font-family.scss";
.headSummary {
    height: 10.216rem;
    background: rgba(255, 255, 255, 0.07);
    border-radius: 0.12rem;
    -webkit-box-shadow: 0 0.02rem 0.2rem 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0 0.02rem 0.2rem 0 rgba(0, 0, 0, 0.2);
    .summary-body {
        width: 16.57rem;
        color: #ffffff;
        height: 100%;
        float: left;
        text-align: center;
        vertical-align: top;
        height: 5.27rem;
        .number-grow-warp {
            background: url("../../assets/images/professional/numBackground.png")
                0 0 repeat;
            background-size: 100% 100%; //会适应浏览器大小
            height: 2.41rem;
            width: 16.3rem;
            display: flex;
            align-items: center;
            align-content: center;
            margin-bottom: 0.42rem;
            ul {
                margin: 0 !important;
                margin-block-start: 0;
                margin-block-end: 0;
                padding-inline-start: 0;
                overflow: hidden;
                position: relative;
                height: 1.69rem;
                .sprtr {
                    background: transparent;
                    width: 0.62rem;
                }
                li {
                    .num-comma {
                        background: #01011f;
                    }
                }
            }
        }
        .silb-ul {
            margin-top: 0.5rem;
            padding: 0px;
            margin-block-start: 0em;
            margin-block-end: 0em;
            padding-inline-start: 0;
            li:nth-child(1) {
                margin-right: 1.31rem;
            }
            li:nth-child(2) {
                margin-right: 1.02rem;
                p {
                    margin-left: 1.11rem;
                }
                &::before {
                    position: absolute;
                    content: "";
                    float: left;
                    display: block;
                    width: 0.02rem;
                    height: 1rem;
                    opacity: 0.42;
                    background: -webkit-linear-gradient(
                        #272935,
                        #0087ff,
                        #272935
                    );
                    background: -moz-linear-gradient(#272935, #0087ff, #272935);
                    background: linear-gradient(#272935, #0087ff, #272935);
                }
            }
            li:nth-child(3) {
                p {
                    margin-left: 1.31rem;
                }
                &::before {
                    position: absolute;
                    content: "";
                    float: left;
                    display: block;
                    width: 0.02rem;
                    height: 1rem;
                    opacity: 0.42;
                    background: -webkit-linear-gradient(
                        #272935,
                        #0087ff,
                        #272935
                    );
                    background: -moz-linear-gradient(#272935, #0087ff, #272935);
                    background: linear-gradient(#272935, #0087ff, #272935);
                }
            }
            li {
                list-style: none;
                display: inline-block;
                margin-block-start: 0em;
                margin-block-end: 0em;
                padding-inline-start: 0;
                p {
                    font-family: PingFangHK-Regular, sans-serif;
                    font-size: 0.28rem;
                    color: #7e8898;
                    letter-spacing: -0.56px;
                    margin-block-start: 0em;
                    margin-block-end: 0em;
                }
                .li-body {
                    font-family: "SuiNumberMedium";
                    font-size: 0.66rem;
                    color: #ffffff;
                    letter-spacing: 0;
                    text-shadow: 0 2px 5px #000000;
                    margin-block-end: 0;
                    margin-bottom: 0.04rem;
                }
            }
        }
        .summary-title {
            font-family: PingFangHK-Medium, sans-serif;
            font-size: 0.42rem;
            color: #9b9b9b;
            letter-spacing: -0.8px;
            text-align: left;
            margin-block-start: 0em;
            margin-block-end: 0em;
            margin: 0.37rem 0 0.49rem 0;
        }
    }
}
</style>

