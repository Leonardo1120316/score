<template>
  <div>
    <a-table :columns="columns" :data-source="data" bordered class="box">
      <template #title>学生成绩</template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-button
            type="primary"
            style="margin-right: 20px"
            @click="updateModal.show(record)"
            >查看成绩</a-button
          >
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
          <a-table :columns="subColumns" :data-source="updateModal.subData" bordered>
            <template #title>考试成绩</template>
          </a-table>
        </a-form>
      </div>
    </a-modal>
    <!-- delete -->
  </div>
</template>

<script setup lang="ts">
import { getUser, updateUser, getCurrent, deleteUser } from "@/api/user";
import { onMounted, ref } from "vue";
import { columns, subColumns } from "./table";
import { message } from "ant-design-vue";
import useUserStore from "@/store/modules/user";
import { getClass } from "@/api/class";
import { getRecord } from "@/api/record";
const userStore = useUserStore();
const data = ref([]);
onMounted(async () => {
  await getUser().then((res) => {
    data.value = res.data.data.filter(item => {return item.role=='0'})
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
    await getRecord().then((res)=>{
      console.log(res.data.data)

      updateModal.value.subData = res.data.data
    })
    updateModal.value.visible = true;
    updateModal.value.record = record;
  },
  cancel: () => {
    updateModal.value.visible = false;
  },
  submit: async () => {
    updateModal.value.visible = false;
  }
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
