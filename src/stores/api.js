import {defineStore} from "pinia";
import {useRestStore} from "./rest.js";
import {useConvertStore} from "./convert.js";

export const useApiStore = defineStore('apiStore',{
    actions:{
        async getCurrencyWallets(){
            const rest = useRestStore()
            const convert = useConvertStore()
            const res = await rest.axios.get(`https://status.neuralgeneration.com/api/currency`)
            convert.currencyWalletsFromServer = {...res.data}
        },
    }
})