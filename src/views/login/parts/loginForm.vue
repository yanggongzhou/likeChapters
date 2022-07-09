<template>
  <div class="login-form-wrap">
    <div v-show="isLogin" class="welcome-back">{{ t('login.title') }}</div>
    <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-width="0px" class="form-content">
      <el-form-item prop="nickName" v-if="!isLogin">
        <el-input v-model="loginForm.nickName" :placeholder="t('login.penName')" :maxlength="24"
                  clearable></el-input>
      </el-form-item>
      <el-form-item prop="mail">
        <el-input v-model="loginForm.mail" type="email" :placeholder="t('login.email')" :maxlength="55"
                  clearable></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" :placeholder="t('login.password')"
                  :maxlength="32" show-password clearable></el-input>
      </el-form-item>
      <el-form-item prop="surePassword" v-if="!isLogin">
        <el-input v-model="loginForm.surePassword" type="password" :placeholder="t('login.againPass')"
                  :maxlength="32" show-password clearable></el-input>
      </el-form-item>
      <el-form-item prop="checked" v-if="!isLogin">
        <el-checkbox v-model="loginForm.checked"> {{ t('login.terms') }}</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">
          {{ isLogin ? t('login.logIn') : t('login.register') }}
        </el-button>
      </el-form-item>
    </el-form>
    <div class="other-msg">
      <span @click="isLogin = !isLogin">{{ isLogin ? t('login.tip1') : t('login.account') }}</span>
      <el-divider direction="vertical"></el-divider>
      <span @click="forgetFn">{{ t('login.tip2') }}</span>
    </div>
    <TermsOfUs :visible="isShow" @close="isShow = false"></TermsOfUs>
  </div>
</template>

<script lang="ts" setup>
import TermsOfUs from './termsOfUse.vue'
import { Register } from '@/api/login';
import { h, reactive, ref, watch } from 'vue';
import { ElMessage, ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';
import { InternalRuleItem, Value } from 'async-validator/dist-types/interface';
import { UserModule } from '@/store/modules/user';
import { ILoginForm, IRegisterParam } from '@/views/login/index.model';
import { useI18n } from 'vue-i18n'
import { FormInstance } from '@/main';

const { t } = useI18n()
const router = useRouter();
const loginFormRef = ref<FormInstance>();
const loginForm = reactive({
  nickName: '',
  mail: '',
  password: '',
  surePassword: '',
  checked: false
});
const isShow = ref<boolean>(false);
const isLogin = ref<boolean>(true);

const validatePass = (rule: InternalRuleItem, value: Value, callback: (error?: string | Error) => void) => {
  if (value === '') {
    callback(new Error(t('login.format2')));
  } else {
    if (!isLogin.value && loginForm.surePassword !== '') {
      if (!loginFormRef.value) return
      loginFormRef.value.validateField('surePassword', () => null);
    }
    callback();
  }
};
const validatePass2 = (rule: InternalRuleItem, value: Value, callback: (error?: string | Error) => void) => {
  if (value === '') {
    callback(new Error(t('login.format2')));
  } else if (value !== loginForm.password) {
    callback(new Error(t('login.format3')));
  } else {
    callback();
  }
};

const rules = reactive({
  nickName: [ { required: true, message: () => t('login.format4'), trigger: 'blur' } ],
  mail: [ {
    required: true,
    message: () => t('login.format1'),
    trigger: 'blur'
  } ],
  password: [ { required: true, validator: validatePass, trigger: 'blur' } ],
  surePassword: [ { required: true, validator: validatePass2, trigger: 'blur' } ],
  checked: [ { required: true, message: () => t('login.format5'), trigger: 'change' } ]
});

watch(() => loginForm.checked, (news) => {
  isShow.value = news;
});

const submitForm = () => {
  if (!loginFormRef.value) {
    return;
  }
  loginFormRef.value.validate((valid) => {
    if (valid) {
      isLogin.value ? loginFn() : register();
    } else {
      console.log('error submit!!');
      return false;
    }
  });
};
const register = async () => {
  try {
    const { nickName, mail, password } = loginForm;
    await Register({ nickName, userName: mail, password } as IRegisterParam);
    ElMessage.success(t('login.registered'));
    isLogin.value = true;
  } catch (e) {
    ElNotification({
      title: e.retMsg,
      type: 'error'
    });
  }
};

const loginFn = async () => {
  const { mail, password } = loginForm;
  await UserModule.Login({
    userName: mail,
    password
  } as ILoginForm)
  ElNotification({
    title: t('login.loginSuccessfully'),
    message: t('login.loginSucWel'),
    type: 'success'
  });
  await router.push('/')
};

const forgetFn = () => {
  ElNotification.info({
    title: t('login.tip2'),
    dangerouslyUseHTMLString: true,
    message: t('login.forgetPsdMsg')
  });
};

</script>

<style scoped lang="less" src="../index.less"></style>
