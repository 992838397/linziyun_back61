import axios from '@/utils/request'

export const userLogin = (data) => {

    return axios({
        url: '/login',
        method: 'post',
        data
    })
}