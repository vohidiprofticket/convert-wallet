import {defineStore} from "pinia";

export const useConvertStore = defineStore('convertStore',{
    state:()=>({
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
            return arr
        },
    },
    actions:{
        selectWallet(wallet){
            this.currentWallet = wallet
        },
    }
})