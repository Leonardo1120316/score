import request from "@/utils/request";
enum API {
    ADD_URL = '/api/plan/addplan',
    DELETE_URL = '/api/plan/deleteplan',
    UPDATE_URL = '/api/plan/updateplan',
    SEARCH_URL = '',
    GETCLASS_URL = '/api/plan/getplan'
}
//增加班级
export const addPlan = (data)=> request.post(API.ADD_URL,data)
//删除班级
export const deletePlan = (id)=> request.get(API.DELETE_URL+"?id="+id)
//修改班级
export const updatePlan = (data)=> request.post(API.UPDATE_URL,data)
//查找班级
export const searchPlan = (data)=> request.post(API.SEARCH_URL,data)
//获取班级
export const getPlan = ()=> request.get(API.GETCLASS_URL)