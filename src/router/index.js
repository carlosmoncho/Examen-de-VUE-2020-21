import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Empresas from '../views/Empresas.vue'
import NuevaOferta from '../views/NuevaOferta.vue'
import OfertasTable from '../views/OfertasTable.vue'
import EmpresaView from '../views/EmpresaView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/Empresas',
    name: 'Empresas',
    component: Empresas
  },
  {
    path: '/NuevaOferta',
    name: 'NuevaOferta',
    component: NuevaOferta,
  },
  {
    path: '/NuevaOfertaEdit/:id',
    name: 'NuevaOfertaEdit',
    component: NuevaOferta,
    props: true,
  },
  {
    path: '/OfertasTable/:id',
    name: 'OfertasTable',
    component: OfertasTable,
    props: true
  },
  {
    path: '/EmpresaView/:empresaId',
    name: 'EmpresaView',
    component: EmpresaView,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
