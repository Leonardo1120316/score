<template>
  <div>
    <a-table :columns="columns" :data-source="data" bordered class="box">
      <template #title
        >班级管理<a-button
          type="primary"
          style="float: right"
          @click="addModal.show"
          >新增</a-button
        ></template
      >
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
      </template>
    </a-table>
    <!-- 新增Modal -->
    <a-modal
      v-model:open="addModal.visible"
      title="新增班级"
      @cancel="addModal.cancel"
      @ok="addModal.submit"
    >
      <div>
        <a-form
          :model="formData"
          name="update"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          autocomplete="off"
        >
          <a-form-item label="班级名称" name="class_name">
            <a-input v-model:value="addModal.formData.class_name" />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <!-- 修改Modal -->
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
          <a-form-item label="班级名称" name="class_name">
            <a-input v-model:value="updateModal.formData.newVal" />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <!-- 删除Modal -->
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
import { getUser, updateUser } from "@/api/user";
import { onMounted, ref } from "vue";
import { columns } from "./table";
import { message } from "ant-design-vue";
import useUserStore from "@/store/modules/user";
import { addClass, getClass, deleteClass, updateClass } from "@/api/class";
const userStore = useUserStore();
const data = ref([]);
onMounted(async () => {
  await getClass().then((res) => {
    data.value = res.data.data;
  });
});
//add Modal
const addModal = ref({
  record: {},
  visible: false,
  formData: {},
  show: async () => {
    addModal.value.visible = true;
  },
  cancel: () => {
    addModal.value.visible = false;
  },
  submit: async () => {
    await addClass({
      ...addModal.value.formData,
    }).then(async (res) => {
      if (res.status == 200) {
        message.info("添加成功");
        addModal.value.visible = false;
        await getClass().then((res) => {
          data.value = res.data.data;
        });
      } else {
        message.info("添加失败");
      }
    });
  },
});
//update Modal
const updateModal = ref({
  record: {},
  visible: false,
  formData: {},
  show: (record) => {
    updateModal.value.visible = true;
    updateModal.value.record = record;
  },
  cancel: () => {
    updateModal.value.visible = false;
  },
  submit: async () => {
    await updateClass({
      ...updateModal.value.formData,
      ...{ oldVal: updateModal.value.record.class_name },
    }).then(async (res) => {
      if (res.status == 200) {
        message.info("修改成功");
        updateModal.value.visible = false;
        await getClass().then((res) => {
          data.value = res.data.data;
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
    await deleteClass(deleteModal.value.record.id).then(async (res) => {
      if (res.status == 200) {
        message.info("删除成功");
        deleteModal.value.visible = false;
        await getClass().then((res) => {
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
