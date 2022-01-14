<template>
  <div class="NewOfertas">
   <h1>Nueva Oferta</h1>
   <form  @submit.prevent="InsertOfert">
  <div class="form-group">
    <label for="nombre">Nombre</label>
    <input type="text" class="form-control" id="nombre" placeholder="Enter name" v-model="oferta.nombre">
  </div>
  <div class="form-group">
    <label for="contrato">Contrato</label>
    <input type="text" class="form-control" id="contrato" placeholder="Enter contrato" v-model="oferta.contrato">
  </div>
  <div class="form-group">
    <label for="contacto">Contacto</label>
    <input type="text" class="form-control" id="contacto" placeholder="Enter contacto" v-model="oferta.contacto">
  </div>
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" class="form-control" id="email" placeholder="Enter email"  v-model="oferta.email">
  </div>
  <div class="form-group">
      <label for="empresas">Empresas</label>
      <select id="empresas" class="form-control" v-model="oferta.empresa">
        <option :value="empresa.id" v-for="empresa in empresas" :key=empresa>
          {{empresa.nombre}}
        </option>
      </select>
    </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
  </div>
</template>

<script>
import api from '../../api'
export default {
  props: ['id'],
  data(){
    return{
      oferta:{},
      empresas:[],
      edit: false
    }
  },
  mounted(){
     api.empresas.getAll()
    .then((response) => this.empresas = response.data)
    .catch((error) => alert(error))
    if(this.id){
      api.ofertas.getOne(this.id)
      .then((response) => this.oferta = response.data)
      .catch((error) => alert(error))
      this.edit = true;
    }
  },
    methods: {
      InsertOfert(){
        if(this.edit){
          api.ofertas.modify(this.oferta)
          .then((response) => this.empresas = response.data)
          .catch((error) => alert(error))
        }else{
          api.ofertas.create(this.oferta)
          .then((response) => this.empresas = response.data)
          .catch((error) => alert(error))
        }
        this.$router.push("/OfertasTable/"+this.oferta.empresa);
      }
    }
}
</script>
