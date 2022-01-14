import Vue from 'vue'
import Vuex from 'vuex'
import api from '../../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    empresas: [],
    ofertas: []
  },
  mutations: {
    loadEmpresas(state, playload){
      state.empresas = playload
    },
    loadOfertas(state, playload){
      state.ofertas = playload
    }
  },
  actions: {
    loadEmpresas(context){
      api.empresas.getAll()
      .then((response) => context.commit('loadEmpresas', response.data))
      .catch((error) => alert(error))
    },
    loadOfertas(context){
      api.ofertas.getOne(context)
      .then((response) => context.commit('loadOfertas', response.data))
      .catch((error) => alert(error))
    }
  },
  modules: {
  }
})
