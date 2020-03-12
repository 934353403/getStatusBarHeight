import Vue from 'vue'


// 时间戳转日期(1569736900 => 2019-09-29)
Vue.filter('timeFilter', function(str, type) {
    if (!str) {
        return '- -'
    }
    str = String(str).length <= 10 ? str * 1000 : str;
    let formatTime = (a) => parseInt(a) < 10 ? '0' + parseInt(a) : parseInt(a);
    let t = new Date(str);
    let year = t.getFullYear();
    let month = formatTime(t.getMonth() + 1);
    let day = formatTime(t.getDate());
    let hours = formatTime(t.getHours());
    let minutes = formatTime(t.getMinutes());
    let seconds = formatTime(t.getSeconds());
    if (type == "ymd") {
        return `${year}-${month}-${day}`;
    } else if (type == 'hms') {
        return `${hours}:${minutes}:${seconds}`;
    } else if (type == 'ms') {
        return `${minutes}:${seconds}`;
    } else if (type == 'ymdhm') {
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    } else if (type == "article") {
        //6月13号 13:00
        return `${month}月${day}号 ${hours}:${minutes}`

    } else if (type == "order") {
        //6月13号 13:00
        return `${year}年${month}月${day}号`

    } else {
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
})


// 截取字符串,部分显示 默认截取前100个字符;
Vue.filter('subStr', function(str, num = 100) {
    return str.length > num ? (str.substr(0, num) + "...") : str.substr(0, num)
})


/*日期转换*/
Vue.filter('dateFilter', function(str) {
    return str.slice(0, 4) + '-' + str.slice(4, 6) + '-' + str.slice(6);
});


// 手机号隐藏('13912345678' => '139****5678'),此处str必须为字符串
Vue.filter('telHide', function(str) {
    return str.replace(/(\d{3})\d{4}(\d*)/, '$1****$2')
});


// 隐藏姓名(小明=>*明    李小明=>李*明)
Vue.filter('nameHide', function(name) {
    if (name.length === 2) {
        return new Array(name.length).join('*') + name.substr(-1)
    } else {
        return (name.substr(0, 1) + new Array(name.length - 1).join('*') + name.substr(-1))
    }
});


// 身份证号隐藏('331082199708094687' => '33108219********87')
Vue.filter('IDcardHide', function(name) {
    return name.replace(/(\d{8})\d{8}(\d*)/, '$1********$2')
});


// 人气数字转换
Vue.filter('digitalConversion', function(str) {
    let num = Math.abs(str);
    if (String(num).length < 5) {
        return num;
    } else {
        return (num / 10000).toFixed(1) + 'W';
    }
})


// timeAgo
Vue.filter('timeAgo', function(time) {
    time = String(time).length <= 10 ? time * 1000 : time;
    var arr = [
            [],
            []
        ],
        stamp = new Date().getTime() - new Date(time).getTime();

    //返回具体日期
    if (stamp > 1000 * 60 * 60 * 24 * 8) {
        stamp = new Date(time);
        arr[0][0] = digit(stamp.getFullYear(), 4);
        arr[0][1] = digit(stamp.getMonth() + 1);
        arr[0][2] = digit(stamp.getDate());

        return arr[0].join('-') + ' ' + arr[1].join(':');
    }

    //30天以内，返回“多久前”
    if (stamp >= 1000 * 60 * 60 * 24) {
        return ((stamp / 1000 / 60 / 60 / 24) | 0) + '天前';
    } else if (stamp >= 1000 * 60 * 60) {
        return ((stamp / 1000 / 60 / 60) | 0) + '小时前';
    } else if (stamp >= 1000 * 60 * 2) { //2分钟以内为：刚刚
        return ((stamp / 1000 / 60) | 0) + '分钟前';
    } else {
        return '刚刚';
    }
})

//数字前置补零
function digit(num, length) {
    var str = '';
    num = String(num);
    length = length || 2;
    for (var i = num.length; i < length; i++) {
        str += '0';
    }
    return num < Math.pow(10, length) ? str + (num | 0) : num;
}
