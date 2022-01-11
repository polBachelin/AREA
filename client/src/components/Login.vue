<template>
  <v-container class="ml-14">
    <v-img src="../assets/background.gif" max-height="800">
    <v-row class="justify-center">
      <v-card-text class="text-center title_text mt-10" >
        Bienvenue sur l'area
      </v-card-text>
    </v-row>
    <v-row class="justify-center">

      <v-card class="justify-center elevation-4" width="500" height="500">
        <v-card-title>Veuillez vous connecter :</v-card-title>
        <v-card-text class="mt-3">
          <v-text-field
              v-model="username"
              label="Nom d'utilisateur"
              prepend-icon="mdi-account-circle"
          />
          <v-text-field
              v-model="password"
              label="Mot de passe"
              prepend-icon="mdi-lock"
              type="password"
          />
        </v-card-text>
        <v-row class="align-end mt-14">
          <v-col cols="6" class="mt-10 text-right">
            <v-btn dark @click="confirmUserPass"> Confirmer </v-btn>
          </v-col>
          <v-col cols="6" class="text-left">
            <v-btn dark @click="goToRegister"> Créer un compte </v-btn>
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
    }
  },

  methods: {
    confirmUserPass() {
      if (this.password.length !== 0 && this.username.length !== 0) {
      //  call Api with both variables
      //   if (valid)
        this.$router.push({name: 'home'})
      } else {
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
  color: orange;
}

</style>