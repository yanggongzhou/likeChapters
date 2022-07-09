import { Ref, ref } from "vue";
// 逐字显示
export const useVerbatim = (text: string): { txt: Ref<string> } => {
  const txt = ref('');
  const textData = text.split('');
  const timer = setInterval(() => {
    if (txt.value.length < text.length) {
      txt.value += textData[txt.value.length]
    } else {
      clearInterval(timer);
    }
  }, 300);

  return {
    txt
  }
}
