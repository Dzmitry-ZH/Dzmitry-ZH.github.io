<template>
  <div id="test">
    <ul>
      <li v-for='item in array'>{{item.name}},{{item.age}}</li>
    </ul>
    <input @click='Sort' type="button" value="Push" :data-sortDirection='direction'>
  </div>
</template>

<script>
  export default {
    name: "test",
    data() {
      return {
        array: [
          {name: 'Ivan', age: 25},
          {name: 'Ira', age: 20},
          {name: 'Dima', age: 18},
          {name: 'Igor', age: 19}
        ],
        direction: 'up'
      }
    },
    methods: {
      Sort: function () {
        if (this.direction === 'up') {
          this.direction = 'down';
          return this.array.sort(function (a, b) {
            if (a.age > b.age) {
              return -1;
            }
            if (a.age < b.age) {
              return 1;
            }
            return 0;
          });
        }
        else {
          this.direction = 'up';
          document.getElementById('test').classList.remove('tringleUp');
          document.getElementById('test').classList.add('tringleDown');
          return this.array.sort(function (a, b) {
            if (a.age > b.age) {
              return 1;
            }
            if (a.age < b.age) {
              return -1;
            }
            return 0;
          });
        }
      }
    }
  }
</script>

<style scoped>

</style>
