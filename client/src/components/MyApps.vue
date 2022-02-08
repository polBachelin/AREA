<template>
  <v-container class="font-dongle">

    <v-row class="mt-10 text-center justify-center">
      <h1 class="mt-10" style="color: white; font-size: 80px">
        Mes Services
      </h1>
    </v-row>

    <v-row
        v-for="app in services"
        :key="app.id"
        class="justify-center align-center mt-2"
    >
      <v-col cols="1"></v-col>

      <v-col cols="10">
      <v-card class="justify-center align-center text-center mt-4" style="border: 3px solid darkorange">
        <v-row class="justify-center align-center">
        <v-col cols="1">
          <v-img :src="app.icon"/>
        </v-col>
        <v-col cols="3">
          <v-card-text style="font-size: 40px; font-weight: bold"> {{app.name}} </v-card-text>
        </v-col>
        <v-col cols="3" class="justify-center align-center">
          <v-col cols="12" class="mt-2">
            <v-card v-if="app.isConnected" style="background-color: darkorange">
              <v-row class="align-center justify-center">
                <v-col cols="6">
                  <v-card-text style="color: white; font-size: 30px"> connecté </v-card-text>
                </v-col>
                <v-col cols="4">
                  <v-icon style="color: white"> mdi-checkbox-marked-circle </v-icon>
                </v-col>
              </v-row>
            </v-card>
            <v-card v-else style="background-color: black" hover="hover" @click="connectToService(app.name)">
              <v-row class="align-center justify-center">
                <v-col cols="6">
                  <v-card-text style="color: darkorange; font-size: 30px"> hors-ligne </v-card-text>
                </v-col>
                <v-col cols="4">
                  <v-icon style="color: darkorange"> mdi-cancel </v-icon>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-col>
          <v-col cols="1">
            <v-tooltip bottom color="orange">
              <template v-slot:activator="{ on, attrs }">
                <v-card v-bind="attrs" v-on="on" :style="app.isConnected ? 'background-color: darkorange' : 'background-color: black'">
                  <v-card-text :style="app.isConnected ? 'color: white; font-size: 25px' : 'color: darkorange; font-size: 25px'"> {{app.actions.length}} actions </v-card-text>
                </v-card>
              </template>
              <span v-for="action in app.actions" v-bind:key="action.id"> - {{ action.name }}</span>
            </v-tooltip>
          </v-col>
          <v-col cols="1">
            <v-tooltip bottom color="orange">
              <template v-slot:activator="{ on, attrs }">
                <v-card v-bind="attrs" v-on="on" :style="app.isConnected ? 'background-color: darkorange' : 'background-color: black'">
                  <v-card-text :style="app.isConnected ? 'color: white; font-size: 25px' : 'color: darkorange; font-size: 25px'"> {{app.reactions.length}} actions </v-card-text>
                </v-card>
              </template>
              <span v-for="reaction in app.reactions" v-bind:key="reaction.id"> - {{ reaction.name }}</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-card>
      </v-col>

      <v-col cols="1"></v-col>
    </v-row>

  </v-container>
</template>

<script>
import axios from "axios";
import {notionUrl} from '@/oauth/Notion';
import {discordUrl} from '@/oauth/Discord';

export default {
  name: "MyApps",
  data() {
    return {
      services: [],
    }
  },

  methods: {
    connectToService(name) {
     if (name === "Discord") {
       window.location.replace(discordUrl);
     }
     if (name === "Notion") {
       window.location.replace(notionUrl);
     }
    },

    getNumber(arr) {
      console.log(arr)
      return arr.length
    }
  },

  mounted() {
    axios.get('http://localhost:3000/services')
        .then((response) => {
          this.services = response.data
        })
        .catch( () => {
          console.log("services fetch error")
        })
  }

}
</script>

<style scoped>

</style>