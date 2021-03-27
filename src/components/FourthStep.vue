<template>
  <div class="bg-white shadow-md px-4 py-5 border-b border-gray-200 sm:px-6">
    <h2 class="p-3 mb-6 text-lg leading-6 font-medium text-gray-900">
      Administrador da área restrita
    </h2>
    <div class="grid grid-cols-12">
      <Input class="col-span-12 md:col-span-6 lg:col-span-4" @changed="changed" profile="administrador" field="nomeCompleto" label="Nome Completo" :value="managerData.administrador.nomeCompleto" :messages="messages.administrador"/>
      <Input class="col-span-12 md:col-span-6 lg:col-span-4" @changed="changed" profile="administrador" field="email" label="Email" :value="managerData.administrador.email" :messages="messages.administrador"/>
      <Input class="col-span-12 md:col-span-6 lg:col-span-4" @changed="changed" profile="administrador" field="telefone" label="Telefone" :value="managerData.administrador.telefone" :mask="['(##) ####-####', '(##) #####-####']" :messages="messages.administrador"/>
      <Input class="col-span-12 md:col-span-6 lg:col-span-4" @changed="changed" profile="administrador" type="password" field="senha" label="Senha" :value="managerData.administrador.senha" :messages="messages.administrador"/>
      <Input class="col-span-12 md:col-span-6 lg:col-span-4" @changed="changed" profile="administrador" type="password" field="senhaRepetida" label="Confirme a senha" :value="managerData.administrador.senhaRepetida" :messages="messages.administrador"/>
    </div>
    <div class="p-3">
      <div class="border-t border-grey w-full"></div>
    </div>
    <h2 class="grid grid-cols-12 justify-between p-3 mb-6 text-lg leading-6 font-medium text-gray-900">
      <div class="col-span-12 md:col-span-6">Técnico responsável pelo uso das soluções na organização</div>
      <div class="col-span-12 md:col-span-6 items-center flex text-sm font-light">
        <div class="mt-1 md:ml-auto">Usar dados do administrador</div>
        <div @click="managerData.tecnico = useAdminData ? managerData.administrador : {}"><Checkbox class="ml-3" v-model="useAdminData"/></div>
      </div>
    </h2>
    <div class="grid grid-cols-12">
      <Input class="col-span-12 md:col-span-6 lg:col-span-4" @changed="changed" profile="tecnico" field="nomeCompleto" label="Nome Completo" :value="managerData.tecnico.nomeCompleto" :messages="messages.tecnico"/>
      <Input class="col-span-12 md:col-span-6 lg:col-span-4" @changed="changed" profile="tecnico" field="email" label="Email" :value="managerData.tecnico.email" :messages="messages.tecnico"/>
      <Input class="col-span-12 md:col-span-6 lg:col-span-4" @changed="changed" profile="tecnico" field="telefone" label="Telefone" :value="managerData.tecnico.telefone" :mask="['(##) ####-####', '(##) #####-####']" :messages="messages.tecnico"/>
      <Input class="col-span-12 md:col-span-6 lg:col-span-4" @changed="changed" profile="tecnico" type="password" field="senha" label="Senha" :value="managerData.tecnico.senha" :messages="messages.tecnico"/>
      <Input class="col-span-12 md:col-span-6 lg:col-span-4" @changed="changed" profile="tecnico" type="password" field="senhaRepetida" label="Confirme a senha" :value="managerData.tecnico.senhaRepetida" :messages="messages.tecnico"/>
    </div>
    <div class="flex m-3">
        <button type="button" @click="back()" class="ml-auto focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50">Anterior</button>
        <button type="button" @click="validate()" class="ml-5 focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50">Próxima</button>
    </div>
  </div>
</template>

<script>
  import Input from './Input.vue';
  import Checkbox from './CheckBox.vue';

  export default {
    name: 'FourthStep',
    props: ['managerData'],
    components: {
      Input,
      Checkbox
    },
    data() {
      return {
        useAdminData: false,
        messages: {
          administrador: {},
          tecnico: {}
        },
      }
    },
    methods: {
      changed(value, field, profile) {
        this.managerData[profile][field] = value
        if (this.useAdminData) this.managerData.tecnico = this.managerData.administrador
      },

      validate() {
        this.messages = {
          administrador: {},
          tecnico: {}
        }

        Object.keys(this.managerData.administrador).forEach(field => {
          if(field == 'CPF' && this.managerData.administrador[field] && this.managerData.administrador[field].length != '###.###.###-##'.length) {
            this.messages.administrador[field] = 'Este campo está inválido'
          }
          if(field == 'telefone' && this.managerData.administrador[field] && this.managerData.administrador[field].length <'(##) ####-####'.length) {
            this.messages.administrador[field] = 'Este campo está inválido'
          }
          if(field == 'senhaRepetida' && (!this.managerData.administrador[field] || this.managerData.administrador[field] == '')) {
            this.messages[field] = 'Este campo é obrigatório'
          }
          if(field == 'senhaRepetida' && this.managerData.administrador[field] != this.managerData.administrador.senha) {
            this.messages[field] = 'As senhas informadas não são iguais'
          }
          if ((this.managerData.administrador[field] == '' || !this.managerData.administrador[field])) {
            this.messages.administrador[field] = 'Este campo é obrigatório';
          }
        })

        if(!this.useAdminData) {
          Object.keys(this.managerData.tecnico).forEach(field => {
            if(field == 'CPF' && this.managerData.tecnico[field] && this.managerData.tecnico[field].length != '###.###.###-##'.length) {
              this.messages.tecnico[field] = 'Este campo está inválido'
            }
            if(field == 'telefone' && this.managerData.tecnico[field] && this.managerData.tecnico[field].length <'(##) ####-####'.length) {
              this.messages.tecnico[field] = 'Este campo está inválido'
            }
            if(field == 'senhaRepetida' && (!this.managerData.tecnico[field] || this.managerData.tecnico[field] == '')) {
              this.messages[field] = 'Este campo é obrigatório'
            }
            if(field == 'senhaRepetida' && this.managerData.tecnico[field] != this.managerData.tecnico.senha) {
              this.messages[field] = 'As senhas informadas não são iguais'
            }
            if ((this.managerData.tecnico[field] == '' || !this.managerData.tecnico[field])) {
              this.messages.tecnico[field] = 'Este campo é obrigatório';
            }
          })
        }

        if (Object.keys(this.messages.administrador).length == 0 && Object.keys(this.messages.tecnico).length == 0) {
          this.$emit('next', this.managerData)
        }
      },

      back() {
        this.$emit('back', this.managerData)
      }
    }
  }
</script>