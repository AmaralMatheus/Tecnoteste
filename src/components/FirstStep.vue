<template>
  <div class="bg-white shadow-md px-4 py-5 border-b border-gray-200 sm:px-6">
    <link rel="stylesheet" href="https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css">
    <h2 class="p-3 mb-6 text-lg leading-6 font-medium text-gray-900">
      Dados da organização
    </h2>
    <div class="grid grid-cols-12">
      <Input class="col-span-12 md:col-span-6 lg:col-span-3" @changed="changed" field="razaoSocial" label="Razão Social" :value="companyData.razaoSocial" :messages="messages"/>
      <Input class="col-span-12 md:col-span-6 lg:col-span-3" @changed="changed" field="nomeFantasia" label="Nome Fantasia" :value="companyData.nomeFantasia" :messages="messages"/>
      <Input class="col-span-12 md:col-span-6 lg:col-span-3" @changed="changed" field="CNPJ" label="CNPJ" mask="##.###.###/####-##" :value="companyData.CNPJ" :messages="messages"/>
      <Input class="col-span-12 md:col-span-6 lg:col-span-3" @changed="changed" field="telefone" label="Telefone" :value="companyData.telefone" :mask="['(##) ####-####', '(##) #####-####']" :messages="messages"/>
      <Input class="col-span-12 md:col-span-6 lg:col-span-2" @changed="changed" field="inscricaoEstadual" label="Inscrição Estadual" :value="companyData.inscricaoEstadual" mask="#.###.##-#" :messages="messages" :disabled="isento"/>
      <div @click="companyData.inscricaoEstadual = isento ? '' : companyData.inscricaoEstadual" class="col-span-12 md:col-span-6 lg:col-span-1 mb-9 mx-3">
        <div class="flex tracking-wide text-gray-700 text-xs font-bold">Isento</div>
        <Checkbox v-model="isento"/>
      </div>
      <RadioButton @changed="changed" class="col-span-12 md:col-span-6 lg:col-span-3" :value="companyData.tipoEmpresa" label="Tipo da empresa" 
        :options="['Empresa de software', 'Integrador / representante', 'Empresa de outro ramo']"/>
    </div>
    <div class="p-3">
      <div class="border-t border-grey w-full"></div>
    </div>
    <h2 class="p-3 mb-6 text-lg leading-6 font-medium text-gray-900">
      Dados de endereço
    </h2>
    <div class="grid grid-cols-12">
      <Input class="col-span-12 md:col-span-6 lg:col-span-2" @callback="getCepData" field="CEP" label="CEP" mask="#####-###" :value="companyData.CEP" :messages="messages"/>
      <Input class="col-span-12 md:col-span-6 lg:col-span-4" @changed="changed" field="endereco" label="Endereço" :value="companyData.endereco" :messages="messages"/>
      <Input class="col-span-12 md:col-span-6 lg:col-span-2" @changed="changed" field="numero" label="Número" :value="companyData.numero" :messages="messages"/>
      <Input class="col-span-12 md:col-span-6 lg:col-span-4" @changed="changed" field="bairro" label="Bairro" :value="companyData.bairro" :messages="messages"/>
      <Input class="col-span-12 md:col-span-6 lg:col-span-6" @changed="changed" field="complemento" hint="opcional" label="Complemento" :value="companyData.complemento" :messages="messages"/>
      <div class="col-span-12 md:col-span-6 lg:col-span-3 w-full px-3 mb-6 md:mb-0">
        <label class="mb-2 flex justify-between items-center">
          <div class="flex tracking-wide text-gray-700 text-xs font-bold">Estado</div>
        </label>
        <div class="mb-1" :style="'height: 40px; border-radius: 0.25rem;' + (messages.cidade ? 'border: solid 1px red;' : 'border: solid 1px #e5e7eb;')">
          <multiselect class="col-span-12" 
            @input="stateChanged"
            placeholder=""
            track-by="sigla"
            label="nome"
            :select-label="''"
            v-model="companyData.estado" 
            :options="estados">
            <template v-slot:noResult>
                Nenhum resultado encontrado.
            </template>
          </multiselect>
        </div>
        <p class="text-red-500 lg:mb-4 text-xs italic">{{messages.estado}}&nbsp;</p>
      </div>
      <div class="col-span-12 md:col-span-6 lg:col-span-3 w-full px-3 mb-6 md:mb-0">
        <label class="mb-2 flex justify-between items-center">
          <div class="flex tracking-wide text-gray-700 text-xs font-bold">Cidade</div>
        </label>
        <div class="mb-1" :style="'height: 39px; border-radius: 0.25rem;' + (messages.cidade ? 'border: solid 1px red;' : 'border: solid 1px #e5e7eb;')">
          <multiselect class="col-span-12"
            placeholder=""
            track-by="nome"
            label="nome"
            v-model="companyData.cidade" 
            :select-label="''"
            :options="showCities ? cidades : []">
            <template v-slot:noOptions>
                Primeiro, selecione um estado.
            </template>
            <template v-slot:noResult>
                Nenhum resultado encontrado.
            </template>
          </multiselect>
        </div>
        <p class="text-red-500 lg:mb-4 text-xs italic">{{messages.cidade}}&nbsp;</p>
      </div>
    </div>
    <div class="flex m-3">
        <button type="button" @click="validate()" class="ml-auto focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50">Próxima</button>
    </div>
  </div>
