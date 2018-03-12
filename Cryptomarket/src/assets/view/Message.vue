<template>
  <div id="message">
    <h1>{{message}}</h1>
    <app-input :msg='message' @messageChanged=" message = $event"></app-input>
  </div>
</template>

<script>
  import Input from './Input.vue'

  export default {
    name: "message",
    data() {
      return {
        message: [
          {
            name: 'Иван',
            age: 45
          },
          {
            name: 'Вика',
            age: 19
          },
          {
            name: 'Иван',
            age: 29
          },
          {
            name: 'Максим',
            age: 20
          }
        ],
        search: ''
      }
    },
    components: {
      'app-input': Input
    }
  }
</script>

<style scoped>

</style>
