import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 创建路由对象
const router = new VueRouter({
    routes: [
        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/login.vue')
        },
        {
            name: 'index',
            path: '/index',
            // 路由重定向
            redirect: { name: 'hello' },
            component: () => import('@/views/index.vue'),
            // 嵌套路由
            children: [
                {
                    name: 'hello',
                    path: 'hello',
                    component: () => import('@/views/hello.vue')
                },
                {
                    name: 'postList',
                    path: 'postList',
                    component: () => import('@/views/post/postList.vue')
                },
                {
                    name: 'postPublish',
                    path: 'postPublish',
                    component: () => import('@/views/post/postPublish.vue')
                }
            ]
        }
    ]
})



// 前置导航守卫
router.beforeEach((to, from, next) => {
    // 逻辑
    // 如果是去登入》去登入
    // 如果不是去登入
    //   a:验证有没有token,如果有token,继续往下总
    //   b:没有token,去登录login
    if (to.path == '/login') {
        next()
    } else {
        let token = localStorage.getItem('linziyun_back')
        if (token) {
            next()
        } else {
            next({ name: 'login' })
        }
    }

})
export default router