"use strict";

/**
 * [WebDemo 主方法]
 * @comment  sangxiaokai@qq.com
 * @DateTime 2018-08-22T16:28:58+0800
 * @author sangxiaokai@qq.com
 */
function WebDemo() {
    var u = navigator.userAgent; //http请求用户代理头

    /**
     * propery
     * @type {String}
     */
    this.name = "webdemo1.0";
    this.debug = true; //开启调试
    this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //判断Android终端
    this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    /**
     * function
     * @comment  sangxiaokai@qq.com
     * @DateTime 2018-08-22T16:33:10+0800
     * @author sangxiaokai@qq.com
     * @return   {[type]}                 [description]
     */
    this.say = function () {
        if (this.debug) {
            console.log("name:", this.name);
            console.log("isandroid:", this.isAndroid);
            console.log("isIOS:", this.isIOS);
        }
        var that = this; //保存引用

        /**
         * 初始化方法
         */
        //建立bridge
        //如果是Android
        if (this.isAndroid) {
            if (this.debug) {
                console.log('setup For ..Android');
            }
            if (typeof webViewJavascriptBridge != 'undefined') {
                this.mainBridge = webViewJavascriptBridge; // android 定义的webview和js通信的bridge
            }
        }
        if (this.isIOS) {
            if (this.debug) {
                console.log('setup For ..IOS');
            }
            this.mainBridge = undefined;

            /*这段代码是固定的，必须要放到js中*/
            this.setupWebViewJavascriptBridge = function (callback) {
                if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
                if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
                window.WVJBCallbacks = [callback];
                var WVJBIframe = document.createElement('iframe');
                WVJBIframe.style.display = 'none';
                WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
                document.documentElement.appendChild(WVJBIframe);
                setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
            }; //
            console.log("setupWebViewJavascriptBridge is :", typeof this.setupWebViewJavascriptBridge);
            this.mainBridge = undefined; //

            /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
            this.setupWebViewJavascriptBridge(function (bridge) {
                /**
                 1:扫一扫
                 2:复制
                 */
                console.log('get bridge:', typeof bridge);
                that.mainBridge = bridge;
            });
        } //isIOS


        /**
         * 实现的功能
         */
        
        //退出APP
        this.finishApp = function (query) {
            if (that.debug) {
                console.log('mainBridge type is :', typeof that.mainBridge);
                console.log('callback is type :', typeof callback);
            }
            //android的处理
            if (that.isAndroid) {
                if (typeof that.mainBridge == "undefined") {
                    alert("android未初始化:WebDemo");
                } else {
                    that.mainBridge.finishApp();
                }
                return; //android不调用,但是需要实现方法..
            }
            //ios的处理
            if (typeof that.mainBridge == "undefined") {
                console.log('...................');
                console.log(query);
                window.webkit.messageHandlers.finishApp.postMessage(query);
            }
        }


        //记录手机顶部高度
        this.statusHeight = function () {
            if (that.debug) {
                console.log('mainBridge type is :', typeof that.mainBridge);
                console.log('callback is type :', typeof callback);
            }
            //android的处理
            if (that.isAndroid) {
                if (typeof that.mainBridge == "undefined") {
                    console.log("android未初始化:WebDemo");
                } else {
                    // 调用安卓方法，接收参数并return
                    return that.mainBridge.statusHeight();
                }
            }
            //ios的处理
            if (typeof that.mainBridge == "undefined") {
                let iOSInfo = JSON.parse(JSON.stringify(window.iOSInfo));
                return iOSInfo.statusHeight;
            }
        };
        

        //截图，保存图片
        this.saveScreenshotToLibrary = function (query) {
            if (that.debug) {
                console.log('mainBridge type is :', typeof that.mainBridge);
                console.log('callback is type :', typeof callback);
            }
            //android的处理
            if (that.isAndroid) {
                if (typeof that.mainBridge == "undefined") {
                    alert("android未初始化:WebDemo");
                } else {
                    that.mainBridge.saveScreen();
                }
                return; //android不调用,但是需要实现方法..
            }
            //ios的处理
            if (typeof that.mainBridge == "undefined") {
                console.log('...................');
                console.log(query);
                window.webkit.messageHandlers.saveScreenshotToLibrary.postMessage(query);
            }
        }
        
        //清除缓存
        this.ClearMemery = function (query) {
            if (that.debug) {
                console.log('mainBridge type is :', typeof that.mainBridge);
                console.log('callback is type :', typeof callback);
            }
            //android的处理
            if (that.isAndroid) {
                if (typeof that.mainBridge == "undefined") {
                    alert("android未初始化:WebDemo");
                } else {
                    that.mainBridge.clearMemery();
                }
                return; //android不调用,但是需要实现方法..
            }
            //ios的处理
            if (typeof that.mainBridge == "undefined") {
                console.log('...................');
                console.log(query);
                window.webkit.messageHandlers.ClearMemery.postMessage(query);
            }
        }
        
        
        //更新APP
        this.updateApp = function (query) {
            if (that.debug) {
                console.log('mainBridge type is :', typeof that.mainBridge);
                console.log('callback is type :', typeof callback);
            }
            //android的处理
            if (that.isAndroid) {
                if (typeof that.mainBridge == "undefined") {
                    alert("android未初始化:WebDemo");
                } else {
                    that.mainBridge.updateApp();
                }
                return; //android不调用,但是需要实现方法..
            }
            //ios的处理
            if (typeof that.mainBridge == "undefined") {
                console.log('...................');
                console.log(query);
                window.webkit.messageHandlers.updateApp.postMessage(query);
            }
        }
        
        this.doUpdate = function (query) {
            if (that.debug) {
                console.log('mainBridge type is :', typeof that.mainBridge);
                console.log('callback is type :', typeof callback);
            }
            //android的处理
            if (that.isAndroid) {
                if (typeof that.mainBridge == "undefined") {
                    alert("android未初始化:WebDemo");
                } else {
                    that.mainBridge.doUpdate(query);
                }
                return; //android不调用,但是需要实现方法..
            }
            //ios的处理
            if (typeof that.mainBridge == "undefined") {
                console.log('...................');
                console.log(query);
                window.webkit.messageHandlers.updateApp.postMessage(query);
            }
        }
        
        
        // 扫一扫
        this.doScan = function (query) {
            if (that.debug) {
                console.log('mainBridge type is :', typeof that.mainBridge);
                console.log('callback is type :', typeof callback);
            }
            //android的处理
            if (that.isAndroid) {
                if (typeof that.mainBridge == "undefined") {
                    alert("android未初始化:WebDemo");
                } else {
                    that.mainBridge.doScan();
                }
                return; //android不调用,但是需要实现方法..
            }
            //ios的处理
            if (typeof that.mainBridge == "undefined") {
                console.log('...................');
                console.log(query);
                window.webkit.messageHandlers.doScan.postMessage(query);
            }
        }
        
        //人脸识别
        this.faceVerify = function (query) {
            if (that.debug) {
                console.log('mainBridge type is :', typeof that.mainBridge);
                console.log('callback is type :', typeof callback);
            }
            //android的处理
            if (that.isAndroid) {
                if (typeof that.mainBridge == "undefined") {
                    alert("android未初始化:WebDemo");
                } else {
                    that.mainBridge.faceVerify(query);
                }
                return; //android不调用,但是需要实现方法..
            }
            //ios的处理
            if (typeof that.mainBridge == "undefined") {
                console.log('...................');
                console.log(query);
                window.webkit.messageHandlers.faceVerify.postMessage(query);
            }
        }
        
        // 扫一扫未使用
        // 
        this.doScan_ = function(callback) {
            if (that.debug) {
                console.log('mainBridge type is :', typeof that.mainBridge);
                console.log('callback is type :', typeof callback);
            }
            //android的处理
            if (that.isAndroid) {
                if (typeof that.mainBridge == "undefined") {
                    alert("android未初始化:WebDemo");
                } else {
                    that.mainBridge.doScan();
                }
                return; //android不调用,但是需要实现方法..
            }
            //ios的处理
            if (typeof that.mainBridge == "undefined") {
                var ret = {
                    status: -1 //未初始化
                }
                if (typeof callback != 'undefined') {
                    callback(ret);
                } else {
                    alert("未初始化:WebDemo");
                }
            }
            //初始化成功        
            var data = { type: 'scanResponseCallback:', param: [] };
            that.mainBridge.callHandler('getBlogNameFromObjC', data, function(res) {
                //是WebViewJavascriptBridge这个对象的方法提供一种数据交互通道-在你的webview和本地应用之间
                /**
                放回的格式:
                {'status':'1',
                'data':
                    {
                        'value':'12234'
                    },
                'msg':'操作失败'
                }
                */
                if (that.debug && res.status != 1) {
                    //错误
                    console.log("错误:", res.msg);
                }
                //callback
                if (typeof callback != 'undefined') {
                    callback(res);
                }
            });
        }
        

    };
    this.say();
}
export default WebDemo;