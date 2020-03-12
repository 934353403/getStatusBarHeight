//请求的域名
export let baseURL = "http://fbct.kim";//正式域名

//账号用户名（6-15数字或字母组合） 正则
export var account_reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/;
//登录密码（6-20数字或字母组合） 正则
export var login_pwd_reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
//手机号 正则
export var phone_reg = /^1[0123456789]\d{9}$/;
//身份证 正则
export var card_id_reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
//邮箱 正则
export var email_reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;


/*将base64转换为file*/
export function dataURLtoFile(dataurl, filename) { //将base64转换为文件
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
        type: mime
    });
}

/*将base64转换为Blob*/
export function dataURLtoBlob(urlData, fileType) {
    let bytes = window.atob(urlData);
    let n = bytes.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bytes.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: fileType
    });
}

/*获取当前日期getTime(0):今天,getTime(1):明天,getTime(3):后天*/
export function getTime(time) {
    var date1 = new Date(),
        //time1 = date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间，年-月-日
        time1 = (date1.getMonth() + 1) + "-" + date1.getDate(); //time1表示当前时间，月-日
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + time);
    var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate(); //年-月-日
    // var time2 = (date2.getMonth()+1)+"-"+date2.getDate();//月-日
    return time2;
}

/**
 * 保留4位小数
 */
export function floatNum(number, n) {
    n = n ? parseInt(n) : 0;
    if (n <= 0) {
        return Math.round(number);
    }
    // number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
    number = Math.floor(number * 10000) / 10000; //不需要四舍五入
    number = Number(number).toFixed(n); //补足位数加0
    return number;
};


/*判断是否实名*/
export function shiming_remind(_this, callback) {
    var authen_status = _this.$store.state.userInfo.authen_status;
    if (authen_status == 0) {
        // 0:未实名
        _this.$dialog.confirm({
            title: '你还没有实名认证哦',
            message: '请先完成实名认证',
            confirmButtonText: '实名认证',
            showCancelButton: true,
            confirmButtonColor: '#139BFA',
        }).then(() => {
            _this.$router.push('real_name');
        }).catch(() => {});

    } else if (authen_status == 1) {
        // 2:认证失败,重新认证
        _this.$dialog.confirm({
            title: '实名认证审核中',
            confirmButtonText: '确认',
            showCancelButton: true,
            confirmButtonColor: '#139BFA',
        }).then(() => {
        }).catch(() => {});
    } else {
        // 实名认证已通过
        callback && callback();
    }
}


/*判断是否设置交易密码*/
export function pay_remind(_this, callback) {
    var pay_status = _this.$store.state.userInfo.pay_status;
    if (pay_status == 0) {
        // 0:未设置交易密码
        _this.$dialog.confirm({
            title: '你还没有设置交易密码哦',
            message: '设置交易密码才可以进行下一步',
            confirmButtonText: '设置密码',
            showCancelButton: true,
            confirmButtonColor: '#139BFA',
        }).then(() => {
            _this.$router.push('setup_pay_pwd');
        }).catch(() => {});

    } else {
        // 实名认证已通过
        callback && callback();
    }
}

/*判断是否已人脸识别*/
export function scan_face_remind(_this, callback) {
    var if_scan_face = _this.$store.state.userInfo.check_face;
    if (if_scan_face == 0 || if_scan_face == '0') {
        // 0:未设置交易密码
        _this.$dialog.confirm({
            title: '您还没有进行人脸识别',
            message: '认证人脸识别才可以进行下一步',
            confirmButtonText: '前往认证',
            showCancelButton: true,
            confirmButtonColor: '#139BFA',
        }).then(() => {
            _this.$router.push({
                name:'my',
                params:{
                    scan_face:1,
                }
            });
        }).catch(() => {});

    } else {
        // 实名认证已通过
        callback && callback();
    }
}
