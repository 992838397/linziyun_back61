// 文章请求
import axios from '@/utils/request'

// 1.获取所有文章列表数据
export const posteditList = (params) => {
    return axios({
        url: '/post',
        params
    })
}