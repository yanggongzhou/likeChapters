import { Directive, DirectiveBinding, reactive, ref } from 'vue'

/**
 * 自定义指令 - 键盘事件
 */

export interface IBinding {
  onkeydownEvent: (event: KeyboardEvent, keyEventType:KeyEventTypeEnum) => void
  onkeyupEvent?: (e: KeyboardEvent) => void
}

export enum KeyEventTypeEnum {
  normal,
  CtrlS, // 按Ctrl | command 和s键保存
  ShiftTab, // Shift+Tab，控制反向切换改变样式
  unShiftTab, // 监听tab键改变样式
}

const codeData = reactive({
  code1: '', // 按键1
  code2: '', // 按键2
})

const elOnkeydown = function (event: KeyboardEvent, onkeydownEvent: IBinding['onkeydownEvent']) {
  if (!event) return
  event = event || window.event
  let keys = KeyEventTypeEnum.normal
  // 按Ctrl和s键保存
  if (event.key === 'Control') {
    codeData.code1 = 'Control'
  }
  if (event.key === 'Meta') {
    codeData.code1 = 'Meta'
  }
  if (event.key.toUpperCase() === 'S') {
    codeData.code2 = 'S'
  }
  if ((codeData.code1 === 'Control' || codeData.code1 === 'Meta') && codeData.code2 === 'S') {
    keys = KeyEventTypeEnum.CtrlS
    event.preventDefault()
  }

  // Shift+Tab，控制反向切换改变样式
  if (event.key === 'Shift') {
    codeData.code1 = 'Shift'
  }
  if (event.key === 'Tab') {
    codeData.code2 = 'Tab'
    if (codeData.code1 !== 'Shift') {
      keys = KeyEventTypeEnum.unShiftTab
    } else {
      keys = KeyEventTypeEnum.ShiftTab
    }
    event.preventDefault()
  }

  onkeydownEvent(event, keys)
}
// 键盘弹起事件
const elOnkeyup = function (event: KeyboardEvent, onkeyupEvent:IBinding['onkeyupEvent']) {
  if (event.key === 'Shift' || event.key === 'Control' || event.key === 'Meta') {
    codeData.code1 = ''
  }
  codeData.code2 = ''
  onkeyupEvent && onkeyupEvent(event)
}

export const keyboard: Directive = {
  mounted(el, binding: DirectiveBinding<IBinding>) {
    const { onkeydownEvent, onkeyupEvent } = binding.value
    el.onkeydown = (e: KeyboardEvent) => elOnkeydown(e, onkeydownEvent)
    el.onkeyup = (e: KeyboardEvent) => elOnkeyup(e, onkeyupEvent)
  },
  beforeUnmount(el, binding) {
    el.onkeydown = null
    el.onkeyup = null
  }
}
