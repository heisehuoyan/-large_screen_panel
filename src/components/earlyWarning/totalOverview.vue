<template>
  <div class="overview">
    <div class="box-title">
      <span>预警总览</span>
      <div class="grade" style="float:right">
        <div class="first-remark" />
        <span>一级</span>
        <div class="second-remark" />
        <span>二级</span>
        <div class="third-remark" />
        <span>三级</span>
      </div>
    </div>
    <ul>
      <li class="head">
        <div class="swipe-1">
          <span>级别</span>
        </div>
        <div class="swipe-2">
          <span>内容</span>
        </div>
        <div class="swipe-3">
          <span>时间</span>
        </div>
        <div class="swipe-4">
          <span>业务名称</span>
        </div>
        <div class="swipe-5">
          <span>类别</span>
        </div>
      </li>
      <div class="swiper-total">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) of records" :key="index">
            <div class="swiper-body">
              <div class="swipe-1">
                <div v-show="item.level ===2 " class="icons first-level" />
                <div v-show="item.level ===1 " class="icons second-level" />
                <div v-show="item.level ===0 " class="icons thrid-level" />
              </div>
              <div class="swipe-2">
                <div style="position: relative;z-index: 1;">
                  <span
                    :style="filterA(item.content.length)"
                    style="width: 15rem; white-space: nowrap;position: relative;"
                  >
                    <span style="position: absolute;left: 0;    z-index: 0;">{{ item.content }}</span>
                  </span>
                </div>
              </div>
              <div class="swipe-3">
                <span>{{ item.time|changeTime }}</span>
              </div>
              <div class="swipe-4">
                <span>{{ item.businessName }}</span>
              </div>
              <div class="swipe-5">
                <span>{{ item.type }}</span>
              </div>
            </div>
          </swiper-slide>
          <div slot="pagination" class="swiper-pagination" style=" display: none;" />
        </swiper>
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  filters: {
    changeTime(item) {
      return item.substring(10, item.length);
    }
  },
  props: {
    totalOverviewInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      swiperOption: {
        //pagination: { el: ".swiper-pagination" },
        //autoplay: 3000,
        speed: 500,
        disableOnInteraction: false,
        direction: "vertical", //设置滚动方向为垂直
        slidesPerView: 8, //设置显示个数为8
        loop: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      },
      records: []
    };
  },
  watch: {
    totalOverviewInfo: function(val) {
      this.records = val.records;
    }
  },
  mounted() {},
  methods: {
    filterA(l) {
      let style = {
        animation: "leave 20s infinite linear"
      };
      if (l === 19) {
        return style;
      } else if (l > 19 && l < 25) {
        style.animationDelay = "10s";
        return style;
      } else if (l > 19) {
        style.animationDelay = "5s";
        return style;
      }
      return "";
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
@keyframes leave {
  0% {
    left: 0;
  }
  20% {
    left: 0;
  }
  100% {
    left: -80%;
  }
}
.swiper-total {
  height: 8.86rem;
  // width: 1386px;
}
.swiper-total .swiper-container {
  height: 100%;
}
.swiper-total .swiper-slide {
  height: 2rem;
  border-radius: 6px;
  // background: rgba(255, 255, 255, 0.02);
  background: #2f343f;
  div {
    background: #2f343f;
    border-radius: 6px;
  }
}
.swiper-total .swiper-slide:nth-child(even) {
  background: #353a42;
  div {
    background: #353a42;
    border-radius: 6px;
  }
}
.swiper-total {
  .swiper-slide {
    .swipe-1 {
      width: 1.04rem;
      padding: 0px 0 0 0.2rem;
      z-index: 500;
      // position: relative;
      span {
        display: inline-block;
        font-size: 0.41rem;
        color: #286eea;
        width: 0.9rem;
        text-align: center;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      }
      .icons {
        display: inline-block;
        height: 0.73rem;
        width: 0.75rem;
        background-size: 100% 100%;
        background-position: center center;
        padding: 0 0 0 0;
      }
      .first-level {
        background: url("../../assets/images/warn/first-level.png") repeat;
        background-size: 100% 100%;
        background-position: center center;
      }
      .second-level {
        background: url("../../assets/images/warn/second-level.png") repeat;
        background-size: 100% 100%;
        background-position: center center;
      }
      .thrid-level {
        background: url("../../assets/images/warn/third-level.png") repeat;
        background-size: 100% 100%;
        background-position: center center;
      }
    }
    .swipe-2 {
      animation-delay: 0.3s;
      width: 5.5rem;
      z-index: 18;
      position: relative;
      height: 0.5rem;
      margin-bottom: 0.3rem;
      perspective: 10rem;
      transform-style: preserve-3d;
      backface-visibility: hidden;
      animation-fill-mode: forwards;
      span {
        letter-spacing: 0.5px;
      }
      div {
        width: 10rem;
      }
    }
    .swipe-3 {
      width: 1.2rem;
      z-index: 18555;
      position: relative;
      padding-left: 0.5rem;
      span {
        font-family: "SuiNumberMedium";
      }
    }
    .swipe-4 {
      z-index: 1854554;
      width: 3rem;
      position: relative;
      span {
        overflow: hidden; /*超出部分隐藏*/
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis; /*超出部分文字以...显示*/
        white-space: nowrap; /*不换行*/
        line-height: 25px;
      }
    }
    .swipe-5 {
      z-index: 18126566;
      position: relative;
      width: 1.22rem;
    }
    div:last-child {
      padding: 0;
    }
    div:first-child {
      // padding: 0;
    }
    div {
      text-align: left;
      height: 100%;
      float: left;
      display: flex;
      align-items: center;
      align-content: center;
      padding: 0 0.4rem 0 0;
      display: flex;
      align-items: center;
      span {
        font-family: PingFangHK-Regular;
        font-size: 0.3rem;
        color: #aeb8c8;
        letter-spacing: 0px;
        text-align: center;
      }
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.overview {
  margin-right: 0.41rem;
  width: 15.28rem;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.3);
  .box-title {
    padding: 0.29rem 0.7rem 0 0.72rem;
    font-family: PingFangHK-Medium;
    font-size: 0.42rem;
    color: #9b9b9b;
    letter-spacing: 0;
    text-align: left;
    .grade {
      float: right;
      .first-remark {
        background-color: #ae142d;
      }
      .second-remark {
        background-color: #b7a32e;
        margin-left: 0.29rem;
      }
      .third-remark {
        background-color: #2faf9e;

        margin-left: 0.29rem;
      }
      div {
        width: 0.22rem;
        height: 0.22rem;
        border-radius: 50%;
        display: inline-block;
      }
      span {
        font-family: PingFangHK-Regular;
        font-size: 0.24rem;
        color: #7e8898;
        letter-spacing: -0.4px;
        text-align: center;
      }
    }
  }
  ul {
    padding: 0.3rem 0.72rem 0.31rem 0.7rem;
    margin-block-start: 0;
    .head {
      height: 0.84rem;
      background: rgba(255, 255, 255, 0.08);
      border: 0 solid #ffffff;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      margin: 0 0 0.07rem 0;
      list-style: none;
      span {
        font-family: PingFangHK-Semibold;
        font-size: 0.3rem;
        color: #e0e0e0;
        letter-spacing: 0;
      }
      .swipe-1 {
        width: 1.04rem;
        margin: 0px 0 0 0.2rem;
      }
      .swipe-2 {
        width: 6rem;
      }
      .swipe-3 {
        width: 1.2rem;
      }
      .swipe-4 {
        width: 3rem;
      }
      .swipe-5 {
      }
      div {
        text-align: left;
        float: left;
        height: 100%;
        display: flex;
        align-items: center;
        align-content: center;
        margin: 0 0.4rem 0 0;
      }
    }

    span {
      // color: #d8d8d8;
    }
  }
}
</style>
