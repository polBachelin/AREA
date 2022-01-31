<template>
  <v-container class="ml-14">
    <v-img src="../assets/background.gif" max-height="800">
      <v-row class="justify-center">
        <v-card-text class="text-center title_text mt-10">
          Bienvenue sur l'area
        </v-card-text>
      </v-row>
      <v-row class="justify-center">

        <v-card class="login-card"
                width="500"
                height="500"
                :style="isError ? 'border: 10px solid red;' : 'border: 5px solid black;'"
        >
          <v-card-title class="font-weight-bold">Création de compte :</v-card-title>
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
            <v-text-field
                v-model="confirmPass"
                label="Mot de passe"
                prepend-icon="mdi-lock"
                type="password"
            />
          </v-card-text>
          <v-row class="mt-14">
            <v-col cols="12" class="mt-10 text-center">
              <v-btn color="black" style="color: darkorange" @click="confirmUserCreation"> Valider </v-btn>
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
      confirmPass: '',
      emailRules: [
        v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      isError: false,
    }
  },

  methods: {
    confirmUserCreation() {
      if (this.password.length !== 0 && this.username.length !== 0) {
        if (this.password === this.confirmPass) {
          //  call Api with both variables
          //   if (valid)
          localStorage.setItem('isLogged', 'true')
          this.$router.push({name: 'home'})
        } else {
          this.isError = true
          alert("Votre deux mots de passes sont différents")
        }
      } else {
        this.isError = true
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
  color: black;
}

.login-card {
  justify-content: center;
  elevation: higher;
}

</style>