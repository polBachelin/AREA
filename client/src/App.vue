<template>
  <div id="app">
  <v-app class="font-dongle">
    <v-container fluid>

<!--      TOP APP BAR-->
      <v-app-bar
          absolute
          style="background-color: black; border-bottom: 1px solid darkorange"
      >
        <v-row>
          <v-col cols="3"/>
          <v-col cols="3" class="mt-2" style="display: flex">
            <v-btn color="orange" @click="changeLanguage('fr')" style="font-weight: bold">
              FR
            </v-btn>
            <v-btn color="orange" @click="changeLanguage('en')" class="mr-7 ml-3" style="font-weight: bold">
              EN
            </v-btn>
          </v-col>
          <v-col cols="2">
            <router-link :to="'/home'">
              <v-row class="mt-1">
                <h1 style="color: antiquewhite">
                  A
                </h1>
                <h1 class="area-title">
                  REA
                </h1>
              </v-row>
            </router-link>
          </v-col>
          <v-col cols="1" class="justify-end">
            <v-tooltip bottom color="orange">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                >
                  <router-link v-if="checkIfLogged()" :to="buttons[3].path">
                    <v-icon style="color: darkorange">
                      mdi-account
                    </v-icon>
                  </router-link>
                </v-btn>
              </template>
              <span>{{ $t('message.profileBtn') }}</span>
            </v-tooltip>
          </v-col>
          <v-col cols="1" class="justify-end">
            <v-tooltip bottom color="orange">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                >
                  <v-icon style="color: darkorange">
                    mdi-magnify
                  </v-icon>
                </v-btn>
              </template>
              <span>{{ $t('message.searchBtn') }}</span>
            </v-tooltip>
          </v-col>
          <v-col class="mt-1">
            <v-btn v-if="checkIfLogged()" @click="logOut" color="orange">
              {{ $t('message.logoutBtn') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-app-bar>
<!---->

<!--      LEFT NAVIGATION DRAWER-->
      <v-row class="mt-4 mb-7">
          <v-navigation-drawer
              v-if="checkIfLogged()"
              permanent
              absolute
              expand-on-hover
              style="background-color: black"
          >
            <v-list
                nav
                dense
            >
              <router-link :to="buttons[0].path">
                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon style="color: darkorange">mdi-home</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title style="color: darkorange">{{ $t('message.homeSideBar') }}</v-list-item-title>
                </v-list-item>
              </router-link>

              <router-link :to="buttons[2].path">
                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon style="color: darkorange">mdi-account-multiple</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title style="color: darkorange">{{ $t('message.myAppSideBar') }}</v-list-item-title>
                </v-list-item>
              </router-link>

              <v-list-item link>
                <v-list-item-icon>
                  <v-icon style="color: darkorange">mdi-star</v-icon>
                </v-list-item-icon>
                <v-list-item-title style="color: darkorange">{{ $t('message.historySideBar') }}</v-list-item-title>
              </v-list-item>

              <v-divider></v-divider>

              <router-link :to="buttons[1].path">
              <v-list-item
                  link
                  class="justify-center"
              >
                <v-list-item-icon>
                  <v-icon style="color: darkorange">mdi-plus</v-icon>
                </v-list-item-icon>
              </v-list-item>
              </router-link>
            </v-list>
          </v-navigation-drawer>
      </v-row>

      <v-divider></v-divider>

      <!--    components-->
      <v-main>
        <router-view/>
      </v-main>

      <v-footer
          style="color: darkorange; background-color: black; border-top: 1px solid darkorange"
          class="police-montserrat"
          absolute
      >
        Area All Rights Reserved ©
        <v-spacer></v-spacer>
        Developed by Evan, Killy, Polo, Zack and Omz
      </v-footer>

    </v-container>
  </v-app>
  </div>
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
        {name: "MyApps", path: '/myapps'},
        {name: "Profile", path: '/profile'},
        {name: "Login", path: '/login'},
        {name: "Register", path: '/register'},
      ],
      drawer: false,
      group: null,
    }
  },

  methods: {
    checkIfLogged() {
      let local = localStorage.getItem('isLogged')

      if (local === 'true') {
        return true
      } else {
        return false
      }
    },
    logOut() {
      localStorage.setItem('isLogged', 'false')
      localStorage.setItem('accessToken', '')
      localStorage.setItem('username', '')
      this.$router.push('/login')
    },

    changeLanguage(lang) {
      localStorage.setItem('lang', lang)
      this.$router.go()
    },
  },
  created() {
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', 'en')
    }
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Dongle:wght@300&display=swap');

.font-dongle {
  font-family: 'Dongle', sans-serif;
  font-size: large;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: black;
  justify-items: center;
}

a {
  text-decoration: none;
}

.area-title {
  font-weight: bold;
  color: darkorange;
}

</style>