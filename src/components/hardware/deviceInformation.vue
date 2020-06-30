<template>
  <div class="box">
    <p class="box-title">设备信息</p>
    <ul>
      <li v-for="(item,index) in deviceInfoList" :key="index">
        <div class="box-count">
          <span>{{ item.count }}</span>
        </div>
        <div class="box-image">
          <img v-show="item.type==1" class="box-main-image" src="../../assets/images/hardWare/database.png" alt="">
          <img v-show="item.type==2" class="box-main-image" src="../../assets/images/hardWare/host.png" alt="">
          <img v-show="item.type==3" class="box-main-image" src="../../assets/images/hardWare/earth.png" alt="">
        </div>
        <div class="box-device">
          {{ item.type|changeType }}
        </div>
      </li>
    </ul>
  </div>

</template>

<script>
export default {
    filters: {
        changeType(item) {
            switch (item) {
                case 1:
                    return '数据库'
                    break

                case 2:
                    return '主机'
                    break
            }
        }
    },
    props: {
        deviceInfoList: Array
    },
    data() {
        return {
            list: [
                {
                    type: 1,
                    count: 177
                },
                {
                    type: 2,
                    count: 2971
                },
                {
                    type: 2,
                    count: 2971
                }
            ]
        }
    },
    computed: {},
    watch: {},
    methods: {}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
@keyframes ghostUpdown {
    from {
        margin-top: 0px;
    }
    to {
        margin-top: 0.1rem;
    }
}
@-webkit-keyframes ghostUpdown {
    from {
        margin-top: 0px;
    }
    to {
        margin-top: 0.1rem;
    }
}
.box {
    width: 10.11rem;
    //margin-left: 0.54rem;
    .box-title {
        font-family: PingFangHK-Medium;
        font-size: 0.42rem;
        color: #9b9b9b;
        letter-spacing: 0;
        text-align: left;
        // margin-top: 1.22rem;
        margin-block-start: 0em;
        margin-block-end: 0em;
        margin: 1.22rem 0 0.67rem 0;
    }
    ul {
        margin-block-start: 0em;
        margin-block-end: 0em;
        padding-inline-start: 0;
        padding-left: 1.43rem;
        text-align: center;
        li:nth-child(2) {
            margin: 0 0.85rem 0 1.2rem;
        }
        li {
            list-style: none;
            width: 2.29rem;
            display: inline-block;
            height: 100%;

            div {
                text-align: center;
            }
            .box-count {
                margin-bottom: 0.45rem;
                span {
                    font-family: 'SuiNumberMedium';
                    font-size: 0.8rem;
                    color: #e0e0e0;
                    letter-spacing: -1.6px;
                }
            }
            .box-image {
                background: url("../../assets/images/hardWare/deviceBack.png") 0 0
                    repeat;
                background-size: 100% 100%; //会适应浏览器大小
                height: 2.01rem;
                .box-main-image {
                    width: 1.41rem;
                    height: 1.38rem;
                    animation: ghostUpdown 1s infinite alternate;
                    -webkit-animation: ghostUpdown 1s infinite alternate;
                }
            }
            .box-device {
                margin-top: 0.12rem;
                font-family: PingFangHK-Regular;
                font-size: 0.3rem;
                color: #7E8898;
                letter-spacing: 0;
            }
        }
    }
}
</style>

