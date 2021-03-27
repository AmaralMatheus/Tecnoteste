<template>  
  <div class="relative grid col-span-12 md:col-span-6 lg:col-span-3 px-3">
    <span class="tracking-wide text-gray-700 text-xs font-bold">{{ label }}</span>
    <div class="mb-6 mt-2">
      <div v-on:change="updateField" class="flex items-center mr-1 mb-1" v-for="option in options" :key="option.key">
        <input :id="option" :value="option" type="radio" name="radio" class="hidden" :checked="option == value" />
        <label :for="option" class="flex items-center cursor-pointer text-xs">
        <span class="w-4 h-4 inline-block mr-2 rounded-full border border-grey flex-no-shrink"></span>
        {{ option }}</label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RadioButton',
    props: ['label', 'options', 'value'],
    methods: {
      updateField(event) {
        this.$emit('changed', event.target.value, 'tipoEmpresa',)
      }
    }
  }
</script>

<style scoped>
  input[type="radio"] + label span {
    transition: .2s,
      transform .2s;
  }

  input[type="radio"] + label span:hover,
  input[type="radio"] + label:hover span{
    transform: scale(1.2);
  } 

  input[type="radio"]:checked + label span {
    background-color: #1c6bc5;
    box-shadow: 0px 0px 0px 2px white inset;
  }

  input[type="radio"]:checked + label{
    color: #1c6bc5;
  }
</style>