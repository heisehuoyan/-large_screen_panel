<template>
    <div class="header">
        <div class="header_time">
            <div class="nowTime">
                <p>{{ time.nowTime }}</p>
            </div>

            <div>
                <p class="nowday">{{ time.nowDay }}</p>
                <p class="nowday">{{ time.weekStr }}</p>
            </div>

        </div>
        <div class="header_image">
            <span>{{ title }}</span>
        </div>

    </div>
</template>
<script>
import common from "@/utils/common";
export default {
    props: {
        title: String
    },
    data() {
        return {
            time: null,
            timer: null
        };
    },
    beforeMount() {
        this.nowTimes();
    },
    mounted() {
        var _this = this;
        this.timer = setInterval(() => {
            _this.nowTimes(); // 修改数据date
        }, 1000);
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
        }
    },
    methods: {
        nowTimes() {
            this.time = common.getReportNumber(new Date());
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.header {
    height: 1.59rem;
    color: #e0e0e0;
    font-family: PingFangHK-Regular, sans-serif;
    font-size: 0.77rem;
    letter-spacing: 0;
    text-align: center;
    line-height: 1.4rem;
    margin: 0 2rem;
    .header_image {
        background: url("../assets/images/head.png") 0 0 repeat;
        background-size: 100% 100%; //会适应浏览器大小
        width: 34.4rem;
        height: 1.59rem;
        span{
            letter-spacing: 3px;
        }
    }
    .header_time {
        z-index: 999;
        position: absolute;
        text-align: right;
        right: 1rem;
        text-align: center;
        line-height: 22px;
        padding-top: 0.66rem;
        .nowTime {
            p {
                color: #fff;
                font-size: 0.7rem;
                font-family: "SuiNumberBold";
                letter-spacing: 4.35px;
            }
        }
        div {
            display: inline-block;
            text-align: left;

            .nowday {
                font-family: PingFangHK-Regular, sans-serif;
                font-size: 0.2rem;
                color: #ffffff;
                letter-spacing: 0;
                line-height: 0.3rem;
                margin-block-start: 0;
                margin-block-end: 0;
            }
            p {
                font-family: PingFangHK-Regular, sans-serif;
                font-size: 0.2rem;
                color: #ffffff;
                letter-spacing: 0;
                line-height: 0.5rem;
                margin-block-start: 0;
                margin-block-end: 0;
            }
        }
    }
}
</style>

