<template>
  <div class="bg-warp">
    <div class="ma-title">
      Select Background
    </div>
    <div class="bg-content">
      <ClothItem
          v-for="val in audioPlayerData"
          :url="val.pic"
          :key="val.pic"
          :size="'large'"
          :isChecked="isBgChecked === val.pic"
          @click="selectBg(val.pic)"></ClothItem>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ClothItem from '@/views/characterCenter/clothStyle/clothItem.vue'
import { computed, ref } from "vue";
import { CharacterCenterModule } from "@/store/modules/characterCenter";
const isBgChecked = computed(() => CharacterCenterModule.background)
const selectBg = (bg: string) => {
  CharacterCenterModule.SetBg(bg);
}
const audioPlayerData = ref([
  {
    author: '东西1（Cover：林俊呈）',
    title: '纳豆1',
    url: 'https://res.gostory.com/gostory/luodiye/images/video1.mp4?v=1',
    pic: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
  },
  {
    author: 'Goose house',
    title: '光るなら',
    url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3',
    pic: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.jpg', // prettier-ignore
  },
  {
    author: 'XX:me',
    title: 'トリカゴ',
    url: 'https://res.gostory.com/gostory/luodiye/images/video1.mp4?v=1',
    pic: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg', // prettier-ignore
  },
])

</script>

<style lang="less" scoped>
.bg-warp {
  height: 100%;
  overflow-y: auto;
  .ma-title {
    font-size: 20px;
    font-weight: bold;
    padding: 10px 10px 20px;
    border-bottom: 1px solid #eff2f4;
    margin-bottom: 30px;
  }
  .bg-content {
    margin: 20px;
    display: flex;
  }
}
</style>
