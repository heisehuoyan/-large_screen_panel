<template>
  <div class="emergency">
    <div class="box-title">
      <span>指标波动</span>
    </div>
    <div class="box-body">
      <ul>
        <div class="swiper">
          <swiper ref="directiveSwiper" :options="swiperOption">
            <swiper-slide v-for="(item,index) of directiveFlux.records" :key="index">
              <li>
                <div class="left">
                  <img src="../../assets/images/warn/drective.png" alt="">
                </div>
                <div class="right">
                  <p class="body-title">{{ item.businessName }}</p>
                  <p class="body-main" v-html="content(item.content)"/>
                  <p class="body-remark">{{ item.time }}</p>
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
export default {
    name: 'Emergency',
    props: {
        directiveFlux: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            swiperOption: {
                pagination: { el: '.swiper-pagination' },
                loop: true,
                autoplay: {
                    reverseDirection: true
                },
                direction: 'vertical',
                slidesPerView: 3
            }
        }
    },
    computed: {
        swiper() {
            return this.$refs.directiveSwiper.swiper
        }
    },
    watch: {
        directiveFlux(newValue, oldValue) {
            const arr = Object.keys(oldValue)
            const newLength = newValue.records.length
            const oldLength =
                arr.length === 0 ? newLength : oldValue.records.length
            if (newLength !== oldLength) {
                this.swiper.slideTo(oldLength + 1, 0, false) // 切换到第一个slide，速度为1秒
            }
        }
    },
    mounted() {}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.swiper {
    height: 10.02rem;
    margin: 0.2rem auto;
    &:before {
        position: absolute;
        content: "";
        display: block;
        width: 100%;
        height: 0.02rem;
        opacity: 0.3;
        margin: 6.7rem 0.05rem 0.71rem 0rem;
        background: rgba(0, 0, 0, 0.2);
    }
}
.swiper .swiper-container {
    height: 100%;
    &:before {
        position: absolute;
        content: "";
        display: block;
        width: 100%;
        height: 0.02rem;
        opacity: 0.3;
        margin: 3.3rem 0.05rem 0.71rem 0rem;
        background: rgba(0, 0, 0, 0.2);
    }
}
.swiper .swiper-slide {
    height: 2rem;
}
.swiper .swiper-slide div {
    box-sizing: border-box;
    height: 100%;
    text-align: center;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.emergency {
    width: 10.1rem;
    box-shadow: 0 0.02rem 0.2rem 0 rgba(0, 0, 0, 0.2);
    .box-title {
        padding: 0.29rem 0 0 0.54rem;
        font-family: PingFangHK-Medium;
        font-size: 0.42rem;
        color: #9b9b9b;
        letter-spacing: 0;
        text-align: left;
    }
    .box-body {
        ul {
            padding-inline-start: 0.45rem !important;
            padding-inline-end: 0.44rem;
            margin-block-start: 0em;
            margin-block-end: 0em;
            li {
                list-style: none;
                height: 3.34rem;
                display: flex;
                justify-content: center;
                align-items: Center;
                .left {
                    height: 1.83rem;
                    width: 1.83rem;
                    margin-right: 0.37rem;
                    position: relative;
                    img {
                        background-repeat: no-repeat;
                        width: 100%;
                        height: 100%;
                    }
                }
                div {
                    float: left;
                    height: 100%;
                }
                .right {
                    width: 6.49rem;
                    text-align: left;
                    height: 1.83rem;
                    //margin-right: 0.5rem;
                    .body-title {
                        font-family: PingFangHK-Semibold;
                        font-size: 0.4rem;
                        color: #e0e0e0;
                        line-height: 0.5rem;
                    }
                    .body-main {
                        font-family: PingFangSC-Regular;
                        font-size: 0.3rem;
                        color: #7e8898;
                        letter-spacing: 0;
                        line-height: 0.4rem;
                    }
                    .body-remark {
                        font-family: 'SuiNumberMedium';
                        font-size: 0.28rem;
                        color: #7e8898;
                        letter-spacing: 0;
                        line-height: 0.4rem;
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
            }
        }
    }
}
</style>

