<template>
  <div class="w-full px-3 mb-6 md:mb-0">
    <label class="mb-2 flex justify-between">
      <div class="block tracking-wide text-gray-700 text-xs font-bold">{{ label }}</div>
      <p class="text-red-500 text-xs italic">{{ messages[field] }}</p>
    </label>
    <div class="relative">
      <select @change="updateField" :class="messages[field] ? 'border-red-500' : ''" class="block h-11 appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-300" id="grid-state">
        <option v-for="item in data" :key="item.id" :value="item.id" :selected="value == item.id">{{ item.nome }}</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Input',
    props: ['label', 'messages', 'field', 'data', 'value'],
    methods: {
      updateFieldWithFunction(event) {
        this.$emit('callback', event.target.value, this.field)
      },

      updateField(event) {
        this.$emit('changed', event.target.value, this.field)
        this.updateFieldWithFunction(event)
      }
    }
  }
</script>