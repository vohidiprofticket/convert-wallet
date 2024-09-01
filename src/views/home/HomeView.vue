<script setup>
import {useConvertStore} from "../../stores/convert.js";

const convert = useConvertStore()
</script>

<template>
  <div class="home-page">
    <div class="title">
      Курс валют
    </div>
    <div class="swap-wrapper">
      <div class="swap-item" v-for="item in convert.currencyWallets" :key="item">
         1 {{item.currency2.toUpperCase()}} = {{item.exchageValue}} {{item.currency1.toUpperCase()}}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-page{
  .title{
    width: 100%;
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 20px;
    margin-top: 20px;
    text-align: center;
  }
  .swap-wrapper{
    .swap-item{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }
  }
}
</style>