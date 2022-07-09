<template>
  <div class="build-drama-page" @click="pageClick">
    <EditorRight/>
    <div class="content">
      <TopControl
          :showSelectWords="showSelectWords"
          :selectWords="selectWords"
          @save="saveText('clickSave')"
          @replace="replace"
      />
      <div class="content-center">
        <div class="editor-content">
          <!-- 编辑器 -->
          <div id="editorRefId"
               v-keyboard="{onkeydownEvent}"
               @mouseup="mouseup"
               ref="editorRef"
               v-html="initContent"
               @keyup="onContentChange"
               v-load="editorLoading"
               contenteditable="true">
          </div>
          <!-- 查询/替换 -->
          <SearchDialog
              :visible="isShowSearch"
              @changeText="changeText"
              @cancel="cancel"
              @determine="determine"
              @replaceFn="replaceFn"
              @replaceAll="replaceAll"
          />
        </div>

        <EditorLeft
            :disabled="!focusElementId"
            @typeChange="typeChange"
            :pressTabNum="pressTabNum"
            :typeList="typeList"
            :text-length="textLength"
            :title-list="titleList"
        />

      </div>
    </div>

    <!-- 类型菜单 -->  <!-- 联想菜单 -->
    <TypeMenu
      :visible="showMenu"
      :elPosition="getElPosition()"
      :typeList="dataList"
      @selectType="(item) => selectDecision(item)"
    />

  </div>
</template>

<script lang="ts" setup>
import TopControl from '@/views/gsEditor/part/topControl.vue'
import TypeMenu from "@/views/gsEditor/part/typeMenu.vue";
import SearchDialog from '@/views/gsEditor/part/searchDialog.vue'
import EditorLeft from '@/views/gsEditor/part/left.vue'
import EditorRight from '@/views/gsEditor/rightControl/right.vue'
import {
  getParentElement,
  getTextNumber,
  selectStartContext,
} from "@/utils/regs";
import { getEditorSceneList, getGuid } from "@/utils/resultModule";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { ClassNameTypeEnum, ClassNameTypeListEnum, LanguageType } from "@/store/modules/index.model";
import { ElNotification } from "element-plus";
import _ from "lodash";
import { useI18n } from "vue-i18n";
import { AppModule } from "@/store/modules/app";
import { KeyEventTypeEnum } from "@/plugins/directivesHub";
import {
  AssociationalWord,
  EditNode,
  IEditNodeParam,
} from "@/api/gsEditor";
import { ElMessageBox, ElMessage } from "element-plus/lib/components";
import { GSEditorModule } from "@/store/modules/gsEditor";
import storyBus from "@/utils/storyBus";
import { ListCharacter } from "@/api/characterCenter";

const { t } = useI18n()
const route = useRoute()
const expressionList1 = [ '无表情', '微笑', '皱眉', '挑逗', '尴尬', '焦虑', '震惊', '悲伤', '大笑', '害羞' ]
const expressionList2 = [ 'Neutral', 'Smile', 'Frown', 'Flirty', 'Awkward', 'Nervous', 'Shocked', 'Sad', 'Laugh', 'Shy' ]

const nodeObj = computed(() => GSEditorModule.nodeVOS.filter(val => String(val.id) === GSEditorModule.activeNodeId)[0]) // 节点id
const editorLoading = ref(false);
const bookId = computed(() => route.query.bookId as string) // 书籍id
const chapterId = computed(() => route.query.chapterId as string) // 章节id

const initContent = computed(() => {
  const defaultText = `<p class="sceneheading" id="${getGuid()}"><br></p>`;
  const nodeVosItem = GSEditorModule.nodeVOS.filter(val => String(val.id) === GSEditorModule.activeNodeId)
  if (nodeVosItem.length > 0) {
    return nodeVosItem[0].content || defaultText
  }
  return defaultText;
}) // 节点编辑器内容
const pressTabNum = ref(1) // 按tab键次数
const focusElementId = ref('') // 聚焦元素id
const focusElement = ref() // 聚焦元素

