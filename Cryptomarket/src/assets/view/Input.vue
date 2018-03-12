<template>
  <div>
    <input type="text" :value='msg' @input="changeMessage">
  </div>
</template>

<script>
  export default {
    name: "type",
    props: ['msg'],
    data() {
      return {
        message: 'hello'
      }
    },
    methods: {
      changeMessage: function (event) {
        this.message = event.target.value;
        this.$emit('messageChanged', this.message);
      }
    }
  }
</script>

<style scoped>

</style>
