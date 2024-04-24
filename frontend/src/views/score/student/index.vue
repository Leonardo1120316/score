<template>
  <div>
    <a-table :columns="columns" :data-source="data" bordered class="box" style="height:350px">
      <template #title>{{currentUser.username}}成绩</template>
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
        <template v-if="column.dataIndex === 'class_rowNumber'">
          {{get_class_rowNumber(record)}}
        </template>
        <template v-if="column.dataIndex === 'collage_rowNumber'">
          {{get_class_rowNumber(record)}}
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
    <div class="dropdowm">
    <!-- 下拉框 -->
    <div class="innnerDropdowm" style="z-index: 2;position: absolute;right: 0;margin-top:100px">
    <a-dropdown>
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item :key="key" v-for="(item,key) in subject" @click="handleSubMenuClick(item)">
            {{item}}
          </a-menu-item>
        </a-menu>
      </template>
      <a-button>
        学科
      </a-button>
    </a-dropdown>
    </div>
    <!-- 图表 -->
    <div id="main" style="height:400px;width:100%;z-index:1;position:absolute;button:0px"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUser, updateUser, getCurrent, deleteUser } from "@/api/user";
import * as echarts from 'echarts';
import { onMounted, ref } from "vue";
import { columns, subColumns } from "./table";
import { message } from "ant-design-vue";
import useUserStore from "@/store/modules/user";
import { getClass } from "@/api/class";
import { getRecord, updateRecord, addRecord } from "@/api/record";
const userStore = useUserStore();
const data = ref([]);
let test_name = ref([])
let test_score = ref([])
let currentUser = ref({})
let subject = ref([])
let orangeData = ref([])
let classData = ref([])
const get_class_rowNumber = (record) =>{
  let i = 1;
  data.value.forEach(item=>{
    if(item.score>record.score)i++;
  })
  return i
}
const get_collage_rowNumber = (record) =>{
  let i = 1;
  orangeData.value.forEach(item=>{
    if(item.score>record.score)i++;
  })
  return i;
}
onMounted(async () => {
  await getCurrent(userStore.currentUser).then((res)=>{
    currentUser.value = res.data.user
  })
  await getRecord().then((res) => {
    orangeData.value = res.data.data
    data.value = res.data.data.filter(item=>{
      return item.student_name == currentUser.value.username
    })
    classData.value = res.data.data.filter(item=>{
      return item.class_name == currentUser.value.class
    })
    let subjectList = {}
    subject.value =res.data.data.forEach(item=>{
      if(subjectList[item.subject]==null){
         subjectList[item.subject]=item.subject
      }
    })
    subject.value = Object.keys(subjectList)
    console.log(subject.value)
  });
  data.value.forEach(item=>{
    test_name.value.push(item.record_name)
    test_score.value.push(item.score)
  })
  console.log(test_name.value)
  console.log(test_score.value)
  var myChart = echarts.init(document.getElementById('main'));
  myChart.setOption({
        title: {
          text: '考试成绩'
        },
        tooltip: {},
        legend: {
          data: ['考试']
        },
        xAxis: {
          data: test_name.value
        },
        yAxis: {},
        series: [
          {
            name: '成绩',
            type: 'bar',
            data: test_score.value
          }
        ]
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
const handleSubMenuClick = async(subject)=>{
 await getRecord().then((res) => {
    data.value = res.data.data.filter(item=>{
      return item.student_name == currentUser.value.username && item.subject == subject 
    })
    let name=[]
    let score=[]
    data.value.forEach(item1=>{
    name.push(item1.record_name)
    score.push(item1.score)
  })
  test_name.value=name
  test_score.value=score
  var myChart = echarts.init(document.getElementById('main'));
  myChart.setOption({
        title: {
          text: '考试成绩'
        },
        tooltip: {},
        legend: {
          data: ['考试']
        },
        xAxis: {
          data: test_name.value
        },
        yAxis: {},
        series: [
          {
            name: '成绩',
            type: 'bar',
            data: test_score.value
          }
        ]
      });
 })
}
const handleMenuClick = ()=>{
 
}
</script>

<style scoped>
.box {
  min-height: 100%;
}
#main{
  width: 100%;
  height: 400px;
}
.dropdowm{
  position: relative;
}
.innerDropdowm{
  width: 100px;
}
</style>
