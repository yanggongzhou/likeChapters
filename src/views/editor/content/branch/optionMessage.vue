<template>
  <div class="option-wrap">
    <div class="option-content">
      <div class="option-title">Choice A</div>
      <div class="option-text">
        <el-input
          v-model="sceneData.content"
          @focusout="saveOption"
          maxlength="30"
          placeholder="Please input"
          show-word-limit
        />
      </div>
      <div class="message-detail_del" @click.stop="delScene">x</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, PropType, defineProps, ref, computed, watch, onBeforeMount } from "vue";
import { ISceneItem, TemplateTypeEnum, TemplateTypeEnumZh } from "@/interfaces/editor.interfaces";
import { EditorModule } from "@/store/modules/editor";
import { EditScene } from "@/api/editor";
import { ElMessage } from "element-plus";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(['cancel']);
const sceneData = ref<ISceneItem>({ content: '' } as ISceneItem);

watch(() => EditorModule.nodeItem.sceneList, (list) => {
  const optionItem = list?.find(val => val.id === props.id);
  if (optionItem) {
    sceneData.value = { ...optionItem };
  }
}, { deep: true })

onBeforeMount(() => {
  const optionItem = EditorModule.nodeItem.sceneList?.find(val => val.id === props.id);
  if (optionItem) {
    sceneData.value = { ...optionItem };
  }
})

const delScene = () => {
  emits('cancel');
}

const saveOption = async () => {
  const { id, bookId, chapterId, nodeId } = sceneData.value;
  console.log('sceneData.value------_>', sceneData.value)
  if (id && bookId && chapterId && nodeId) {
    await EditScene({ ...sceneData.value });
    await EditorModule.Init({ bookId, chapterId })
    EditorModule.SetActiveNodeId(nodeId);
  } else {
    ElMessage.error('Choice 数据异常')
  }
}

</script>

<style lang="less" scoped>
.option-wrap {
  width: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #FFFFFF;
  margin-top: 20px;
  box-shadow: 0 1px 4px #00152914;
  position: relative;

  .option-content {
    font-weight: 500;
    font-size: 14px;
    color: #5a5e66;

    .option-title {
      position: absolute;
      top: 0;
      left: 0;
      background-color: #9191fd;
      border-radius: 8px 0 16px 0;
      padding: 3px 20px;
      font-size: 14px;
      font-weight: bold;
      color: #FFFFFF;
    }

    .option-text {
      position: relative;
      padding: 30px 20px 20px;
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
