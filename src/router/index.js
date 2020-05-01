import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from '../components/Homepage'
import AddEvent from '../components/AddEvent'
import ViewEvent from '../components/ViewEvent'
import EventDetail from '../components/EventDetail'


Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/addevent',
      name: 'AddEvent',
      component: AddEvent
    },
    {
      path: '/viewevent',
      name: 'ViewEvent',
      component: ViewEvent
    },
    {
      path: '/viewevent/:id',
      name: 'EventDetail',
      component: EventDetail
    },
  ]
})