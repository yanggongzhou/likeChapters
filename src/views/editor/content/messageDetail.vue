<template>
  <div class="message-detail-wrap">
    <div class="message-content">
      <div class="message-title">
        <div class="message-title_select">
<!--          类型-->
          <el-select :model-value="sceneItem.type" @change="dialogTypeChange">
            <el-option :label="'旁白'" :value="TemplateTypeEnum.旁白"/>
            <el-option :label="'内心独白'" :value="TemplateTypeEnum.内心独白"/>
            <el-option :label="'对话'" :value="TemplateTypeEnum.对话"/>
          </el-select>

<!--          角色-->
          <el-select v-model="roleId" v-if="sceneItem.type !== TemplateTypeEnum.旁白">
            <el-option
              v-for="character in characterList"
              :key="character.id"
              :label="character.characterName"
              :value="character.id"/>
          </el-select>
        </div>
        <SceneOthers/>
      </div>

      <div>
        <el-input
          :model-value="sceneItem.content"
          @input="editContent"
          maxlength="30"
          placeholder="Please input"
          :autosize="{ minRows: 2, maxRows: 4 }"
          show-word-limit
          type="textarea"
        />
      </div>

      <el-button @click.stop="saveScene"> 保存</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SceneOthers from '@/views/editor/content/others.vue'
import { defineEmits, PropType, ref, defineProps } from "vue";
import { ISceneItem, TemplateTypeEnum } from "@/interfaces/editor.interfaces";
import { ICharacterListItem } from "@/interfaces/character.interfaces";
import { EditorModule } from "@/store/modules/editor";
import { AddScene } from "@/api/editor";

const emits = defineEmits(['message', 'choice', 'link']);
const props = defineProps({
  characterList: Object as PropType<ICharacterListItem[]>,
  sceneItem: Object as PropType<ISceneItem>,
})

const dialogTypeChange = (val: TemplateTypeEnum) => {
  EditorModule.SetSceneItem({ ...props.sceneItem, type: val });
}

const editContent = (content: string) => {
  EditorModule.SetSceneItem({ ...props.sceneItem, content });
}

const saveScene = async () => {
  // if () {}
  await AddScene({ ...props.sceneItem })
}

const roleId = ref('')

</script>

<style lang="less" scoped>
.message-detail-wrap {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #FFFFFF;
  margin-top: 20px;
  box-shadow: 0 1px 4px #00152914;

  .message-content {
    text-align: center;
    .message-title {
      display: flex;
      justify-content: space-between;
      .message-title_select {
        font-size: 14px;
        /deep/.el-select {
          width: 100px;
        }

      }
    }
  }
}
</style>
