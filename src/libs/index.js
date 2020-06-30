const utils = {
    /**
     * 深拷贝
     * @param {Object} obj 
     */
	deep_clone (obj) {
		let isClass = o => {
			if (o === null) return 'Null'
			if (o === undefined) return 'Undefined'
			return Object.prototype.toString.call(o).slice(8, -1)
		}
		let result
		let oClass = isClass(obj)
		if (oClass === 'Object') {
			result = {}
		} else if (oClass === 'Array') {
			result = []
		} else {
			return obj
		}
		for (let key in obj) {
			var copy = obj[key]
			if (isClass(copy) === 'Object') {
				result[key] = utils.deep_clone(copy)
			} else if (isClass(copy) === 'Array') {
				result[key] = utils.deep_clone(copy)
			} else {
				result[key] = obj[key]
			}
		}
		return result
    },
    /**
     * 计算自适应字体大小 应用在echart图片里面
     * @param {number} size
     */
    calculateFont (size) {
        const whdef = size / 3840
        const wW = window.innerWidth // 当前窗口的宽度
        return wW * whdef // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
    },
    isWindow (obj) {
        return obj !== null && obj !== undefined && obj === obj.window
    },
    /**
     * 移出监听事件
     */
    removeEvent (elem, type, fn, capture) {
        if (elem && (elem.nodeType === 1 || elem.nodeType === 9 || utils.isWindow(elem))) {
            if (elem.removeEventListener) {
            elem.removeEventListener(type, fn, !!capture)
            } else if (elem.detach) {
            elem.detach(type, fn)
            }
        }
    },
    /**
     * 绑定监听事件
     */
    addEvent (elem, type, fn, capture) {
        if (elem && (elem.nodeType === 1 || elem.nodeType === 9 || utils.isWindow(elem))) {
            if (elem.addEventListener) {
            elem.addEventListener(type, fn, !!capture)
            } else if (elem.attach) {
            elem.attach(type, fn)
            }
        }
    },
	getCookie (name) {
		var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
		var arr = document.cookie.match(reg)
		if (arr) {
			return unescape(arr[2])
		} else {
			return null
		}
	},
	setCookie (name, value, domain) {
		var Days = 365
		var exp = new Date()
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
		domain = domain || ''
		document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/;' + domain
	},
	delCookie: function (name) {
		var exp = new Date()
        exp.setTime(exp.getTime() - 1)
        var cval = utils.getCookie(name)
        if (cval != null) {
        document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/'
        }
    },
    /**
     * 转换千分位
     */
    transNumber (str, fix) {
        if (!str && str !== 0) return ''
        str = fix ? (+str).toFixed(fix) : String(str)
      
        let arr = str.split('.')
        arr[0] = arr[0].replace(/\B(?=(\d{3})+$)/g, ',')
        return arr.join('.')
    }
}

export default utils
