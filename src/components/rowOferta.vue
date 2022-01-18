<template>
    <tr>
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
            <button class="btn btn-secondary up" @click.prevent="empresas(oferta.empresa)">
                <i class="bi bi-eye"></i>
            </button>
        </td>
    </tr>
</template>

<script>
import api from '../../api'
export default {
    props:['oferta'] ,
     methods: {
        empresas(id){
            this.$router.push('/EmpresaView/'+id)
        },
        eliminar(id){
            api.ofertas.delete(id)
        },
        editar(id){
            this.$router.push('/NuevaOfertaEdit/'+id)
        }
    },
    computed:{
    empresa(){
      return this.$store.state.empresas.find(item => item.id === this.oferta.empresa)
    }
  } 
}
</script>