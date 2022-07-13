<template>
  <div class="message-detail-wrap">
    <div class="message-content">
      <div>
        <el-select v-model="dialogType">
          <el-option :label="'旁白'" :value="TemplateTypeEnum.旁白"/>
          <el-option :label="'内心独白'" :value="TemplateTypeEnum.内心独白"/>
          <el-option :label="'对话'" :value="TemplateTypeEnum.对话"/>
        </el-select>

        <el-select v-model="roleId" v-if="dialogType !== TemplateTypeEnum.旁白">
          <el-option
            v-for="character in characterList"
            :key="character.id"
            :label="character.characterName"
            :value="character.id"/>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, PropType, ref, defineProps } from "vue";
import { TemplateTypeEnum } from "@/interfaces/editor.interfaces";
import { ICharacterListItem } from "@/interfaces/character.interfaces";

const emits = defineEmits(['message', 'choice', 'link']);
const props = defineProps({
  characterList: Object as PropType<ICharacterListItem[]>
})

const dialogType = ref<TemplateTypeEnum>(TemplateTypeEnum.旁白)
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
    width: 200px;
    text-align: center;
  }
}
</style>
