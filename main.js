import App from './App'
import Vue from 'vue'
import { myRequest } from '@/util/api.js'
import { formatDate } from '@/util/time.js'	

Vue.prototype.$myRequest = myRequest
Vue.filter('formatDate', formatDate)

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({ ...App })
app.$mount()