</template>

<script>
  import Input from './Input.vue';
  import Checkbox from './CheckBox.vue';
  import RadioButton from './RadioButton.vue';
  import Multiselect from 'vue-multiselect';
  import axios from 'axios';

  export default {
    name: 'FirstStep',
    props: ['companyData'],
    components: {
      Input,
      RadioButton,
      Multiselect,
      Checkbox
    },
    data() {
      return {
        isento: false,
        showCities: false,
        selectedCity: null,
        estados: [],
        cidades: [],
        messages: {}
      }
    },
    created(){
      axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => (this.estados = response.data)); 
      axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios').then(response => (this.cidades = response.data)); 
    },
    methods: {
      changed(value, field) {
        this.companyData[field] = value
      },

      stateChanged(value) {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+value.id+'/municipios?orderBy=nome').then(response => (this.cidades = response.data));
        this.companyData.cidade = null
        this.showCities = true
      },

      getCepData(value, field) {
        this.companyData[field] = value
        axios.get('https://viacep.com.br/ws/'+value+'/json').then(response => {
          this.companyData.bairro = response.data.bairro
          this.companyData.endereco = response.data.logradouro
          this.companyData.numero = response.data.numero
          this.companyData.complemento = response.data.complemento
          this.companyData.estado = this.estados.find(estado => estado.sigla == response.data.uf)
          axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+this.companyData.estado.id+'/municipios?orderBy=nome').then(response => (this.cidades = response.data));
          this.companyData.cidade = this.cidades.find(cidade => cidade.nome == response.data.localidade)
        });
        (this.companyData);
        this.showCities = true;
      },

      validate() {
        this.messages = {}
        Object.keys(this.companyData).forEach(field => {
          if((this.companyData[field] == '' || !this.companyData[field]) && field == 'inscricaoEstadual' && !this.isento) {
            this.messages[field] = 'Este campo é obrigatório'
          }
          if(field == 'inscricaoEstadual' && this.companyData[field] && this.companyData[field].length != '#.###.##-#'.length) {
            this.messages[field] = 'Este campo está inválido'
          }
          if(field == 'CNPJ' && this.companyData[field] && this.companyData[field].length != '##.###.###/####-##'.length) {
            this.messages[field] = 'Este campo está inválido'
          }
          if(field == 'telefone' && this.companyData[field] && this.companyData[field].length <'(##) ####-####'.length) {
            this.messages[field] = 'Este campo está inválido'
          }
          if ((this.companyData[field] == '' || !this.companyData[field]) && field != 'complemento' && field != 'inscricaoEstadual') {
            this.messages[field] = 'Este campo é obrigatório'
          }
        })

        if (Object.keys(this.messages).length == 0) {
          this.$emit('next', this.companyData)
        }
      },

      back() {
        this.$emit('back', this.representativeData)
      }
    }
  }
</script>