<!--
 * @Description: 面包屑组件 这个很垃圾需要重构
-->
<template>
  <el-breadcrumb
      class="app-breadcrumb"
      :separator-icon="ArrowRight">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
          v-for="(item, index) in breadcrumbs"
          :key="item">
        <a class="breadcrumb-item"
           :class="{'breadcrumb-item_last-child': index !== 0 && index === breadcrumbs.length - 1}"
           @click.prevent="handleLink(item, index)">
          <div class="breadcrumb-item_icon" v-if="BookRouteNameEnum.首页 === item">
            <el-icon>
              <home-filled/>
            </el-icon>
          </div>
          {{ t('route.' + item) }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { BookRouteNameEnum } from "@/router/index.model";

const router = useRouter()
const route = useRoute()

const breadcrumbs = ref<string[]>([])

const getBreadcrumb = (name: string | symbol | null | undefined) => {
  switch (name) {
    case BookRouteNameEnum.首页:
      breadcrumbs.value = [ BookRouteNameEnum.首页 ];
      break;
    case BookRouteNameEnum.书籍:
      breadcrumbs.value = [ 'book', BookRouteNameEnum.书籍 ];
      break;
    case BookRouteNameEnum.书籍编辑:
      breadcrumbs.value = [ BookRouteNameEnum.首页, BookRouteNameEnum.书籍编辑 ];
      break;
    case BookRouteNameEnum.角色:
      breadcrumbs.value = [ BookRouteNameEnum.首页, BookRouteNameEnum.书籍, BookRouteNameEnum.角色 ];
      break;
    case BookRouteNameEnum.编辑器:
      breadcrumbs.value = [ BookRouteNameEnum.首页, BookRouteNameEnum.书籍, BookRouteNameEnum.编辑器 ];
      break;
    case BookRouteNameEnum.编导:
      breadcrumbs.value = [ BookRouteNameEnum.首页, BookRouteNameEnum.书籍, BookRouteNameEnum.编导 ];
      break;
    case BookRouteNameEnum.素材中心:
      breadcrumbs.value = [ BookRouteNameEnum.首页, BookRouteNameEnum.素材中心 ];
      break;
    case BookRouteNameEnum.个人中心:
      breadcrumbs.value = [ BookRouteNameEnum.首页, BookRouteNameEnum.个人中心 ];
      break;
    default:
      breadcrumbs.value = [ BookRouteNameEnum.首页 ];
      break;
  }
}
const { t } = useI18n()
const handleLink = (item: string, index: number) => {
  if (index !== 0 && index === breadcrumbs.value.length - 1) return
  router.push({ name: item, query: { ...route.query } })
}
onBeforeMount(() => {
  getBreadcrumb(route.name)
})

watch(() => route.name, (routeName) => {
  getBreadcrumb(routeName)
})

</script>

<style lang="less" scoped>
// breadcrumb
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all .5s;
}

.breadcrumb-leave-active {
  position: absolute;
}

.app-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 60px;
  margin-left: 20px;

  .breadcrumb-item {
    font-weight: 500 !important;
    position: relative;
    padding: 5px 20px;
    background-color: #fff;
    border-radius: 14px;
    cursor: pointer !important;
    transition: color .3s;

    &:hover {
      color: #9191fd;
    }

    .breadcrumb-item_icon {
      border-radius: 20px;
      width: 30px;
      height: 30px;
      background: linear-gradient(to top, #9191fd, #f1f1ff);
      color: #fff;
      font-size: 18px;
      line-height: 33px;
      text-align: center;
      position: absolute;
      left: -20px;
      top: 0;
    }
  }

  .breadcrumb-item_last-child {
    background-color: transparent;
    cursor: default;
  }
}
</style>