const typeList = ref([ 'SceneHeading', 'Narration', 'Character', 'Expression', 'Dialog', 'Monologue' ]) // 类型列表
const titleList = ref([ { titleId: getGuid(), sceneTitle: '' } ]) // 场景标题列表

const editorRef = ref<HTMLDivElement>() // 编辑器Ref

const textLength = ref(0) // 文本长度
const selectWords = ref(0) //
const showSelectWords = ref(false) // 是否展示选中字数长度
const showMenu = ref(false) //
const dataList = ref<string[]>([])

const menuType = ref('')
// const sceneList = ref<string[]>([]) // 场景列表
const characterList = ref<string[]>([]) // 人物列表
const expressionList = computed(() => AppModule.language === LanguageType.en ? expressionList2 : expressionList1) // 表情列表

const endOffset = ref(0)

const isShowSearch = ref(false)
const searchElement = ref()
const searchIndex = ref(0)

const typeChange = (val: string) => {
  pressTabNum.value = ClassNameTypeListEnum[val]
  if (focusElement.value) {
    focusElement.value.className = ClassNameTypeEnum[pressTabNum.value];
  }
}

// 获取聚焦元素
const getFocusElement = () => {
  const elem = window.getSelection()?.getRangeAt(0).endContainer as Element
  const { id = '', target } = getParentElement(elem)
  focusElement.value = target
  focusElementId.value = id
}

// 监听内容修改 文本长度 & 场景标题列表
const onContentChange = () => {
  if (editorRef.value) {
    const editorText = editorRef.value?.innerText.replace(/(&nbsp;)/g, ' ') || ''
    textLength.value = getTextNumber(editorText)
    titleList.value = getEditorSceneList()
  }
}

// 监听键盘事件
const onkeydownEvent = (event: KeyboardEvent, keyEventType: KeyEventTypeEnum) => {
  // 出现类型选项时按数字键控制
  if (showMenu.value) {
    if (event.key === '1' || event.key === '2' || event.key === '3' || event.key === '4' || event.key === '5' || event.key === '6' || event.key === '7') {
      showMenu.value && selectDecision(dataList.value[Number(event.key) - 1])
      event.preventDefault()
    }
  }

  showMenu.value = false
  if (isShowSearch.value) {
    return
  }
  // 修改编辑器场景标题同步到左侧标题列表
  if ((pressTabNum.value === 1 || pressTabNum.value === 6) && focusElementId.value) {
    updateTitle()
  }
  // 按Ctrl | command 和s键保存
  if (keyEventType === KeyEventTypeEnum.CtrlS) {
    saveText('clickSave')
  }
  // Shift+Tab，控制反向切换改变样式
  if (keyEventType === KeyEventTypeEnum.ShiftTab) {
    pressTabNum.value--
    if (pressTabNum.value < 1) {
      pressTabNum.value = 6
    }
    setElementAttribute('Tab')
  }
  // 监听tab键改变样式
  if (keyEventType === KeyEventTypeEnum.unShiftTab) {
    pressTabNum.value++
    if (pressTabNum.value > 6) {
      pressTabNum.value = 1
    }
    setElementAttribute('Tab')
  }
  // 监听Enter键添加类名和id
  if (event.key === 'Enter') {
    // 没有填写内容不允许换行
    if (focusElement.value && focusElement.value.textContent.length <= 0) {
      preventFocus()
      event.preventDefault()
      return
    }
    setElementAttribute('Enter')
  }
  // 监听删除事件
  if (event.key === 'Backspace') {
    // 第一行不允许删除
    const { children = [] } = event.srcElement as any
    if (children.length <= 1) {
      focusElementId.value = children[0].id
      focusElement.value = children[0]
      if (focusElement.value && focusElement.value.textContent.length <= 0) {
        event.preventDefault()
        return
      }
    }
  }

  setTimeout(() => {
    getFocusElement()
    if (!focusElement.value) {
      return
    }
    // 人物联想
    if (focusElement.value.className === 'character') {
      if (event.key === 'Tab' && characterList.value.length) {
        dataList.value = characterList.value
        menuType.value = 'character'
        showMenu.value = true
      } else if (focusElement.value.textContent.length === 1) {
        const list: string[] = []
        characterList.value.forEach(item => {
          if (item.slice(0, 1) === event.key.toUpperCase()) {
            list.push(item)
          }
        })
        if (list.length) {
          dataList.value = list
          menuType.value = 'character2'
          showMenu.value = true
        }
      }
    }
    if (event.key === '[') {
      if (characterList.value.length) {
        dataList.value = characterList.value
        menuType.value = 'character1'
        showMenu.value = true
      }
    }
    // 表情联想
    if (focusElement.value.className === 'expression' && (event.key === 'Tab' || event.key === 'Enter')) {
      dataList.value = expressionList.value
      menuType.value = 'expression'
      showMenu.value = true
    }
  }, 0)
}

