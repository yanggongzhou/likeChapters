<template>
  <div class="wang_editor_content">
    <div id="editor"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, PropType, ref, watch, } from 'vue'
import E from 'wangeditor'
import hljs from 'highlight.js'
import i18next from "i18next";
import { getLanguage } from "@/utils/cookies";
import { LanguageType } from "@/store/modules/index.model";

export default defineComponent({
  name: 'wangEditor',
  emits: [
    'update:modelValue',
    'onClear',
    'html',
    'text',
    'onFocus',
    'onBlur',
    'linkImgCallback',
    'lineVideoCallback',
    'customUploadImg',
    'customUploadVideo',
    'customInsertVideo',
  ],
  props: {
    // 是否禁用编辑器
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    // 富文本内容
    modelValue: {
      type: String as PropType<string>,
      default: '',
    },
    // 是否编辑内容
    isEditor: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    // 富文本高度
    height: {
      type: Number as PropType<number>,
      default: 400,
    },
    // 富文本z-index
    zIndex: {
      type: Number as PropType<number>,
      default: 500,
    },
    // 富文本placeholder
    placeholder: {
      type: String as PropType<string>,
      default: '请输入文本内容',
    },
    // 是否自动获取焦点
    focus: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    // 是否显示全屏按钮
    showFullScreen: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    // 自定义菜单
    menus: {
      type: Array as PropType<string[]>,
      default: () => [
        'image', // 插入图片
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'indent', // 缩进
        'lineHeight', // 行高
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        // 'link', // 插入链接
        // 'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        // 'table', // 表格
        // 'code', // 插入代码
        'splitLine', // 分割线
        'undo', // 撤销
        'redo', // 重复
      ],
    },
    // 自定义字体
    fontNames: {
      type: Array as PropType<string[]>,
      default: () => [
        '黑体',
        '仿宋',
        '楷体',
        '标楷体',
        '华文仿宋',
        '华文楷体',
        '宋体',
        '微软雅黑',
        'Arial',
        'Tahoma',
        'Verdana',
        'Times New Roman',
        'Courier New',
      ],
    },
    // 配置触发onchange的事件频率，默认为200ms
    changeTimeout: {
      type: Number as PropType<number>,
      default: 200,
    },
    // 关闭粘贴样式的过滤
    pasteFilterStyle: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    // 忽略粘贴内容中的图片
    pasteIgnoreImg: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    // 限制图片大小
    uploadImgMaxSize: {
      type: Number as PropType<number>,
      default: 10,
    },
    // 限制类型
    accept: {
      type: Array as PropType<string[]>,
      default: () => [ 'jpg', 'jpeg', 'png', 'gif', 'bmp' ],
    },
    // 最多一次上传几张图片
    uploadImgMaxLength: {
      type: Number as PropType<number>,
      default: 100,
    },
    // 隐藏插入网络图片
    showLinkImg: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  setup(props, ctx) {
    const editor = ref()

    onMounted(() => {
      editor.value = new E('#editor')
      // 选择语言
      editor.value.config.lang = getLanguage() === LanguageType.en ? 'en' : 'zh-CN';
      editor.value.i18next = i18next;
      // 设置代码高亮
      editor.value.highlight = hljs

      // 设置富文本高度
      editor.value.config.height = props.height

      // 设置富文本z-index
      editor.value.config.zIndex = props.zIndex

      // placeholer
      editor.value.config.placeholder = props.placeholder

      // 取消自动 focus
      editor.value.config.focus = props.focus

      // 配置全屏功能按钮是否展示
      editor.value.config.showFullScreen = props.showFullScreen

      // 关闭粘贴样式过滤
      editor.value.config.pasteFilterStyle = props.pasteFilterStyle

      // 忽略粘贴内容中的网络图片
      editor.value.config.pasteIgnoreImg = props.pasteIgnoreImg

      // 隐藏插入网络图片功能
      editor.value.config.showLinkImg = props.showLinkImg

      // 设置限制图片大小默认为5M
      editor.value.config.uploadImgMaxSize =
          props.uploadImgMaxSize * 1024 * 1024

      // 一次最多上传几张图片
      editor.value.config.uploadImgMaxLength = props.uploadImgMaxLength

      // 限制图片类型
      editor.value.config.uploadImgAccept = props.accept

      // 自定义菜单
      editor.value.config.menus = props.menus

      // 配置字体
      editor.value.config.fontNames = props.fontNames

      // 插入代码语言配置
      editor.value.config.languageType = [
        'Bash',
        'C',
        'C#',
        'C++',
        'CSS',
        'Java',
        'JavaScript',
        'JSON',
        'TypeScript',
        'Plain text',
        'Html',
        'XML',
        'SQL',
        'Go',
        'Kotlin',
        'Lua',
        'Markdown',
        'PHP',
        'Python',
        'Shell Session',
        'Ruby',
      ]

      // 配置键位空格
      editor.value.config.languageTab = '    '

      // 配置change触发的时间频率
      editor.value.config.onchangeTimeout = props.changeTimeout

      // 获取文本内容
      editor.value.config.onchange = (html: string) => {
        ctx.emit('update:modelValue', html)
      }

      // 获取焦点
      editor.value.config.onfocus = (html: string) => {
        ctx.emit('onFocus', html)
      }
      // 失去焦点
      editor.value.config.onblur = (html: string) => {
        ctx.emit('onBlur', html)
      }

      // 插入网络图片回调事件
      editor.value.config.linkImgCallback = (src: string, alt: string, href: string) => {
        ctx.emit('linkImgCallback', { src, alt, href })
      }

      // 自定义检查插入视频的回调
      editor.value.config.onlineVideoCallback = function (video: string) {
        ctx.emit('lineVideoCallback', video)
      }

      // 清空内容
      ctx.emit('onClear', editor.value.txt.clear)

      // 获取html内容
      ctx.emit('html', editor.value.txt.html)

      // 获取text文本
      ctx.emit('text', editor.value.txt.text)

      // 自定义图片上传
      editor.value.config.customUploadImg = (resultFiles: File[], insertImgFn: (url: string) => void) => {
        ctx.emit('customUploadImg', { resultFiles, insertImgFn })
      }

      // 自定义视频上传
      editor.value.config.customUploadVideo = (resultFile: File[], insertVideoFn: (url: string) => void) => {
        ctx.emit('customUploadVideo', { resultFile, insertVideoFn })
      }

      // 自定义插入视频播放器
      editor.value.config.customInsertVideo = (videoUrl: string) => {
        ctx.emit('customInsertVideo', videoUrl)
      }

      props.disabled ? editor.value.disable() : editor.value.enable()

      editor.value.create()

      onUnmounted(() => {
        editor.value.destroy()
      })
      editor.value.txt.html(props.modelValue || '')
    })
    watch(() => props.modelValue, (val) => {
      if (props.isEditor) {
        if (val) {
          editor.value.txt.html(val)
        }
      }
    })

    const html = (html: string) => {
      editor.value.txt.html(html)
    }

    return {
      html,
      editor
    }
  },
})
</script>

<style scoped lang="less">
.wang_editor_content {
  height: calc(100% - 150px);
  #editor {
    height: 100%;
  }
  /deep/.w-e-text-container {
    min-height: 300px;
    height: 100% !important;
  }
  /deep/.w-e-menu {
    .w-e-panel-container {
      .w-e-panel-tab-title {
        display: none;
      }
    }
  }
}
</style>
