import { computed, Directive } from 'vue'
import { UserModule } from '@/store/modules/user';

export const permission: Directive = {
  mounted(el, binding) {
    const { value } = binding
    const roles = computed(() => UserModule.permission) as unknown as string[]
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some((role: any) => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission) {
        el.style.display = 'none'
      }
    } else {
      throw new Error('need roles! Like v-permission="[\'admin\',\'editor\']"')
    }
  }
}
