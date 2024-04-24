export const AdminRoutes = [
    {
        //登录
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta: {
            title: '登录',
            hidden: true
        }
    },
    {
        //布局页
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        redirect: '/person',
        meta: {
            title: '个人中心',
            hidden: false,
            icon: 'House'
        },
        children: [
            {
                path: '/person',
                component: () => import('@/views/person/person/index.vue'),
                name: 'person',
                meta: {
                    title: '个人信息',
                    hidden: false,
                    icon: 'House'
                },
            },
            {
                path: '/password',
                component: () => import('@/views/person/password/index.vue'),
                name: 'password',
                meta: {
                    title: '密码修改',
                    hidden: false,
                    icon: 'House'
                },
            }
        ]
    },
    {
        //成绩中心
        path: '/score',
        component: () => import('@/layout/index.vue'),
        name: 'score',
        meta: {
            title: '成绩中心',
            hidden: false,
            icon: 'House'
        },
        children: [
            {
                path: '/score/admin',
                component: () => import('@/views/score/admin/index.vue'),
                name: 'admin',
                meta: {
                    title: '学生成绩',
                    hidden: false,
                    icon: 'House'
                },
            }
        ]
    },
    {
        //消息
        path: '/message',
        component: () => import('@/layout/index.vue'),
        name: 'message',
        meta: {
            title: '消息中心',
            hidden: false,
            icon: 'House'
        },
        children: [
            {
                path: '/message/admin',
                component: () => import('@/views/message/admin/index.vue'),
                name: 'messageAdmin',
                meta: {
                    title: '管理员消息',
                    hidden: false,
                    icon: 'House'
                },
            },
        ]
    },
    {
        //管理员-- 系统权限管理
        path: '/system',
        component: () => import('@/layout/index.vue'),
        name: 'system',
        meta: {
            title: '系统管理',
            hidden: false,
            icon: 'House'
        },
        children: [
            {
                path: '/system/acl',
                component: () => import('@/views/system/acl/index.vue'),
                name: 'systemAcl',
                meta: {
                    title: '权限管理',
                    hidden: false,
                    icon: 'House'
                },
            },
            {
                path: '/system/class',
                component: () => import('@/views/system/class/index.vue'),
                name: 'systemClass',
                meta: {
                    title: '班级管理',
                    hidden: false,
                    icon: 'House'
                },
            },
        ]
    },
    {
        //注册页
        path: '/register',
        component: () => import('@/views/register/index.vue'),
        name: 'Register',
        meta: {
            title: '注册',
            hidden: true
        },
    },
    {
        //404页
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: true
        },
    },
    {
        //任意路由页
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        meta: {
            title: "any",
            hidden: true
        }
    }
]