import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import SurveyEditor from '../views/SurveyEditor.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: SurveyEditor
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
