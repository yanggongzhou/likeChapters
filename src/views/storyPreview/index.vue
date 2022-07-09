<template>
  <div class="story-preview-box" @click="tempData.nextClick">
<!--    选择名称-->
    <SpSelectName
      v-if="tempData.pageData.type === 'select_role_name'"
      @ok="tempData.nextClick"
    />
<!--    对话-->
    <SpDialog
      v-if="tempData.pageData.type === 'chat'"
      :content="tempData.pageData.content"
    />
<!--    选择装扮-->
    <SpChoiceLook
      v-if="['select_role_skin', 'select_role_hair', 'select_role_cloth'].indexOf(tempData.pageData.type) !== -1"
      @confirm="tempData.nextClick"
      @left="choiceLookEvent('left')"
      @right="choiceLookEvent('right')"
    />
<!--    旁白 action-->
    <SpAction
      v-if="tempData.pageData.type === 'action'"
      :content="tempData.pageData.content"
    />
    <Avatar
      v-if="tempData.pageData.type !== 'action'"
      :width="200" :dataSource="tempStyle"/>
  </div>
</template>

<script lang="ts" setup>
import Avatar from '@/components/avatar/avatar.vue'
import SpDialog from './detail/spDialog.vue'
import SpSelectName from './detail/selectName.vue'
import SpChoiceLook from './detail/choiceLook.vue'
import SpAction from './detail/spAction.vue'
// import chatJSON from '@/utils/chat.json'
import { reactive } from "vue";
import { ElMessage } from "element-plus";

const chatJSON = {} as any;

const tempStyle = {
  materialVOS: [
    {
      id: 2597,
      materialUrl: "https://res.hw.dzods.cn/script_editor/img/20220303/1646304787304nuodhj.png",
      materialType: 5,
      materialTypeName: "衣服"
    },
    {
      id: 2595,
      materialUrl: "https://res.hw.dzods.cn/script_editor/img/20220303/1646304714800qrqijp.png",
      materialType: 3,
      materialTypeName: "脸型"
    },
    {
      id: 2601,
      materialUrl: "https://res.hw.dzods.cn/script_editor/img/20220304/1646385468007megibe.png",
      materialType: 4,
      materialTypeName: "发型"
    },
    {
      id: 2602,
      materialUrl: "https://res.hw.dzods.cn/script_editor/img/20220304/1646385491300vumtax.png",
      materialType: 2,
      materialTypeName: "肤色"
    },
    {
      id: 2594,
      materialUrl: "https://res.hw.dzods.cn/script_editor/img/20220303/1646304660611cjuesi.png",
      materialType: 2,
      materialTypeName: "肤色"
    }
  ]
}

const choiceLookEvent = (state: 'left' | 'right') => {
  if (state === 'left') {

  }
  ElMessage.info('切换look', state)
}

const tempData = reactive({
  chatInfo: chatJSON.chat_info,
  node: chatJSON.chat_info.start_id,
  pageData: chatJSON.chat_info.start_id,
  nextClick: () => {
    tempData.node = tempData.chatInfo[tempData.node.next_id]
    tempData.pageData = tempData.node

    // "select_chat"
    console.log('tempData.node=======>', tempData.node);
  }
})

</script>

<style lang="less" scoped>
.story-preview-box {
  border-radius: 10px;
  height: 533px;
  box-shadow: 0 1px 4px #00152914;
  background: url("../../assets/img/default-scene.jpg") no-repeat;
  background-size: cover;
  background-position: 50% 100%;
  position: relative;
  width: 300px;
}
</style>
