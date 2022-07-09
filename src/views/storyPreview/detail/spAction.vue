<template>
  <div class="sp-action-box">
    <div class="dialog-content">
      {{ txt }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, defineProps, watch } from "vue";

const props = defineProps({
  content: String
})

watch(() => props.content, (value) => {
  if (value) setTxt(value)
})
const txt = ref('')

onMounted(() => {
  if (props.content) setTxt(props.content)
})

const setTxt = (text: string) => {
  txt.value = '';
  const textData = text.split('');
  const timer = setInterval(() => {
    if (txt.value.length < text.length) {
      txt.value += textData[txt.value.length]
    } else {
      clearInterval(timer);
    }
  }, 20);
}

</script>

<style lang="less" scoped>
.sp-action-box {
  min-height: 100px;
  box-shadow: 0 1px 4px #00152914;
  position: absolute;
  width: 100%;
  left: 0;
  top: 50%;
  z-index: 999;
  background: url("../../../assets/spImg/action.png") no-repeat;
  background-size: 90% 100%;
  background-position: 50% 50%;
  box-sizing: border-box;
  .dialog-content {
    margin: 20px 12% 10px;
    font-size: 13px;
  }
}
</style>
