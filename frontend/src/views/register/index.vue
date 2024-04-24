<template>
  <div class="registerClass">
    <a-card title="注册" style="width: 300px" headStyle="text-align:center">
      <div>
        <a-form
          :model="formLogin"
          name="login"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            label="注册邮箱"
            name="email"
            :rules="[{ required: true, message: '请输入邮箱' }]"
          >
            <a-input v-model:value="formLogin.email" />
          </a-form-item>

          <a-form-item
            label="注册手机"
            name="phone"
            :rules="[{ required: true, message: '请输入手机号' }]"
          >
            <a-input v-model:value="formLogin.phone" />
          </a-form-item>

          <a-form-item
            label="注册账号"
            name="username"
            :rules="[{ required: true, message: '请输入账号' }]"
          >
            <a-input v-model:value="formLogin.username" />
          </a-form-item>

          <a-form-item
            label="注册密码"
            name="password"
            :rules="[{ required: true, message: '请输入密码' }]"
          >
            <a-input-password v-model:value="formLogin.password" />
          </a-form-item>

          <a-row justify="space-around">
            <a-col span="8" offset="4">
              <a-form-item >
                <a-button
                  type="primary"
                  html-type="submit"
                  >注册</a-button
                >
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-button @click="toLogin">登录</a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { reqRegister } from "@/api/user";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
const $router = useRouter();
interface formLogin {
  email: string;
  username: string;
  password: string;
  remember: boolean;
  phone: String;
}
let formLogin = reactive<formLogin>({
  email: "",
  username: "",
  password: "",
  remember: false,
  phone: "",
});
const toLogin = () => {
  $router.push("/login");
};
const onFinish = async() => {
  await reqRegister({userAccount: formLogin.username,userPassword: formLogin.password, email: formLogin.email, phone: formLogin.phone}).then((res)=>{
      if(res.status=="200"){
        console.log(res)
        message.info("注册成功")
        $router.push('/login')
      }
  }).catch((err)=>{
     message.info("注册失败")
     console.log(err)
  })
  console.log(formLogin);
};
const onFinishFailed = () => {};
</script>

<style scoped>
.registerClass {
  width: 100%;
  height: 100vh;
  display: grid;
  justify-items: center;
  align-items: center;
}
</style>
