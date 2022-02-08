<template>
  <v-container class="mt-10">
    <v-row class="font-dongle">

<!--      LEFT CARD-->
      <v-col cols="5">
        <v-card
            style="background-color: white; height: 800px"
        >
          <v-card style="background-color: darkorange">
            <v-card-text  class="card-title text-center" style="color: black">
              CREATION D'AREA
            </v-card-text>
          </v-card>

          <v-row class="mt-2">
            <v-spacer></v-spacer>
              <v-text-field
                  style="font-size: 25px"
                  label="Donnez un nom à votre Area"
              />
            <v-spacer></v-spacer>
          </v-row>

          <v-row class="mt-15"></v-row>

          <v-row class="mt-10">
            <v-spacer></v-spacer>
            <v-btn
                @click="servicesInbound"
                style="background-color: black; color: darkorange; width: 300px; height: 70px; font-size: 35px"
            >
              Services
            </v-btn>
            <v-spacer></v-spacer>
          </v-row>
          <v-row v-if="yes === true" class="text-center justify-center mt-5">
            <v-icon color="orange"> mdi-plus </v-icon>
          </v-row>
          <v-row v-else class="text-center justify-center mt-5">
            <v-icon color="green"> mdi-checkbox-marked-circle </v-icon>
          </v-row>
          <v-row class="text-center justify-center">
            <v-icon color="orange"> mdi-arrow-down </v-icon>
          </v-row>

          <v-row class="mt-7">
            <v-spacer></v-spacer>
            <v-btn
                @click="actionsInbound"
                style="background-color: black; color: darkorange; width: 300px; height: 70px; font-size: 35px"
            >
              Actions
            </v-btn>
            <v-spacer></v-spacer>
          </v-row>
          <v-row v-if="yes === true" class="text-center justify-center mt-5">
            <v-icon color="orange"> mdi-plus </v-icon>
          </v-row>
          <v-row v-else class="text-center justify-center mt-5">
            <v-icon color="green"> mdi-checkbox-marked-circle </v-icon>
          </v-row>
          <v-row class="text-center justify-center">
            <v-icon color="orange"> mdi-arrow-down </v-icon>
          </v-row>

          <v-row class="mt-7">
            <v-spacer></v-spacer>
            <v-btn
                @click="reactionsInbound"
                style="background-color: black; color: darkorange; width: 300px; height: 70px; font-size: 35px"
            >
              Reactions
            </v-btn>
            <v-spacer></v-spacer>
          </v-row>

          <v-row class="mt-16"></v-row>

          <v-row class="mt-16">
            <v-spacer></v-spacer>
            <v-col>
              <v-btn style="background-color: darkorange; color: black; font-size: 20px; width: 150px">
                REINITIALISER
              </v-btn>
            </v-col>
            <v-col>
              <v-btn style="background-color: darkorange; color: black; font-size: 20px; width: 150px">
                CONFIRMER
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

        </v-card>
      </v-col>



<!--      RIGHT CARD-->
      <v-col cols="7">
        <v-card v-if="destination !== ''" style="background-color: white; height: 800px">
          <v-card-text  class="card-title text-center" style="color: darkorange">
            Choisissez des {{destination}}
            <v-row class="mt-16"></v-row>
          </v-card-text>
          <v-row
              v-for="item in selectedInfo"
              v-bind:key="item.id"
          >
            <v-col cols="1"></v-col>
            <v-col cols="10">
            <v-card height="100" width="800">
              <v-row>
              <v-col cols="2">
                <v-card-text> {{ item.name }} </v-card-text>
              </v-col>
              <v-col cols="2">
                <v-img :src="item.icon" max-height="50" max-width="50"/>
              </v-col>
              <v-col cols="2">
                <v-switch
                    label="Select"
                ></v-switch>
              </v-col>
              </v-row>
            </v-card>
            </v-col>
          </v-row>
        </v-card>

        <v-card v-else style="background-color: black; height: 800px" >
          <v-row style="margin-top: 400px">
          <v-card-text   style="color: darkorange; font-size: 40px; font-style: italic" class="text-center">
            En attente de création ...
            <v-row class="mt-16"></v-row>
          </v-card-text>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: "Area.vue",

  data() {
    return {
      destination: '',
      selectedInfo: [
        {
          id: 0,
          name: "Notion",
          icon: "https://img.icons8.com/ios/500/notion.png"
        },
        {
          id: 1,
          name: "Discord",
          icon: "https://banner2.cleanpng.com/20180716/gjb/kisspng-discord-computer-icons-logo-smiley-decal-avatar-discord-5b4c86db5cb894.5744109815317419153798.jpg"
        },

      ],
    }
  },

  methods: {
    servicesInbound() {
      this.destination = 'services'
    },
    actionsInbound() {
      this.destination = 'actions'
    },
    reactionsInbound() {
      this.destination = 'reactions'
    },
    selectType(name) {
      console.log(name)
    }
  }
}
</script>

<style scoped>

.card-title {
  font-size: 50px;
  font-weight: bold;
  justify-content: center;
}

</style>