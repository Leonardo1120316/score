import request from "@/utils/request";
enum API {
    ADD_URL = '/api/record/addrecord',
    DELETE_URL = '/api/record/deleterecord',
    UPDATE_URL = '/api/record/updaterecord',
    SEARCH_URL = '',
    GETRECORD_URL = '/api/record/getrecord'
}
//增加班级
export const addRecord = (data)=> request.post(API.ADD_URL,data)
//删除班级
export const deleteRecord = (id)=> request.get(API.DELETE_URL+"?id="+id)
//修改班级
export const updateRecord = (data)=> request.post(API.UPDATE_URL,data)
//查找班级
export const searchRecord = (data)=> request.post(API.SEARCH_URL,data)
//获取班级
export const getRecord = ()=> request.get(API.GETRECORD_URL)