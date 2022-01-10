<template>
  <v-app class="police-montserrat">
    <v-container fluid>
      <v-app-bar
          dark
      >
        <v-row class="justify-center text-center align-center">
          <router-link
              v-for="(button) in buttons"
              v-bind:key="button"
              :to="button.path">
            <v-col md="12" lg="12">
              <v-btn>
                {{ button.name }}
              </v-btn>
            </v-col>
          </router-link>
        </v-row>

        <v-row justify="end">
          <v-col lg="4" md="4" xs="12">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                >
                  <v-icon>
                    mdi-magnify
                  </v-icon>
                </v-btn>
              </template>
              <span>Rechercher</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-app-bar>
      <div class="ma-12 pa-12">
          <v-navigation-drawer
              permanent
              expand-on-hover
          >
            <v-list>
              <v-list-item class="px-2">
                <v-list-item-avatar>
                  <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title class="text-h6">
                    Sandra Adams
                  </v-list-item-title>
                  <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list
                nav
                dense
            >
              <v-list-item link>
                <v-list-item-icon>
                  <v-icon>mdi-folder</v-icon>
                </v-list-item-icon>
                <v-list-item-title>My Files</v-list-item-title>
              </v-list-item>
              <v-list-item link>
                <v-list-item-icon>
                  <v-icon>mdi-account-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Shared with me</v-list-item-title>
              </v-list-item>
              <v-list-item link>
                <v-list-item-icon>
                  <v-icon>mdi-star</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Starred</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
      </div>
        <v-col cols="12" class="mt-13">
          <router-link :to="'/home'">
            <v-img
                src="./assets/NuageShocked.png"
                max-width="200"
            />
          </router-link>
        </v-col>


      <v-divider></v-divider>

      <!--    components-->
      <v-main>
        <router-view/>
      </v-main>

      <v-footer
          dark
          class="police-montserrat"
          absolute
      >
        Area All Rights Reserved ©
        <v-spacer></v-spacer>
        Developed by
      </v-footer>

    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  watch: {
    group () {
      this.drawer = false
    },
  },

  data() {
    return {
      buttons: [
        {name: "Accueil", path: '/home'},
        {name: "Area", path: '/area'},
        {name: "Login", path: '/login'},
        {name: "Register", path: '/register'},
      ],
      drawer: false,
      group: null
    }
  },

  methods: {

  },
}
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>