const getElPosition = () => {
  const boundingClientRect = focusElement.value?.getBoundingClientRect()
  return {
    top: boundingClientRect ? boundingClientRect.top + 30 : 0,
    left: boundingClientRect ? boundingClientRect.left + boundingClientRect.width / 2 : 0
  }
}

watch(focusElementId, (val) => {
  if (val) {
    // 切换类型
    pressTabNum.value = ClassNameTypeEnum[focusElement.value.className] as unknown as number
  }
})

// 更新列表内容
const updateTitle = () => {
  setTimeout(() => {
    const titleEl = document.querySelector('#title' + focusElementId.value)
    const el = document.querySelector('#' + focusElementId.value)
    if (titleEl) {
      titleEl.innerHTML = el?.innerHTML || ''
    }
  })
}

// 取消
const cancel = () => {
  // 恢复文本
  if (searchElement.value) {
    // eslint-disable-next-line no-self-assign
    searchElement.value.node.textContent = searchElement.value.node.textContent
  }
  isShowSearch.value = false
}

// 获取鼠标选中文本，显示字数
const mouseup = () => {
  // 获取鼠标选中的文本内容
  const txt = window.getSelection()?.toString() || ((editorRef.value as any).selection && (editorRef.value as any).selection.createRange().text) || ''
  const length = getTextNumber(txt)
  if (length > 0) {
    selectWords.value = length
    showSelectWords.value = true
    setTimeout(() => {
      showSelectWords.value = false
    }, 3000)
  }
  const container = document.createElement('div');
  container.style.display = 'none';
  container.appendChild((window.getSelection() as any).getRangeAt(0).cloneContents());
}

// 获取联想词
const getAssociationalWord = async () => {
  const { figureBiographies = [] } = await ListCharacter(bookId.value as string)
  // const { sceneBiographies = [] } = await ListScene(bookId.value as string)
  // 人物联想词列表
  characterList.value = figureBiographies.map((cha: any) => cha.biographyName);
  // sceneList.value = sceneBiographies;
}
// 保存
const saveText = _.debounce(async (type?: string) => {
  await saveScript()
  if (type === 'clickSave') {
    ElNotification({
      title: t('common.saved'),
      message: '',
      type: 'success'
    })
  }
}, 1000)

const saveScript = async () => {
  editorLoading.value = true;
  const param = {
    ...nodeObj.value,
    options: undefined,
    bookId: bookId.value,
    chapterId: chapterId.value,
    content: editorRef.value?.innerHTML || `<p class="sceneheading" id="${getGuid()}"><br></p>`, // 节点内容
    totalNum: textLength.value, // 总字数
  } as IEditNodeParam;
  const editData = await EditNode({ ...param, })
  console.log('EditNode---content---------4029----->', editData)

  editorLoading.value = false;
  await GSEditorModule.GetNodeVOSList({ bookId: bookId.value, chapterId: chapterId.value });
  await GSEditorModule.GetSceneList(bookId.value as string);
  await GSEditorModule.GetCharacterList(bookId.value as string)
  // 更新人物联想词列表
  await getAssociationalWord()
}

