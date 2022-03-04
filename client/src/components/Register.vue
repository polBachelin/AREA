<template>
  <v-container class="ml-14">
    <v-img src="../assets/background.gif" max-height="800">
      <v-row class="justify-center">
        <v-card-text class="text-center title_text mt-10">
          Welcome to the Area
        </v-card-text>
      </v-row>
      <v-row class="justify-center">

        <v-card class="login-card"
                width="500"
                height="500"
                :style="isError !== 'none' ? 'border: 10px solid red;' : 'border: 5px solid black;'"
        >
          <v-card-title class="font-weight-bold">Account creation :</v-card-title>
          <v-card-text class="mt-3">
            <v-text-field
                v-model="username"
                label="E-mail"
                prepend-icon="mdi-account-circle"
                :rules="emailRules"
            />
            <v-text-field
                v-model="password"
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
            />
            <v-text-field
                v-model="confirmPass"
                label="Confirm Password"
                prepend-icon="mdi-lock"
                type="password"
            />
          </v-card-text>

          <v-row v-if="isError !== 'none'" class="text-center justify-center" style="color: red">
            <v-card-text>{{isError}}</v-card-text>
          </v-row>

          <v-row class="mt-14">
            <v-col cols="12" class="mt-10 text-center">
              <v-btn color="black" style="color: darkorange" @click="confirmUserCreation"> Confirm </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-img>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Register.vue",

  data() {
    return {
      username: '',
      password: '',
      confirmPass: '',
      emailRules: [
        v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      isError: 'none',
    }
  },

  methods: {
    confirmUserCreation() {
      if (this.password.length !== 0 && this.username.length !== 0) {
        if (this.password === this.confirmPass) {
          axios.post('http://localhost:3000/auth/register', {email: this.username, password: this.password,})
              .then((response) => {
                console.log(response);
                this.info = response.data
                localStorage.setItem('username', this.info.user.email)
                localStorage.setItem('accessToken', this.info.token.access_token)
                localStorage.setItem('isLogged', 'true')
                this.$router.push({name: 'home'})
              })
              .catch( () => {
                this.isError = "User " + this.username + " already exists !"
              })

        } else {
          this.isError = "Passwords does not match !"
        }
      } else {
        this.isError = 'Name or Password not valid !'
      }
    },

    created() {
      localStorage.setItem('isLogged', 'false')
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

.login-card {
  justify-content: center;
  elevation: higher;
}

</style>