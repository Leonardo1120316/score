<template>
  <div>
    <a-table :columns="columns" :data-source="data" bordered class="box">
      <template #title
        >学习计划
        <a-button type="primary" style="float: right" @click="addModal.show"
          >创建计划</a-button
        >
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-button
            type="primary"
            style="margin-right: 20px"
            @click="updateModal.show(record)"
            >修改计划</a-button
          >
          <a-button @click="deleteModal.show(record)">删除计划</a-button>
        </template>
        <template v-if="column.dataIndex === 'plan_state'">
          <a-tag v-if="record.plan_state == 0" color="blue">进行</a-tag>
          <a-tag v-if="record.plan_state == 1" color="cyan">完成</a-tag>
          <a-tag v-if="record.plan_state == 2" color="red">结束</a-tag>
        </template>
      </template>
    </a-table>
    <!-- 修改计划 -->
    <a-modal
      v-model:open="updateModal.visible"
      title="修改计划"
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
          <a-form-item label="计划名称" name="score">
            <a-input v-model:value="updateModal.formData.plan_name" />
          </a-form-item>
          <a-form-item label="计划内容" name="score">
            <a-input v-model:value="updateModal.formData.plan_introduce" />
          </a-form-item>
          <a-form-item label="计划状态" name="class">
            <a-radio-group v-model:value="updateModal.formData.plan_state">
              <a-radio value="2">结束</a-radio>
              <a-radio value="1">完成</a-radio>
              <a-radio value="0">进行</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <!-- delete 删除学生成绩 -->
    <a-modal
      v-model:open="deleteModal.visible"
      title="学习计划"
      @cancel="deleteModal.cancel"
      @ok="deleteModal.submit"
    >
      <span>确认删除计划？</span>
    </a-modal>
    <!-- add 新增 -->
    <a-modal
      v-model:open="addModal.visible"
      title="创建计划"
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
          <a-form-item label="计划名称" name="score">
            <a-input v-model:value="addModal.formData.plan_name" />
          </a-form-item>
          <a-form-item label="计划内容" name="score">
            <a-input v-model:value="addModal.formData.plan_introduce" />
          </a-form-item>
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
import { addPlan, deletePlan, getPlan, updatePlan } from "@/api/plan";
const userStore = useUserStore();
const data = ref([]);
let currentUser = ref({});
onMounted(async () => {
  await getCurrent(userStore.currentUser).then((res) => {
    currentUser.value = res.data.user;
  });
  await getPlan().then((res) => {
    data.value = res.data.data.filter((item) => {
      return item.student_name == currentUser.value.username;
    });
  });
});
//update Modal
const updateModal = ref({
  record: {},
  visible: false,
  formData: {},
  class: "",
  subData: [],
  show: async (record) => {
    updateModal.value.visible = true;
    updateModal.value.record = record;
  },
  cancel: () => {
    updateModal.value.visible = false;
  },
  submit: async () => {
    await updatePlan({
      ...updateModal.value.formData,
      ...{
        id: updateModal.value.record.id,
      },
    }).then(async (res) => {
      if (res.status == 200) {
        getPlan().then((res) => {
          data.value = res.data.data.filter((item) => {
            return item.student_name == currentUser.value.username;
          });
        });
        message.info("修改成功");
        updateModal.value.visible = false;
      } else {
        message.info("修改失败");
      }
    });
  },
});
//delete Modal
const deleteModal = ref({
  record: {},
  visible: false,
  formData: {},
  class: "",
  show: async (record) => {
    deleteModal.value.visible = true;
    deleteModal.value.record = record;
  },
  cancel: () => {
    deleteModal.value.visible = false;
  },
  submit: async () => {
    await deletePlan(deleteModal.value.record.id).then((res) => {
      if (res.status == 200) {
        message.info("删除成功");
        getPlan().then((res) => {
          data.value = res.data.data.filter((item) => {
            return item.student_name == currentUser.value.username;
          });
        });
        updateModal.value.visible = false;
      } else {
        message.info("删除失败");
      }
    });
    deleteModal.value.visible = false;
  },
});
//add Modal
const addModal = ref({
  record: {},
  visible: false,
  formData: {},
  class: "",
  show: async (record) => {
    addModal.value.visible = true;
    addModal.value.record = record;
  },
  cancel: () => {
    addModal.value.visible = false;
  },
  submit: async () => {
    await addPlan({
      ...addModal.value.formData,
      student_name: currentUser.value.username,
    }).then((res) => {
      if (res.status == 200) {
        message.info("新增成功");
        getPlan().then((res) => {
          data.value = res.data.data.filter((item) => {
            return item.student_name == currentUser.value.username;
          });
        });
        addModal.value.visible = false;
      } else {
        message.info("新增失败");
      }
    });
    addModal.value.visible = false;
  },
});
</script>

<style scoped>
.box {
  min-height: 100%;
}
</style>
