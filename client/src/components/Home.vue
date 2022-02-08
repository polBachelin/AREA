<template>
  <v-container style="color: white; background-color: darkorange" class="font-dongle">

    <v-row class="mt-10 text-center justify-center" style="color: white">
        <v-hover v-slot="{ hover }">
          <v-btn
              @click="goToArea"
              elevation="5"
              width="500"
              height="100"
              :style=" hover ? 'background-color: black; color: darkorange; font-size: 60px; border: 1px solid white' : 'background-color: black; color: white; font-size: 70px' "
          >
            Create Area
          </v-btn>
        </v-hover>
    </v-row>

    <v-row>
      <div class="mt-10 mb-10"></div>
    </v-row>

<!--    left search field-->
    <v-row>
      <v-spacer></v-spacer>
      <v-tooltip bottom color="black">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              class="mt-3"
              v-bind="attrs"
              v-on="on"
              icon
          >
            <v-icon style="color: black">
              mdi-magnify
            </v-icon>
          </v-btn>
        </template>
        <span>Rechercher</span>
      </v-tooltip>
      <v-text-field
          background-color="white"
          style="max-width: 450px; font-size: 30px"
      />

      <v-spacer>  </v-spacer>
      <h1 style="color: black" class="mt-2">
        . . .
      </h1>
      <v-icon large style="color: black">mdi-arrow-right</v-icon>
      <h1 style="color: black" class="mt-2">
        . . .
      </h1>
      <v-spacer>  </v-spacer>

      <!--    right search field-->
      <v-tooltip bottom color="black">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              v-bind="attrs"
              v-on="on"
              class="mt-3"
              icon
          >
            <v-icon style="color: black">
              mdi-magnify
            </v-icon>
          </v-btn>
        </template>
        <span>Rechercher</span>
      </v-tooltip>
      <v-text-field

          background-color="white"
          style="max-width: 450px; font-size: 30px"
      />
      <v-spacer></v-spacer>
    </v-row>

    <v-row style="margin-left: 200px">
      <h1 style="margin-left: 100px; font-style: italic; color: black"> Connectez une app ...</h1>
      <v-spacer></v-spacer>
      <h1 style="margin-left: 300px; font-style: italic; color: black"> ... à une autre</h1>
      <v-spacer></v-spacer>
    </v-row>

    <v-row>
      <div class="mt-10 mb-10"></div>
    </v-row>

    <v-row justify="center">

      <v-card width="800" style="background-color: black; border: 3px solid white">
        <v-row>
          <v-card class="mb-3">
            <v-card-text class="my-areas-title-text" style="color: black; border: 1px solid black; background-color: darkorange"> Mes Aréas</v-card-text>
          </v-card>
        </v-row>

        <v-row
            v-for="area in areas"
            :key="area.id"
            class="text-center justify-center align-center"
        >
          <v-card
              style="background-color: white; border: 1px solid darkorange"
              class="mt-1 mb-16"
              width="600px"
              height="70px"
              elevation="10"

          >
            <v-row class="align-center align-content-center ml-3">
              <v-col cols="1">
                <v-img src="../assets/NuageShocked.png" max-width="50" max-height="50"/>
              </v-col>
              <v-col cols="1">
                <v-img src="../assets/NuageShocked.png" max-width="50" max-height="50"/>
              </v-col>
              <v-col cols="8">
                <v-card-text class="text-center mt-1" style="color: black; font-size: 35px">
                  {{area.title}}
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-row>
      </v-card>
    </v-row>

    <v-row class="mb-10"></v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home.vue",

  data() {
    return {
      areas: [
        {
          id: 1,
          title: "Envoyer un email lorsque le repo est push",
          firstLogo: "../assets/NuageShocked.png",
          secondLogo: "../assets/NuageShocked.png",
        },
        {
          id: 2,
          title: "Envoyer un email lorsque le repo est pull",
          firstLogo: "../assets/NuageShocked.png",
          secondLogo: "../assets/NuageShocked.png",
        },
        {
          id: 3,
          title: "Envoyer un email lorsque le repo est créé",
          firstLogo: "../assetsdskndks/area.jpeg",
          secondLogo: "../assets/NuageShocked.png",
        },
        {
          id: 4,
          title: "Envoyer un email lorsque le repo est créé",
          firstLogo: "../assetsdskndks/area.jpeg",
          secondLogo: "../assets/NuageShocked.png",
        },
        {
          id: 5,
          title: "Envoyer un email lorsque le repo est créé",
          firstLogo: "../assetsdskndks/area.jpeg",
          secondLogo: "../assets/NuageShocked.png",
        },
      ]
    }
  },
  methods: {
    goToArea() {
      this.$router.push({name: 'area'})
    }
  }
}

</script>

<style scoped>

.my-areas-title-text {
  background-color: black;
  font-weight: bold;
  font-size: 50px
}

</style>