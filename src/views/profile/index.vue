<template>
  <div class="profile-warp">
    <div class="profile-content">
      <div class="title">GS Editor</div>
      <el-form :model="nickNameForm" :rules="rules" ref="nickNameRef" label-width="200px" class="profile-form">
        <el-form-item :label="t('profile.email')">
          <div>{{ email }}</div>
        </el-form-item>
        <el-form-item :label="t('profile.nickName')" v-if="!isChangeNickName">
          <span style="margin-right: 10px">{{ nickNameForm.nickName }} </span>
          <el-button type="text" :icon="Edit" @click="changePsd(false)">{{ t('common.edit') }}</el-button>
        </el-form-item>
        <template v-else>
          <el-form-item :label="t('profile.nickName')" prop="nickName">
            <el-input v-model="nickNameForm.nickName" :placeholder="t('profile.nickName')" :maxlength="24"
                      clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitNickName">{{ t('common.confirm') }}</el-button>
            <el-button type="primary" @click="cancelNickName">{{ t('common.cancel') }}</el-button>
          </el-form-item>
        </template>
      </el-form>
      <el-form :model="passwordForm" :rules="rules" ref="passwordFormRef" label-width="200px" class="profile-form">
        <el-form-item :label="t('profile.password')" v-if="!isChangePsd">
          <el-button type="text" :icon="Edit" @click="changePsd(true)">{{ t('common.edit') }}</el-button>
        </el-form-item>

        <template v-else>
          <el-form-item :label="t('profile.newPassword')" prop="password">
            <el-input v-model="passwordForm.password" type="password" :placeholder="t('profile.newPassword')"
                      :maxlength="32" show-password clearable></el-input>
          </el-form-item>
          <el-form-item :label="t('profile.againPass')" prop="surePassword">
            <el-input v-model="passwordForm.surePassword" type="password" :placeholder="t('profile.againPass')"
                      :maxlength="32" show-password clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">{{ t('common.confirm') }}</el-button>
            <el-button type="primary" @click="submitCancel">{{ t('common.cancel') }}</el-button>
          </el-form-item>
        </template>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Edit } from '@element-plus/icons-vue'
import { ChangeUserInfo } from "@/api/login";
import { computed, reactive, ref } from 'vue';
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';
import { InternalRuleItem, Value } from 'async-validator/dist-types/interface';
import { UserModule } from '@/store/modules/user';
import { useI18n } from 'vue-i18n'
import { FormInstance } from '@/main';

const { t } = useI18n()
const router = useRouter();
const passwordFormRef = ref<FormInstance>();
const nickNameRef = ref<FormInstance>();
const email = computed(() => UserModule.userInfo.userName);
const isChangeNickName = ref(false);
const isChangePsd = ref(false);

const nickNameForm = reactive({
  nickName: computed(() => UserModule.userInfo.nickName).value
})

const passwordForm = reactive({
  password: '',
  surePassword: '',
});

const validatePass = (rule: InternalRuleItem, value: Value, callback: (error?: string | Error) => void) => {
  if (value === '') {
    callback(new Error(t('login.format2')));
  } else {
    if (!passwordFormRef.value) return
    passwordFormRef.value.validateField('surePassword', () => null);
    callback();
  }
};
const validatePass2 = (rule: InternalRuleItem, value: Value, callback: (error?: string | Error) => void) => {
  if (value === '') {
    callback(new Error(t('login.format2')));
  } else if (value !== passwordForm.password) {
    callback(new Error(t('login.format3')));
  } else {
    callback();
  }
};

const rules = reactive({
  nickName: [ { required: true, message: () => t('login.format4'), trigger: 'blur' } ],
  password: [ { required: true, validator: validatePass, trigger: 'blur' } ],
  surePassword: [ { required: true, validator: validatePass2, trigger: 'blur' } ],
});

const changePsd = (flag: boolean) => {
  isChangeNickName.value = !flag
  isChangePsd.value = flag
}

const submitForm = () => {
  if (!passwordFormRef.value) {
    return;
  }
  passwordFormRef.value.validate(async (valid) => {
    if (valid) {
      await ChangeUserInfo({ password: passwordForm.password })
      ElNotification.success({ message: t('profile.changeSuccessfully') })
      isChangePsd.value = false
      await UserModule.GetUserInfo()
    } else {
      console.log('error submit!!');
      return false;
    }
  });
};

const submitCancel = () => {
  isChangePsd.value = false;
}

const submitNickName = () => {
  if (!nickNameRef.value) {
    return;
  }
  nickNameRef.value.validate(async (valid) => {
    if (valid) {
      await ChangeUserInfo({ nickName: nickNameForm.nickName })
      ElNotification.success({ message: t('profile.changeSuccessfully') })
      isChangeNickName.value = false;
      await UserModule.GetUserInfo()
    } else {
      console.log('error submit!!');
      return false;
    }
  });
}
const cancelNickName = () => {
  isChangeNickName.value = false;
}

</script>

<style lang="less" scoped>
.profile-warp {
  //border-radius: 10px;
  //box-shadow: 0 0 4px gainsboro;
  //background-color: #FFFFFF;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .profile-content {
    width: 640px;
    height: 365px;
    border-radius: 10px;
    background-color: #FFFFFF;
    box-shadow: 0 0 4px gainsboro;
    color: #747679;
    padding: 20px;
    box-sizing: border-box;

    .title {
      font-size: 24px;
      font-weight: bold;
      padding: 10px;
      border-bottom: 2px solid #c0c4cc;
      margin-bottom: 20px;
      color: #9191fd;
    }

    .profile-form {
      /deep/ .el-form-item {
        margin-bottom: 24px;
      }

      /deep/ .el-input--suffix .el-input__inner {
        padding: 0 20px;
        box-shadow: none;
        background-color: #f1f1f1;
        border-radius: 10px;
      }

      /deep/ .el-textarea__inner {
        box-shadow: none;
        padding: 10px 20px;
        background-color: #f1f1f1;
        border-radius: 10px;
      }

      /deep/ .el-input .el-input__count .el-input__count-inner {
        background-color: #f1f1f1;
      }

      /deep/ .el-textarea .el-input__count {
        background-color: #f1f1f1;
      }
    }
  }

}
</style>
