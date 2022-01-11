<template>
  <v-app class="police-montserrat">
    <v-container fluid>

<!--      TOP APP BAR-->
      <v-app-bar
          absolute
          dark
      >
        <v-row>
          <v-col cols="3"/>
          <v-col cols="2">
            <router-link :to="'/home'">
              <v-img
                  src="./assets/area.jpeg"
                  max-height="50"
              />
            </router-link>
          </v-col>
          <v-col cols="4"/>
          <v-col cols="1" class="justify-end">
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
          <v-col cols="1" class="justify-end">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                >
                  <router-link :to="buttons[2].path">
                    <v-icon>
                      mdi-account
                    </v-icon>
                  </router-link>

                </v-btn>
              </template>
              <span>Profil</span>
            </v-tooltip>
          </v-col>
          <v-col cols="1"/>
        </v-row>
      </v-app-bar>
<!---->

<!--      LEFT NAVIGATION DRAWER-->
      <v-row class="mt-4 mb-7">
          <v-navigation-drawer
              permanent
              absolute
              expand-on-hover
              dark
          >
            <v-list
                nav
                dense
            >
              <router-link :to="buttons[0].path">
                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Accueil</v-list-item-title>
                </v-list-item>
              </router-link>

              <v-list-item link>
                <v-list-item-icon>
                  <v-icon>mdi-account-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Mes apps</v-list-item-title>
              </v-list-item>

              <v-list-item link>
                <v-list-item-icon>
                  <v-icon>mdi-star</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Historique</v-list-item-title>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item link class="justify-center">
                <v-list-item-icon>
                  <v-icon>mdi-plus</v-icon>
                </v-list-item-icon>
              </v-list-item>

            </v-list>
          </v-navigation-drawer>
      </v-row>

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
        {name: "Profile", path: '/profile'},
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

a {
  text-decoration: none;
}
</style>