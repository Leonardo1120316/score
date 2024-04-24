<template>
  <div class="notFound">
    <a-card title="密码修改" style="width: 100%; height: 100%">
        <div style="width: 50%" class="box">
          <a-form
            :model="formUpdatePassword"
            name="updatePassword"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
            autocomplete="off"
            @finish="onFinish"
          >

            <a-form-item
              label="修改密码"
              name="password"
              :rules="[{ required: true, message: '请输入新密码' }]"
            >
              <a-input-password v-model:value="formUpdatePassword.password" />
            </a-form-item>

            <a-form-item
              label="确认密码"
              name="checkPassword"
              :rules="[{ required: true, message: '请确认密码' }]"
            >
              <a-input-password v-model:value="formUpdatePassword.checkPassword" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
              <a-button type="primary" html-type="submit" style="width: 50%"
                >修改</a-button
              >
            </a-form-item>
          </a-form>
        </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { message } from 'ant-design-vue';
import { updatePassword } from '@/api/user';
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
interface formUpdatePassword {
  password: string;
  checkPassword: string
}
let formUpdatePassword = reactive<formUpdatePassword>({
  password: "",
  checkPassword: ""
});
const onFinish = async()=>{
    if(formUpdatePassword.password!=formUpdatePassword.checkPassword){
      message.info("输入密码不一致")
    }else{
      await updatePassword({userPassword: formUpdatePassword.password,id: userStore.currentUser}).then((res)=>{
        console.log(res)
        if(res.status == 200){
          message.info("密码修改成功")
        }
      })
    }
}
</script>

<style scoped>
.notFound {
  display: grid;
  justify-items: center;
  align-items: center;
}
</style>
