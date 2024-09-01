import { default as axiosInstance } from 'axios'
import {ElNotification} from "element-plus";
import {defineStore} from "pinia";

export const useRestStore = defineStore('rest', {
    state:()=>({
        axios:null,
    }),
    actions:{
        axiosInit(){
            this.axios = axiosInstance.create({
                baseURL: import.meta.env.VITE_BASE_URL
            })
            this.axios.interceptors.response.use((response) => {
                if (response.status === 200 && response.headers['content-type'] === 'application/json') {
                    return {
                        status: response.status,
                        data: response.data && typeof response.data === 'string' ? JSON.parse(response.data) : response.data
                    }
                } else if (response.status === 200 || response.status === 204) {
                    return response
                } else {
                    return Promise.reject(response)
                }
            }, async (error) => {
                return new Promise.reject(error)
            })
        },
    }
})