// 页面点击事件
const pageClick = () => {
  showMenu.value = false
}

// 自动补全
const selectDecision = (text: string | any[]) => {
  if (menuType.value === 'scene1' || menuType.value === 'character2') {
    text = text.slice(1)
  }
  if (menuType.value === 'character1') {
    text = text + ']'
  }
  updateText(text)
  showMenu.value = false
  menuType.value = ''
  preventFocus()
  updateTitle()
}
const updateText = (text: string | any[]) => {
  const textContent = focusElement.value.textContent
  if (menuType.value === 'character' || menuType.value === 'expression') {
    focusElement.value.innerHTML = text
  } else if (textContent) {
    endOffset.value = window.getSelection()?.getRangeAt(0).endOffset || 0
    focusElement.value.innerHTML = textContent.slice(0, endOffset.value) + text + textContent.slice(endOffset.value)
  } else {
    focusElement.value.innerHTML = text
  }
}
// 聚焦到当前元素
const preventFocus = () => {
  // eslint-disable-next-line no-unused-expressions
  window.getSelection()?.collapse(focusElement.value, 1)
}
// 设置当前元素类名和id
const setElementAttribute = (type: string) => {
  setTimeout(() => {
    const guid = getGuid()
    // 获取选中元素
    const el = editorRef.value?.querySelector('#' + focusElementId.value) as Element
    // 回车自动切换样式
    if (type === 'Enter') {
      if ([ ClassNameTypeEnum.sceneheading, ClassNameTypeEnum.narrator, ClassNameTypeEnum.dialog, ClassNameTypeEnum.monologue ].indexOf(ClassNameTypeEnum[el.className]) !== -1) {
        pressTabNum.value = ClassNameTypeEnum.narrator;
      } else if (ClassNameTypeEnum[el.className] === ClassNameTypeEnum.character) {
        pressTabNum.value = ClassNameTypeEnum.expression;
      } else if (ClassNameTypeEnum[el.className] === ClassNameTypeEnum.expression) {
        pressTabNum.value = ClassNameTypeEnum.dialog;
      }
      if (pressTabNum.value === ClassNameTypeEnum.character) {
        dataList.value = characterList.value
        showMenu.value = true;
      }
    }
    // 选择元素添加的类
    const className = ClassNameTypeEnum[pressTabNum.value as ClassNameTypeEnum]
    if (type === 'Enter') {
      // 设置元素类名和id
      if (focusElementId.value) {
        (el.nextElementSibling as Element).className = className;
        (el.nextElementSibling as Element).id = guid
      }
    } else if (type === 'Tab') {
      if (el && focusElementId.value) {
        el.className = className
      }
    }
  }, 0)
}
// 文本改变
const changeText = () => {
  searchIndex.value = 0
  searchElement.value = void 0
}
// 查询按钮
const determine = (text?: string) => {
  if (!text) return
  const list = getSearchList(text)
  if (list.length) {
    if (searchIndex.value >= list.length) {
      searchIndex.value = 0
    } else {
      if (searchElement.value) {
        list[searchIndex.value - 1].node.textContent = searchElement.value.node.textContent
      }
    }
    searchElement.value = list[searchIndex.value]
    searchElement.value.node.innerHTML = searchElement.value.node.textContent.slice(0, searchElement.value.index) + `<b style="background-color: orange;">${text}</b>` + searchElement.value.node.textContent.slice(searchElement.value.index + text.length)

    // eslint-disable-next-line no-unused-expressions
    document.getElementById(searchElement.value.node.id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    })
    searchIndex.value++
  }
}

