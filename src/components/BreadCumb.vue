<template>
  <div class="my-4 relative rounded overflow-x-scroll xl:overflow-x-hidden">
    <ol class="my-3 text-sm min-w-max flex cd-breadcrumb triangle">
      <li :class="index >= 0 ? 'current' : ''"><div class="item">Dados da organização</div></li>
      <li :class="index >= 1 ? 'current' : ''"><div class="item">Informações adicionais da organização</div></li>
      <li :class="index >= 2 ? 'current' : ''"><div class="item">Dados do representante legal</div></li>
      <li :class="index >= 3 ? 'current' : ''"><div class="item">Dados do administrador e do responsável técnico</div></li>
      <li :class="index >= 4 ? 'current' : ''"><div class="last item">Dados para envio da nota fiscal e boleto</div></li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: 'BreadCumb',
    props: ['index']
  }
</script>

<style scoped>
  .item {
    font-size: 12.5px;
  }

  .last {
    padding-right: 50px !important;
  }

  .cd-breadcrumb.triangle li > * {
    position: relative;
    padding: 1em .8em 1em 2.5em;
    color: #2c3f4c;
    background-color: #edeff0;
    /* the border color is used to style its ::after pseudo-element */
    border-color: #edeff0;
  }

  .cd-breadcrumb.triangle li.current > * {
    /* selected step */
    color: #ffffff;
    background-color: #1c6bc5;
    border-color: #1c6bc5;
  }

  .cd-breadcrumb.triangle li::after, .cd-breadcrumb.triangle li > *::after {
    content: '';
    position: absolute;
    top: 0;
    left: 100%;
    right: 0;
    content: '';
    /* 48px is the height of the <a> element */
    border: 23px solid transparent;
  }

  .cd-breadcrumb.triangle li.current > *::after {
    /* this is the colored triangle after each element */
    z-index: 1;
    border-left-color: inherit;
  }
  .cd-breadcrumb.triangle li:last-of-type::after, .cd-breadcrumb.triangle li:last-of-type > *::after {
    /* hide the triangle after the last step */
    display: none;
  }
</style>