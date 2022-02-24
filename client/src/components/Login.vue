<template style="background-color: black">
  <v-container style="background-color: black">
    <v-img src="../assets/background.gif" max-height="800">
    <v-row class="justify-center">
      <v-card-text class="text-center title_text mt-10" >
        Bienvenue sur l'area
      </v-card-text>
    </v-row>
    <v-row class="justify-center">

      <v-card class="login-card"
              width="500"
              height="500"
              :style="isError !== 'none' ? 'border: 10px solid red;' : 'border: 5px solid black'"
      >
        <v-card-title class="font-weight-bold">Veuillez vous connecter :</v-card-title>
        <v-card-text class="mt-3">
          <v-text-field
              v-model="username"
              label="E-mail"
              prepend-icon="mdi-account-circle"
              :rules="emailRules"
          />
          <v-text-field
              v-model="password"
              label="Mot de passe"
              prepend-icon="mdi-lock"
              type="password"
          />
        </v-card-text>

        <v-row v-if="isError !== 'none'" class="text-center justify-center" style="color: red">
          <v-card-text>{{isError}}</v-card-text>
        </v-row>

        <v-row style="margin-top: 0px">
          <v-col cols="5" class="ml-5">
            <v-btn color="black" style="color: darkorange; width: 200px" @click="confirmUserPass"> Confirmer </v-btn>
          </v-col>
          <v-col cols="6" class="ml-5">
            <v-btn color="black" style="color: darkorange; width: 200px" @click="goToRegister"> Créer un compte </v-btn>
          </v-col>
        </v-row>
        <v-row style="">
          <v-col cols="5" class="ml-5">
              <v-btn color="black" style="color: darkorange; width: 200px" @click="authorizeNotion"> Connect to Notion </v-btn>
          </v-col>
          <v-col cols="5" class="ml-5">
              <v-btn color="black" style="color: darkorange; width: 200px" @click="authorizeDiscord"> Connect to Discord </v-btn>
          </v-col>
        </v-row>
        <v-row style="">
          <v-col cols="5" class="ml-5">
              <v-btn color="black" style="color: darkorange; width: 200px" @click="authorizeGoogle"> Connect to Google </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
    </v-img>
  </v-container>
</template>

<script>
import axios from "axios";

import {notionUrl} from '@/oauth/Notion';
import {discordUrl} from '@/oauth/Discord';
import {googleCalendarUrl} from '@/oauth/GoogleCalendar';
import {setUser} from '@/auth'

export default {
  name: "Login.vue",

  data() {
    return {
      username: '',
      password: '',
      emailRules: [
        v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      isError: 'none',
      info: [],
    }
  },

  created() {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (localStorage.getItem('isLogged') === 'true')
      this.$router.push({name: 'home'})

    if (urlParams.get('token')) {
      setUser(urlParams.get('email'), urlParams.get('token'))
      this.$router.push({name: 'home'})
    }
  },

  methods: {
    confirmUserPass() {
     if (this.password.length !== 0 && this.username.length !== 0) {
        axios.post('http://localhost:3000/auth/login', {email: this.username, password: this.password},)
            .then((response) => {
              this.info = response.data;
              setUser(this.info.user.email, this.info.token.access_token);
              this.$router.push({name: 'home'})
            })
            .catch( () => {
              this.requestError()
            })
      } else {
        this.isError = 'Nom ou mot de passe non valide !'
      }
    },

    requestError() {
      console.log("user doesnt exist");
      this.isError = 'Utilisateur ' + this.username + ' n\'existe pas !'
    },

    goToRegister() {
      this.$router.push({name: 'register'})
    },

    connectOauth(url) {
      window.location.replace(url);
    },

    authorizeNotion() {
      this.connectOauth(notionUrl);
    },

    authorizeDiscord() {
      this.connectOauth(discordUrl);
    },

    authorizeGoogle() {
      this.connectOauth(googleCalendarUrl);
    }
  },
}
</script>

<style scoped>

.title_text {
  font-size: 50px;
  font-weight: bold;
  color: black;
}

</style>