// 文章请求
import axios from '@/utils/request'

// 1.获取所有文章列表数据
export const posteditList = (params) => {
    return axios({
        url: '/post',
        params
    })
}



// 2.获取所有栏目列表数据
export const getCateList = () => {
    return axios({
        url: '/category'
    })
}

// 3.发布文章
export const postPublish = (data) => {

    return axios({
        method: 'post',
        url: '/post',
        data
    })


}