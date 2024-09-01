import {defineStore} from "pinia";
import {useRestStore} from "../stores/rest.js";

export const useConvertStore = defineStore('convertStore',{
    state:()=>({
        currentRoute:'home',
        currentWallet:"RUB",
        permittesCurrency:['rub', 'usd', 'eur'],
        currencyWalletsFromServer:{},
    }),
    getters:{
        currencyWallets(state){
            const arr = []
            Object.keys(state.currencyWalletsFromServer).forEach( elem => {
                const currencyPair = elem.split('-')
                if(currencyPair[0] === state.currentWallet.toLowerCase() && state.permittesCurrency.includes(currencyPair[1])){
                    arr.push({
                        currency1:currencyPair[0],
                        currency2:currencyPair[1],
                        exchageValue:(1/state.currencyWalletsFromServer[elem]).toFixed(2)
                    })
                }
            })
            console.log('wallets getter',arr)
            return arr
        },
    },
    actions:{
        selectWallet(wallet){
            this.currentWallet = wallet
        },
        async getCurrencyWallets(){
            const rest = useRestStore()
            const res = await rest.axios.get(`https://status.neuralgeneration.com/api/currency`)
            this.currencyWalletsFromServer = {...res.data}
            console.log('getCurrencyWallets',res.data, this.currencyWalletsFromServer)
        },
    }
})