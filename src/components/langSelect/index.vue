<template>
  <el-dropdown class="lang-select" trigger="click" @command="handleSetLanguage">
    <div class="lang-select_icon gs-font gs-zhongwen" :class="{'gs-yingwen': language === LanguageType.en, 'gs-zhongwen': language === LanguageType.中文}"></div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in languages"
          :key="item.value"
          :command="item.value"
          :disabled="language===item.value">
          <div class="lang-select_icon gs-font gs-zhongwen" :class="{'gs-yingwen': item.value === LanguageType.en, 'gs-zhongwen': item.value === LanguageType.中文}"></div>
          <span style="margin-left: 20px">{{ item.name }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { AppModule } from '@/store/modules/app';
import { LanguageType } from '@/store/modules/index.model';

export default defineComponent({
  setup() {
    const { locale } = useI18n()
    const language = computed(() => AppModule.language)
    const state = reactive({
      languages: [{ name: 'en', value: LanguageType.en }, { name: '中文', value: LanguageType.中文 }],
      handleSetLanguage: (lang: LanguageType) => {
        locale.value = lang
        AppModule.SetLanguage(lang);
      }
    })
    return {
      ...toRefs(state),
      language,
      LanguageType
    }
  }
})

</script>

<style lang="less" scoped>
.lang-select {
  padding: 0 8px;
  font-size: 16px;
  color: #5a5e66;
  height: 45px;
  line-height: 45px;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
  .lang-select_icon {
    font-size: 20px;
    color: #9191fd;
    &:hover {
      color: #a2a2fd;
    }
  }
}
</style>
