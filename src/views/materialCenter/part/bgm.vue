<template>
  <div class="bgm-warp">
    <div class="ma-title">
      Select Background Music
    </div>
    <div class="bgm-content">
      <div class="bgm-item" :class="{'bgm-item_select': isBgmChecked === val.url}" v-for="val in audioPlayerData" :key="val.url">
        <OwnPlayer :dataSource="[val]"/>
        <div class="handle-select" @click="SelectBgm(val.url)"></div>
        <div class="is-checked" v-show="isBgmChecked === val.url">
          <el-icon><star-filled /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import OwnPlayer from '@/components/OwnPlayer.vue';
import { computed, ref } from "vue";
import { CharacterCenterModule } from "@/store/modules/characterCenter";

const isBgmChecked = computed(() => CharacterCenterModule.bgm)
const SelectBgm = (bgm: string) => {
  CharacterCenterModule.SetBgm(bgm);
}
const audioPlayerData = ref([
  {
    author: '东西1（Cover：林俊呈）',
    title: '纳豆1',
    url: 'https://res.gostory.com/gostory/luodiye/images/video1.mp4?v=1&S=1',
    pic: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
  },
  {
    author: 'Goose house',
    title: '光るなら',
    url: 'https://res.gostory.com/gostory/luodiye/images/video1.mp4?v=1&S=2',
    pic: 'https://yt3.ggpht.com/cH_ZAOg9sqsYcPclNsOgsnJs3P9uP-XMWQnqlqdzWswjJWjl-58DqsmLW-CctcUEpUugAJBpGqY=s48-c-k-c0x00ffffff-no-rj', // prettier-ignore
  },
  {
    author: 'XX:me',
    title: 'トリカゴ',
    url: 'https://res.gostory.com/gostory/luodiye/images/video1.mp4?v=1&S=3',
    pic: 'https://pic3.zhimg.com/v2-abed1a8c04700ba7d72b45195223e0ff_xs.jpg?source=1940ef5c', // prettier-ignore
  },
])

</script>

<style lang="less" scoped>
.bgm-warp {
  height: 100%;
  overflow-y: auto;
  .ma-title {
    font-size: 20px;
    font-weight: bold;
    padding: 10px 10px 20px;
    border-bottom: 1px solid #eff2f4;
    margin-bottom: 30px;
  }
  .bgm-content {
    .bgm-item {
      border: 2px solid transparent;
      border-radius: 5px;
      margin-bottom: 10px;
      position: relative;
      overflow: hidden;

      .is-checked {
        position: absolute;
        top: -4px;
        right: -5px;
        z-index: 9;
        height: 25px;
        width: 26px;
        background-color: #9191fd;
        border-radius: 0 0 0 16px;
        font-size: 18px;
        color: #fff;
        font-weight: 800;
        line-height: 30px;
        text-align: center;
      }
      .handle-select {
        position: absolute;
        z-index: 10;
        width: calc(100% - 76px);
        height: 49px;
        right: 5px;
        top: 0;
        cursor: pointer;
      }
    }
    .bgm-item_select {
      border: 2px solid #9191fd;
    }
  }
}
</style>
