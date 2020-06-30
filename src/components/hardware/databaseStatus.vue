<template>
    <div class="box">
        <div class="box-database">
            <p class="box-title">
                数据库状态
            </p>
            <ul class="conten-head">
                <li>
                    <div>
                        <span>状态：</span>
                        <span v-if="databaseStatus.status === 1">正常
                        </span>
                        <span v-if="databaseStatus.status != 1">异常
                            <i class="statuIcon" />
                        </span>
                    </div>

                </li>
                <li>
                    <div>
                        <span>IP地址：</span>
                        <span>{{ databaseStatus.ip }}</span>
                    </div>
                </li>
                <li>
                    <div>
                        <span>数据库：</span>
                        <span>{{ databaseStatus.name }}</span>
                    </div>
                </li>
                <li>
                    <div>
                        <span>端口号：</span>
                        <span>{{ databaseStatus.port }}</span>
                    </div>
                </li>
            </ul>
            <swiper ref="databaseSwiper" :options="swiperOption">
                <!-- <div class="swiper-slide"> -->
                     <swiper-slide v-for="(item,index) in arr" :key="index">
               <ul class="conten-body">
                        <li>
                            <div>
                                <div class="img">
                                    <img src="../../assets/images/hardWare/link.png" alt="">
                                </div>
                                <div class="num">
                                    <p>{{databaseStatus.connsCount|NumberFilters}}</p>
                                    <p>连接数</p>
                                </div>
                            </div>

                        </li>
                        <li>
                            <div>
                                <div class="img">
                                    <img src="../../assets/images/hardWare/link.png" alt="">
                                </div>
                                <div class="num">
                                    <p>{{databaseStatus.slowlog|NumberFilters}}</p>
                                    <p>慢速SQL</p>
                                </div>
                            </div>

                        </li>
                        <li>
                            <div>
                                <div class="img">
                                    <img src="../../assets/images/hardWare/QPS.png" alt="">
                                </div>
                                <div class="num">
                                    <p>{{databaseStatus.qps|NumberFilters}}</p>
                                    <p>QPS</p>
                                </div>
                            </div>

                        </li>
                        <li>
                            <div>
                                <div class="img">
                                    <img src="../../assets/images/hardWare/TPS.png" alt="">
                                </div>
                                <div class="num">
                                    <p>{{databaseStatus.TPS|NumberFilters}}</p>
                                    <p>TPS</p>
                                </div>
                            </div>

                        </li>
                    </ul>
            </swiper-slide>
                   
                <!-- </div> -->
                <div slot="pagination" class="swiper-pagination" style="display: none;" />
            </swiper>

        </div>
        <net-device-status :flag="flag" :net-device-id="netDeviceId" />
    </div>
</template>

<script>
import netDeviceStatus from "components/hardware/netDeviceStatus.vue";
import { databaseStatusDom } from "@/utils/common";
export default {
    name: "",
    components: {
        netDeviceStatus
    },
    filters: {
        changeitem(item) {
            if (item < 0) {
                return "-";
            } else {
                return item;
            }
        }
    },
    props: {
        databaseHostIdList: Object,
        netDeviceHostIdList: Object,
        flag: {
            type: Number,
            default: 0
        }
    },
    data() {
        var _this = this;
        return {
            activeIndex:0,
            swiperOption: {
                pagination: ".swiper-pagination",
                speed: 500,
                autoplay: 5000,
                // 使用es6的箭头函数，使this指向vue对象
                onSlideChangeStart: function(swiper) {
                     _this.activeIndex = swiper.activeIndex;
                    _this.$emit("switchFlag", swiper.activeIndex);
                    _this.getDatabaseStatus(_this.activeIndex);
                    if (_this.activeIndex === _this.arr.length - 1) {
                        _this.arr.push(_this.databaseHostIdList.hostids.shift());
                    }
                },
            },
            databaseStatus: {},
            index: 0,
            netDeviceId: {},
            arr:[]
        };
    },
    filters:{
        NumberFilters(item){
       return item >0 ?item:'-'
        }
    },
    computed: {
        swiper() {
            return this.$refs.databaseSwiper.swiper;
        }
    },
    watch: {
        flag: {
            handler(newval, oldval) {
                //const eventPie = 'totalpie' + newval
                //const eventLine = 'totalLine' + newval
               // this.index = newval;
                //this.getDatabaseStatus(this.index);
                //this.swiper.slideTo(newval, 0, false); // 切换到第一个slide，速度为1秒
            }
        },
        netDeviceHostIdList(val) {
            this.netDeviceId = val;
        },
        databaseHostIdList(val) {
             this.arr.push(val.hostids.shift());
            this.arr.push(val.hostids.shift());
            this.getDatabaseStatus(0);
        },
        databaseStatus(val) {
            this.index =this.activeIndex
            // document.getElementById("connsCount" + this.index) &&
            // val.connsCount > 0
            //     ? (document.getElementById(
            //           "connsCount" + this.index
            //       ).innerHTML =
            //           val.connsCount)
            //     : (document.getElementById(
            //           "connsCount" + this.index
            //       ).innerHTML =
            //           "-");
            // document.getElementById("sql" + this.index) && val.slowlog > 0
            //     ? (document.getElementById("sql" + this.index).innerHTML =
            //           val.slowlog)
            //     : (document.getElementById("sql" + this.index).innerHTML = "-");
            // document.getElementById("qps" + this.index) && val.qps > 0
            //     ? (document.getElementById("qps" + this.index).innerHTML =
            //           val.qps)
            //     : (document.getElementById("sql" + this.index).innerHTML = "-");
            // document.getElementById("TPS" + this.index) && val.tps > 0
            //     ? (document.getElementById("TPS" + this.index).innerHTML =
            //           val.tps)
            //     : (document.getElementById("TPS" + this.index).innerHTML = "-");
        }
    },

    methods: {
        getDatabaseStatus(index) {
            this.$get("hardWare/getDatabaseStatus", {
                time: this.databaseHostIdList.time,
                refreshPeriod: 600000,
                hostid: this.databaseHostIdList.hostids[index]
            }).then(this.getDatabaseStatusSucc);
        },
        getDatabaseStatusSucc(res) {
            if (res.data.succ) {
                const value = res.data.data;
                this.databaseStatus = value;
            }
        }
    }
};
</script>
<style>
.conten-body {
    margin: 0 0.53rem 0 0.54rem;
    height: 100%;
    margin-block-start: 0em;
    margin-block-end: 0em;
    padding-inline-start: 0;
}
.conten-body li {
    list-style: none;
    float: left;
}
.conten-body li div {
    height: 0.97rem;
    display: flex;
    /* // justify-content: center; */
    align-items: center;
}
.conten-body li div .img {
    float: left;
    margin-right: 0.21rem;
}
.conten-body li div .img img {
    width: 0.94rem;
    height: 0.94rem;
}
.conten-body li div .num {
    display: inline-block;
    width: 1.2rem;
}
.conten-body li div .num p {
    margin-block-start: 0em;
    margin-block-end: 0em;
    font-family: PingFangHK-Regular;
    letter-spacing: -0.74px;
}
.conten-body li div .num p:nth-child(1) {
    font-size: 0.5rem;
    letter-spacing: -0.74px;
    color: #e0e0e0;
    font-family: "Sui-Number-Regular";
}
.conten-body li div .num p:nth-child(2) {
    font-size: 0.28rem;
    letter-spacing: -0.74px;
    color: #7e8898;
}