// 替换文本
const replace = () => {
  isShowSearch.value = true
}
// 替换当前
const replaceFn = (searchText: string, replaceText?: string) => {
  if (searchElement.value) {
    searchElement.value.node.innerHTML = searchElement.value.node.textContent.slice(0, searchElement.value.index) + replaceText + searchElement.value.node.textContent.slice(searchElement.value.index + searchText.length)
    setTimeout(() => {
      saveText()
    }, 0)
    searchElement.value = ''
    searchIndex.value = 0
  } else {
    ElNotification({
      title: t('common.searchMsg'),
      type: 'error'
    })
  }
}
// 替换全部
const replaceAll = (searchText: string, replaceText: string) => {
  if (!searchText) {
    ElNotification({
      title: t('common.searchMsg'),
      type: 'error'
    })
    return
  }
  const list = getSearchList(searchText)
  if (list.length) {
    list.forEach((item: any) => {
      item.node.innerHTML = item.node.textContent.slice(0, item.index) + replaceText + item.node.textContent.slice(item.index + searchText.length)
    })
    setTimeout(() => {
      saveText()
    }, 1000)
  } else {
    ElNotification({
      title: t('common.searchMsg'),
      type: 'error'
    })
  }
}
// 获取包含查询词的元素
const getSearchList = (text: string) => {
  const list: { node: { textContent: string | string[]; }; index: number; }[] = []
  const childNodesList = (editorRef.value as HTMLDivElement).childNodes || []
  childNodesList.forEach((item: { textContent: any; }): void => {
    let index = item.textContent.indexOf(text)
    while (index !== -1) {
      list.push({ node: item, index: index })
      index = item.textContent.indexOf(text, index + 1)
    }
  })
  return list
}

const pasteEvent = (e: Event & ClipboardEvent) => {
  e.preventDefault();
  const pasteText = (e?.clipboardData || window?.clipboardData).getData('text') || '';
  const selection = document.activeElement // 获取当前焦点所在元素
  if (!selection || selection.tagName.toUpperCase() === 'BODY') return false
  if (focusElement.value) {
    selectStartContext(focusElement.value, pasteText)
  }
}

const clickEvent = () => {
  endOffset.value = window.getSelection()?.getRangeAt(0).endOffset || 0
  // 获取当前聚焦元素
  getFocusElement()
}

onMounted(async () => {
  if (!editorRef.value) return;
  await getAssociationalWord()
  // 获取节点列表
  await GSEditorModule.GetNodeVOSList({ bookId: bookId.value as string, chapterId: chapterId.value as string });
  onContentChange();
  // 处理粘贴内容
  editorRef.value.addEventListener('paste', pasteEvent)
  // 获取编辑器添加点击事件，获取当前聚焦元素
  editorRef.value.addEventListener('click', clickEvent)
  storyBus.on('saveNode', saveNode as any)
})

const saveNode = async(id: string) => {
  await saveScript()
  GSEditorModule.SetActiveNodeId(id)
}

onBeforeUnmount(() => {
  if (!editorRef.value) return
  editorRef.value.removeEventListener('paste', pasteEvent)
  editorRef.value.removeEventListener('click', clickEvent)
  storyBus.off('saveNode', saveNode as any)
})

onBeforeRouteLeave(async (to, from, next) => {
  try {
    const param = {
      ...nodeObj.value,
      options: undefined,
      bookId: bookId.value,
      chapterId: chapterId.value,
      content: editorRef.value?.innerHTML || `<p class="sceneheading" id="${getGuid()}"><br></p>`, // 节点内容
      totalNum: textLength.value, // 总字数
    } as IEditNodeParam;
    await EditNode({ ...param, })
    next()
  } catch (e) {
    ElMessageBox.confirm('Some unknown error occurred, do you continue to jump？', 'Warning', {
      confirmButtonText: 'Yes',
      cancelButtonText: 'Try Again',
      type: 'warning',
    }).then(() => {
      next()
    }).catch(() => {
      ElMessage({
        type: 'info',
        message: 'Jump has been terminated, please try again',
      })
    })
  }
})

</script>

<style scoped src="./index.less" lang="less"></style>
