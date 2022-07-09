import { ElMessage } from 'element-plus';
import * as NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { Router } from 'vue-router';
import { getToken } from '@/utils/cookies';
import { UserModule } from '@/store/modules/user'; // get token from cookie

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login', '/404', '/401']; // no redirect whitelist

export function createRouterGuards (router: Router): void {
  router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start();
    // determine whether the user has logged in
    const hasToken = getToken();
    return next()
    if (hasToken) {
      if (to.path === '/login') {
        // if is logged in, redirect to the home page
        next({ path: '/' });
        NProgress.done();
      } else {
        const hasGetUserInfo = UserModule.userInfo && UserModule.userInfo.userId;
        if (hasGetUserInfo) {
          next();
        } else {
          try {
            // get user info
            await UserModule.GetUserInfo()
            next();
          } catch (error) {
            // remove token and go to login page to re-login
            await UserModule.ResetToken();
            ElMessage.error(error || 'Has Error');
            // next(`/login?redirect=${to.path}`);
            next('/404')
            NProgress.done();
          }
        }
      }
    } else {
      /* has no token */
      if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next();
      } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  });

  router.afterEach(() => {
    // finish progress bar
    NProgress.done();
  });
  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
