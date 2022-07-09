<template>
  <section class="app-warp">
    <router-view v-slot="{Component, route}">
      <transition name="fade-transform" mode="out-in">
        <keep-alive v-if="route.meta.keepAlive">
          <component :is="Component" />
        </keep-alive>
        <component :is="Component" v-else />
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
    }
  }
})
</script>

<style lang="less" scoped>
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.app-warp {
  width: 100%;
  position: relative;
  box-sizing: border-box;
  height: calc(100vh - 165px);
  min-height: 600px;
}
</style>
