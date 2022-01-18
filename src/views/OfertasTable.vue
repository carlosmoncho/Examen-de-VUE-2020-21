<template>
  <div class="NewOfertas">
   <h1>Ofertas Empresa {{id}}</h1>
   <table class="table table-stripped">
      <thead>
        <th>id</th>
        <th>empresa</th>
        <th>nombre</th>
        <th>contrato</th>
        <th>contacto</th>
        <th>email</th>
        <th>ACCIONES</th>
      </thead>
      <tbody >
        <row-oferta v-for="oferta in ofertas" 
        :key="oferta.id" :oferta="oferta">
        </row-oferta>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../../api'
import rowOferta from '../components/rowOferta.vue'

export default {
  components: { rowOferta },
  data(){
    return{
      ofertas:[]
    }
  },
  props: ['id'],
  mounted(){
    api.ofertas.getAll(this.id)
    .then((response) => this.ofertas = response.data)
    .catch((error) => alert(error))
  }
}
</script>
