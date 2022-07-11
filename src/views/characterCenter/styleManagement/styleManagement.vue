<template>
  <div class="style-management">
    <div class="title">
      <div class="title_icon">
        <el-icon><shop /></el-icon>
      </div>
      {{ t('characterCenter.characterStyleManagement') }}
    </div>
    <div class="avatar-content">
      <div class="avatar-item" v-for="val in styleData" :key="val.id">
        <Avatar
            :width="140"
            :dataSource="val"
            @click="avatarSelect(val)"
        ></Avatar>
        <div class="avatar-item_tools">
          <el-icon :size="20" v-waves  @click.stop="editAvatar(val)">
            <edit />
          </el-icon>
        </div>

      </div>
      <div class="avatar-add" @click="addAvatar">
        <el-icon><circle-plus-filled /></el-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Avatar from '@/components/avatar/avatar.vue'
import { CharacterCenterModule } from "@/store/modules/characterCenter";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { IDressUpItem } from "@/interfaces/character.interfaces";

const { t } = useI18n()
const addAvatar = () => {
  CharacterCenterModule.ResetCharacterCenter()
  CharacterCenterModule.SetIsShowStyleManagement(false)
}
const editAvatar = (item: IDressUpItem) => {
  CharacterCenterModule.ReplaceStyleItem(item);
  CharacterCenterModule.SetIsShowStyleManagement(false)
}
const styleData = computed(() => CharacterCenterModule.characterDetail.styles)

const avatarSelect = (item: IDressUpItem) => {
  CharacterCenterModule.ReplaceStyleItem(item);
}
</script>

<style lang="less" scoped>
.style-management {
  margin: 20px;
  height: calc(100% - 40px);
  .title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    .title_icon {
      border-radius: 20px;
      width: 35px;
      height: 35px;
      background: linear-gradient(to top, #9191fd, #f1f1ff);
      color: #fff;
      font-size: 20px;
      line-height: 40px;
      text-align: center;
      margin-right: 15px;
    }
  }
  .avatar-content {
    display: flex;
    flex-wrap: wrap;
    font-size: 0;
    padding-top: 40px;
    height: calc(100vh - 300px);
    overflow-y: auto;
  }
  .avatar-item, .avatar-add {
    position: relative;
    width: 200px;
    height: 314px;
    border: 1px solid transparent;
    border-radius: 8px;
    background: linear-gradient(to top, #e7e7ff, white) no-repeat;
    margin: 10px;
    cursor: pointer;
    position: relative;

    .avatar-item_tools {
      opacity: 0;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      transition: opacity .3s;

      /deep/ .el-icon {
        cursor: pointer;
        padding: 5px;
        transition: background-color .3s;
        border-radius: 3px;
        color: #9191fd;
        &:hover {
          background-color: #70707038;
        }
      }
    }
    &:hover .avatar-item_tools{
      opacity: 1;
    }
  }
  .avatar-add {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 40px;
    color: #9191fd;
    cursor: pointer;
  }
}
</style>
