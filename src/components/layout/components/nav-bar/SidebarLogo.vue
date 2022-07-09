<template>
  <div class="sidebar-logo-container collapse">
    <transition name="sidebarLogoFade">
      <router-link key="expand" class="sidebar-logo-link" to="/">
        <img class="sidebar-logo" src="../../../../../public/gslogo.png">
        <h1 class="sidebar-title">
          {{ t('navbar.title') }}
        </h1>
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
</script>

<style lang="less" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  text-align: center;
  overflow: hidden;
  height: 100%;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 45px auto;
    grid-column-gap: 10px;
    justify-content: flex-start;
    align-items: center;

    & .sidebar-logo {
      height: 100%;
      width: 45px;
    }

    & .sidebar-title {
      margin: 0;
      color: #9191fd;
      font-weight: 600;
      font-size: 24px;
      vertical-align: middle;
    }
  }

}
</style>
