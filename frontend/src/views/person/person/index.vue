<template>
  <div class="notFound">
    <a-card title="个人中心" style="width: 100%; height: 100%">
      <template #extra><a href="#" @click="updateModal.show">修改</a></template>
      <a-descriptions title="用户信息">
        <a-descriptions-item label="用户账号">{{
          user.userAccount
        }}</a-descriptions-item>
        <a-descriptions-item label="用户昵称">{{
          user.username
        }}</a-descriptions-item>
        <a-descriptions-item label="用户手机">{{
          user.phone
        }}</a-descriptions-item>
        <a-descriptions-item label="用户邮箱">{{
          user.email
        }}</a-descriptions-item>
        <a-descriptions-item label="用户身份">
          <a-tag color="blue" v-if="user.role == 0">学生</a-tag>
          <a-tag color="cyan" v-if="user.role == 1">教师</a-tag>
          <a-tag color="red" v-if="user.role == 2">管理员</a-tag>
        </a-descriptions-item>
      </a-descriptions>
      <!-- 用户简介 -->
      <a-descriptions title="用户简介" style="margin-top: 50px">
        <a-descriptions-item label="简介">
          {{ user.introduce }}
        </a-descriptions-item>
      </a-descriptions>
      <!-- 修改用户信息 -->
      <a-modal
        v-model:open="updateModal.visible"
        title="修改"
        @cancel="updateModal.cancel"
        @ok="updateModal.submit"
      >
        <div>
          <a-form
            :model="formData"
            name="update"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
            autocomplete="off"
          >
            <a-form-item
              label="用户名"
              name="username"
              :rules="[{ required: true, message: '请输入用户名' }]"
            >
              <a-input v-model:value="updateModal.formData.username" />
            </a-form-item>

            <a-form-item
              label="手机"
              name="username"
              :rules="[{ required: true, message: '请输入手机' }]"
            >
              <a-input v-model:value="updateModal.formData.phone" />
            </a-form-item>

            <a-form-item
              label="邮箱"
              name="username"
              :rules="[{ required: true, message: '请输入邮箱' }]"
            >
              <a-input v-model:value="updateModal.formData.email" />
            </a-form-item>

            <a-form-item
              label="简介"
              name="username"
              :rules="[{ required: true, message: '请输入简介' }]"
            >
              <a-input v-model:value="updateModal.formData.introduce" />
            </a-form-item>
          </a-form>
        </div>
      </a-modal>
      <!-- modal end -->
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getCurrent, updateUser } from "@/api/user";
import useUserStore from "@/store/modules/user";
import { onMounted } from "vue";
import { message } from "ant-design-vue";
const userStore = useUserStore();
let user = ref({});
const updateModal = ref({
  visible: false,
  formData: {},
  show: () => {
    updateModal.value.visible = true;
  },
  cancel: () => {
    updateModal.value.visible = false;
  },
  submit: async () => {
    await updateUser({
      ...updateModal.value.formData,
      ...{ id: userStore.currentUser },
    }).then((res) => {
      if (res.status == 200) {
        message.info("修改成功");
        updateModal.value.visible = false;
        getCurrent(userStore.currentUser).then((res) => {
          user.value = res.data.user;
          console.log(user);
        });
      } else {
        message.info("修改失败");
      }
    });
    console.log({
      ...updateModal.value.formData,
      ...{ id: userStore.currentUser },
    });
  },
});
onMounted(async () => {
  await getCurrent(userStore.currentUser).then((res) => {
    user.value = res.data.user;
    console.log(user);
  });
});
</script>

<style scoped>
.notFound {
  height: 100%;
}
</style>
