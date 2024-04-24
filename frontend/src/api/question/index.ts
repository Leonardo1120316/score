import request from "@/utils/request";
enum API {
    ADD_URL = '/api/question/addquestion',
    DELETE_URL = '/api/question/deletequestion',
    UPDATE_URL = '/api/question/updatequestion',
    SEARCH_URL = '',
    GETCLASS_URL = '/api/question/getquestion'
}
//增加班级
export const addQuestion = (data)=> request.post(API.ADD_URL,data)
//删除班级
export const deleteQuestion = (id)=> request.get(API.DELETE_URL+"?id="+id)
//修改班级
export const updateQuestion = (data)=> request.post(API.UPDATE_URL,data)
//查找班级
export const searchQuestion = (data)=> request.post(API.SEARCH_URL,data)
//获取班级
export const getQuestion = ()=> request.get(API.GETCLASS_URL)