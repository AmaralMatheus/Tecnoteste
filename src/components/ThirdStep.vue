<template>
  <div class="bg-white shadow-md px-4 py-5 border-b border-gray-200 sm:px-6">
    <h2 class="p-3 mb-6 text-lg leading-6 font-medium text-gray-900">
      Dados do representante legal
    </h2>
    <div class="grid grid-cols-12">
      <Input class="col-span-12 md:col-span-6 lg:col-span-6" @changed="changed" field="nomeCompleto" label="Nome Completo" :value="representativeData.nomeCompleto" :messages="messages"/>
      <Input class="col-span-12 md:col-span-6 lg:col-span-6" @changed="changed" field="email" label="Email" :value="representativeData.email" :messages="messages"/>
      <Input class="col-span-12 md:col-span-6 lg:col-span-4" @changed="changed" field="CPF" label="CPF" :value="representativeData.CPF" mask="###.###.###-##" :messages="messages"/>
      <div class="col-span-12 md:col-span-6 lg:col-span-4 px-3 mb-7">
        <label class="mb-2 flex justify-between items-center">
          <div class="flex tracking-wide text-gray-700 text-xs font-bold">Data de nascimento</div>
        </label>
        <date-picker mask="##/##/####" v-model="representativeData.nascimento" class="w-full mb-1" format="DD/MM/YYYY" :input-class="'h-10 w-full border rounded hover:border p-4 ' + (messages.nascimento ? ' border-red-500' : '')" valueType="format"></date-picker>
        <p class="text-red-500 lg:mb-4 text-xs italic">{{messages.nascimento}}&nbsp;</p>
      </div>
      <Input class="col-span-12 md:col-span-6 lg:col-span-4" @changed="changed" field="telefone" label="Telefone" :value="representativeData.telefone" :mask="['(##) ####-####', '(##) #####-####']" :messages="messages"/>
    </div>
    <div class="flex m-3">
        <button type="button" @click="back()" class="ml-auto focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50">Anterior</button>
        <button type="button" @click="validate()" class="ml-5 focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50">Próxima</button>
    </div>
  </div>
</template>

<script>
  import Input from './Input.vue';
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';

  export default {
    name: 'ThirdStep',
    props: ['representativeData'],
    components: {
      Input,
      DatePicker
    },
    data() {
      return {
        messages: {},
      }
    },
    created(){
    },
    methods: {
      changed(value, field) {
        this.representativeData[field] = value
      },

      validate() {
        this.messages = {}
        Object.keys(this.representativeData).forEach(field => {
          if(field == 'CPF' && this.representativeData[field] && this.representativeData[field].length != '###.###.###-##'.length) {
            this.messages[field] = 'Este campo está inválido'
          }
          if(field == 'telefone' && this.representativeData[field] && this.representativeData[field].length <'(##) ####-####'.length) {
            this.messages[field] = 'Este campo está inválido'
          }
          if ((this.representativeData[field] == '' || !this.representativeData[field]) && field != 'complemento') {
            this.messages[field] = 'Este campo é obrigatório';
          }
        })

        if (Object.keys(this.messages).length == 0) {
          this.$emit('next', this.representativeData)
        }
      },

      back() {
        this.$emit('back', this.representativeData)
      }
    }
  }
</script>