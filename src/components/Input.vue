<template>
  <div class="w-full px-3 mb-6 md:mb-0">
    <label class="items-center mb-2 flex">
      <div class="flex tracking-wide text-gray-700 text-xs font-bold">{{ label }}<div class="text-xs font-light italic mx-2">{{ hint }}</div></div>
    </label>
    <input :disabled="disabled" @blur="updateField" min="1" :value="value" :class="messages[field] ? 'border-red-500' : ''" v-if="mask" v-mask="mask" class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none h-10 focus:bg-white">
    <input @blur="updateField" :type="type" min="1" :value="value" :class="messages[field] ? 'border-red-500' : ''" v-else class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none h-10 focus:bg-white">
    <p class="text-red-500 lg:mb-4 text-xs italic">{{messages[field]}}&nbsp;</p>
  </div>
</template>

<script>
  import {mask} from 'vue-the-mask'

  export default {
    directives: {mask},
    name: 'Input',
    props: ['label', 'messages', 'mask', 'field', 'value', 'hint', 'disabled', 'type', 'profile'],
    methods: {
      updateFieldWithFunction(event) {
        this.$emit('callback', event.target.value, this.field)
      },

      updateField(event) {
        this.$emit('changed', event.target.value, this.field, this.profile)
        this.updateFieldWithFunction(event)
      }
    }
  }
</script>

<style scoped>
  .tooltip {
    display: block !important;
    z-index: 10000;
  }
  .tooltip .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }
  .tooltip .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
  }
  .tooltip[x-placement^="top"] {
    margin-bottom: 5px;
  }
  .tooltip[x-placement^="top"] .tooltip-arrow {
    border-width: 5px 5px 0 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }
  .tooltip[x-placement^="bottom"] {
    margin-top: 5px;
  }
  .tooltip[x-placement^="bottom"] .tooltip-arrow {
    border-width: 0 5px 5px 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-top-color: transparent !important;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }
  .tooltip[x-placement^="right"] {
    margin-left: 5px;
  }
  .tooltip[x-placement^="right"] .tooltip-arrow {
    border-width: 5px 5px 5px 0;
    border-left-color: transparent !important;
    border-top-color: transparent !important;
    border-bottom-color: transparent !important;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }
  .tooltip[x-placement^="left"] {
    margin-right: 5px;
  }
  .tooltip[x-placement^="left"] .tooltip-arrow {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }
  .tooltip[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }
  .tooltip[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }
</style>