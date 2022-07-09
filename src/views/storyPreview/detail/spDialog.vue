<template>
  <div>
    <div class="p-dialog-box">
      <div class="chapter-name">CHAPTER-NAME</div>
      <div class="dialog-content">
        {{ txt }}
      </div>
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
  console.log('props.content===>', props.content)
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
.p-dialog-box {
  min-height: 100px;
  box-shadow: 0 1px 4px #00152914;
  position: absolute;
  width: 100%;
  left: 0;
  top: 50%;
  z-index: 999;
  background: url("../../../assets/spImg/dialog.png") no-repeat;
  background-size: 90% 100%;
  background-position: 50% 50%;
  box-sizing: border-box;
  .chapter-name {
    position: absolute;
    top: 16px;
    line-height: 20px;
    width: 90px;
    height: 20px;
    color: #FFF;
    font-size: 12px;
    font-weight: 600;
    left: calc(50% - 62px);
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .dialog-content {
    margin: 38px 12% 10px;
    font-size: 13px;
  }
}
</style>
