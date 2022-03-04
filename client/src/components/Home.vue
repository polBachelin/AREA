<template>
  <v-container style="color: white; background-color: darkorange" class="font-dongle">

    <v-row justify="center">

      <v-card width="800" style=" background-color: white; border-radius: 0px 0px 10px 10px; margin: 0px 0px -110px;">
        <v-row class="mt-1 mb-1"></v-row>
        <v-row v-if="areas.length === 0">
            <v-card-text class="text-center mt-10 mb-10" style=" color: grey; font-size: 40px; border-radius: 0px">Aucune Aréa</v-card-text>
        </v-row>
        <v-row v-else
            v-for="(area, index) in getComputedAreas"
            :key="area.id"
            class="text-center justify-center align-center"
        >
          <v-card 
              style="background-color: white; border: 1px solid darkorange"
              class="mt-2 mb-2"
              width="600px"
              height="60px"
              elevation="10"
          >
            <v-row class="align-center align-content-center ml-3">
              <v-col cols="9">
                <v-card-text class="text-center mt-1 mb-1" style="color: black; font-size: 35px">
                  {{ area.name }}
                </v-card-text>
              </v-col>
              <v-col cols="2" class="align-end mr-2">
                <v-switch
                    color="orange"
                    :input-value="area.isenabled"
                    :append-icon="area.isenabled ? 'mdi-checkbox-marked-circle' : 'mdi-cancel'"
                    @change="changeArea(index, area)"
                >
                </v-switch>
              </v-col>
            </v-row>

          </v-card>
        </v-row>
        <v-card-text class="text-center mt-13 mb-13"> </v-card-text>
      </v-card>

    </v-row>
  
    <v-row >
        <v-card  width="100%" style="color: white;  background-color: black; border-radius: 0px; margin-bottom:50vh">
          <v-row justify="center">
            <v-col  cols="4">
            </v-col>
            <v-col  cols="4">
              <v-card-text class="text-center mt-4 mb-4" style="color: white; font-size: 60px; border-radius: 0px"> Mes Aréas</v-card-text>
            </v-col>
            <v-col cols="4" class="text-right d-flex justify-center align-center">
              <v-hover v-slot="{ hover }">
                <router-link 
                    to="/Area" 
                    >
                    <v-img 
                      src="@/assets/addIcon.png"
                      max-height="100"
                      max-width="100"
                      :style=" hover ? 'margin-top:-10px; margin-bottom:-10px; margin-left:100px' : 'margin-top:-10px; margin-bottom:-10px; margin-left:100px' "
                    />
                  </router-link>
              </v-hover>
            </v-col>
          </v-row>
        </v-card>
    
    </v-row>

    <v-row class="mb-10"></v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Home.vue",

  data() {
    return {
      areas: [],
      isEnabled: false,
      switchText: 'disabled',
    }
  },

  computed: {
    getComputedAreas: function () {
      return this.areas
    }
  },

  methods: {
    async changeArea(index, area) {
      if (!area.isenabled) {
        await axios.get(`http://localhost:3000/area/${area.name}/enable`, { 'headers': { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }} )
            .then((response) => {
              console.log(response.data, "area enabled")
              this.areas[index].isenabled = true
            })
            .catch(() => {
              console.log("Enable area error")
            })
      } else {
        await axios.get(`http://localhost:3000/area/${area.name}/disable`, { 'headers': { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }} )
            .then((response) => {
              console.log(response.data, "area disabled")
              this.areas[index].isenabled = false
            })
            .catch(() => {
              console.log("Disable area error")
            })
      }
    },


    async checkAreaStatus(name) {
      try {
          let response = await axios.get(`http://localhost:3000/area/${name}/isEnabled`, {'headers': {'Authorization': 'Bearer ' + localStorage.getItem('accessToken')}})
          console.log(name, ' is enabled ? ',response.data)
          return response.data
      } catch (error)  {
       console.log(error, "Enable area error")
      }
    },

    async getAreas() {
      await axios.get('http://localhost:3000/area', { 'headers': { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }} )
          .then((response) => {
            this.areas = response.data
            console.log("areas received: ", this.areas)
            this.areas.forEach(e => e.isenabled = this.checkAreaStatus(e.name)) //IT fukinnn RETURN A PROMISE OBJECT
          })
          .catch((error) => {
            console.log(error, "area get error")
          })
    },


  },
  
    mounted() {
       this.getAreas()
  },
}

</script>

<style scoped>

</style>