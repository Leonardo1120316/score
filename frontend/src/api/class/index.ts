import request from "@/utils/request";
enum API {
    ADD_URL = '/api/class/addclass',
    DELETE_URL = '/api/class/deleteclass',
    UPDATE_URL = '/api/class/updateclass',
    SEARCH_URL = '',
    GETCLASS_URL = '/api/class/getclass'
}
//增加班级
export const addClass = (data)=> request.post(API.ADD_URL,data)
//删除班级
export const deleteClass = (id)=> request.get(API.DELETE_URL+"?id="+id)
//修改班级
export const updateClass = (data)=> request.post(API.UPDATE_URL,data)
//查找班级
export const searchClass = (data)=> request.post(API.SEARCH_URL,data)
//获取班级
export const getClass = ()=> request.get(API.GETCLASS_URL)