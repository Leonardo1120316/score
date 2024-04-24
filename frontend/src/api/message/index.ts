import request from "@/utils/request";
enum API {
    ADD_URL = '/api/message/addmessage',
    DELETE_URL = '/api/message/deletemessage',
    UPDATE_URL = '/api/message/updatemessage',
    SEARCH_URL = '',
    GETRECORD_URL = '/api/message/getmessage'
}
//增加班级
export const addMessage = (data)=> request.post(API.ADD_URL,data)
//删除班级
export const deleteMessage = (id)=> request.get(API.DELETE_URL+"?id="+id)
//修改班级
export const updateMessage = (data)=> request.post(API.UPDATE_URL,data)
//查找班级
export const searchMessage = (data)=> request.post(API.SEARCH_URL,data)
//获取班级
export const getMessage = ()=> request.get(API.GETRECORD_URL)