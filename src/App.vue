<template>
  <div>
    <div class="grid grid-cols-12 px-3 lg:px-20 items-center border-2 w-full">
      <div class="col-span-12 lg:col-span-2 hidden my-3 lg:block mr-auto"><img src="./assets/logo.png" width="150"/></div>
      <div class="col-span-12 lg:col-span-2 lg:hidden mb-3 m-auto"><img src="./assets/logo.png" width="150"/></div>
      <div class="col-span-12 lg:col-span-10 w-50 lg:hidden mb-3 text-sm flex justify-around">
        <a class="link-sm" href="">SOLUÇÕES</a>
        <a class="link-sm" href="">INSTITUCIONAL</a>
        <a class="link-sm" href="">SUPORTE</a>
        <a class="link-sm" href="">BLOG</a>
      </div>
      <div class="col-span-12 lg:col-span-10 hidden lg:block ml-auto text-sm">
        <a class="link" href="">SOLUÇÕES</a>
        <a class="link" href="">INSTITUCIONAL</a>
        <a class="link" href="">SUPORTE</a>
        <a class="link" href="">BLOG</a>
      </div>
    </div>

    <div class="mx-3 lg:m-auto lg:container">
      <progress-bar size="huge" bar-color="#1c6bc5" class="mt-5 lg:hidden" :val="progress[index]" :text="(progress[index] ? progress[index] : '0') + '%'"></progress-bar>
      <BreadCumb class="hidden lg:block" :index="index"/>
      <FirstStep :companyData="companyData" v-if="index == 0" @next="next" @back="back" class="my-6"/>
      <SecondStep :aditionalData="aditionalData" v-if="index == 1" @next="next" @back="back" class="my-6"/>
      <ThirdStep :representativeData="representativeData" v-if="index == 2" @next="next" @back="back" class="my-6"/>
      <FourthStep :managerData="managerData" v-if="index == 3" @next="next" @back="back" class="my-6"/>
      <FifthStep :finantialManagerData="finantialManagerData" :managerData="managerData.administrador" v-if="index == 4" @next="next" @back="back" class="my-6"/>
    </div>
  </div>
</template>

<script>
import FirstStep from './components/FirstStep.vue';
import SecondStep from './components/SecondStep.vue';
import ThirdStep from './components/ThirdStep.vue';
import FourthStep from './components/FourthStep.vue';
import FifthStep from './components/FifthStep.vue';
import BreadCumb from './components/BreadCumb.vue';
import ProgressBar from 'vue-simple-progress';
import { saveAs } from 'file-saver';

export default {
  name: 'App',
  components: {
    ProgressBar,
    FirstStep,
    SecondStep,
    ThirdStep,
    FourthStep,
    FifthStep,
    BreadCumb
  },
  data() {
    return {
      index: 0,
      progress: ['0','20','40','60','80'],
      companyData: {
        razaoSocial: null,
        nomeFantasia: null,
        inscricaoEstadual: null,
        tipoEmpresa: 'Empresa de software',
        CNPJ: null,
        telefone: null,
        endereco: null,
        numero: null,
        bairro: null,
        complemento: null,
        estado: null,
        cidade: null,
        CEP: null,
      },
      aditionalData: {
        linguagens: null,
        outrasLinguagens: null,
        atividade: null,
        estados: null,
        vendas: null,
        outrasVendas: null,
        principaisClientes: null,
        clientes: null,
        funcionarios: null
      },
      representativeData: {
        nomeCompleto: null,
        CPF: null,
        email: null,
        nascimento: null,
        telefone: null
      },
      finantialManagerData: {
        nomeCompleto: null,
        email: null,
        senha: null,
        senhaRepetida: null,
        telefone: null,
        vencimento: null
      }, 
      managerData: {
        administrador: {
          nomeCompleto: null,
          email: null,
          senha: null,
          senhaRepetida: null,
          telefone: null
        }, 
        tecnico: {
          nomeCompleto: null,
          email: null,
          senha: null,
          senhaRepetida: null,
          telefone: null
        }
      }
    }
  },
  methods: {
    next(data) {
      if (this.index == 0) this.companyData = data

      if (this.index == 1) this.aditionalData = data

      if (this.index == 2) this.representativeData = data

      if (this.index == 3) this.managerData = data

      if (this.index == 4) {
        this.finantialManagerData = data
        this.$swal({
          title:'Cadastro realizado!',
          icon: 'success',
          confirmButtonText: `Baixar .json com os dados do formulário`,
        }).then((result) => {
          console.log(result)
          var data = JSON.stringify(this.companyData) + JSON.stringify(this.aditionalData) + JSON.stringify(this.managerData) + JSON.stringify(this.representativeData) + JSON.stringify(this.finantialManagerData)
          var fileName = 'formulario.json';

          var fileToSave = new Blob([data], {
              type: 'application/json',
              name: fileName
          });

          saveAs(fileToSave, fileName);
        });
      }

      this.index ++;
    },

    back(data) {
      if (this.index == 0) this.companyData = data

      if (this.index == 1) this.aditionalData = data

      if (this.index == 2) this.representativeData = data

      if (this.index == 3) this.managerData = data

      if (this.index == 4) this.finantialManagerData = data

      this.index --;
    }
  }
}
</script>

<style scoped>
  .link {
    margin-left: 25px;
    color: grey;
  }
  .link-sm {
    color: grey;
  }
</style>
