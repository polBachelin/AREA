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
          <v-card-title>Création de compte :</v-card-title>
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
            <v-text-field
                v-model="confirmPass"
                label="Mot de passe"
                prepend-icon="mdi-lock"
                type="password"
            />
          </v-card-text>
          <v-row class="mt-14">
            <v-col cols="12" class="mt-10 text-center">
              <v-btn dark @click="confirmUserCreation"> Valider </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-img>
  </v-container>
</template>

<script>
export default {
  name: "Register.vue",

  data() {
    return {
      username: '',
      password: '',
      confirmPass: ''
    }
  },

  methods: {
    confirmUserCreation() {
      if (this.password.length !== 0 && this.username.length !== 0) {
        if (this.password === this.confirmPass) {
          //  call Api with both variables
          //   if (valid)
          this.$router.push({name: 'home'})
        } else {
          alert("Votre deux mots de passes sont différents")
        }
      } else {
        alert("Veuillez entrer un nom et un mot de passe valide")
      }
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