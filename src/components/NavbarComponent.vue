<script setup>
import {useRoute, useRouter} from "vue-router";
import {useConvertStore} from "../stores/convert.js";
import ConvertComponent from "../components/ConvertComponent.vue";
const router = useRouter()
const route = useRoute()
const convert = useConvertStore()
async function handleClickMenu(pageName){
  await router.push({name: pageName})
}

</script>

<template>
  <div class="nav-bar">
    <div class="menu-list">
      <div class="menu-categories">
        <div
            @click="handleClickMenu('home')"
            class="menu-item"
            :class="{'active' : route.name === 'home'}"
        >
          Главная
        </div>
        <div
            @click="handleClickMenu('convert')"
            class="menu-item"
            :class="{'active' : route.name === 'convert'}"
        >
          Конвертация
        </div>
      </div>
    </div>
    <convert-component/>
  </div>
</template>
<style lang="scss" scoped>
.nav-bar{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  //background: rgba(0,0,0,0.87);
  padding: 8px;
  box-sizing: border-box;
}
.logo{
  padding-left: 24px;
  padding-top: 27px;
  padding-bottom: 19px;
  img{
    width: 140px;
  }
}
.menu-list{
  .menu-categories{
    margin-top: 16px;
    display: flex;
    justify-content: flex-start;
    .menu-item{
      height: 40px;
      font-size: 14px;
      line-height: 1.5;
      font-weight: 600;
      background-color: rgba(255,255,255,0.6);
      padding: 8px 16px;
      box-sizing: border-box;
      cursor: pointer;
      transition: all 0.3s;
      border-radius: 4px;
      margin: 0 10px;
      margin-bottom: 4px;
      border: 1px solid #fff;
      &.active{
        background: rgba(255,255,255,1);
        transition: all 0.3s;
        color: #5F5F5F;
        border: 1px solid #5F5F5F;
      }
      &:hover{
        transition: all 0.3s;
        color: rgba(255,255,255,1);
        background: #5F5F5F88;
        box-sizing: border-box;
      }
    }
  }
}
</style>