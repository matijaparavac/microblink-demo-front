<template>
<v-app>
  <v-navigation-drawer app>
    <!-- -->
     <v-card
    height="100%"
    width="256"
    class="mx-auto"
  >
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Microblink-demo
          </v-list-item-title>
          <v-list-item-subtitle>
            front
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title><router-link :to="item.title">{{ item.title }}</router-link></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
  </v-navigation-drawer>

  <!-- <v-app-bar app> -->
    <!-- -->
  <!-- </v-app-bar> -->

  <!-- Sizes your content based upon application components -->
  <v-content>

    <!-- Provides the application the proper gutter -->
    <v-container fluid>

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-content>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
</template>

<script>
import Integration from './components/Integration';

export default {
  name: 'App',
  components: {
    Integration,
  },
  data: () => ({
    //
    items:[
          // { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Home', icon: 'mdi-home' },
          { title: 'People', icon: 'mdi-playlist-plus' },
          { title: 'Firebase', icon: 'mdi-view-dashboard' },
    ]
    
  }),
};
</script>



