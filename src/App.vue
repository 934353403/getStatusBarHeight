<template>
    <div id="app" class="app" :class="{'has-nav-footer':$route.meta.navFooterShow}">
        <transition :name="transitionName">
            <keep-alive :include="keepAliveInclude">
                <router-view class="router-view" />
            </keep-alive>
        </transition>
        <!-- 底部导航 -->
        <!-- <transition name='slide'> -->
        <nav-footer v-show="$route.meta.navFooterShow" />
        <!-- </transition> -->
    </div>
</template>
<script>
    import NavFooter from "@/components/NavFooter";

    export default {
        name: 'App',
        components: {
            NavFooter
        },
        data() {
            return {
                transitionName: '',
                keepAliveInclude: ["Home", "Mine"]
            }
        },
        mounted() {
            this.addStyleElement();
        },
        methods: {
            //获取手机状态栏高度;
            getStatusBarHeight() {
                var isImmersedStatusbar = true; //是否为沉浸式导航;
                if (isImmersedStatusbar) {
                    //手机状态栏高度;
                    let statusBarHeight = 0;
                    try {
                        //与原生交互获取状态栏高度;
                        statusBarHeight = isNaN(Number(this.demo.statusHeight())) ? 27 : Number(this.demo.statusHeight());
                    } catch (err) {
                        statusBarHeight = 27; //默认27px;
                    } finally {
                        this.$store.commit('setStatusBarHeight', statusBarHeight)
                        return statusBarHeight;
                    }
                } else {
                    let statusBarHeight = 0;
                    this.$store.commit('setStatusBarHeight', statusBarHeight)
                    return statusBarHeight;
                }
            },
            //添加样式
            addStyleElement() {
                let statusBarHeight = this.getStatusBarHeight();
                let head = document.head || document.getElementsByTagName('head')[0];
                let styleElement = document.createElement('style');
                let css = `.page-header{padding-top:${statusBarHeight}px}.page-header .status-bar{height:${statusBarHeight}px}.page-header+.page-body{border-top:${statusBarHeight}px solid transparent}}`;
                styleElement.type = 'text/css';
                if (styleElement.styleSheet) {
                  styleElement.styleSheet.cssText = css;
                } else {
                  styleElement.appendChild(document.createTextNode(css))
                }
                head.appendChild(styleElement);
            }
        },
        watch: {
            '$route'(toPage, fromPage) {
                let toPageRouteLevel = toPage.meta.routeLevel;
                let fromPageRouteLevel = fromPage.meta.routeLevel;
                if (toPageRouteLevel == fromPageRouteLevel || fromPage.fullPath == '/') {
                    //路由层级相同,或者是首次加载;
                    this.transitionName = '';
                } else {
                    this.transitionName = toPageRouteLevel > fromPageRouteLevel ? 'slideLeft' : 'slideRight'
                }
            }
        }
    }
</script>
<style lang="less">
    @import './assets/css/common.less';
</style>
<style lang="less" scoped>
    .app {
        height: 100%;
        position: relative;

        .router-view {
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            right: 0;

            &.slideRight-leave-to,
            &.slideLeft-enter {
                transform: translateX(100%);
            }

            &.slideRight-enter-active,
            &.slideRight-leave-active,
            &.slideLeft-enter-active,
            &.slideLeft-leave-active {
                transition: transform .3s ease-out;
            }

            &.slideRight-enter,
            &.slideLeft-leave-to {
                transform: translateX(-100%);
            }
        }

        .nav-footer-c {

            &.slide-enter,
            &.slide-leave-to {
                transform: translateX(-100%);
            }

            &.slide-enter-active,
            &.slide-leave-active {
                transition: transform .3s ease-out;
            }

            &.slide-enter-to,
            &.slide-leave {
                transform: translateX(0);
            }

        }

        &.has-nav-footer {
            .router-view {
                height: calc(100% - @navFooterHeihgt);

            }


        }
    }
</style>
