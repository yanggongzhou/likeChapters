// 获取字符串长度
export function getTextNumber(str: string): number {
  const reg = /[a-zA-Z]+/ig
  const reg1 = /[\u4e00-\u9fa5]+/ig
  const reg2 = /[0-9]+/ig
  const enLength = str.match(reg)?.length || 0
  const zhLength = str.match(reg1)?.join('').length || 0
  const numLength = str.match(reg2)?.length || 0
  return enLength + zhLength + numLength
}

// 获取父元素
export const getParentElement = (node: Element): { id: string; target: EventTarget } => {
  if (node.tagName === 'P' && node.id) {
    return {
      id: node.id,
      target: node
    }
  } else {
    return getParentElement(node.parentElement as Element)
  }
}
