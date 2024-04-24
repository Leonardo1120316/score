import { defineStore } from "pinia"
import {routes} from '@/router/routes'

const useUserStore = defineStore('User',{
    //状态管理
    state: () => {
        return {
          menuRoutes: routes,
          userRole: 0,
          currentUser: ''
        }
    },
    //异步逻辑处理
    actions: {
       
    },
    //计算属性
    getters: {

    },
    persist: true
})
//暴露仓库
export default useUserStore