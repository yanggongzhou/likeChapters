<template>
  <div class="message-detail-wrap">
    <div class="message-content">
      <div class="message-title">
        <div class="message-title_select">
          <el-dropdown @command="dialogTypeChange" trigger="click">
            <span class="el-dropdown-link">
              {{ TemplateTypeEnumZh[sceneData.type] }} <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :command="TemplateTypeEnum.对话分支">对话分支</el-dropdown-item>
                <el-dropdown-item :command="TemplateTypeEnum.衣服分支">衣服分支</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-dropdown @command="roleChange" trigger="click">
            <span class="el-dropdown-link">
              {{ sceneData.roleName || '角色' }} <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="character in characterList"
                  :key="character.id"
                  :command="character.id"
                >{{ character.characterName }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <SceneOthers/>
      </div>

      <div class="message-content">
        <el-input
          v-model="sceneData.content"
          @focusout="saveBranch"
          maxlength="30"
          placeholder="Please input"
          :autosize="{ minRows: 2 }"
          show-word-limit
          type="textarea"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SceneOthers from '@/views/editor/content/others.vue'
import { PropType, defineProps, reactive } from "vue";
import { TemplateTypeEnum, TemplateTypeEnumZh } from "@/interfaces/editor.interfaces";
import { ICharacterListItem } from "@/interfaces/character.interfaces";
import { EditorModule } from "@/store/modules/editor";
import { AddScene } from "@/api/editor";
import { SceneItemDto } from "@/utils/resultModule";

const props = defineProps({
  characterList: Object as PropType<ICharacterListItem[]>,
  bookId: String,
  chapterId: String,
  nodeId: String,
});

const sceneData = reactive(new SceneItemDto({
  bookId: props.bookId,
  chapterId: props.chapterId,
  nodeId: props.nodeId,
  type: TemplateTypeEnum.对话分支,
  content: ''
}));

const dialogTypeChange = (val: TemplateTypeEnum) => {
  sceneData.type = val;
}

const roleChange = (roleId: string) => {
  const roleName = props.characterList?.find(val => val.id === roleId)?.characterName || '';
  sceneData.roleId = roleId;
  sceneData.roleName = roleName;
}

const saveScene = async () => {
  await AddScene({ ...sceneData.value });
  const { bookId, chapterId, nodeId } = props;
  await EditorModule.Init({ bookId, chapterId })
  EditorModule.SetActiveNodeId(nodeId);
  // 清除编辑状态
  const params = new SceneItemDto({ bookId, chapterId, nodeId })
  EditorModule.SetSceneItem(params);
}

const saveBranch = () => {

}

</script>

<style lang="less" scoped>
.message-detail-wrap {
  width: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #FFFFFF;
  margin-top: 20px;
  box-shadow: 0 1px 4px #00152914;
  position: relative;

  .message-content {
    font-weight: 500;
    font-size: 14px;
    color: #5a5e66;
    .message-title {
      display: flex;
      justify-content: space-between;
      background-color: #f3f3fc;
      border-radius: 8px 8px 0 0;
      padding: 10px 30px;
      .message-title_select {
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 180px;
      }
    }
    .message-content {
      position: relative;
      padding: 20px;
      .message-content_btn {
        position: absolute;
        bottom: 20px;
        right: 20px;
        z-index: 1;
        width: 80px;
        height: 30px;
        background-color: #9191fd;
        color: #FFFFFF;
        border-radius: 16px 0 8px;
        line-height: 30px;
        text-align: center;
        font-weight: 500;
        cursor: pointer;
        transition: opacity 0.5s;
        &:hover {
          opacity: 0.8;
        }
      }

      /deep/.el-textarea__inner {
        border-radius: 8px;
        padding: 15px;
        font-weight: 500;
        font-size: 16px;
      }
      /deep/.el-textarea .el-input__count {
        right: 100px;
      }
    }
  }
  .message-detail_del {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    width: 30px;
    height: 20px;
    background-color: #ff3434;
    color: #FFFFFF;
    border-radius: 0 8px;
    text-align: center;
    transition: opacity 0.5s;
    opacity: 0;
    &:hover {
      opacity: 0.8;
    }
  }
  &:hover {
    .message-detail_del {
      opacity: 1;
    }
  }
}
.isActive {
  border: 1px solid #9191fd;
}
</style>
