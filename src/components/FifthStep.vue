<template>
  <div class="bg-white shadow-md px-4 py-5 border-b border-gray-200 sm:px-6">
    <link rel="stylesheet" href="https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css">
    <h2 class="grid grid-cols-12 justify-between p-3 mb-6 text-lg leading-6 font-medium text-gray-900">
      <div class="col-span-12 md:col-span-6">Dados do responsável financeiro</div>
      <div class="col-span-12 md:col-span-6 items-center flex text-sm font-light">
        <div class="flex items-center md:ml-auto">
          <div class="mt-1">Usar dados do administrador</div>
          <div @click="getAdminData()"><Checkbox class="ml-3" v-model="useAdminData"/></div></div>
      </div>
    </h2>
    <div class="grid grid-cols-12">
      <div class="col-span-12 md:col-span-6 lg:col-span-3 w-full px-3 mb-7 md:mb-0">
        <label class="mb-2 flex justify-between items-center">
          <div class="flex tracking-wide text-gray-700 text-xs font-bold">Dia preferencial para vencimento</div>
        </label>
        <div :style="'z-index:3; height: 40px; border-radius: 0.25rem;' + (messages.vencimento ? 'border: solid 1px red;' : 'border: solid 1px #e5e7eb;')">
          <multiselect class="col-span-12" 
            placeholder=""
            v-model="finantialManagerData.vencimento" 
            :options="[10, 15, 20, 25, 30]"
            :select-label="''" 
            deselect-label="Remover">
            <template v-slot:noResult>
                Nenhum resultado encontrado.
            </template>
          </multiselect>
        </div>
        <p class="text-red-500 lg:mb-4 text-xs italic">{{messages.vencimento}}&nbsp;</p>
      </div>
      <Input class="col-span-12 md:col-span-6 lg:col-span-4" @changed="changed" field="nomeCompleto" label="Nome Completo" :value="finantialManagerData.nomeCompleto" :messages="messages"/>
      <Input class="col-span-12 md:col-span-6 lg:col-span-3" @changed="changed" field="email" label="Email" :value="finantialManagerData.email" :messages="messages"/>
      <Input class="col-span-12 md:col-span-6 lg:col-span-2" @changed="changed" field="telefone" label="Telefone" :value="finantialManagerData.telefone" :mask="['(##) ####-####', '(##) #####-####']" :messages="messages"/>
      <Input class="col-span-12 md:col-span-6 lg:col-span-4" @changed="changed" type="password" field="senha" label="Senha" :value="finantialManagerData.senha" :messages="messages"/>
      <Input class="col-span-12 md:col-span-6 lg:col-span-4" @changed="changed" type="password" field="senhaRepetida" label="Confirme a senha" :value="finantialManagerData.senhaRepetida" :messages="messages"/>
    </div>
    <div class="flex m-3">
        <button type="button" @click="back()" class="ml-auto focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50">Anterior</button>
        <button type="button" @click="validate()" class="ml-5 focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50">Salvar</button>
    </div>
  </div>
</template>

<script>
  import Input from './Input.vue';
  import Multiselect from 'vue-multiselect';
  import Checkbox from './CheckBox.vue';

  export default {
    name: 'FifthStep',
    props: ['finantialManagerData', 'managerData'],
    components: {
      Input,
      Multiselect,
      Checkbox,
    },
    data() {
      return {
        useAdminData: null,
        messages: {},
      }
    },
    methods: {
      changed(value, field) {
        this.finantialManagerData[field] = value
      },

      getAdminData() {
        this.finantialManagerData.nomeCompleto = this.useAdminData ? this.managerData.nomeCompleto : this.finantialManagerData.nomeCompleto
        this.finantialManagerData.email = this.useAdminData ? this.managerData.email : this.finantialManagerData.email
        this.finantialManagerData.telefone = this.useAdminData ? this.managerData.telefone : this.finantialManagerData.telefone
        this.finantialManagerData.senha = this.useAdminData ? this.managerData.senha : this.finantialManagerData.senha
        this.finantialManagerData.senhaRepetida = this.useAdminData ? this.managerData.senhaRepetida : this.finantialManagerData.senhaRepetida
      },

      validate() {
        this.messages = {}

        Object.keys(this.finantialManagerData).forEach(field => {
          if(field == 'CPF' && this.finantialManagerData[field] && this.finantialManagerData[field].length != '###.###.###-##'.length) {
            this.messages[field] = 'Este campo está inválido'
          }
          if(field == 'telefone' && this.finantialManagerData[field] && this.finantialManagerData[field].length <'(##) ####-####'.length) {
            this.messages[field] = 'Este campo está inválido'
          }
          if(field == 'senhaRepetida' && (!this.finantialManagerData[field] || this.finantialManagerData[field] == '')) {
            this.messages[field] = 'Este campo é obrigatório'
          }
          if(field == 'senhaRepetida' && this.finantialManagerData[field] != this.finantialManagerData.senha) {
            this.messages[field] = 'As senhas informadas não são iguais'
          }
          (this.finantialManagerData[field])
          if ((this.finantialManagerData[field] == '' || !this.finantialManagerData[field])) {
            this.messages[field] = 'Este campo é obrigatório'
          }
        })

        if (Object.keys(this.messages).length == 0) {
          this.$emit('next', this.finantialManagerData)
        }
      },

      back() {
        this.$emit('back', this.finantialManagerData)
      }
    }
  }
</script>