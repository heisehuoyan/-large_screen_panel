var common = {
    getReportNumber(timeStamp) {
        const month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1
        const date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()
        const hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
        const mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
        const ss = new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds()
        var weekStr = '星期'
        var week = new Date().getDay()
        switch (week) {
            case 0:
                weekStr += '日'
                break
            case 1:
                weekStr += '一'
                break
            case 2:
                weekStr += '二'
                break
            case 3:
                weekStr += '三'
                break
            case 4:
                weekStr += '四'
                break
            case 5:
                weekStr += '五'
                break
            case 6:
                weekStr += '六'
                break
        }
        const nowTime = hh + ':' + mm + ':' + ss
        const nowDay = month + '月' + date + '日'
        return {
            nowTime,
            nowDay,
            weekStr
        }
    },
    
            // 计算渐变中心以及渐变半径
             calc(theta1, theta2) {
                var r = 0.5; // 半径是0.5 其实表示0.5个直径
                var inner = 0.6; // 里面镂空部分占60%  option中radius为[33%, 55%]  55 * 0.6 == 33

                var cos = Math.cos;
                var sin = Math.sin;
                var PI = Math.PI;
                var min = Math.min;
                var max = Math.max;

                var bottom = 0;
                var left = 2 * r;
                var right = 0;

                // y0: θ1对应的外部点的y值
                // y1: θ2对应的外部点的y值
                // _y0: θ1对应的内部点的y值
                // _y1: θ2对应的内部点的y值
                // x0: θ1对应的外部点的x值
                // x1: θ2对应的外部点的x值
                // _x0: θ1对应的内部点的x值
                // _x1: θ2对应的内部点的x值
                var y0 = r * (1 - cos(theta1));
                var y1 = r * (1 - cos(theta2));

                var _y0 = r * (1 - inner * cos(theta1));
                var _y1 = r * (1 - inner * cos(theta2));

                // 如果这个弧经过θ == PI的点  则bottom = 2PI
                // bottom用于之后的max计算中
                if (theta1 < PI && theta2 > PI) {
                    bottom = 2 * r;
                }
                // 计算这几个点的最大最小值
                var ymin = min(_y0, _y1, y0, y1);
                var ymax = max(_y0, _y1, y0, y1, bottom);

                var x0 = r * (1 + sin(theta1));
                var x1 = r * (1 + sin(theta2));

                var _x0 = r * (1 + inner * sin(theta1));
                var _x1 = r * (1 + inner * sin(theta2));

                // 如果这个弧经过θ == PI / 2的点  则right = 2PI
                if (theta1 < PI / 2 && theta2 > PI / 2) {
                    right = 2 * r;
                }
                // 如果这个弧经过θ == PI / 2 * 3的点  则left = 0
                if (theta1 < PI / 2 * 3 && theta2 > PI / 2 * 3) {
                    left = 0;
                }
                var xmin = min(_x0, _x1, x0, x1, left);
                var xmax = max(_x0, _x1, x1, x0, right);

                return {
                    // 计算圆心以及半径
                    center: [
                        (r - xmin) / (xmax - xmin),
                        (r - ymin) / (ymax - ymin)
                    ],
                    radius: r / min(xmax - xmin, ymax - ymin)
                };
            }
}
export default common
export function dom(index, tcp, bandwidth, line) {
    return (
        '<div class="swiper-slide">' +
    '<div class="content-body" style="margin: 0 0.54rem;">' +

    '<div class="conten-pie" style=" width: 4.02rem;height: 4.66rem; vertical-align: top;    float: left;">' +
    '<div id="pie' + index + '"style="width: 100%; height: 100%"></div>' +
    '</div>' +
    '<div class="conten-line" style="width: 6.7rem;height: 4.66rem; vertical-align: top;    float: left;">' +
    '<div style="height: 2.44rem;width:100%;">' +
    '<div id="line' + index + '" style="width: 100%; height: 100%"></div>' +
    '</div>' +
    '<ul class="conten-line-footer" style="padding: 0.63rem 0 0 0; margin-block-start: 0em;margin-block-end: 0em;padding-inline-start: 0;">' +
    '<li style=" float: left;list-style: none;height: 0.65rem;margin-right: 0.63rem;">' +
    '<div style=" height: 0.97rem;display: flex;justify-content: center;align-items: center;">'+
    '<div class="img" style="height: 0.97rem;float: left;;margin-right: 0.21rem;">' +
    ' <img src="' + tcp + '"  alt="" style="width: 0.94rem;height: 0.94rem;">' +
    '</div>' +
    '<div class="num" style="float: left;">' +
    '<p id="tcp' + index + '" style="font-family:SuiNumberMedium;font-size: 0.5rem;color: #ffffff; margin-block-start: 0em;margin-block-end: 0em;font-family: PingFangHK-Regular;letter-spacing: -0.74px;"></p>' +
    '<p style="font-size: 0.28rem;color: #7e8898; margin-block-start: 0em;margin-block-end: 0em;font-family: PingFangHK-Regular;letter-spacing: -0.74px;">TCP连接数</p>' +
    '</div>' +
'</div>'+
    '</li>' +
    '<li style=" float: left;list-style: none;height: 0.65rem;"> ' +
    '<div  style=" height: 100%;margin: 0 0rem;">' +
    '<img  src="' + line + '" alt="" style="height: 0.94rem;width: 0.02rem">' +
    '</div>' +
    '</li>' +
    '<li style=" float: left;list-style: none;height: 0.65rem;margin-left: 0.63rem;">' +
    '<div style=" height: 0.97rem;display: flex;justify-content: center;align-items: center;">'+
    '<div class="img" style="height: 0.97rem;float: left; margin-right: 0.21rem;">' +
    '<img  src="' + bandwidth + '" alt="" style="width: 0.94rem;height: 0.94rem;">' +
    '</div>' +
    '<div class="num" style="float: left;">' +
    '<p id="bandwidth' + index + '" style="font-family:SuiNumberMedium;font-size: 0.5rem;color: #ffffff; margin-block-start: 0em;margin-block-end: 0em;font-family: PingFangHK-Regular;letter-spacing: -0.74px;"></p>' +
    '<p style="font-size: 0.26rem;color: #7e8898; margin-block-start: 0em;margin-block-end: 0em;font-family: PingFangHK-Regular;letter-spacing: -0.74px;">网络带宽(M)</p>' +
    '</div>' +
    '</div>'+
    '</li>' +
    '</ul>' +
    '</div>' +
    '</div>' +
    '</div>'
    )
}

