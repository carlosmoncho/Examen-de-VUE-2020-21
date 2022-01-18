<template>
  <div class="NewOfertas">
    <h1>Nueva Oferta</h1>
    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(InsertOfert)">
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <ValidationProvider
            rules="required|min:10|max:50"
            v-slot="{ errors }"
            name="Nombre"
          >
            <input
              type="text"
              class="form-control"
              id="nombre"
              placeholder="Enter name"
              v-model="oferta.nombre"
            />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <label for="contrato">Contrato</label>
          <ValidationProvider
            rules="required"
            v-slot="{ errors }"
            name="Contrato"
          >
          <input
            type="text"
            class="form-control"
            id="contrato"
            placeholder="Enter contrato"
            v-model="oferta.contrato"
          />
           <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <label for="contacto">Contacto</label>
           <ValidationProvider
            rules="required"
            v-slot="{ errors }"
            name="Contacto"
          >
          <input
            type="text"
            class="form-control"
            id="contacto"
            placeholder="Enter contacto"
            v-model="oferta.contacto"
          />
          <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
           <ValidationProvider
            rules="required"
            v-slot="{ errors }"
            name="Email"
          >
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter email"
            v-model="oferta.email"
          />
          <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <label for="empresas">Empresas</label>
           <ValidationProvider
            rules="required"
            v-slot="{ errors }"
            name="Empresas"
          >
          <select id="empresas" class="form-control" v-model="oferta.empresa">
            <option
              :value="empresa.id"
              v-for="empresa in empresas"
              :key="empresa.id"
            >
              {{ empresa.nombre }}
            </option>
          </select>
           <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import api from "../../api";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import { min } from 'vee-validate/dist/rules';
import { max } from 'vee-validate/dist/rules';
import { email } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'Este campo es obligatorio'
});

extend('min', {
  ...min,
  message: 'El minimo son 10 caracteres'
});

extend('max', {
  ...max,
  message: 'El maximo son 50 caracteres'
});

extend('email', {
  ...email,
  message: 'Debe ser tipo email'
});


export default {
  props: ["id"],
  data() {
    return {
      oferta: {},
      empresas: [],
      edit: false,
      errors: [],
    };
  },
  mounted() {
    api.empresas
      .getAll()
      .then((response) => (this.empresas = response.data))
      .catch((error) => alert(error));
    if (this.id) {
      api.ofertas
        .getOne(this.id)
        .then((response) => (this.oferta = response.data))
        .catch((error) => alert(error));
      this.edit = true;
    }
  },
  methods: {
    InsertOfert() {
      if (this.edit) {
        api.ofertas
          .modify(this.oferta)
          .then((response) => (this.empresas = response.data))
          .catch((error) => alert(error));
      } else {
        api.ofertas
          .create(this.oferta)
          .then((response) => (this.empresas = response.data))
          .catch((error) => alert(error));
      }
      this.$router.push("/OfertasTable/" + this.oferta.empresa);
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
};
</script>
