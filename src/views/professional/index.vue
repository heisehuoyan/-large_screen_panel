<template>
    <div class="app-container">
        <el-form ref="form" label-width="120px">
            <title-head :title="title" />
            <div class="container">
                  <div class="sub">
                    <Failure :failure-list="importErrorRateList" :flag="flag" :timerF="timerF" @switchFlag="switchFlag" />
                    <cooperation :cooperation-list="cooperationList" />
                </div>
                <div class="main">
                    <div class="main-inner">
                        <head-summary :import-succ-times="importSuccTimes" />
                        <Summary :importSuccRate="importSuccRate" />
                    </div>
                </div>
              
                <div class="extra">
                    <success-rate :list="importSuccRate2List" :flag="flag" @timerFlag="timerFlag" />
                    <import-data :import-data-list="importDataList" :flag="flag" @switchFlag="switchFlag" />
                    <conversion-rate :convert-rate-list="convertRateList" :flag="flag" @switchFlag="switchFlag" />
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
import Failure from "components/professional/failure.vue";
import HeadSummary from "components/professional/headSummary.vue";
import SuccessRate from "components/professional/successRate.vue";
import Cooperation from "components/professional/cooperation.vue";
import Summary from "components/professional/summary.vue";
import ImportData from "components/professional/importData.vue";
import ConversionRate from "components/professional/conversionRate.vue";
import TitleHead from "@/views/head.vue";
export default {
    name: "Professional",
    components: {
        Failure,
        HeadSummary,
        SuccessRate,
        Cooperation,
        ImportData,
        ConversionRate,
        Summary,
        TitleHead
    },
    data() {
        return {
            importErrorRateList: [],
            cooperationList: [],
            importSuccTimes: {},
            importSuccRate: {},
            importSuccRate2List: [],
            importDataList: [],
            convertRateList: [],
            flag: 0,
            timerF:0,
            title: "运营系统业务数据"
        };
    },
    mounted() {
        this.getProfessionValue(); // 在页面渲染之后发送请求
        this.getImportSuccTimes();
        var _this = this;
        setInterval(function() {
            _this.getProfessionValue();
        }, 300000);
        setInterval(function() {
            _this.getImportSuccTimes();
        }, 5000000);
    },
    methods: {
        getProfessionValue() {
            this.$get("professional/importErrorRate").then(
                this.handleGetimportErrorInfoSucc
            );
            this.$get("professional/cooperation").then(
                this.handleGetCooperationInfoSucc
            );
            this.$get("professional/importSuccRate").then(
                this.handleGetImportSuccRateInfo
            );
            this.$get("professional/importSuccRate2").then(
                this.handleGetImportSuccRate2Info
            );
            this.$get("professional/importData").then(
                this.handleGetImportDataInfo
            );
            this.$get("professional/convertRate").then(
                this.handleGetConvertRateInfo
            );
        },
        getImportSuccTimes() {
            this.$get("professional/importSuccTimes").then(
                this.handleGetImportSuccTimesInfo
            );
        },
        handleGetimportErrorInfoSucc(res) {
            if (res.data.succ) {
                const list = res.data.charts;
                this.importErrorRateList = list;
            }
        },
        handleGetCooperationInfoSucc(res) {
            if (res.data.succ) {
                const list = res.data.charts;
                this.cooperationList = list;
            }
        },
        handleGetImportSuccTimesInfo(res) {
            if (res.data.succ) {
                const list = res.data.charts;
                this.importSuccTimes = list;
            }
        },
        handleGetImportSuccRateInfo(res) {
            if (res.data.succ) {
                const list = res.data.charts;
                this.importSuccRate = list;
            }
        },
        handleGetImportSuccRate2Info(res) {
            if (res.data.succ) {
                const list = res.data.charts;
                this.importSuccRate2List = list;
            }
        },
        handleGetImportDataInfo(res) {
            if (res.data.succ) {
                const list = res.data.charts;
                this.importDataList = list;
            }
        },
        handleGetConvertRateInfo(res) {
            if (res.data.succ) {
                const list = res.data.charts;
                this.convertRateList = list;
            }
        },
        switchFlag: function(switchFlag) {
            // switchFlag就是子组件传过来的值
            this.flag = switchFlag;
        },
         timerFlag: function(timerFlag) {
            // switchFlag就是子组件传过来的值
            this.timerF= timerFlag;
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
    background: #1c212c;
    height: 100%;
    width: 38.4rem;
    padding: 0;
    margin: 0 auto;
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
// .app-container {
//     background: #1c212c;
//     //background-image: radial-gradient(50% 266%, #404c5a 100%, #191e24 60%);
//     height: 100%;
//     width: 100%;
//     padding: 0;
// }
// .header {
//     // background: url("../../assets/head.png") 0 0 repeat;
//     //background-size: 100% 100%; //会适应浏览器大小
//     height: 1.59rem;
//     color: #fff;
//     width: 34.4rem;
//     font-family: PingFangHK-Regular;
//     font-size: 0.77rem;
//     letter-spacing: 0;
//     text-align: center;
//     line-height: 1.4rem;
//     margin: 0 2rem;
//     text-shadow: 0 2px 14px #000000;
// }
// .sub,
// .main,
// .extra {
//     float: left;
//     min-height: 1.3rem;
//     text-align: center;
// }
// .sub {
//     margin-left: -100%;
//     width: 9.36rem;
// }
// .extra {
//     margin-left: -8.93rem;
//     width: 8.93rem;
// }
// .main {
//     width: 100%;
//     .main-inner {
//         margin-left: 9.36rem;
//         margin-right: 8.93rem;
//         // padding: 0 7.91rem 0 8.36rem;
//         word-break: break-all;
//     }
// }
.sub,
.main,
.extra {
   // min-height: 1.3rem;
    height: 100%;
        float: left;
        vertical-align: top;
}
.sub {
   // margin-left: -100%;
    width: 9.05rem;
    margin: 0.84rem 0 1.01rem 1.03rem;
}
.extra {
   // margin-left: -8.93rem;
    width: 9.05rem;
    margin: 0.84rem 1.01rem 1.01rem 0;
}
.main {
     margin: 0.84rem 0.27rem 1.01rem 0.27rem;
     width: 17.72rem;
}
</style>

