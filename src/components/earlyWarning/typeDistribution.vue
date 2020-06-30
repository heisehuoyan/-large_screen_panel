<template>
    <div class="box">
        <p class="box-title">预警类型分布</p>
        <div class="bubble_container">
            <transition-group name="bounce">
                <div v-if="show" v-for="(bubble,index) in bubbleData" :key="index" :style="conf[index].style || {}" style="background-repeat: no-repeat;background-size: 100%;" class=" bubble bubble_text">
                    <div style="top: 50%;transform: translateY(-50%);position: relative;line-height: 1rem;">
                        <span> {{ bubble.count }}</span>
                        <p style="position: static;height: 0.6rem;font-family: PingFangHK-Regular;font-size: 0.26rem;color: #FFFFFF;letter-spacing: -0.52px;text-align: center; margin-block-start: 0em;margin-block-end: 0em;line-height: 0rem;"> {{ bubble.name }}</p>
                    </div>
                </div>
            </transition-group>
        </div>
        <div class="department-class" style="text-align:center;width:7.8rem;">
            <ul>
                <div class="typeSwiper">
                    <swiper ref="mySwiper" :options="swiperOption" style="justify-content: center;">
                        <swiper-slide v-for="(item,index) in typeDistribution" :key="index">
                            <li :class="{active:changeStyle == index}">
                                <div>
                                    <span>
                                        {{ item.departName }}
                                    </span>
                                </div>
                            </li>
                        </swiper-slide>
                        <div slot="pagination" class="swiper-pagination" style=" display: none;" />
                    </swiper>
                </div>

            </ul>
        </div>
    </div>
</template>

