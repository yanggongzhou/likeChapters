<template>
  <div class="app-wrapper">
    <Navbar/>
    <BreadCrumb class="breadcrumb-container"/>
    <AppMain/>
  </div>
</template>

<script lang="ts" setup>
import BreadCrumb from '@/components/breadCrumb/index.vue'
import AppMain from './components/AppMain.vue';
import Navbar from './components/nav-bar/index.vue'
</script>

<style lang="less" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  min-width: 1200px;
}

</style>
