<template>
  <div class="loginClass">
    <a-card title="登录" style="width: 300px" headStyle="text-align:center">
      <div>
        <a-form
          :model="formLogin"
          name="login"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            label="账号"
            name="username"
            :rules="[{ required: true, message: '请输入账号' }]"
          >
            <a-input v-model:value="formLogin.username" />
          </a-form-item>

          <a-form-item
            label="密码"
            name="password"
            :rules="[{ required: true, message: '请输入密码' }]"
          >
            <a-input-password v-model:value="formLogin.password" />
          </a-form-item>

          <a-form-item name="remember" :wrapper-col="{ offset: 4, span: 16 }">
            <a-checkbox v-model:checked="formLogin.remember"
              >记住密码</a-checkbox
            >
            <a class="register" @click="toRegister">注册账号</a>
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit" style="width:50%">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reqLogin } from "@/api/user";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {routes} from '@/router/routes'
import useUserStore from '@/store/modules/user'
import {AdminRoutes} from '@/router/acl/AdminRoutes'
import {TeacherRoutes} from '@/router/acl/TeacherRoutes'
import {StudentRoutes} from '@/router/acl/StudentRoutes'
const userStore = useUserStore()
const $router = useRouter()
interface formLogin {
  username: string;
  password: string;
  remember: boolean;
}
let formLogin = reactive<formLogin>({
  username: "",
  password: "",
  remember: false,
});
const toRegister = () => {
  $router.push('/register')
}
const onFinish = async() => {
  await reqLogin({userAccount: formLogin.username,userPassword: formLogin.password}).then((res)=>{
      if(res.data.code=="200"){
        console.log(res)
        userStore.userRole = res.data.data.role;
        userStore.currentUser = res.data.data.id;
        sessionStorage.setItem('loginState','1')
        if(userStore.userRole == 0){
          userStore.menuRoutes = StudentRoutes
        }else if(userStore.userRole == 1){
          userStore.menuRoutes = TeacherRoutes
        }else{
          userStore.menuRoutes = AdminRoutes
        }
        $router.push('/person')
      }
  }).catch((err)=>{
     console.log(err)
  })
  console.log(formLogin)
};
const onFinishFailed = () => {};
</script>

<style scoped>
.loginClass {
  width: 100%;
  height: 100vh;
  display: grid;
  justify-items: center;
  align-items: center;
}
.register {
  float: right;
}
</style>
