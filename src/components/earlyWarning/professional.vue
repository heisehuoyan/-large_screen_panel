<template>
  <div class="box">
    <p class="box-title">业务预警趋势</p>
    <swiper ref="mySwiper" :options="pro_swiperOptions">
      <swiper-slide v-for="(page,index) of pages" :key="index">
        <ul>
          <li v-for="(item,index) in page" :key="index">
            <div>
              <span>{{ item.count }}</span>
            </div>
            <p>{{ item.departName }}</p>
          </li>
        </ul>
      </swiper-slide>
      <div v-show="pages.length>1" slot="pagination" class="swiper-pagination" />
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    ProfessionWarnList: {
      type: Array,
      default: val => []
    }
  },
  data() {
    return {
      pro_swiperOptions: {
        pagination: { el: ".swiper-pagination" },
        loop: true,
        autoplay: false // 轮播图不会自动轮播
      }
    };
  },
  computed: {
    pages() {
      const pages = [];
      this.ProfessionWarnList.forEach((item, index) => {
        const page = Math.floor(index / 6); // 循环的每个数据展示在第几页，math.floor:向下取整
        if (!pages[page]) {
          // 如果该页码的项不存在，
          pages[page] = [];
        }
        pages[page].push(item);
      });
      return pages;
    }
  }
};
</script>
<style >
.swiper-container {
  height: 80%;
}
.swiper-pagination {
}
.swiper-pagination > .swiper-pagination-bullet {
  /* background: #fff !important; */
  bottom: 0.4rem !important;
  width: 0.13rem;
  height: 0.13rem;
  opacity: 0.7;
  border: 1px solid #7e8898;
  margin: 0rem 0.13rem 0rem 0rem !important;
}
.swiper-pagination-bullet-active {
  width: 0.13rem;
  height: 0.13rem;
  background-image: linear-gradient(
    -38deg,
    #21adf0 11%,
    #2feccf 94%
  ) !important;
  box-shadow: 0 0 0.1rem 0 rgba(33, 173, 240, 0.8);
  border: none !important;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.box {
  width: 6.88rem;
  margin-left: 0.54rem;
  .box-title {
    font-family: PingFangHK-Medium;
    font-size: 0.42rem;
    color: #9b9b9b;
    letter-spacing: 0;
    text-align: left;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin: 1.22rem 0 0.48rem 0;
  }
  ul {
    height: 70%;
    padding-inline-start: 0rem;
    margin-block-start: 0em;
    margin-block-end: 0em;
    li {
      list-style: none;
      display: inline-block;
      text-align: center;
      margin-right: 1rem;
      // margin-bottom: 0.49rem;
      padding-inline-start: 0rem;
      margin-block-start: 0em;
      // margin-block-end: 0.49rem;
      p {
        margin-block-start: 0em;
        margin-block-end: 0em;
        font-family: PingFangHK-Regular;
        font-size: 0.28rem;
        color: #7e8898;
        letter-spacing: -0.0056rem;
        text-align: center;
        -webkit-font-smoothing: antialiased;
        margin-bottom: 0.4rem !important;
        display: block; /*内联对象需加*/

        width: 1.24rem;

        word-break: keep-all; /* 不换行 */

        white-space: nowrap; /* 不换行 */

        overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */

        text-overflow: ellipsis;
      }
      div {
        height: 1.44rem;
        width: 1.29rem;
        background: url("../../assets/images/warn/stroke.png") repeat;
        // background-size: 100%;
        //background-size: cover;
        //opacity: 0.5;
        background-size: 100% 100%; //会适应浏览器大小
        text-align: center;
        margin-bottom: 0.13rem;

        display: flex;
        justify-content: center;
        align-items: Center;
        span {
          font-family: "SuiNumberMedium";
          font-size: 0.6rem;
          color: #e0e0e0;
          letter-spacing: 0;
          text-align: center;
        }
      }
    }
  }
}
</style>

