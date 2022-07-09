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

// 获取当前光标位置
export const getCursortPosition = function (element: Element) {
  let caretOffset = 0;
  const doc = element?.ownerDocument || element;
  const win = window;
  let sel;
  if (typeof win.getSelection !== "undefined") { // 谷歌、火狐
    sel = win.getSelection() as Selection;
    if (sel.rangeCount > 0) { // 选中的区域
      const range = (win.getSelection() as Selection).getRangeAt(0);
      const preCaretRange = range.cloneRange();// 克隆一个选中区域
      preCaretRange.selectNodeContents(element);// 设置选中区域的节点内容为当前节点
      preCaretRange.setEnd(range.endContainer, range.endOffset); // 重置选中区域的结束位置
      caretOffset = preCaretRange.toString().length;
    }
  } else if ((sel = (doc as any).selection) && sel.type !== "Control") { // IE
    const textRange = sel.createRange();
    const preCaretTextRange = (doc.body as any).createTextRange();
    preCaretTextRange.moveToElementText(element);
    preCaretTextRange.setEndPoint("EndToEnd", textRange);
    caretOffset = preCaretTextRange.text.length;
  }
  return caretOffset;
}
// 设置光标位置
export const setCaretPosition = function (element: Element, pos: number) {
  let range, selection;
  // Firefox, Chrome, Opera, Safari, IE 9+
  if (document.createRange) {
    range = document.createRange();// 创建一个选中区域
    range.selectNodeContents(element);// 选中节点的内容
    if (element.innerHTML.length > 0) {
      range.setStart(element.childNodes[0], pos); // 设置光标起始为指定位置
    }
    range.collapse(true); // 设置选中区域为一个点
    selection = window.getSelection() as Selection;// 获取当前选中区域
    selection.removeAllRanges();// 移出所有的选中范围
    selection.addRange(range);// 添加新建的范围
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  } else { // @ts-ignore
    if (document.selection) { // IE 8 and lower
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      range = document.body.createTextRange(); // Create a range (a range is a like the selection but invisible)
      range.moveToElementText(element);// Select the entire contents of the element with the range
      range.collapse(false);// collapse the range to the end point. false means collapse to end rather than the start
      range.select();// Select the range (make it the visible selection
    }
  }
}
// 光标内容替换
// 传入id和内容
export const selectStartContext = (dom: HTMLDivElement, text: string) => {
  const range = window.getSelection()?.getRangeAt(0) as Range;
  // 光标开始的下标
  const startPos = range?.startOffset || 0;
  // 光标结束的下标
  const endPos = range?.endOffset || 0;
  if (startPos === undefined || endPos === undefined) return;
  // 获取dom中的值
  const txt = range?.commonAncestorContainer?.textContent || '';
  // 光标开始跟结束之间内容替换
  dom.innerText = txt.substring(0, startPos) + text + txt.substring(endPos);
  dom.focus();
  // 设置光标的位置设为添加内容后的位置
  setTimeout(() => {
    setCaretPosition(dom, startPos + text.length)
  }, 0)
}
