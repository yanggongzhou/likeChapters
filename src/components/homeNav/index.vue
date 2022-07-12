<template>
  <div class="home-nav">
    <el-menu
        class="menu-container"
        active-text-color="#000000"
        text-color="#5a5e66"
        :default-active="activeName"
        @select="onSelect"
    >
      <el-menu-item :index="HomeNavActiveType.authorCenter">
        <el-icon>
          <document/>
        </el-icon>
        <span style="margin-left: 20px">{{ t('book.authorCenter') }}</span>
      </el-menu-item>

      <el-menu-item :index="HomeNavActiveType.materialCenter">
        <el-icon>
          <setting/>
        </el-icon>
        <span style="margin-left: 20px">{{ t('book.materialCenter') }}</span>
      </el-menu-item>
    </el-menu>
  </div>

</template>

<script lang="ts" setup>
import { AppModule } from '@/store/modules/app';
import { HomeNavActiveType } from '@/store/modules/index.model';
import { useI18n } from 'vue-i18n';
import { useRouter } from "vue-router";

const router = useRouter();
const { t } = useI18n();

const activeName = AppModule.homeNavActive
const onSelect = (index: HomeNavActiveType) => {
  if (index === HomeNavActiveType.materialCenter) {
    router.push({ name: 'materialCenter' })
  } else {
    AppModule.SetHomeNavActive(index)
  }
}

</script>

<style lang="less" scoped>
.home-nav {
  border-radius: 10px;
  box-shadow: 0 1px 6px #00152914;
  height: 100%;
  padding: 20px;
  background-color: #ffffff;
  box-sizing: border-box;

  .menu-container {
    background-color: #ffffff;
    border-right: none;
  }

  /deep/ .el-menu-item {
    margin-bottom: 15px;
    border-radius: 8px;
    transition: box-shadow .5s;
    font-size: 16px;
    font-weight: 600;

    &:hover {
      background-color: transparent;
      box-shadow: 0 1px 4px #c2c2fe;
    }
  }

  /deep/ .el-menu-item.is-active {
    background-color: #c2c2fe;
    color: #fff;
  }
}
</style>
