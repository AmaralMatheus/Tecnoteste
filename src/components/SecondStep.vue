<template>
  <div>
    <link rel="stylesheet" href="https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css">
    <div class="bg-white shadow-md px-4 py-5 border-b border-gray-200 sm:px-6">
      <h2 class="p-3 mb-6 text-lg leading-6 font-medium text-gray-900">
        Informações Adicionais
      </h2>
      <div class="grid grid-cols-12">
        <div class="col-span-12 md:col-span-6 w-full px-3 mb-3 mb-6 md:mb-0">
          <label class="mb-2 flex justify-between items-center">
            <div class="flex tracking-wide text-gray-700 text-xs font-bold">Linguagens de programação</div>
          </label>
          <div class="mb-1" :style="'min-height: 40px; border-radius: 0.25rem;' + (messages.linguagens ? 'border: solid 1px red;' : 'border: solid 1px #e5e7eb;')">
            <multiselect class="col-span-12" 
              placeholder=""
              v-model="selectedLanguages" 
              :options="languages"
              :select-label="''"
              :close-on-select="false" 
              deselect-label="Remover"
              :multiple="true">
              <template v-slot:noResult>
                  Nenhum resultado encontrado.
              </template>
            </multiselect>
          </div>
          <p class="text-red-500 lg:mb-4 text-xs italic">{{messages.linguagens}}&nbsp;</p>
        </div>
        <Input class="col-span-12 md:col-span-6" @changed="changed" field="outrasLinguagens" label="Outras linguagens" :value="aditionalData.outrasLinguagens" :messages="messages"/>
        <div class="col-span-12 w-full px-3 my-3 mb-6 md:mb-0">
          <label class="mb-2 flex justify-between items-center">
            <div class="flex tracking-wide text-gray-700 text-xs font-bold">Ramo de atividade</div>
          </label>
          <div class="mb-1" :style="'min-height: 40px; border-radius: 0.25rem;' + (messages.atividade ? 'border: solid 1px red;' : 'border: solid 1px #e5e7eb;')">
            <multiselect class="col-span-12" 
              placeholder=""
              v-model="selectedActivities" 
              :options="activities" 
              :select-label="''"
              :close-on-select="false" 
              deselect-label="Remover"
              :multiple="true">
              <template v-slot:noResult>
                  Nenhum resultado encontrado.
              </template>
            </multiselect>
          </div>
          <p class="text-red-500 lg:mb-4 text-xs italic">{{messages.atividade}}&nbsp;</p>
        </div>
        <div class="col-span-12 w-full px-3 my-3 mb-6 md:mb-0">
          <label class="mb-2 flex justify-between items-center">
            <div class="flex tracking-wide text-gray-700 text-xs font-bold">
              Estados onde possui clientes
            </div>
          </label>
          <div class="mb-1 grid grid-cols-12" :style="'border-radius: 0.25rem;' + (messages.estados ? 'border: solid 1px red;' : 'border: solid 1px #e5e7eb;')">
            <div class="m-2 col-span-12 lg:col-span-2 text-center h-11 focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50"
              v-on:click="selectAllStates()">{{ this.selectedStates == this.estados ? 'Remover todos' : 'Selecionar todos' }}</div>
            <multiselect class="col-span-12 lg:col-span-10" 
              placeholder=""
              track-by="id"
              label="nome"
              v-model="selectedStates"
              :options="estados" 
              :select-label="''"
              :close-on-select="false" 
              deselect-label="Remover"
              :multiple="true">
              <template v-slot:noResult>
                  Nenhum resultado encontrado.
              </template>
            </multiselect>
          </div>
          <p class="text-red-500 lg:mb-4 text-xs italic">{{messages.estados}}&nbsp;</p>
        </div>
        <div class="col-span-12 md:col-span-6 w-full px-3 my-3 mb-6 md:mb-0">
          <label class="mb-2 flex justify-between items-center">
            <div class="flex tracking-wide text-gray-700 text-xs font-bold">Formas de comercialização ERP</div>
          </label>
          <div class="mb-1" :style="'min-height: 40px; border-radius: 0.25rem;' + (messages.vendas ? 'border: solid 1px red;' : 'border: solid 1px #e5e7eb;')">
            <multiselect class="col-span-12" 
              placeholder=""
              v-model="selectedErpUsage" 
              :options="erpUsage" 
              :select-label="''"
              :close-on-select="false" 
              deselect-label="Remover"
              :multiple="true">
              <template v-slot:noResult>
                  Nenhum resultado encontrado.
              </template>
            </multiselect>
          </div>
          <p class="text-red-500 lg:mb-4 text-xs italic">{{messages.vendas}}&nbsp;</p>
        </div>
        <Input class="col-span-12 md:col-span-6 my-3" @changed="changed" field="outrasVendas" label="Outras formas de comercialização" :value="aditionalData.outrasVendas" :messages="messages"/>
        <Input class="col-span-12 md:col-span-6 lg:col-span-6 my-3" @changed="changed" field="principaisClientes" label="Principais Clientes" :value="aditionalData.principaisClientes" :messages="messages"/>
        <Input class="col-span-12 md:col-span-6 lg:col-span-3 my-3" @changed="changed" type="number" field="clientes" label="Quantidade de clientes" :value="aditionalData.clientes" :messages="messages"/>
        <Input class="col-span-12 md:col-span-6 lg:col-span-3 my-3" @changed="changed" type="number" field="funcionarios" label="Número de functionários" :value="aditionalData.funcionarios" :messages="messages"/>
      </div>
      <div class="flex m-3">
        <button type="button" @click="back()" class="ml-auto focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50">Anterior</button>
        <button type="button" @click="validate()" class="ml-5 focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50">Próxima</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect';
  import Input from './Input.vue';
  import axios from 'axios';

  export default {
    name: 'SecondStep',
    props: ['aditionalData'],
    components: {
      Multiselect,
      Input
    },
    data() {
      return {
        messages: {},
        selectedLanguages: null,
        selectedActivities: null,
        selectedStates: null,
        selectedErpUsage: null,
        estados: [],
        languages: [
          'Java',
          'Delphi',
          'Visual Basic',
          'C#',
          'PHP',
        ],
        activities: [
          'Varejo',
          'Indústria',
          'Comércio',
          'Transporte',
          'Serviço',
        ],
        erpUsage: [
          'Locação',
          'Venda',
          'Uso Interno',
          'Outro',
          'Nenhuma',
        ]
      }
    },
    created(){
      axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => (this.estados = response.data)); 
      this.selectedLanguages = this.aditionalData.linguagens
      this.selectedActivities = this.aditionalData.atividade
      this.selectedStates = this.aditionalData.estados
      this.selectedErpUsage = this.aditionalData.vendas
    },
    methods: {
      changed(value, field) {
        this.aditionalData[field] = value
      },

      selectAllStates() {
        this.selectedStates = this.selectedStates == this.estados ? [] : this.estados;
      },

      validate() {
        this.messages = {}
        this.aditionalData.linguagens = this.selectedLanguages
        this.aditionalData.atividade = this.selectedActivities
        this.aditionalData.estados = this.selectedStates
        this.aditionalData.vendas = this.selectedErpUsage

        let validation = this.aditionalData
        Object.keys(validation).forEach(field => {
          if ((validation[field] == '' || !validation[field]) && field != 'outrasLinguagens' && field != 'outrasVendas' && field != 'funcionarios' && field != 'principaisClientes') {
            this.messages[field] = 'Este campo é obrigatório';
          }
        })

        if (Object.keys(this.messages).length == 0) {
          this.$emit('next', this.aditionalData)
        }
      },

      back() {
        this.$emit('back', this.aditionalData)
      }
    }
  }
</script>