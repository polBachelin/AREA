<template>
  <v-container>

    <v-row class="mt-10 text-center justify-center">
      <h1 class="mt-10" style="color: white">
        My Apps
      </h1>
    </v-row>

    <v-row
        v-for="app in myApps"
        :key="app.id"
        class="justify-center align-center mt-2"
    >
      <v-col cols="1"></v-col>

      <v-col cols="10">
      <v-card class="justify-center align-center text-center mt-4" style="border: 3px solid darkorange" height="100px">
        <v-row class="justify-center align-center">
        <v-col cols="1">
          <v-img :src="app.logo"/>
        </v-col>
        <v-col cols="3">
          <v-card-text style="font-size: large; font-weight: bold"> {{app.title}} </v-card-text>
        </v-col>
        <v-col cols="3" class="justify-center align-center">
          <v-col cols="12" class="mt-2">
            <v-card v-if="app.isConnected" style="background-color: darkorange">
              <v-row class="align-center justify-center">
                <v-col cols="6">
                  <v-card-text style="color: white"> connected </v-card-text>
                </v-col>
                <v-col cols="4">
                  <v-icon style="color: white"> mdi-checkbox-marked-circle </v-icon>
                </v-col>
              </v-row>
            </v-card>
            <v-card v-else style="background-color: black" hover="hover" @click="connectToService(app.id)">
              <v-row class="align-center justify-center">
                <v-col cols="6">
                  <v-card-text style="color: darkorange"> not connected </v-card-text>
                </v-col>
                <v-col cols="4">
                  <v-icon style="color: darkorange"> mdi-cancel </v-icon>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-col>
          <v-col cols="1">
            <v-card :style="app.isConnected ? 'background-color: darkorange' : 'background-color: black'">
              <v-card-text :style="app.isConnected ? 'color: white' : 'color: darkorange'"> {{ app.actions }} actions </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="1">
            <v-card :style="app.isConnected ? 'background-color: darkorange' : 'background-color: black'">
            <v-card-text :style="app.isConnected ? 'color: white' : 'color: darkorange'"> {{ app.areas }} areas </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      </v-col>

      <v-col cols="1"></v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: "MyApps",
  data() {
    return {
      myApps: [
        {
          id: 1,
          title: "Outlook",
          logo: require('@/assets/outlook-logo.jpg'),
          isConnected: false,
          actions: 2,
          areas: 3,
        },
        {
          id: 2,
          title: "Epitech",
          logo: require('@/assets/epitech-logo.png'),
          isConnected: true,
          actions: 3,
          areas: 3,
        },
        {
          id: 3,
          title: "Github",
          logo: require('@/assets/github-logo.jpg'),
          isConnected: false,
          actions: 4,
          areas: 4,
        },
      ],
    }
  },
  methods: {
    connectToService(id) {
     console.log(id)
    }
  }

}
</script>

<style scoped>

</style>