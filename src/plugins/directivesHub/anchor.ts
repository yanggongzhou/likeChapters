import { Directive, DirectiveBinding } from 'vue'

/**
 * 自定义指令 - 锚点
 */

export const anchor: Directive = {
  mounted(el, binding: DirectiveBinding<string>) {
    const id = binding.value
    el.onclick = function () {
      const { offsetTop = 0 } = document.getElementById(id) as HTMLElement
      const targetDom = document.getElementById(id)
      if (targetDom && targetDom.scrollIntoView) {
        targetDom.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        })
      } else {
        document.documentElement.scrollTop = offsetTop
      }
    }
  }
}
