<template>
  <div class="navbar">
    <div class="navbar-container">
      <SidebarLogo/>
      <LangSelect/>
      <div class="right-menu">
        <div>{{ t("navbar.welcome") }} <b>{{ userInfo.nickName }}</b></div>
        <el-dropdown
          class="avatar-container right-menu-item hover-effect"
          trigger="click"
        >
          <div class="avatar-wrapper">
            <img
              src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
              class="user-avatar"
              alt="user info"
            >
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <router-link to="/userInfo/profile">
                <el-dropdown-item>
                  <span class="nav-icon gs-font gs-profile"></span>
                  {{ t("navbar.profile") }}
                </el-dropdown-item>
              </router-link>
              <router-link to="/">
                <el-dropdown-item>
                  <span class="nav-icon gs-font gs-shouye"></span>
                  {{ t("navbar.dashboard") }}
                </el-dropdown-item>
              </router-link>
              <el-dropdown-item
                divided
                @click="logout"
              >
                <span class="nav-icon gs-font gs-dengchu"></span>
              <span style="display:block;">
                {{ t("navbar.logOut") }}
              </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarLogo from './SidebarLogo.vue'
import LangSelect from '@/components/langSelect'
import { computed, reactive, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { UserModule } from '@/store/modules/user';

export default {
  components: {
    LangSelect,
    SidebarLogo
  },
  setup() {
    const { t } = useI18n()
    const userInfo = computed(() => UserModule.userInfo)
    const state = reactive({
      logout: async () => {
        await UserModule.Logout();
      }
    })
    return {
      ...toRefs(state),
      t,
      userInfo
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  width: 100%;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  height: 65px;
  padding: 10px 40px;
  box-sizing: border-box;
  min-width: 1160px;
  .navbar-container {
    width: 100%;
    height: 45px;
    display: grid;
    grid-template-columns: 240px 40px auto;
    align-items: center;
  }

  .right-menu {
    display: flex;
    align-items: center;
    justify-content: end;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }

    }

    .avatar-container {
      .avatar-wrapper {
        margin-right: 16px;
        margin-left: 16px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          filter: hue-rotate(73deg);
        }
      }
    }
  }
}

.nav-icon {
  font-size: 18px;
  margin-right: 10px;
}
</style>
