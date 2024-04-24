export const TeacherRoutes = [
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
                path: '/score/class',
                component: () => import('@/views/score/class/index.vue'),
                name: 'class',
                meta: {
                    title: '班级成绩',
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
                path: '/message/teacher',
                component: () => import('@/views/message/teacher/index.vue'),
                name: 'messageTeacher',
                meta: {
                    title: '教师消息',
                    hidden: false,
                    icon: 'House'
                },
            },
        ]
    },
    {
        //成绩录入
        path: '/newscore',
        component: () => import('@/layout/index.vue'),
        name: 'newScore',
        meta: {
            title: '成绩录入',
            hidden: false,
            icon: 'House'
        },
        children: [
            {
                path: '/newScore/newScore',
                component: () => import('@/views/newScore/index.vue'),
                name: 'newScoreAdd',
                meta: {
                    title: '成绩录入',
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