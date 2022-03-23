import App from './App'
import Vue from 'vue'
import { myRequest } from '@/util/api.js'

Vue.prototype.$myRequest = myRequest

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({ ...App })
app.$mount()
