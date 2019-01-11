<template>
  <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" fixed stateless app dense dark mini-variant-width="80" class="green darken-3">
    <v-toolbar flat class="green darken-3">
      <v-list dense class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini" >
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>
  </v-navigation-drawer>
</template>

<script>
import store from '../store';

export default {
  name: 'skyfall-toolbar',
  props: {
  },
  data() {
    return {
      session: store.session,
      drawer: true,
      mini: true
    };
  }
};
</script>

<style>

</style>
