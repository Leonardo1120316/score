<template>
  <div>
    <a-table :columns="columns" :data-source="data" bordered class="box">
      <template #title>成绩录入</template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-button
            type="primary"
            style="margin-right: 20px"
            @click="updateModal.show(record)"
            >录入成绩</a-button
          >
          <a-button @click="searchModal.show(record)">查看成绩</a-button>
        </template>
        <template v-if="column.dataIndex === 'role'">
          <a-tag v-if="record.role == 0" color="blue">学生</a-tag>
          <a-tag v-if="record.role == 1" color="cyan">教师</a-tag>
          <a-tag v-if="record.role == 2" color="red">管理员</a-tag>
        </template>
      </template>
    </a-table>
    <!-- 录入成绩 -->
    <a-modal
      v-model:open="updateModal.visible"
      title="录入成绩"
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
          <a-form-item label="考试名称" name="score">
              <a-input v-model:value="updateModal.formData.record_name" />
          </a-form-item>
          <a-form-item label="成绩" name="score">
              <a-input v-model:value="updateModal.formData.score" />
          </a-form-item>
          <a-form-item label="科目" name="subject">
              <a-input v-model:value="updateModal.formData.subject" />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <!-- search 查询学生成绩 -->
    <a-modal
      v-model:open="searchModal.visible"
      title="学生成绩"
      @cancel="searchModal.cancel"
      @ok="searchModal.submit"
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
            :data-source="searchModal.subData"
            bordered
          >
            <template #title>考试成绩</template>
          </a-table>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { getUser, updateUser, getCurrent, deleteUser } from "@/api/user";
import { onMounted, ref } from "vue";
import { columns, subColumns } from "./table";
import { message } from "ant-design-vue";
import useUserStore from "@/store/modules/user";
import { getClass } from "@/api/class";
import { getRecord, updateRecord, addRecord } from "@/api/record";
const userStore = useUserStore();
const data = ref([]);
let currentUser = ref({})
onMounted(async () => {
  await getCurrent(userStore.currentUser).then((res)=>{
    currentUser.value = res.data.user
  })
  await getUser().then((res) => {
    data.value = res.data.data.filter(item=>{
      return item.class == currentUser.value.class && item.role == '0'
    })
  });
});
//update Modal
const updateModal = ref({
  record: {},
  visible: false,
  formData: {},
  class: '',
  subData: [],
  show: async(record) => {
    updateModal.value.visible = true;
    updateModal.value.record = record;
  },
  cancel: () => {
    updateModal.value.visible = false;
  },
  submit: async () => {
    await addRecord({
      ...updateModal.value.formData,
      ...{ student_id: updateModal.value.record.id, teacher_id: userStore.currentUser, student_name: updateModal.value.record.username, student_class: updateModal.value.record.class},
    }).then(async (res) => {
      if (res.status == 200) {
        message.info("录入成功");
        updateModal.value.visible = false;
      } else {
        message.info("录入失败");
      }
    });
    console.log({
      ...updateModal.value.formData,
      ...{ id: userStore.currentUser },
    });
  },
});
//search score Modal
const searchModal = ref({
  record: {},
  visible: false,
  formData: {},
  class: "",
  subData: [],
  show: async (record) => {
    await getRecord().then((res) => {
      console.log(res.data.data);

      searchModal.value.subData = res.data.data;
    });
    searchModal.value.visible = true;
    searchModal.value.record = record;
  },
  cancel: () => {
    searchModal.value.visible = false;
  },
  submit: async () => {
    searchModal.value.visible = false;
  },
});
</script>

<style scoped>
.box {
  min-height: 100%;
}
</style>
