<script setup>
import {onMounted, ref, watch} from 'vue'
import {useConvertStore} from "../../stores/convert.js";
const convert = useConvertStore()
const correlationCurrency = ref(1)
const currencyValue1 = ref(1)
const currencyValue2 = ref(1)
const currencyName1 = ref('RUB')
const currencyName2 = ref('USD')

watch(currencyName1, (newval, oldval) => {
  if(currencyName2.value.toLowerCase() === newval.toLowerCase()){
    currencyName2.value = oldval.toUpperCase()
  }
  correlationCurrency.value = convert.currencyWalletsFromServer[currencyName1.value.toLowerCase()+'-'+currencyName2.value.toLowerCase()]
  currencyValue1.value =   (currencyValue2.value / correlationCurrency.value).toFixed(2)
})
watch(currencyName2, (newval, oldval) => {
  if(currencyName1.value.toLowerCase()  === newval.toLowerCase() ){
    currencyName1.value = oldval.toUpperCase()
  }
  correlationCurrency.value = convert.currencyWalletsFromServer[currencyName1.value.toLowerCase()+'-'+currencyName2.value.toLowerCase()]
  currencyValue2.value =  (currencyValue1.value * correlationCurrency.value).toFixed(2)
})
function changeCurrency1(val){
  if(!val || Number(val) < 0){
    currencyValue1.value = 0
  } else if(!(/^\d+$/.test(val))){
    currencyValue1.value = parseInt(val)
  } else {
    currencyValue1.value = parseInt(val)
  }
  currencyValue2.value =  (currencyValue1.value / correlationCurrency.value).toFixed(2)
}
function changeCurrency2(val){
  if(!val || Number(val) < 0){
    currencyValue2.value = 0
  } else if(!(/^\d+$/.test(val))){
    currencyValue2.value = parseInt(val)
  } else {
    currencyValue2.value = parseInt(val)
  }
  currencyValue1.value = (currencyValue2.value * correlationCurrency.value).toFixed(2)
}

function setCurrency(){
  setTimeout(()=>{
    const currency = convert.currencyWallets[0]
    currencyName1.value = currency.currency1.toUpperCase()
    currencyName2.value = currency.currency2.toUpperCase()
    correlationCurrency.value = currency.exchageValue
    currencyValue1.value = (currencyValue2.value * correlationCurrency.value).toFixed(2)
  }, 300)
}
onMounted(async () => {
  await setCurrency()
})
</script>
<template>
  <div class="converter-page">
    <div class="title">
      Корвертация
    </div>
    <div class="converter-wrapper">
      <div class="converter-item">
        <el-input
            v-model="currencyValue1"
            @input="changeCurrency1"
            style="width: 240px"
            size="large"
        />
        <el-select
            v-model="currencyName1"
            placeholder="Выберите валюту"
            size="large"
            style="width: 240px"
        >
          <el-option
              v-for="item in convert.permittesCurrency"
              :key="item"
              :label="item.toUpperCase()"
              :value="item"
          />
        </el-select>
      </div>
      <div class="converter-item">
        <el-input
            v-model="currencyValue2"
            @input="changeCurrency2"
            style="width: 240px"
            size="large"
        />
        <el-select
            v-model="currencyName2"
            placeholder="Выберите валюту"
            size="large"
            style="width: 240px"
        >
          <el-option
              v-for="item in convert.permittesCurrency"
              :key="item"
              :label="item.toUpperCase()"
              :value="item"
          />
        </el-select>
      </div>
    </div>
      </div>
</template>

<style lang="scss" scoped>
.converter-page{
  .title{
    width: 100%;
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 20px;
    margin-top: 20px;
    text-align: center;
  }
  .converter-wrapper{
    .converter-item{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }
  }
}
</style>