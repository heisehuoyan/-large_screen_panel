<template>
  <div class="app-container">
    <el-form ref="form" label-width="120px">
      <title-head :title="title"/>
      <div class="container">
        <div class="main">
          <memory-usage :memory-usage-list="MemoryUsageList"/>
          <hard-ware-status :hardware-status-list="hardwareStatusList"/>
          <device-information :device-info-list="deviceInfoList"/>

        </div>
        <div class="sub">
          <database-status :flag="flag" @switchFlag="switchFlag" :database-host-id-list="databaseHostIdList" :net-device-host-id-list="netDeviceHostIdList"/>
          <total-overview :flag="flag" @switchFlag="switchFlag" :total-host-id-list="totalHostIdList"/>
          <hardware-warn :hardware-warn-list="hardwareWarnList"/>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import memoryUsage from 'components/hardware/memoryUsage.vue'
import hardWareStatus from 'components/hardware/hardWareStatus.vue'
import deviceInformation from 'components/hardware/deviceInformation.vue'
import databaseStatus from 'components/hardware/databaseStatus.vue'
import totalOverview from 'components/hardware/hostPerformance.vue'
import hardwareWarn from 'components/hardware/hardwareWarn.vue'
import common from '@/utils/common'
import TitleHead from '@/views/head.vue'
export default {
    name: 'Professional',
    components: {
        memoryUsage,
        hardWareStatus,
        deviceInformation,
        databaseStatus,
        totalOverview,
        hardwareWarn,
        TitleHead
    },
    data() {
        return {
            refresh: true,
            maxId: '',
            MemoryUsageList: [],
            hardwareStatusList: [],
            deviceInfoList: [],
            databaseHostIdList: {},
            netDeviceHostIdList: {},
            totalHostIdList: {},
            hardwareWarnList: {},
            time: null,
            title: '运营系统硬件信息',
            flag: 0,
        }
    },
    beforeMount() {
        this.nowTimes()
    },
    mounted() {
        this.getHardWareValue()
        var _this = this
        setInterval(function() {
            _this.getHardWareValue()
        }, 600000)
    },

    methods: {
         switchFlag: function(switchFlag) {
            // switchFlag就是子组件传过来的值
            this.flag = switchFlag
        },
        nowTimes() {
            this.time = common.getReportNumber(new Date())
            // setTimeout(this.nowTimes(), 30 * 1000);
        },
        getHardWareValue() {
            this.$get('hardWare/memoryUsage', {

                refreshPeriod: 600000
            }).then(
                this.getMemoryUsageSucc
            )

            this.$get('hardWare/hardwareStatus', {}).then(
                this.getHardwareStatusInfoSucc
            )

            this.$get('hardWare/deviceInfo', {
            }).then(this.getDeviceInfoSucc)

            this.$get('hardWare/getHostId', {
                refreshPeriod: 600000,
                dataType: 1
            }
            ).then(this.getDatabaseHostIdSucc)

            this.$get('hardWare/getHostId', {
                refreshPeriod: 600000,
                dataType: 2
            }
            ).then(this.getNetDeviceHostIdSucc)

            this.$get('hardWare/getHostId', {
                refreshPeriod: 600000,
                dataType: 3
            }
            ).then(this.getTotalHostIdSucc)

            this.$get('hardWare/hardwareWarn', {
                append: true,
                maxId: ''
            }
            ).then(this.getHardwareWarnSucc)
        },
        getMemoryUsageSucc(res) {
            if (res.data.succ) {
                const value = res.data.charts
                this.MemoryUsageList = value
            }
        },
        getHardwareStatusInfoSucc(res) {
            if (res.data.succ) {
                const value = res.data.data
                this.hardwareStatusList = value
            }
        },
        getDeviceInfoSucc(res) {
            if (res.data.succ) {
                const value = res.data.data
                this.deviceInfoList = value
            }
        },
        getDatabaseHostIdSucc(res) {
            if (res.data.succ) {
                const value = res.data.data
                this.databaseHostIdList = value
            }
        },

        getNetDeviceHostIdSucc(res) {
            if (res.data.succ) {
                const value = res.data.data
                this.netDeviceHostIdList = value
            }
        },
        getTotalHostIdSucc(res) {
            if (res.data.succ) {
                const value = res.data.data
                this.totalHostIdList = value
            }
        },
        getHardwareWarnSucc(res) {
            if (res.data.succ) {
                const value = res.data.data
                this.hardwareWarnList = value
            }
        }
    }
}
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
    //background: #1c212c;
    div {
        // width: 30%;
      //    background: rgba(255, 255, 255, 0.07);
        //border-radius: 0.12rem;
        vertical-align: top;
        position: relative;
    }
}
</style>