.conten-body li:nth-child(1) {
    width: 2.5rem;
}

.conten-body li:nth-child(2) {
    width: 2.97rem;
}
.conten-body li:nth-child(2)::before {
    position: absolute;
    content: "";
    float: left;
    display: block;
    width: 0.02rem;
    height: 0.98rem;
    background: url("../../assets/images/line.png") 0 0 repeat;
    background-size: 100% 100%;
}
.conten-body li:nth-child(2) .img {
    display: inline-block;
    margin-left: 0.4rem;
}
.conten-body li:nth-child(3) {
    width: 2.87rem;
}
.conten-body li:nth-child(3)::before {
    position: absolute;
    content: "";
    float: left;
    display: block;
    width: 0.02rem;
    height: 0.98rem;
    background: url("../../assets/images/line.png") 0 0 repeat;
    background-size: 100% 100%;
}
.conten-body li:nth-child(3) .img {
    display: inline-block;
    margin-left: 0.557rem;
}
.conten-body li:nth-child(4) {
    width: 2.31rem;
}
.conten-body li:nth-child(4)::before {
    position: absolute;
    content: "";
    float: left;
    display: block;
    width: 0.02rem;
    height: 0.98rem;
    background: url("../../assets/images/line.png") 0 0 repeat;
    background-size: 100% 100%;
}
.conten-body li:nth-child(4) .img {
    display: inline-block;
    margin-left: 0.525rem;
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
@mixin line() {
    &::before {
        position: absolute;
        content: "";
        float: left;
        display: block;
        width: 0.02rem;
        height: 0.98rem;
        background: url("../../assets/images/line.png") 0 0 repeat;
        background-size: 100% 100%;
    }
}
.box {
    margin-right: 0.41rem;
    width: 11.81rem;
    div {
        .box-title {
            padding: 0.29rem 0 0 0.54rem;
            font-family: PingFangHK-Medium;
            font-size: 0.42rem;
            color: #9b9b9b;
            letter-spacing: 0;
            text-align: left;
            margin-block-start: 0em;
            margin-block-end: 0em;
        }
    }
    .box-database {
        height: 3.96rem;
        margin-bottom: 0.4rem;
        background: rgba(255, 255, 255, 0.07);
        border-radius: 0.12rem;
        box-shadow: 0 0.02rem 0.2rem 0 rgba(0, 0, 0, 0.2);
        ul {
            margin-block-start: 0em;
            margin-block-end: 0em;
            padding-inline-start: 0;
            li {
                display: inline-block;
                list-style: none;
                height: 0.65rem;
                vertical-align: text-top;
            }
        }
        .conten-head {
            height: 0.65rem;
            background: rgba(255, 255, 255, 0.08);
            border: 0 solid #ffffff;
            border-radius: 6px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            margin: 0.22rem 0.53rem 0.73rem 0.54rem;
            li:nth-child(1) {
                width: 2rem;
                padding-left: 0.2rem;
                div {
                    span {
                        .statuIcon {
                            background: url("../../assets/images/hardWare/schedule.png")
                                repeat;
                            background-size: 100% 100%;
                            background-position: center center;
                            display: inline-block;
                            height: 0.24rem;
                            width: 0.24rem;
                        }
                    }
                }
            }
            li:nth-child(2) {
                width: 3.2rem;
            }
            li:nth-child(3) {
                width: 2.2rem;
            }
            li:nth-child(4) {
                width: 2.2rem;
            }
            li {
                div {
                    display: inline-block;
                    height: 100%;
                    margin-left: 0.12rem;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    span:nth-child(2) {
                        color: #e0e0e0;
                        display: block;
                        width: 0.9rem;
                    }
                    span {
                        font-family: "PingFangHK-Regular";
                        font-size: 0.28rem;
                        color: #7e8898;
                        letter-spacing: 0;
                    }
                }
            }
        }
    }
}
</style>

