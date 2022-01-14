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
      <tbody>
        <tr v-for="oferta in ofertas" 
        :key=oferta.id>
        <td>{{oferta.id}}</td>
        <td>{{empresa.nombre}}</td>
        <td>{{oferta.nombre}}</td>
        <td>{{oferta.contrato}}</td>
        <td>{{oferta.contacto}}</td>
        <td>{{oferta.email}}</td>
        <td>
            <button class="btn btn-secondary up" @click.prevent="editar(oferta.id)">
                <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-secondary up" @click.prevent="eliminar(oferta.id)">
                <i class="bi bi-trash"></i>
            </button>
            <button class="btn btn-secondary up" @click.prevent="empresas(empresa.id)">
                <i class="bi bi-eye"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../../api'

export default {
  data(){
    return{
      ofertas:[],
      empresa:[]
    }
  },
  props: ['id'],
  mounted(){
    api.ofertas.getAll(this.id)
    .then((response) => this.ofertas = response.data)
    .catch((error) => alert(error))
     api.empresas.getOne(this.id)
    .then((response) => this.empresa = response.data)
    .catch((error) => alert(error))
  },
    methods: {
        empresas(id){
            this.$router.push('/EmpresaView/'+id)
        },
        eliminar(id){
            api.ofertas.delete(id)
        },
        el(id){
            this.$router.push('/NuevaOfertaEdit/'+id)
        }
    }
}
</script>
