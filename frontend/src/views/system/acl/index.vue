<template>
  <div>
    <a-table :columns="columns" :data-source="data" bordered class="box">
      <template #title>权限管理</template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-button
            type="primary"
            style="margin-right: 20px"
            @click="updateModal.show(record)"
            >修改</a-button
          >
          <a-button @click="deleteModal.show(record)">删除</a-button>
        </template>
        <template v-if="column.dataIndex === 'role'">
          <a-tag v-if="record.role == 0" color="blue">学生</a-tag>
          <a-tag v-if="record.role == 1" color="cyan">教师</a-tag>
          <a-tag v-if="record.role == 2" color="red">管理员</a-tag>
        </template>
      </template>
    </a-table>
    <!-- 修改用户权限 -->
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
          <!-- <a-form-item
            label="分配班级"
            name="role"
          >
            <a-input v-model:value="updateModal.formData.class" />
          </a-form-item> -->
          <a-table :columns="subColumns" :data-source="updateModal.subData" bordered>
            <template #title>分配班级</template>
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'action'">
                <a-button
                  type="primary"
                  style="margin-right: 20px"
                  @click="updateModal.setClass(record)"
                  >选择</a-button
                >
              </template>
            </template>
          </a-table>
          <a-form-item label="修改权限" name="class">
            <a-radio-group v-model:value="updateModal.formData.role">
              <a-radio value="2">管理员</a-radio>
              <a-radio value="1">教师</a-radio>
              <a-radio value="0">学生</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <!-- delete -->
    <a-modal
      v-model:open="deleteModal.visible"
      title="删除"
      @cancel="deleteModal.cancel"
      @ok="deleteModal.submit"
    >
      <sapn>确认删除？</sapn>
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
const userStore = useUserStore();
const data = ref([]);
onMounted(async () => {
  await getUser().then((res) => {
    data.value = res.data.data;
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
    await getClass().then((res)=>{
      updateModal.value.subData = res.data.data
    })
    updateModal.value.visible = true;
    updateModal.value.record = record;
  },
  setClass: (record) =>{
    updateModal.value.class = record.class_name
    message.info("班级已选择")
  },
  cancel: () => {
    updateModal.value.visible = false;
  },
  submit: async () => {
    await updateUser({
      ...updateModal.value.formData,
      ...{ id: updateModal.value.record.id, class: updateModal.value.class },
    }).then(async (res) => {
      if (res.status == 200) {
        message.info("修改成功");
        updateModal.value.visible = false;
        await getUser().then((res) => {
          data.value = res.data.data;
        });
        updateModal.value.formData = {};
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
    await deleteUser(deleteModal.value.record.id).then(async (res) => {
      if (res.status == 200) {
        message.info("删除成功");
        deleteModal.value.visible = false;
        await getUser().then((res) => {
          data.value = res.data.data;
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
  min-height: 100%;
}
</style>
