import Vue from 'vue'
import Router from 'vue-router'


const Home = () => import("@/pages/home/Home"); //首页
const login = () => import("@/pages/login/login"); //登录
const registered = () => import("@/pages/login/registered"); //注册
const mine = () => import("@/pages/mine/mine"); //个人中心

let redirect = localStorage.getItem('token') ? '/home' : '/login';
Vue.use(Router)
const router = new Router({
    routes: [{
            path: '/',
            redirect: redirect
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta: {
                navFooterShow: true,
                routeLevel: 1,

            }
        },
        {
            path: '/login',
            name: 'login',
            component: login,
            meta: {
                navFooterShow: true,
                routeLevel: 2,
            }
        },
        {
            path: '/registered',
            name: 'registered',
            component: registered,
            meta: {
                navFooterShow: true,
                routeLevel: 3,
            }
        },
        {
            path: '/mine',
            name: 'mine',
            component: mine,
            meta: {
                navFooterShow: true,
                routeLevel: 4,
            }
        },

    ]
})


// 登录拦截 本地没有存token,请重新登录
router.beforeEach((to, from, next) => {
    // 判断有没有登录
    if (!localStorage.getItem("token")) {
        if (to.path == "/login" || to.path == "/agreement" || to.path == '/registered' || to.path ==
            '/setup_login_pwd') {
            next();
        } else {
            next({
                path: "/login"
            });
        }
    } else {
        next();
    }
});

//离开路由之后 如果有弹窗 就清除
router.afterEach((to, from) => {
    if (window.vms) {
        window.vms.$toast.clear();
    }
})

// 解决Loading chunk (\d)+ failed问题
router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    if (isChunkLoadFailed) {
        // 用路由的replace方法，并没有相当于F5刷新页面，失败的js文件并没有从新请求，会导致一直尝试replace页面导致死循环，而用 location.reload 方法，相当于触发F5刷新页面，虽然用户体验上来说会有刷新加载察觉，但不会导致页面卡死及死循环，从而曲线救国解决该问题
        location.reload();
        // const targetPath = $router.history.pending.fullPath;
        // $router.replace(targetPath);
    }
});

export default router;
