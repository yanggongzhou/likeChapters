<template>
  <div id="login" class="login">
    <LangSelect class="lang-select"/>
    <div class="login-content">
      <LoginForm/>
      <ElImage class="login-img" :src="require('../../assets/img/login-bg.png')"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LangSelect from '../../components/langSelect/index.vue'
import LoginForm from './parts/loginForm.vue'
</script>
<style scoped lang="less" src="./index.less"></style>
