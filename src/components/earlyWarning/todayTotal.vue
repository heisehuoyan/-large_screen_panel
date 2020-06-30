<template>
  <div class="box">
    <p class="box-title">今日预警总数</p>
    <div class="box-chart ">
      <div class="todayChart">

        <span class="total">{{ realTimeTrendInfo.total }}</span>
        <div>
          <span class="rate">
            同比
            <span :class="{ 'class-a' : rateFlag, 'class-b': !rateFlag}">
              {{ content|filterRate }}
            </span>
            <em v-if="realTimeTrendInfo.rate>0" class="icons rise-icons"/>
            <em v-if="realTimeTrendInfo.rate<0" class="icons decline-icons"/>
          </span>
        </div>

      </div>
      <div class="box-num">
        <p class="num">{{ realTimeTrendInfo.solved }}</p>
        <p class="num-solved">已解决</p>
        <p class="num">{{ realTimeTrendInfo.unsolved }}</p>
        <p class="num-unsolved">待解决</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
    filters: {
        filterRate(item) {
            if (item) {
                if (item.rate > 0) {
                    return item.rate + '%'
                } else {
                    return item
                        ? item.rate.toString().replace('-', ' ') + '%'
                        : ''
                }
            }
        }
    },
    props: {
        realTimeTrendInfo: Object
    },
    data() {
        return {
            content: null
        }
    },
    computed: {
        rateFlag() {
            let rateis = null
            if (this.realTimeTrendInfo.rate > 0) {
                rateis = true
            } else {
                rateis = false
            }

            return rateis
        }
    },
    watch: {
        realTimeTrendInfo(val) {
            this.content = val
        }
    },
    mounted() {},
    methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.todayChart:after {
    content: " ";
    display: block;
    // background-image: linear-gradient(
    //     44deg,
    //     rgba(0, 255, 51, 0) 50%,
    //     #91cc7e 100%
    // );
    background: url("../../assets/images/warn/radar_2.png");
    // width: 243px;
    // height: 243px;
    position: absolute;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    top: 0%;
    left: 0%;
    animation: radar-beam 5s infinite;
    animation-timing-function: linear;
    //transform-origin: bottom right;
    //border-radius: 100% 0 0 0;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
}
@keyframes radar-beam {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.box:before {
    position: absolute;
    content: "";
    float: right;
    display: block;
    width: 0.02rem;
    height: 4.23rem;
    margin: 2.22rem 0 1.24rem 0;
    opacity: 0.42;
    background: -webkit-linear-gradient(#4d84fc, #75777d, #1c212c);
    background: -moz-linear-gradient(#1c212c,  #75777d, #1c212c);
    background: linear-gradient(#1c212c, #75777d , #1c212c);
}
///rgba(117,119,125,0.3)
.box {
    width: 8.4rem;
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

    .box-chart {
        height: 4.71rem;
        // width: 4.71rem;
        float: left;
        margin: 0.2rem 0 0 1.11rem;
        .todayChart {
            position: relative;
            float: left;
            background: url("../../assets/images/warn/radar_1.png") 0 0 repeat;
            // background-size: 100%;
            //background-size: cover;
            background-size: 100% 100%; //会适应浏览器大小
            height: 4.71rem;
            width: 4.71rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 0.51rem 0 0;
            text-align: center;
            .total {
                font-family: 'SuiNumberMedium';
                font-size: 1.38rem;
                color: #e0e0e0;
                letter-spacing: 0;
                z-index: 9999;
            }
            div {
                background: url("../../assets/images/warn/oval.png") 0 0 repeat;
                background-size: 100% 100%;
                max-width: 2.78rem;
                height: 0.52rem;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 1.5rem;
                position: absolute;
                padding: 0 .1rem 0 0.2rem;
                z-index: 99;
                .rate {
                    font-family: 'SuiNumberMedium';
                    font-size: 0.28rem;
                    color: #42badb;
                    letter-spacing: 0;
                    .class-a {
                        color: #fd2361;
                    }
                    .class-b {
                        color: #7ed321;
                        font-size: 0.32rem;
                    }
                    .icons {
                        display: inline-block;
                        height: 0.25rem;
                        width: 0.25rem;
                    }
                    .rise-icons {
                        background: url("../../assets/images/warn/rise.png") 0 0 repeat;
                        background-size: 100% 100%;
                    }
                    .decline-icons {
                        background: url("../../assets/images/warn/decline.png") 0 0
                            repeat;
                        background-size: 100% 100%;
                    }
                }
            }
        }
        .box-num {
            height: 4.71rem;
            margin-top: 0.4rem;
            width: 1rem;
            float: left;
            text-align: left;
            .num {
                font-size: 0.65rem;
                color: #e0e0e0;
                letter-spacing: 0;
            }
            .num-unsolved {
                font-size: 0.28rem;
                color: #fd2361;
                letter-spacing: 0;
            }
            .num-solved {
                font-size: 0.28rem;
                color: #52cdbc;
                letter-spacing: 0;
                margin-block-end: 1.48rem;
                &:after {
                    position: absolute;
                    content: "";
                    display: block;
                    width: 0.95rem;
                    height: 0.03rem;
                    opacity: 0.1;
                    margin: 0.76rem 0rem 0.71rem 0rem;
                    background: #e0e0e0;
                }
            }
            p {
                font-family: 'SuiNumberMedium';
                margin-block-start: 0em;
                margin-block-end: 0em;
            }
        }
    }
}
</style>

