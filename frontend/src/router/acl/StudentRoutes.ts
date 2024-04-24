export const StudentRoutes = [
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
                path: '/score/student',
                component: () => import('@/views/score/student/index.vue'),
                name: 'student',
                meta: {
                    title: '查看成绩',
                    hidden: false,
                    icon: 'House'
                },
            },
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
                path: '/message/student',
                component: () => import('@/views/message/student/index.vue'),
                name: 'messageStudent',
                meta: {
                    title: '学生消息',
                    hidden: false,
                    icon: 'House'
                },
            },
        ]
    },
    {
        //考试分析
        path: '/test',
        component: () => import('@/layout/index.vue'),
        name: 'test',
        meta: {
            title: '考试分析',
            hidden: false,
            icon: 'House'
        },
        children: [
            {
                path: '/test/plan',
                component: () => import('@/views/test/plan/index.vue'),
                name: 'testAnalyze',
                meta: {
                    title: '学习计划',
                    hidden: false,
                    icon: 'House'
                },
            },
            {
                path: '/test/wrongQuestion',
                component: () => import('@/views/test/wrongQuestion/index.vue'),
                name: 'wrongQuestion',
                meta: {
                    title: '错题集合',
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