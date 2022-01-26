<template>
  <v-container style="color: white">

    <v-row class="mt-10 text-center justify-center">
      <h1>
        Create an area
      </h1>
    </v-row>

    <v-row>
      <div class="mt-10 mb-10"></div>
    </v-row>

<!--    left search field-->
    <v-row>
      <v-spacer></v-spacer>
      <v-tooltip bottom color="orange">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              class="mt-3"
              v-bind="attrs"
              v-on="on"
              icon
          >
            <v-icon style="color: darkorange">
              mdi-magnify
            </v-icon>
          </v-btn>
        </template>
        <span>Rechercher</span>
      </v-tooltip>
      <v-text-field
          background-color="white"
          style="max-width: 450px"
      />

      <v-spacer>  </v-spacer>
      <h1 style="color: darkorange" class="mt-1">
        . . .
      </h1>
      <v-icon large style="color: darkorange">mdi-arrow-right</v-icon>
      <h1 style="color: darkorange" class="mt-1">
        . . .
      </h1>
      <v-spacer>  </v-spacer>

      <!--    right search field-->
      <v-tooltip bottom color="orange">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              v-bind="attrs"
              v-on="on"
              class="mt-3"
              icon
          >
            <v-icon style="color: darkorange">
              mdi-magnify
            </v-icon>
          </v-btn>
        </template>
        <span>Rechercher</span>
      </v-tooltip>
      <v-text-field
          background-color="white"
          style="max-width: 450px"
      />
      <v-spacer></v-spacer>
    </v-row>

    <v-row style="margin-left: 200px">
      <h1 style="margin-left: 100px"> Connect an app ...</h1>
      <v-spacer></v-spacer>
      <h1 style="margin-left: 250px"> ... to another</h1>
      <v-spacer></v-spacer>
    </v-row>

    <v-row>
      <div class="mt-10 mb-10"></div>
    </v-row>

    <v-row justify="center">

      <v-card width="800" height="400" style="background-color: white; border: 1px solid darkorange">
        <v-row>
          <v-card>
            <v-card-text class="my-areas-title-text"> My Areas</v-card-text>
          </v-card>
        </v-row>

        <v-row
            v-for="area in areas"
            :key="area.id"
            class="text-center justify-center align-center"
        >
          <v-card
              style="background-color: black"
              class="mt-4 align-center justify-center"
              width="600px"
              height="70px"
          >
            <v-row class="align-center ml-3">
              <v-col cols="1">
                <v-img src="../assets/NuageShocked.png" max-width="50" max-height="50"/>
              </v-col>
              <v-col cols="1">
                <v-img src="../assets/NuageShocked.png" max-width="50" max-height="50"/>
              </v-col>
              <v-col cols="8" class="text-center justify-center">
                <v-card-text class="text-center align-center" style="color: white">
                  {{area.title}}
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-row>
      </v-card>
    </v-row>

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
          title: "Send an email when repo is pushed",
          firstLogo: "../assets/NuageShocked.png",
          secondLogo: "../assets/NuageShocked.png",
        },
        {
          id: 2,
          title: "Send an email when repo is pulled",
          firstLogo: "../assets/NuageShocked.png",
          secondLogo: "../assets/NuageShocked.png",
        },
        {
          id: 3,
          title: "Send an email when repo is created",
          firstLogo: "../assetsdskndks/area.jpeg",
          secondLogo: "../assets/NuageShocked.png",
        },

      ]
    }
  },
}
</script>

<style scoped>

.my-areas-title-text {
  background-color: darkorange;
  color: white;
  font-weight: bold;
  font-size: 30px
}

</style>