import Vue from 'vue'

//router
import router from './router'

//vuex
import store from './store'

//axios
import http from './assets/js/axios'

// 原生交互webdemo.js
import WebDemo from './assets/js/webdemo.js'

//图片压缩
import lrz from 'lrz'

//amfe-flexible;用于设置html,body的字体大小;
import 'amfe-flexible'

//MescrollVue; //上拉加载,下拉刷新
import MescrollVue from 'mescroll.js/mescroll.vue'
Vue.component('mescroll-vue', MescrollVue);

//Vue-clipboard;//复制
import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard)

// 轮播插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

//按需引入vant;
import {
    // 提示类，弹出类
    Toast,//Toast 轻提示
    Dialog,//Dialog 弹出框
    Loading,//Loading 加载
    Popup,//Popup 弹出层
    Notify,//Notify 消息提示
    ActionSheet,//ActionSheet 上拉菜单
    
    // 基础类，布局类
    Icon,//Icon 图标
    Button,//Button 按钮
    Image,//Image 图片
    ImagePreview,//ImagePreview 图片预览
    Lazyload,//图片懒加载
    Grid,//Grid 宫格
    GridItem,//Grid 宫格
    Cell,//Cell单元格
    CellGroup,//Cell单元格
    Sticky,//Sticky粘性布局
    
    // 表单类
    Checkbox,//Checkbox 复选框
    CheckboxGroup,//Checkbox 复选框组
    Radio,//Radio 单选框
    RadioGroup,//Radio 单选框组
    Switch,//Switch 开关
    Area,//Area 省市区选择
    Rate,//Rate 评分
    PasswordInput,//PasswordInput 密码输入框
    NumberKeyboard,//NumberKeyboard 数字键盘
    Uploader,//Uploader 文件上传
    AddressEdit,//地址编辑
    AddressList,//地址列表
    CountDown,//倒计时
    Stepper,//Stepper 步进器
    
    // 导航类，标签栏
    NavBar,//导航栏
    Tabbar,//标签栏
    Tab,//标签栏
    Tabs,//标签栏
    TabbarItem,//标签栏
    
    //滑动，列表
    Slider,//Slider 滑块
    Swipe,//Swipe 轮播
    SwipeItem,//Swipe 轮播
    Step,//Steps 步骤条
    Steps,//Steps 步骤条
    SwipeCell,//SwipeCell 滑动单元格
    Progress,//Progress 进度条
    List,//List 列表
    
} from 'vant';
    // 提示类，弹出类
Vue.use(Toast).use(Dialog).use(Loading).use(Popup).use(Notify).use(ActionSheet)
    // 基础类，布局类
    .use(Icon).use(Button).use(Image).use(ImagePreview).use(Lazyload).use(Grid).use(GridItem).use(Cell).use(CellGroup).use(Sticky)
    // 表单类
    .use(Checkbox).use(CheckboxGroup).use(Radio).use(RadioGroup).use(Switch).use(Area).use(Rate).use(PasswordInput).use(NumberKeyboard).use(Uploader).use(AddressEdit).use(AddressList).use(CountDown).use(Stepper)
    //滑动，列表
    .use(Slider).use(Swipe).use(SwipeItem).use(Step).use(Steps).use(SwipeCell).use(Progress).use(List)
    // 导航类，标签栏
    .use(NavBar).use(Tabbar).use(TabbarItem).use(Tab).use(Tabs)


//公共组件
import NoData from '@/components/NoData.vue'//NoData //暂无数据
import getVerificationCode from '@/components/getVerificationCode'//获取验证码
Vue.component('no-data',NoData);
Vue.component('get-code', getVerificationCode);

//自定义方法引入
import { 
    dataURLtoFile,// base64转file
    dataURLtoBlob,// base64转blob
    getTime,//获取时间日期
    floatNum,// 保留四位小数
    shiming_remind,//是否实名
    pay_remind,//是否设置交易密码
    scan_face_remind,//是否已人脸认证
} from './assets/js/common.js'
Object.assign(Vue.prototype, {
	'upfile': dataURLtoFile,
	'upblob': dataURLtoBlob,
    'getTime':getTime,
    'floatNum': floatNum,
    'shiming_remind':shiming_remind,
    'pay_remind':pay_remind,
    'scan_face_remind':scan_face_remind,
    'axios':http,//数据请求
    'demo':new WebDemo(),//原生交互
    'ImagePreview':ImagePreview,//图片预览
})



/*将App放在最后引入,防止样式被覆盖*/
import App from './App'
Vue.config.productionTip = false;

/* eslint-disable no-new */
window.vm = new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
