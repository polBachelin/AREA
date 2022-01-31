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
              :style="isError ? 'border: 10px solid red;' : 'border: 5px solid black'"
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
        <v-row style="margin-top: 150px">
          <v-col cols="5" class="ml-5">
            <v-btn color="black" style="color: darkorange; width: 200px" @click="confirmUserPass"> Confirmer </v-btn>
          </v-col>
          <v-col cols="6" class="ml-5">
            <v-btn color="black" style="color: darkorange; width: 200px" @click="goToRegister"> Créer un compte </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
    </v-img>
  </v-container>
</template>

<script>
export default {
  name: "Login.vue",

  data() {
    return {
      username: '',
      password: '',
      emailRules: [
        v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      isError: false,
    }
  },

  created() {
    localStorage.setItem('isLogged', 'false')
  },

  methods: {
    confirmUserPass() {
      if (this.password.length !== 0 && this.username.length !== 0) {
      //  call Api with both variables
      //   if (valid)
        localStorage.setItem('isLogged', 'true')
        this.$router.push({name: 'home'})
      } else {
        this.isError = true
        alert("Veuillez entrer un nom et un mot de passe valide")
      }
    },

    goToRegister() {
      this.$router.push({name: 'register'})
    },
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