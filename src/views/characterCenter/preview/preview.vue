<template>
  <div class="preview-warp">
    <div class="back">
      <el-icon v-waves @click="goBack"><arrow-left-bold /></el-icon>
    </div>
    <div class="preview-content">
      <Avatar
        :width="250"
        :data-source="dressUpItem"
      ></Avatar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Avatar from '@/components/avatar/avatar.vue'
import { useRouter } from 'vue-router';
import { computed } from "vue";
import { CharacterCenterModule } from "@/store/modules/characterCenter";
const router = useRouter()
const goBack = () => {
  router.go(-1)
}
const dressUpItem = computed(() => CharacterCenterModule.dressUpItem)
</script>

<style lang="less" scoped>
.preview-warp {
  margin: 20px;
  height: calc(100% - 40px);
  .back {
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 40px;
  }
  .preview-content {
    border-radius: 10px;
    height: 580px;
    box-shadow: 0 1px 4px #00152914;
    background: url("../../../assets/img/default-scene.jpg") no-repeat;
    background-size: cover;
    background-position: 50% 100%;
    position: relative;
  }
}
</style>
