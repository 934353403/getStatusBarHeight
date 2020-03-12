<template>
    <div class="nav-footer-c">
        <van-tabbar 
            v-model="active" 
            active-color="#4482EC" 
            inactive-color="#6C7489" 
            route 
            :fixed="false">
            <!-- route 路由模式, 搭配vue-router使用;会自动匹配页面路径和标签的to属性;并自动选中对应的标签; -->
            <van-tabbar-item 
                v-for="(nav,index) in nav" 
                :key="index" 
                :name="nav.name" 
                :to="nav.to" 
                :replace="nav.replace">
                <span>{{nav.text}}</span>
                <img slot="icon" slot-scope="props" :src="props.active? nav.icon.active:nav.icon.normal" />
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                active: 'home',
                nav: [{
                    name: 'home',
                    text: '首页',
                    to: '/home',
                    replace: true,
                    icon: {
                        normal: require('@img/icon/1.png'),
                        active: require('@img/icon/1-1.png')
                    }
                }, {
                    name: 'login',
                    text: '登录',
                    to: '/login',
                    replace: true,
                    icon: {
                        normal: require('@img/icon/2.png'),
                        active: require('@img/icon/2-2.png')
                    }
                }, {
                    name: 'registered',
                    text: '注册',
                    to: '/registered',
                    replace: true,
                    icon: {
                        normal: require('@img/icon/3.png'),
                        active: require('@img/icon/3-3.png')
                    }
                }, {
                    name: 'mine',
                    text: '个人中心',
                    to: '/mine',
                    replace: true,
                    icon: {
                        normal: require('@img/icon/4.png'),
                        active: require('@img/icon/4-4.png')
                    }
                }]
            }
        },
    }
</script>
<style lang='less' scoped>
    .nav-footer-c {
        height: @navFooterHeihgt;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;

        @{deep}.van-tabbar {
            height: @navFooterHeihgt;
            background: #fff;
            border-top: 1px solid #f5f5f5;
            box-sizing: border-box;

            &:after {
                display: none;
            }

            .van-tabbar-item {
                .van-tabbar-item__icon {
                    margin-bottom: 15px;

                    img {
                        height: 38px;
                    }
                }

                .van-tabbar-item__text {
                    span {
                        font-size: 28px;
                    }
                }
            }
        }
    }
</style>
