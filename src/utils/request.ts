import axios, { Method, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'
import { ElMessage, ElNotification } from 'element-plus';
import { getToken, getUserId } from '@/utils/cookies';
import router from '@/router';
import { UserModule } from '@/store/modules/user';

// 定义接口
interface PendingType {
  url?: string;
  method?: Method;
  params: any;
  data: any;
  cancel: () => void;
}

// 取消重复请求
const pending: PendingType[] = [];
const CancelToken = axios.CancelToken;
const Service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '' : '/dzapi',
  withCredentials: true,
  timeout: 5000
});

// 添加请求拦截器
Service.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    request.headers = {
      ...request.headers,
      userToken: getToken() || '',
      userId: getUserId() || ''
    }
    request.cancelToken = new CancelToken((c) => {
      pending.push({
        url: request.url,
        method: request.method,
        params: request.params,
        data: request.data,
        cancel: c
      });
    });
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
Service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      // if (response.data.retCode !== 0) {
      //   if (response.data.retCode === 6) {
      //     router.push({ path: '/login' })
      //     // 清除用户信息
      //     UserModule.ResetToken();
      //     ElMessage.error('登录失效');
      //   }
      //   ElNotification({
      //     message: response.data.retMsg,
      //     type: 'error'
      //   })
      //   return Promise.reject(response.data.retMsg)
      // }
      return Promise.resolve(response.data.data)
    } else if (response.status === 404) {
      router.push({ path: '/404' })
    }
  },
  (err: AxiosError) => {
    console.log('axios err--------------------------->', err)
    const navigator = window.navigator
    if (!navigator.onLine) {
      ElMessage.error('offline')
    } else if (err.response?.status === 401) {
      ElMessage.error('登录失效')
      // router.push({ path: '/401' })
    } else if (err.response) {
      const { data } = err.response
      ElMessage.error(data?.message)
    } else {
      ElMessage.error('network error')
    }
    return Promise.reject(err)
  }
);

export default Service