<script>
import imageBase64 from "@/utils/imgBase64";
import mock from "@/utils/mock";
import Swiper from "swiper";
export default {
    props: {
        typeDistribution: {
            type: Array,
            default: () => {}
        }
    },
    data() {
        return {
            swiperOption: {
                pagination: { el: ".swiper-pagination" },
                on: {
                    // 使用es6的箭头函数，使this指向vue对象
                    slideChangeTransitionEnd: () => {
                        // 切换结束时，告诉我现在是第几个slide
                        const swiper = this.$refs.mySwiper.swiper;
                        // this.changeStyle = swiper.activeIndex
                    }
                },
                slidesPerView: "auto"
            },
            changeStyle: 0,
            tag: 0,
            typeDistributionCp: [],
            default_bubble_style: {},
            conf: [],
            bubbleData: [
                // {
                //     count:1,
                //     name:'指标',
                //     departName:'555'
                // },
                //    {
                //     count:1,
                //     name:'指标',
                //      departName:'555'
                // },
                //    {
                //     count:1,
                //     name:'指标',
                //      departName:'555'
                // }
            ],
            show: true
        };
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    watch: {
        typeDistribution(val) {
            this.typeDistributionCp = [...this.typeDistribution[0].typeStats];
            this.bubbleData = this.typeDistribution[this.changeStyle].typeStats;
        },
        changeStyle(newval, old) {
            this.typeDistributionCp = [
                ...this.typeDistribution[this.changeStyle].typeStats
            ];
        }
        // show(val) {
        //     if (val) {
        //         return false;
        //     }
        // }
    },
    beforeMount() {
        this.conf = mock.bubbleData;
        this.show = false;
    },
    mounted() {
        this.conf = mock.bubbleData;
        const _this = this;
        var al = 0;
        var timer = setInterval(function() {
            if (_this.typeDistribution.length) {
                _this.readA(al);
                clearInterval(timer);
            }
        }, 10);
    },
    methods: {
        readA(al) {
            const _this = this;
            this.changeStyle = al;
            this.bubbleData = this.typeDistribution[this.changeStyle].typeStats;
            _this.swiper.slideTo(al, 0, false);
            this.show = false;
            setTimeout(function() {
                _this.show = true;
            }, 400);

            al >= this.typeDistribution.length - 1 ? (al = 0) : al++;
            setTimeout(function() {
                _this.readA(al);
            }, 9500);
        },
        changeScale(conf, len) {
            const changeScale = conf.changeScale;
            const scale = conf.scale;
            const fz = conf.style.fontSize.slice(0, -3);
            const w = window.innerWidth;
            const whdef = 100 / 3840;
            const rem = w * whdef;
            if (len >= 4 && changeScale) {
                if (rem < 50) {
                    return scale;
                } else if (changeScale === 3 && rem * fz < 12) {
                    return {
                        display: "inline-block",
                        transform: "scale(.8) translateX(-5%)"
                    };
                }
            }
        }
    }
};
</script>
<style >
.typeSwiper .swiper-slide {
    width: auto;
}
.typeSwiper .swiper-wrapper {
    justify-content: center;
}
.bounce-enter-active {
    /* //animation: bounce-in 6s; */
    animation-duration: 10s;
    animation-name: bounce-in;
}
.bounce-leave-active {
    /* animation: bounce-in .5s reverse; */
}
@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    2% {
        transform: scale(0);
    }
    /* 5% {
        transform: scale(1.2);
    } */
    3.6% {
        transform: scale(0.9);
    }
    5.2% {
        transform: scale(1.1);
    }
    7.8% {
        transform: scale(0.95);
    }
    8.4% {
        transform: scale(1.05);
    }
    15%,
    96% {
        transform: scale(1);
    }
    97%,
    100% {
        transform: scale(0);
    }
}
.box .bubble_container>span>div:first-child  p{
 line-height: 0.3rem !important;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
@keyframes bubbleInLeft {
    0%,
    98% {
        left: 0;
    }
    100% {
        left: -100%;
    }
}
@keyframes bubublChange {
    0% {
        transform: scale(0);
    }
    2% {
        transform: scale(0);
    }
    5% {
        transform: scale(1.2);
    }
    3.6% {
        transform: scale(0.9);
    }
    5.2% {
        transform: scale(1.1);
    }
    7.8% {
        transform: scale(0.95);
    }
    8.4% {
        transform: scale(1.05);
    }
    15%,
    96% {
        transform: scale(1);
    }
    97%,
    100% {
        transform: scale(0);
    }
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
    width: 9.2rem;
    position: relative;

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
    .bubble_container {
        position: relative;
        height: 4rem;
        width: 4.5rem;
        .bubble_text {
            text-align: center;
            font-weight: 500;
            color: #e0e0e0;
        }
        .bubble {
            white-space: nowrap;
            position: absolute;
            width: 100px;
        }
        .bubble-enter {
            animation: bubublChange;
            // animation-name: bubble-enter;
            // animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
            animation-duration: 11s;
            // animation-fill-mode: forwards;
            background-repeat: no-repeat;
            background-size: 100%;
        }
    }
    .department-class {
        position: absolute;
        text-align: center;
        bottom: 0.12rem;
        margin-left: 1.4rem;
        overflow: hidden; /*超出部分隐藏*/
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis; /*超出部分文字以...显示*/
        white-space: nowrap; /*不换行*/
        &:after {
            content: "";
            visibility: hidden;
            font-size: 0;
            height: 0;
            display: block;
            clear: both;
        }
        ul {
            margin-block-start: 0em;
            margin-block-end: 0em;
            padding-inline-start: 0rem;

            .active {
                div {
                    background: #029cf0;
                    margin-left: 0.12rem;

                    span {
                        color: rgba(255, 255, 255, 1);
                        padding: 0 0.1rem;
                    }
                }
            }
            li {
                min-width: 1.27rem;
                height: 0.59rem;
                list-style: none;
                display: inline-block;
                div {
                    //width: 1.27rem;
                    min-height: 100%;
                    border: 1px solid rgba(126, 136, 152, 0.3);
                    border-radius: 6px;
                    margin-left: 0.12rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 0.05rem;
                    span {
                        font-family: PingFangHK-Regular;
                        font-size: 0.3rem;
                        color: #7E8898;
                        letter-spacing: -0.0052rem;
                        padding: 0 0.1rem;
                    }
                }
            }
        }
    }
}
</style>

