<template>
  <div>
    <!-- 查看信息 -->
    <a-table
      :columns="messageColumns"
      :data-source="adviceData"
      bordered
      class="box"
    >
      <template #title>学生提醒</template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-button style="margin-right: 20px" @click="deleteModal.show(record)"
            >删除提醒</a-button
          >
          <a-button
            type="primary"
            style="margin-right: 20px"
            @click="showModal.show(record)"
            >查看提醒</a-button
          >
        </template>
        <template v-if="column.dataIndex === 'message_state'">
          <a-tag v-if="record.message_state == 0" color="blue">接收中</a-tag>
          <a-tag v-if="record.message_state == 1" color="green">已接收</a-tag>
        </template>
      </template>
    </a-table>
    <a-modal> </a-modal>
    <a-divider />
    <!-- 查看教师 -->
    <a-table :columns="columns" :data-source="data" bordered class="box">
      <template #title>学生查询</template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-button style="margin-right: 20px" @click="addModal.show(record)"
            >新增提醒</a-button
          >
          <a-button
            type="primary"
            style="margin-right: 20px"
            @click="updateModal.show(record)"
            >学生成绩</a-button
          >
        </template>
      </template>
    </a-table>
    <!-- Modal -->
    <!-- 学生成绩 -->
    <a-modal
      v-model:open="updateModal.visible"
      title="学生成绩"
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
          <a-table
            :columns="subColumns"
            :data-source="updateModal.subData"
            bordered
          >
            <template #title>考试成绩</template>
          </a-table>
        </a-form>
      </div>
    </a-modal>
    <!-- 新增提醒 -->
    <a-modal
      v-model:open="addModal.visible"
      title="新增提醒"
      @cancel="addModal.cancel"
      @ok="addModal.submit"
    >
      <div>
        <a-form
          :model="formData"
          name="add"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          autocomplete="off"
        >
          <a-form
            :model="formData"
            name="add"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
            autocomplete="off"
          >
            <a-form-item label="提醒内容" name="content">
              <a-input v-model:value="addModal.formData.content" />
            </a-form-item>
          </a-form>
        </a-form>
      </div>
    </a-modal>
    <!-- 查看提醒 -->
    <a-modal
      v-model:open="showModal.visible"
      title="查看提醒"
      @cancel="showModal.cancel"
      @ok="showModal.submit"
    >
      <div>
        <span>{{ showModal.record.content }}</span>
      </div>
    </a-modal>
    <!-- 删除提醒 -->
    <a-modal
      v-model:open="deleteModal.visible"
      title="删除提醒"
      @cancel="deleteModal.cancel"
      @ok="deleteModal.submit"
    >
      <span>确认删除当前提醒？</span>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { getUser, updateUser, getCurrent, deleteUser } from "@/api/user";
import { addMessage, deleteMessage, getMessage } from "@/api/message";
import { onMounted, ref } from "vue";
import { columns, subColumns, messageColumns } from "./table";
import { message } from "ant-design-vue";
import useUserStore from "@/store/modules/user";
import { getClass } from "@/api/class";
import { getRecord } from "@/api/record";
const userStore = useUserStore();
const data = ref([]);
let currentUser = ref({}) 
const adviceData = ref([]);
onMounted(async () => {
  await getCurrent(userStore.currentUser).then((res)=>{
    currentUser.value = res.data.user
  })
  await getUser().then((res) => {
    data.value = res.data.data.filter((item) => {
      return item.class == currentUser.value.class && item.role == '0'
    });
  });
  await getMessage().then((res) => {
    console.log(res.data, userStore.currentUser);
    adviceData.value = res.data.data.filter((item) => {
      return item.sender_id == userStore.currentUser;
    });
  });
});
//update score Modal
const updateModal = ref({
  record: {},
  visible: false,
  formData: {},
  class: "",
  subData: [],
  show: async (record) => {
    await getRecord().then((res) => {
      console.log(res.data.data);

      updateModal.value.subData = res.data.data;
    });
    updateModal.value.visible = true;
    updateModal.value.record = record;
  },
  cancel: () => {
    updateModal.value.visible = false;
  },
  submit: async () => {
    updateModal.value.visible = false;
  },
});
//addModal
const addModal = ref({
  record: {},
  visible: false,
  formData: {},
  class: "",
  subData: [],
  show: async (record) => {
    addModal.value.visible = true;
    addModal.value.record = record;
  },
  cancel: () => {
    addModal.value.visible = false;
  },
  submit: async () => {
    let params = {
      reciever_name: addModal.value.record.username,
      reciever_id: addModal.value.record.id,
      sender_id: userStore.currentUser,
      content: addModal.value.formData.content,
    };
    await addMessage(params).then((res) => {
      if (res.status == "200") {
        message.info("添加成功");
      } else {
        message.info("添加失败");
      }
    });
    await getMessage().then((res) => {
      adviceData.value = res.data.data.filter((item) => {
        return item.sender_id == userStore.currentUser;
      });
    });
    addModal.value.visible = false;
  },
});

//showModal
const showModal = ref({
  record: {},
  visible: false,
  formData: {},
  class: "",
  subData: [],
  show: (record) => {
    showModal.value.visible = true;
    showModal.value.record = record;
  },
  cancel: () => {
    showModal.value.visible = false;
  },
  submit: async () => {
    showModal.value.visible = false;
  },
});
//delete Modal
const deleteModal = ref({
  record: {},
  visible: false,
  show: (record) => {
    deleteModal.value.visible = true;
    deleteModal.value.record = record;
  },
  cancel: () => {
    deleteModal.value.visible = false;
  },
  submit: async () => {
    console.log(deleteModal.value.record.id);
    await deleteMessage(deleteModal.value.record.id).then(async (res) => {
      if (res.status == 200) {
        message.info("删除成功");
        deleteModal.value.visible = false;
        await getMessage().then((res) => {
          adviceData.value = res.data.data.filter((item) => {
            return item.sender_id == userStore.currentUser;
          });
        });
      } else {
        message.info("删除失败");
      }
    });
  },
});
</script>

<style scoped>
.box {
  min-height: 50%;
}
</style>
