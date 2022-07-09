<template>
  <div class="errPage-container">
    <el-button
      :icon="Back"
      class="back-btn"
      @click="back"
    >
      返回
    </el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">
          Oops!
        </h1>
        <h2>你没有权限去该页面</h2>
        <el-button v-waves type="text">回首页</el-button>
      </el-col>
      <el-col :span="12">
        <img
          :src="errGif"
          class="some-gif"
          width="313"
          height="428"
          alt="Girl has dropped her ice cream."
        >
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import errGif from '@/assets/404-images/401.gif'
import { useRoute, useRouter } from 'vue-router'
import { Back } from '@element-plus/icons-vue'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()

    const data = reactive({
      errGif: errGif + '?' + +new Date(),
      back() {
        if (route.query.noGoBack) {
          router.push({ path: '/homePage' }).catch(err => {
            console.warn(err)
          })
        } else {
          router.go(-1)
        }
      }
    })

    return { ...toRefs(data), Back }
  }
})

</script>

<style lang="less" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;

  .back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }

  .some-gif {
    margin: 0 auto;
    display: block;
  }

  .some-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }

  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
}
</style>