export function dom_2(index) {
    return (
        '<div class="swiper-slide">' +
    '<div  style="margin: 0 0.54rem;height: 8.58rem;"">' +
    '<div id="totalId" style=" width:35%;height: 8.58rem;    display: inline-block;">' +
    '<div id="totalpie' + index + '"style="width: 100%; height: 100%"></div>' +
    '</div>' +
    '<div id="totalLineId" style=" width:60%;height: 8.58rem;display: inline-block;margin-left:0.5rem">' +
    '<div id="totalLine' + index + '"style="width: 95%; height: 100%"></div>' +
    '</div>' +
    '</div>'
    )
}

export function databaseStatusDom(slide, index,link,sql,qps,tps) {
    return (
        '<div class="swiper-slide">' +
        '<ul class="conten-body">'+
        '<li>'+
            '<div >'+
                '<div class="img" >'+
                    '<img src="'+link+'" alt="" >'+
                '</div>'+
                '<div class="num">'+
                  '<p id="connsCount' + index + '" ></p>'+
                    '<p >连接数</p>'+
               ' </div>'+
           ' </div>'+

        '</li>'+
       ' <li >'+
          '  <div >'+
               ' <div class="img">'+
                   ' <img src="'+sql+'" alt="">'+
              '  </div>'+
               ' <div class="num" >'+
                  '  <p id="sql' + index + '"></p>'+
                  '  <p>慢速SQL</p>'+
               ' </div>'+
           ' </div>'+

       ' </li>'+
       ' <li>'+
           ' <div>'+
              '  <div class="img">'+
                   ' <img src="'+qps+'" alt="">'+
               ' </div>'+
                '<div class="num">'+
                    '<p  id="qps' + index + '"></p>'+
                    '<p>QPS</p>'+
               ' </div>'+
           ' </div>'+

       ' </li>'+
       ' <li>'+
           ' <div>'+
              '  <div class="img">'+
                   ' <img src="'+tps+'" alt="">'+
               ' </div>'+
               ' <div class="num">'+
                    '<p id="TPS' + index + '"></p>'+
                  '  <p>TPS</p>'+
               ' </div>'+
           ' </div>'+

       ' </li>'+
   ' </ul>'+
    '</div>'
    )
}

