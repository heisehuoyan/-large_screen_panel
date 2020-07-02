<template>
  <div class="app-container">
    <el-form ref="form" label-width="120px">
      <title-head :title="title" />
      <div class="container">
        <div class="main">
          <profession-hook :profession-warn-list="ProfessionWarnList" />
          <today-total :real-time-trend-info="realTimeTrendInfo">今日预警总数</today-total>
          <real-time-trend :real-time-trend-info="realTimeTrendInfo" />
          <type-distribution :type-distribution="typeDistribution">预警类型分布</type-distribution>
        </div>
        <div class="sub">
          <emergence :emergency-hook-info="emergencyHookInfo" />
          <total-overview :total-overview-info="totalOverviewInfo">预警总览</total-overview>
          <directive-flux :directive-flux="directiveFlux" />
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import Emergence from "components/earlyWarning/emergency.vue";
import realTimeTrend from "components/earlyWarning/realTimeTrend.vue";
import ProfessionHook from "components/earlyWarning/professional.vue";
import TodayTotal from "components/earlyWarning/todayTotal.vue";
import TotalOverview from "components/earlyWarning/totalOverview.vue";
import DirectiveFlux from "components/earlyWarning/directiveFlux.vue";
import TypeDistribution from "components/earlyWarning/typeDistribution.vue";
import common from "@/utils/common";
import TitleHead from "@/views/head";
export default {
  name: "Professional",
  components: {
    Emergence,
    realTimeTrend,
    ProfessionHook,
    TodayTotal,
    TotalOverview,
    TypeDistribution,
    DirectiveFlux,
    TitleHead
  },
  data() {
    return {
      refresh: true,
      maxId: "",
      realTimeTrendInfo: {},
      emergencyHookInfo: {},
      ProfessionWarnList: [],
      totalOverviewInfo: {},
      directiveFlux: {},
      typeDistribution: [],
      title: "运营系统预警信息"
    };
  },
  mounted() {
    this.getProfessionWarn();
    this.getRealTimeTrend();
    this.getEmergencyHook();
    this.getTotalOverview();
    this.getDirectiveFlux();
    this.getTypeDistribution();
    var _this = this;
    // setInterval(function() {
    //   _this.getProfessionWarn();
    //   _this.getRealTimeTrend();
    //   _this.getEmergencyHook();
    //   _this.getTotalOverview();
    //   _this.getDirectiveFlux();
    //   _this.getTypeDistribution();
    // }, 300000);
  },

  methods: {
    getProfessionWarn() {
      this.$get("earlyWarn/professionWarn", {}).then(
        this.getProfessionWarnSucc
      );
    },
    getRealTimeTrend() {
      this.$get("earlyWarn/realTimeTrend", {}).then(
        this.getRealTimeTrendInfoSucc
      );
    },
    getEmergencyHook() {
      this.$get("earlyWarn/emergencyHook", {
        maxId: "",
        append: true
      }).then(this.getemErgencyHookInfoSucc);
    },

    getTotalOverview() {
      this.$get("earlyWarn/totalOverview", {
        maxId: "",
        append: true
      }).then(this.getTotalOverviewSucc);
    },

    getDirectiveFlux() {
      this.$get("earlyWarn/directiveFlux", {
        maxId: "",
        append: true
      }).then(this.getDirectiveFluxSucc);
    },
    getTypeDistribution() {
      this.$get("earlyWarn/typeDistribution", {}).then(
        this.getTypeDistributionSucc
      );
    },

    getProfessionWarnSucc(res) {
      if (res.data.succ) {
        const value = res.data.data;
        this.ProfessionWarnList = value;
      }
    },
    getemErgencyHookInfoSucc(res) {
      if (res.data.succ) {
        const value = res.data.data;
        this.emergencyHookInfo = value;
      }
    },
    getRealTimeTrendInfoSucc(res) {
      if (res.data.succ) {
        const value = res.data.charts;
        this.realTimeTrendInfo = value;
      }
    },
    getTotalOverviewSucc(res) {
      if (res.data.succ) {
        const value = res.data.data;
        this.totalOverviewInfo = value;
      }
    },
    getDirectiveFluxSucc(res) {
      if (res.data.succ) {
        const value = res.data.data;
        this.directiveFlux = value;
      }
    },
    getTypeDistributionSucc(res) {
      if (res.data.succ) {
        const value = res.data.data;
        this.typeDistribution = value;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  background: #1c212c;
  height: 100%;
  width: 100%;
  padding: 0;
}
.header {
  height: 1.59rem;
  color: #fff;
  font-family: PingFangHK-Regular;
  font-size: 0.77rem;
  letter-spacing: 0;
  text-align: center;
  line-height: 1.4rem;
  margin: 0 2rem;
  //opacity: 0.4;
  .header_image {
    // background: url("../../assets/head.png") 0 0 repeat;
    // background-size: 100%;
    //background-size: cover;
    background-size: 100% 100%; //会适应浏览器大小
    width: 34.4rem;
    height: 1.59rem;
  }
}
.header_time {
  z-index: 999;
  color: #fff;
  font-size: 0.6rem;
  position: absolute;
  text-align: right;
  right: 1rem;
  font-family: Sui-Number-Bold;
  letter-spacing: 4.35px;
  text-align: center;
  line-height: 22px;
  div {
    display: inline-block;
    p {
      font-family: PingFangHK-Regular;
      font-size: 0.2rem;
      color: #ffffff;
      letter-spacing: 0;
      line-height: 0.5rem;
      margin-block-start: 0;
      margin-block-end: 0;
    }
  }
}
.sub,
.main {
  //text-align: center;
  padding: 0 1.05rem 0 1.05rem;
  div {
    height: 100%;
    float: left;
    vertical-align: top;
  }
}

.main {
  background: #1c212c;
  height: 6.49rem;
  margin-bottom: 1.24rem;
  div {
    // width: 24%;
    background: hsl(221, 22%, 14%);
  }
}
.sub {
  height: 11.23rem;
  background: #1c212c;
  div {
    // width: 30%;
    background: rgba(255, 255, 255, 0.07);
    border-radius: 0.12rem;
    vertical-align: top;
    position: relative;
  }
}
</style>

