<template>
  <div class="box">
    <div class="box-title">
      <span>硬件预警信息</span>
    </div>
    <!-- <div v-show="hardwareWarnCp.records.length ===0" class="noWarn">
      <div>
        <p>非常棒！</p>
        <p>暂无硬件预警信息</p>
      </div>
    </div> -->
    <div class="box-body">
      <ul>
        <div class="swiper" >
          <swiper ref="warnSwiper" :options="swiperOption">
            <swiper-slide v-for="(item,index) of hardwareWarnCp.records" :key="index" >

              <li>
                <div class="left">
                  <p class="body-title">{{ item.time|splitTime }}</p>
                  <p class="body-remark">{{ item.time|splitData }}</p>
                </div>
                <div class="schedule">
                  <div v-show="index >0 " class="schedule-img">
                    <img src="../../assets/images/hardWare/schedule.png" alt="">
                  </div>
                  <div v-show="index ==0 " class="schedule-img active">
                    <img src="../../assets/images/hardWare/currentWarn.png" alt="">
                  </div>
                  <div :class="{'active-line':index==0}" class="schedule-line" />
                </div>
                <div class="right">
                  <p class="body-title">{{ item.subject }}</p>
                  <!-- <p class="body-main">
                                        {{item.message}}
                                    </p> -->
                </div>
              </li>
            </swiper-slide>
            <div slot="pagination" class="swiper-pagination" style=" display: none;" />
          </swiper>
        </div>
      </ul>
    </div>
    <div style="height:0.5rem;position: absolute;width: 100%;bottom: 0.5rem;background: linear-gradient(-180deg, rgba(44, 49, 59, 0.08) 0px, rgb(44, 49, 59) 100%);z-index: 2;" />
  </div>
</template>

<script>
export default {
    name: 'Emergency',
    filters: {
        splitTime(item) {
            item.trim().split(/\s+/)
            return item.trim().split(/\s+/)[1]
        },
        splitData(item) {
            item.trim().split(/\s+/)
            return (item.trim().split(/\s+/)[0]).replace(/-/g, '/')
        }
    },
    props: {
        hardwareWarnList: {
            type: Object,
            default: val => {}
        }
    },
    data() {
        return {
            // image: image,
            hardwareWarnCp: [],
            list: [],
            swiperOption: {
                pagination: { el: '.swiper-pagination' },
                //loop: true,
                // false,
                autoplay: false,
                on: {
                    // 使用es6的箭头函数，使this指向vue对象
                    slideChangeTransitionEnd: () => {
                        // 切换结束时，告诉我现在是第几个slide
                    }
                },
                direction: 'vertical',
                slidesPerView: 6
            }
        }
    },
    computed: {
        swiper() {
            return this.$refs.warnSwiper.swiper
        }
    },
    watch: {
        hardwareWarnList(val) {
            this.hardwareWarnCp = val
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.swiper {
    height: 9.26rem;
    margin: 0.2rem auto;
}
.swiper .swiper-container {
    height: 100%;
}
.swiper .swiper-slide {
    margin-bottom: 0.2rem;
    // height: 2rem !important;
}
.swiper .swiper-slide div {
    box-sizing: border-box;
    height: 100%;
    text-align: center;
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
.box {
    width: 11.83rem;
    background: rgba(255, 255, 255, 0.07);
    border-radius: 0.12rem;
    box-shadow: 0 0.02rem 0.2rem 0 rgba(0, 0, 0, 0.2);
    position: relative;
    .box-title {
        padding: 0.29rem 0 0.46rem 0.54rem;
        font-family: PingFangHK-Medium;
        font-size: 0.42rem;
        color: #9b9b9b;
        letter-spacing: 0;
        text-align: left;
    }
    .box-body {
        height: 9.26rem;
        // position: relative;
        ul {
            padding-inline-start: 0rem !important;
            padding-inline-end: 0rem;
            margin-block-start: 0em;
            margin-block-end: 0em;
            margin:0 0.6rem;
            li {
                list-style: none;
                height: 100%;
                .left {
                    display: inline-block;
                    vertical-align: top;
                    //height: 1.83rem;
                    width: 1.4rem;
                    margin-right: 0.33rem;
                    position: relative;
                    background-size: 100% 100%; //会适应浏览器大小
                    .body-title {
                        font-family: "SuiNumberMedium";
                        font-size: 0.36rem;
                        color: #e0e0e0;
                        letter-spacing: 0;
                        line-height: 0.31rem;
                    }
                    .body-remark {
                        font-family: "SuiNumberMedium";
                        font-size: 0.28rem;
                        color: #7e8898;
                        letter-spacing: 0;
                    }
                    p {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 5;
                        margin-block-start: 0 !important;
                        margin-block-end: 0.09rem;
                    }
                }

                .schedule {
                    display: inline-block;
                    //height: 2.22rem;
                    vertical-align: top;
                    margin-right: 0.37rem;
                    .active {
                        margin-bottom: 0.4rem !important;
                        img {
                            height: 0.67rem !important;
                            width: 0.67rem !important;
                            position: absolute !important;
                            left: -0.3rem !important;
                            top: 0 !important;
                        }
                    }
                    .schedule-img {
                        height: 0.3rem;
                        // width: 0.3rem;
                        position: relative;
                        margin-bottom: 0.1rem;

                        img {
                            height: 0.3rem;
                            width: 0.3rem;
                            position: absolute;
                            left: -0.13rem;
                            top: 0;
                        }
                    }
                    .active-line {
                        height: 0.9rem !important;
                    }
                    .schedule-line {
                        border: 0.5px solid red;
                        height: 1.2rem;
                    }
                }
                .right {
                    width: 7.82rem;
                    text-align: left;
                    display: inline-block;
                    vertical-align: top;
                    .body-title {
                        font-family:  Sui-Number-Medium;
                        font-size: 0.3rem;
                        color: #e0e0e0;
                        letter-spacing: 0;
                    }
                    .body-main {
                        font-family: PingFangSC-Regular;
                        font-size: 0.28rem;
                        color: #7e8898;
                        letter-spacing: 0;
                    }
                    p {
                         margin-block-start: 0 !important;
                         margin-block-end: 0rem;
                    }
                }
            }
        }
    }
    .noWarn {
        height: 9.26rem;
        display: flex;
        align-items: center;
        justify-content: center;
        div {
            width: 8.5rem;
            height: 8.5rem;
            background: url("../../assets/images/hardWare/noWarn.png") repeat;
            background-size: 100% 100%; //会适应浏览器大小
            text-align: center;
            position: relative;
            p:first-child {
                font-family: PingFangHK-Regular;
                font-size: 0.6rem;
                color: #ffffff;
                letter-spacing: -1.33px;
                top: 6rem;
                position: absolute;
                left: 3.3rem;
            }
            p {
                font-family: PingFangHK-Regular;
                font-size: 0.3rem;
                color: #7e8898;
                letter-spacing: -0.67px;
                margin-block-start: 0em;
                margin-block-end: 0em;
                top: 7rem;
                position: absolute;
                left: 3.3rem;
            }
        }
    }
}
</style>

