import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from '@/router'

Vue.use(AclInstaller)

let initialRole = 'admin'
if(localStorage.getItem('userRole')) initialRole = localStorage.getItem('userRole')

console.log(initialRole);
export default new AclCreate({
  initial: initialRole,
  notfound: '/pages/not-authorized',
  router,
  acceptLocalRules: true,
  globalRules: {
    admin: new AclRule('admin').generate(),
    customer: new AclRule('customer').or('admin').generate(),
    public: new AclRule('public').or('admin').or('customer').generate(),
  }
})
