//用户接口
import request from "@/utils/request";
enum API {
    LOGIN_URL = '/api/user/login',
    REGISTER_URL = '/api/user/register',
    UPDATA_PASSWORD = '/api/user/updatepassword',
    GET_CURRENT = '/api/user/userinfo',
    UPDATA_USER = '/api/user/updateuser',
    GET_USER = '/api/user/getuser',
    DELETE_USER = '/api/user/deleteuser'
}
//登录post
export const reqLogin = (data)=> request.post(API.LOGIN_URL,data)
//注册post
export const reqRegister = (data)=> request.post(API.REGISTER_URL,data)
//修改密码 post
export const updatePassword = (data)=> request.post(API.UPDATA_PASSWORD,data)
//当前用户get
export const getCurrent = (id)=> request.get(API.GET_CURRENT+"?id="+id)
//更新用户post
export const updateUser = (data)=> request.post(API.UPDATA_USER,data)
//所有用户get
export const getUser = ()=> request.get(API.GET_USER)
//删除用户get
export const deleteUser = (id)=> request.get(API.DELETE_USER+"?id="+id)