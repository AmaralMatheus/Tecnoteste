<template id="switch-button">
  <div class="switch-button-control mt-2">
    <div class="switch-button" :class="{ enabled: isEnabled }" @click="toggle" :style="{'--color': color}">
      <div class="button"></div>
    </div>
    <div class="switch-button-label">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    model: {
      prop: "isEnabled",
      event: "toggle"
    },
    props: {
      isEnabled: Boolean,
      color: {
        type: String,
        required: false,
        default: "#4D4D4D"
      }
    },
    methods: {
      toggle: function() {
        this.$emit("toggle", !this.isEnabled);
      }
    }
  };
</script>

<style scoped>
  .switch-button-control {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .switch-button-control .switch-button {
    height: 1.6em;
    width: calc(1.6em * 2);
    border: 2px solid #1c6bc5;
    border-radius: 1.6em;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
  .switch-button-control .switch-button .button {
    height: calc( 1.6em - (2 * 2px) );
    width: calc( 1.6em - (2 * 2px) );
    border: 2px solid #1c6bc5;
    border-radius: calc( 1.6em - (2 * 2px) );
    background: #1c6bc5;
    transition: all 0.3s ease-in-out;
  }
  .switch-button-control .switch-button.enabled {
    background-color: #1c6bc5;
    box-shadow: none;
  }
  .switch-button-control .switch-button.enabled .button {
    background: white;
    transform: translateX(calc(calc( 1.6em - (2 * 2px) ) + (2 *2px)));
  }
  .switch-button-control .switch-button-label {
    margin-left: 10px;
  }
</style>