<template>
<div>
  <skyfall-toolbar></skyfall-toolbar>
</div>
</template>

<script>
import store from '../store';
import Toolbar from '../components/Toolbar.vue';

export default {
  name: 'skyfall-dashboard',
  components: {
    'skyfall-toolbar': Toolbar
  },
  props: {
  },
  data() {
    return {
      session: store.session
    };
  }
};
</script>

<style>

</style>
