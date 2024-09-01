<script setup lang="ts">
import LayoutWrapper from "./layouts/LayoutWrapper.vue";
import  { useRestStore } from "./stores/rest.js"
const rest = useRestStore()
rest.axiosInit()
</script>

<template>
  <layout-wrapper/>
</template>

<style scoped>
</style>
