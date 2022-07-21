<template>
  <div class="tag-wrap" @click="goToBranch">
    <div class="tag-content_left">
      <span class="title">Branch</span>
      <el-tag class="tag" v-for="val in 3" :key="val" closable type="danger" effect="Dark">choice {{ val }}</el-tag>
    </div>
    <div class="del-btn" @click.stop="delBranch">x</div>
  </div>
</template>
<script lang="ts" setup>

const delBranch = () => {
  console.log('delBranch-----_>',)
}
const goToBranch = () => {
  console.log('goToBranch-----_>',)
}

</script>

<style lang="less" scoped>
.tag-wrap {
  padding: 10px 20px;
  box-sizing: border-box;
  background-color: #ffe0f1;
  margin-top: 20px;
  box-shadow: 0 1px 4px #00152914;
  border-radius: 8px;
  cursor: pointer;
  position: relative;

  .tag-content_left {
    .title {
      font-size: 16px;
      font-weight: 500;
      margin-right: 10px;
      color: #dd2796;
    }
    .tag {
      margin-left: 10px;
    }
  }
  .del-btn {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    width: 30px;
    height: 20px;
    background-color: #ff3434;
    color: #FFFFFF;
    border-radius: 0 8px;
    text-align: center;
    transition: opacity 0.5s;
    opacity: 0;
  }
  &:hover {
    .del-btn {
      opacity: 1;
    }
  }
}
</style>
