<script setup>
import {onMounted, reactive, ref, watch} from 'vue'
import {useConvertStore} from "../../stores/convert.js";
import {ElMessage} from "element-plus";
const convert = useConvertStore()
const correlationCurrency = ref(1)
const firstCurrency = reactive({
  quantity:1,
  name:""
})
const secondCurrency = reactive({
  quantity:1,
  name:""
})

watch(() => firstCurrency.name, (newVal, oldVal) => {
  if(secondCurrency.name.toLowerCase() === firstCurrency.name.toLowerCase()){
    secondCurrency.name = oldVal.toUpperCase()
  }
  correlationCurrency.value = convert.currencyWalletsFromServer[firstCurrency.name.toLowerCase() + '-' + secondCurrency.name.toLowerCase()]
  firstCurrency.quantity = (secondCurrency.quantity / correlationCurrency.value).toFixed(2)
})
watch(() => secondCurrency.name, (newVal, oldVal) => {
  if(firstCurrency.name.toLowerCase()  === newVal.toLowerCase() ){
    firstCurrency.name = oldVal.toUpperCase()
  }
  correlationCurrency.value = convert.currencyWalletsFromServer[firstCurrency.name.toLowerCase() + '-' + secondCurrency.name.toLowerCase()]
  secondCurrency.quantity = (firstCurrency.quantity * correlationCurrency.value).toFixed(2)
})
function changeCurrency1(val){
  if(!val || parseInt(val) < 0){
    firstCurrency.quantity = 0
    ElMessage({
      message: 'Значение должно бить больше 0',
      type: 'warning',
    })
  }else if(!(/^\d+$/.test(val))){
    ElMessage({
      message: 'Введите только цифры',
      type: 'warning',
    })
    firstCurrency.quantity = parseInt(val) || 0
  } else {
    firstCurrency.quantity = parseInt(val)
  }
  secondCurrency.quantity =  (firstCurrency.quantity / correlationCurrency.value).toFixed(2)
}
function changeCurrency2(val){
  if(!val || parseInt(val) < 0){
    secondCurrency.quantity = 0
    ElMessage({
      message: 'Значение должно бить больше 0',
      type: 'warning',
    })
  }else if(!(/^\d+$/.test(val))){
    ElMessage({
      message: 'Введите только цифры',
      type: 'warning',
    })
    secondCurrency.quantity = parseInt(val) || 0
  } else {
    secondCurrency.quantity = parseInt(val)
  }
  firstCurrency.quantity = (secondCurrency.quantity * correlationCurrency.value).toFixed(2)
}
// устанавливает выбранную из списка валюту по умолчанию
function setCurrency(){
  setTimeout(() => {
    const thisCurrency = convert.currencyWallets[0]
    firstCurrency.name = thisCurrency.currency1.toUpperCase()
    secondCurrency.name = thisCurrency.currency2.toUpperCase()
    correlationCurrency.value = thisCurrency.exchageValue
    firstCurrency.quantity = (secondCurrency.quantity * correlationCurrency.value).toFixed(2)
  }, 100)
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
            v-model="firstCurrency.quantity"
            @input="changeCurrency1"
            style="width: 240px"
            size="large"
        />
        <el-select
            v-model="firstCurrency.name"
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
            v-model="secondCurrency.quantity"
            @input="changeCurrency2"
            style="width: 240px"
            size="large"
        />
        <el-select
            v-model="secondCurrency.name"
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