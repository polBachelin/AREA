<template style="background-color: black">
  <v-container style="background-color: black">
    <v-img src="../assets/background2.gif" max-height="800">
    <v-row class="justify-center">
      <v-card-text class="text-center title_text mt-10" style="color: darkorange">
        {{ $t('message.welcomeTitle') }}
      </v-card-text>
    </v-row>
    <v-row class="justify-center">

      <v-card class="login-card"
              width="500"
              :style="isError !== 'none' ? 'border: 10px solid red;' : 'border: 5px solid black'"
      >
        <v-card-title class="font-weight-bold">{{ $t('message.pleaseConnectTitle') }}</v-card-title>
        <v-card-text class="mt-3">
          <v-text-field
              v-model="username"
              label="E-mail"
              prepend-icon="mdi-account-circle"
              :rules="emailRules"
          />
          <v-text-field
              v-model="password"
              :label="passLabel"
              prepend-icon="mdi-lock"
              type="password"
          />
        </v-card-text>

        <v-row v-if="isError !== 'none'" class="text-center justify-center" style="color: red">
          <v-card-text>{{isError}}</v-card-text>
        </v-row>

        <v-row style="margin-top: 0px">
          <v-col cols="5" class="ml-5">
            <v-btn color="orange" style="color: black; width: 200px" @click="confirmUserPass"> {{ $t('message.confirmBtn') }} </v-btn>
          </v-col>
          <v-col cols="6" class="ml-5">
            <v-btn color="orange" style="color: black; width: 200px" @click="goToRegister"> {{ $t('message.createAccountBtn') }} </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="5" class="ml-5">
              <v-btn color="black" style="color: darkorange; width: 200px" @click="authorizeNotion"> {{ $t('message.connectNotionBtn') }} </v-btn>
          </v-col>
          <v-col cols="5" class="ml-5">
              <v-btn color="black" style="color: darkorange; width: 200px" @click="authorizeDiscord"> {{ $t('message.connectDiscordBtn') }} </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="5" class="ml-5">
            <v-text-field
                v-model="autoLogin"
                prepend-icon="mdi-account-circle"
            />
          </v-col>
          <v-col cols="5" class="ml-5 mt-2">
            <v-btn color="black" style="color: darkorange; width: 200px" @click="authorizeEpitech"> {{ $t('message.connectIntraBtn') }} </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="5" class="ml-5 mb-3">
            <v-btn color="black" style="color: darkorange; width: 200px" @click="authorizeGoogle"> {{ $t('message.connectGoogleBtn') }} </v-btn>
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
      autoLogin: '',
      passLabel: this.$t("message.passwordLabel"),
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
        axios.post('http://localhost:8080/auth/login', {email: this.username, password: this.password},)
            .then((response) => {
              this.info = response.data;
              setUser(this.info.user.email, this.info.token.access_token);
              this.$router.push({name: 'home'})
            })
            .catch( () => {
              this.requestError()
            })
      } else {
        this.isError = this.$t("message.wrongPass")
      }
    },

    requestError() {
      console.log("user doesnt exist");
      this.isError = 'User ' + this.username + this.$t("message.unknownUser")
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

    authorizeEpitech() {
      if (this.autoLogin.length < 1) {
        this.isError = "Please enter an autologin link"
        return
      }
      axios.post('http://localhost:8080/intra/token', {link: this.autoLogin},)
          .then((response) => {
            setUser(response.data.email, response.data.token.access_token);
            this.$router.push({name: 'home'})
          })
          .catch( (error) => {
            console.log(error)
            this.isError = "Intra connection failed"
          })
    },

    authorizeGoogle() {
      this.connectOauth(googleCalendarUrl);
      localStorage.setItem('isLogged', 'true')
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