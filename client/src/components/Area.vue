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
                  v-model="areaName"
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
          <v-row v-if="this.destinations[1].isConfirmed === true" class="text-center justify-center mt-5">
            <v-icon color="green"> mdi-checkbox-marked-circle </v-icon>
          </v-row>
          <v-row v-else class="text-center justify-center mt-5">
            <v-icon color="orange"> mdi-plus </v-icon>
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
          <v-row v-if="this.destinations[2].isConfirmed === true" class="text-center justify-center mt-5">
            <v-icon color="green"> mdi-checkbox-marked-circle </v-icon>
          </v-row>
          <v-row v-else class="text-center justify-center mt-5">
            <v-icon color="orange"> mdi-plus </v-icon>
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
              <v-btn @click="resetArea" style="background-color: darkorange; color: black; font-size: 20px; width: 150px">
                REINITIALISER
              </v-btn>
            </v-col>
            <v-col>
              <v-btn @click="confirmArea" style="background-color: darkorange; color: black; font-size: 20px; width: 150px">
                CONFIRMER
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

          <v-row v-if="errorMsg !== ''">
            <v-card-text class="text-center" style="font-style: italic; font-size: 25px; color: red">
              {{errorMsg}}
            </v-card-text>
          </v-row>

        </v-card>
      </v-col>



<!--      RIGHT CARD-->
      <v-col cols="7">
        <v-card v-if="currentDestination !== 'none'" style="background-color: white; height: 800px">
          <v-card-text  class="card-title text-center" style="color: darkorange">
            Choisissez des {{currentDestination}}
            <v-row class="mt-16"></v-row>
          </v-card-text>
          <v-row
              v-for="item in selectInfo()"
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
                    @change="isSelected = !isSelected"
                    label="Select"
                ></v-switch>
              </v-col>
              </v-row>

            </v-card>
            </v-col>
          </v-row>
          <v-row class="mt-10">
            <v-spacer></v-spacer>
            <v-btn
                @click="goToNextDestination"
                :disabled="!isSelected"
                style="background-color: darkorange; color: black; font-size: 20px; width: 150px"
            >
              SUIVANT
            </v-btn>
            <v-spacer></v-spacer>
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
import axios from "axios";

export default {
  name: "Area.vue",

  data() {
    return {
      destinations: [
        {label: 'none'},
        {label: 'services', isConfirmed: 'false', service: ''},
        {label: 'actions', isConfirmed: 'false', service: ''},
        {label: 'reactions', isConfirmed: 'false', service: ''},
      ],
      currentDestination: 'none',
      selectedID: -1,
      isSelected: false,
      services: [],
      errorMsg: '',
      areaName: '',
    }
  },

  created() {
    this.currentDestination = 'none'

    axios.get('http://localhost:3000/services')
        .then((response) => {
          this.services = response.data
        })
        .catch( () => {
          console.log("services fetch error")
        })
  },

  methods: {
    servicesInbound() {
      this.currentDestination = 'services'
    },
    actionsInbound() {
      this.currentDestination = 'actions'
    },
    reactionsInbound() {
      this.currentDestination = 'reactions'
    },
    selectType(name) {
      console.log(name)
    },
    goToNextDestination() {
      if (this.currentDestination === 'services') {
        this.destinations[1].isConfirmed = true
        this.currentDestination = 'actions'
        return
      }
      if (this.currentDestination === 'actions') {
        this.destinations[2].isConfirmed = true
        this.currentDestination = 'reactions'
        return
      }
      if (this.currentDestination === 'reactions') {
        this.saveArea()
      }
    },

    selectInfo() {
      let info = []

      if (this.currentDestination === 'services') {
        info = this.services
      }

      if (this.selectedID < 0)
        return info
      if (this.currentDestination === 'actions') {
        info = this.services[this.selectedID].actions
      }
      if (this.currentDestination === 'reactions') {
        info = this.services[this.selectedID].reactions
      }
      return info
    },

    saveArea() {
      console.log('done')
    },
    resetArea() {
      this.destinations[1].isConfirmed = false
      this.destinations[1].service = ''
      this.destinations[2].isConfirmed = false
      this.destinations[2].service = ''
    },
    confirmArea() {
      if (this.destinations[1].isConfirmed === false || this.destinations[2].isConfirmed === false || this.areaName === '') {
        this.errorMsg = 'Veuillez remplir toutes les conditions !'
      }
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