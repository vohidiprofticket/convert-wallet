<script setup>
import {useConvertStore} from "../stores/convert.js";
import {onMounted} from "vue";

const convert = useConvertStore()
onMounted( async () => {
  await convert.getCurrencyWallets()
})
</script>

<template>
  <div class="dropdown-wallets">
    <el-menu
        :default-active="convert.currentWallet"
        class="el-menu-demo"
        mode="horizontal"
        @select="convert.selectWallet"
    >
      <el-sub-menu index="2">
        <template #title>{{ convert.currentWallet.toUpperCase() }}</template>
        <el-menu-item
            v-for="item in convert.permittesCurrency"
            :index="item"
            :key="item"
        >
          {{item.toUpperCase()}}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
:global(.dropdown-wallets .el-menu--horizontal.el-menu){
  border-bottom: 0;
}
.dropdown-wallets{
  width: 200px;
}
</style>