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

          <v-row>
            <v-col cols="1"></v-col>
<!--            ACTION BUTTONS-->
            <v-col cols="5">
              <v-row class="mt-10">
                <v-btn
                    @click="actionServicesInbound"
                    style="background-color: black; color: darkorange; width: 300px; height: 70px; font-size: 35px"
                >
                  Services
                </v-btn>
              </v-row>
              <v-row v-if="this.selectedActionService.actions" class="text-center justify-center mt-5">
                <v-icon color="green"> mdi-checkbox-marked-circle </v-icon>
              </v-row>
              <v-row v-else class="text-center justify-center mt-5">
                <v-icon color="orange"> mdi-plus </v-icon>
              </v-row>
              <v-row class="text-center justify-center">
                <v-icon color="orange"> mdi-arrow-down </v-icon>
              </v-row>

              <v-row class="mt-7">
                <v-btn
                    @click="actionsInbound"
                    style="background-color: black; color: darkorange; width: 300px; height: 70px; font-size: 35px"
                >
                  Actions
                </v-btn>
              </v-row>
              <v-row v-if="this.selectedAction !== ''" class="text-center justify-center mt-5">
                <v-icon color="green"> mdi-checkbox-marked-circle </v-icon>
              </v-row>
              <v-row v-else class="text-center justify-center mt-5">
                <v-icon color="orange"> mdi-plus </v-icon>
              </v-row>
              <v-row class="text-center justify-center">
                <v-icon color="orange"> mdi-arrow-down </v-icon>
              </v-row>
            </v-col>

            <v-col cols="5">
<!--              REACTION BUTTONS-->
                <v-row class="mt-10">
                  <v-btn
                      @click="reactionServicesInbound"
                      style="background-color: black; color: darkorange; width: 300px; height: 70px; font-size: 35px"
                  >
                    Services
                  </v-btn>
                </v-row>
                <v-row v-if="this.selectedReactionService.reactions" class="text-center justify-center mt-5">
                  <v-icon color="green"> mdi-checkbox-marked-circle </v-icon>
                </v-row>
                <v-row v-else class="text-center justify-center mt-5">
                  <v-icon color="orange"> mdi-plus </v-icon>
                </v-row>
                <v-row class="text-center justify-center">
                  <v-icon color="orange"> mdi-arrow-down </v-icon>
                </v-row>

                <v-row class="mt-7">
                  <v-btn
                      @click="reactionsInbound"
                      style="background-color: black; color: darkorange; width: 300px; height: 70px; font-size: 35px"
                  >
                    Reactions
                  </v-btn>
                </v-row>
                <v-row v-if="this.selectedReaction !== ''" class="text-center justify-center mt-5">
                  <v-icon color="green"> mdi-checkbox-marked-circle </v-icon>
                </v-row>
                <v-row v-else class="text-center justify-center mt-5">
                  <v-icon color="orange"> mdi-plus </v-icon>
                </v-row>
                <v-row class="text-center justify-center">
                  <v-icon color="orange"> mdi-arrow-down </v-icon>
                </v-row>
            </v-col>
            <v-col cols="1"></v-col>
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
        <v-card v-if="currentDestination.label !== 'none'"  style="background-color: white" class="mb-15">
          <v-card-text
              class="card-title text-center"
              style="color: darkorange"
          >
            Choisissez des {{currentDestination.label}}
            <v-row class="mt-16"></v-row>
          </v-card-text>
          <v-row
              v-for="(item, index) in selectInfo()"
              v-bind:key="index"
          >
            <v-col cols="1"></v-col>
            <v-col cols="10">
            <v-card class="mt-1" width="800">
              <v-row v-if="currentDestination.label === 'services pour actions' || currentDestination.label === 'services pour reactions'">
                <v-col cols="4">
                  <v-card-text class="text-center" style="font-size: 30px"> {{ item.name }} </v-card-text>
                </v-col>
                <v-col cols="2">
                  <v-img :src="item.icon" max-height="50" max-width="50"/>
                </v-col>
                <v-col cols="4" class="text-right">
                  <v-btn v-if="currentDestination.label === 'services pour actions'"
                         @click="selectActionService(index)" :style= "isButtonIndex(selectedActionService, index) ? 'background-color: lime' : ''">
                    SELECT
                  </v-btn>
                  <v-btn v-if="currentDestination.label === 'services pour reactions'"
                         @click="selectReactionService(index)" :style= "isButtonIndex(selectedReactionService, index) ? 'background-color: lime' : ''">
                    SELECT
                  </v-btn>
                </v-col>
              </v-row>
              <v-row v-if="currentDestination.label === 'actions' || currentDestination.label === 'reactions'">
                <v-col cols="4">
                  <v-card-text class="text-center" style="font-size: 30px"> {{ item }} </v-card-text>
                </v-col>
                <v-col cols="2">
                  <v-img :src="item.icon" max-height="50" max-width="50"/>
                </v-col>
                <v-col cols="4" class="text-right">
                  <v-btn v-if="currentDestination.label === 'actions'"
                         @click="selectAction(index)" :style="isButtonIndexSigma(index, 1) ? 'background-color: lime' : ''">
                    SELECT
                  </v-btn>
                  <v-btn v-if="currentDestination.label === 'reactions'"
                         @click="selectReaction(index)" :style="isButtonIndexSigma(index, 2) ? 'background-color: lime' : ''">
                    SELECT
                  </v-btn>
                </v-col>
              </v-row>

<!--              ACTIONS ADDITIONAL OPTIONS-->
              <v-row v-if="currentDestination.label === 'actions' && currentDestination.isClicked">

                <!--              NOTION -->
                <v-row v-if="selectedActionService.name === 'Notion'" class="text-center justify-center mb-5">
                    <v-menu
                        v-if="selectedAction === 'Add to database'"
                        rounded
                        offset-y
                    >
                      <template v-slot:activator="{ attrs, on }">
                        <v-btn
                            v-bind="attrs"
                            v-on="on"
                            color="orange"
                        >
                          Choose Database
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item
                            v-for="item in databases"
                            :key="item.id"
                            @click="selectDatabase(item.id)"
                            link
                        >
                          <v-list-item-title v-text="item.title[0].text.content"></v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-row>

                </v-row>


<!--              REACTIONS-->
              <v-row v-if="currentDestination.label === 'reactions' && currentDestination.isClicked">

                <!--              DISCORD -->
                <v-row v-if="selectedReactionService.name === 'Discord'" class="text-center justify-center mb-5">

                  <v-row v-if="selectedReaction === 'Send a message'">
                    <v-col cols="4" class="text-center justify-center">
                      <v-menu
                          rounded
                          offset-y
                      >
                        <template v-slot:activator="{ attrs, on }">
                          <v-btn
                              v-bind="attrs"
                              v-on="on"
                              color="orange"
                          >
                            Choose Guild
                          </v-btn>
                        </template>

                        <v-list>
                          <v-list-item
                              v-for="item in channels"
                              :key="item.id"
                              @click="selectGuild(item.id)"
                              link
                          >
                            <v-list-item-title v-text="item.name"></v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                    <v-col cols="7">
                      <v-text-field
                          label="Message"
                          v-model="discordMessage"
                          prepend-icon="mdi-pen"
                          clearable
                      />
                    </v-col>
                  </v-row>
                </v-row>


              </v-row>

            </v-card>
            </v-col>
          </v-row>
          <v-row class="mt-10">
            <v-spacer></v-spacer>
            <v-btn
                v-if="currentDestination.label === 'reactions'"
                :disabled="!currentDestination.isConfirmed"
                @click="saveArea"
                style="background-color: darkorange; color: black; font-size: 20px"
                class="mb-3"
            >
              SAUVEGARDER
            </v-btn>
            <v-btn
                v-else
                :disabled="!currentDestination.isConfirmed"
                @click="goToNextDestination"
                style="background-color: darkorange; color: black; font-size: 20px"
                class="mb-3"
            >
              SUIVANT
            </v-btn>
            <v-spacer></v-spacer>
          </v-row>
          <v-row v-if="rightCardError.length > 0">
            <v-card-text class="text-center" style="color: red; font-size: 30px">{{rightCardError}}</v-card-text>
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
        {label: 'services pour actions', isConfirmed: false, isClicked: false, service: ''},
        {label: 'actions', isConfirmed: false, isClicked: false, service: ''},
        {label: 'services pour reactions', isConfirmed: false, isClicked: false, service: ''},
        {label: 'reactions', isConfirmed: false, isClicked: false, service: ''},
      ],
      currentDestination: {label: 'none'},
      selectedActionService: [],
      selectedAction: '',
      selectedReactionService: [],
      selectedReaction: '',
      isSelected: false,
      services: [],
      errorMsg: '',
      rightCardError: '',
      areaName: '',
      databases: [],
      accessToken: '',
      selectedDatabase: '',
      channels: [],
      selectedGuild: '',
      discordMessage: '',
      areaBody: {
        name: '',
        actionName: '',
        actionData: {},
        reactionName: '',
        reactionData: {}
      }
    }
  },

  created() {
    this.currentDestination = {label: 'none'}
    this.resetArea()
    this.accessToken = localStorage.getItem('accessToken')
    axios.get('http://localhost:3000/services', {headers: {'Authorization': 'Bearer ' + this.accessToken}})
        .then((response) => {
          this.services = response.data
        })
        .catch( () => {
          console.log("services fetch error")
        })

    axios.get('http://localhost:3000/notion/databases', {headers: {'Authorization': 'Bearer ' + this.accessToken }})
        .then((response) => {
          this.databases = response.data.results
        })
        .catch( () => {
          console.log("databases fetch error")
        })

    axios.get('http://localhost:3000/discord/getChannels', {headers: {'Authorization': 'Bearer ' + this.accessToken }})
        .then((response) => {
          this.channels = response.data
          this.filterChannels()
          console.log(response.data)
        })
        .catch( () => {
          console.log("databases fetch error")
        })


  },

  methods: {
    actionServicesInbound() {
      this.currentDestination = this.destinations[1]
    },
    reactionServicesInbound() {
      this.currentDestination = this.destinations[3]
    },
    actionsInbound() {
      this.currentDestination = this.destinations[2]
    },
    reactionsInbound() {
      this.currentDestination = this.destinations[4]
    },
    selectType(name) {
      console.log(name)
    },
    goToNextDestination() {
      if (this.currentDestination.label === 'services pour actions') {
        this.destinations[1].isConfirmed = true
        this.currentDestination = this.destinations[2]
        return
      }
      if (this.currentDestination.label === 'actions') {
        this.destinations[2].isConfirmed = true
        this.currentDestination = this.destinations[3]
        return
      }
      if (this.currentDestination.label === 'services pour reactions') {
        this.destinations[3].isConfirmed = true
        this.currentDestination = this.destinations[4]
        return
      }
    },

    selectInfo() {
      let info = []

      if (this.currentDestination.label === 'services pour actions' || this.currentDestination.label === 'services pour reactions') {
        info = this.services
      }
      if (this.currentDestination.label === 'actions') {
        info = this.selectedActionService.actions
      }
      if (this.currentDestination.label === 'reactions') {
        info = this.selectedReactionService.reactions
      }
      return info
    },

    selectActionService(id) {
      this.selectedActionService = this.services[id]
      this.currentDestination.isConfirmed = true
    },

    selectAction(id) {
      this.selectedAction = this.selectedActionService.actions[id]
      this.currentDestination.isClicked = true
    },

    selectReactionService(id) {
      this.selectedReactionService = this.services[id]
      this.currentDestination.isConfirmed = true
    },

    selectReaction(id) {
      this.selectedReaction = this.selectedReactionService.reactions[id]
      this.currentDestination.isClicked = true
    },

    saveArea() {
      if (this.selectedActionService.name === 'Notion')
        this.selectedActionService.name = 'NotionDB'
      if (this.selectedReactionService.name === 'Notion')
        this.selectedReactionService.name = 'NotionDB'

      this.areaBody.name = this.selectedActionService.name
      this.areaBody.actionName = this.selectedAction
      this.areaBody.reactionName = this.selectedReaction

      if (this.selectedReaction === 'Send a message') {
        if (!this.discordMessage) {
          this.rightCardError = 'Please fill a message'
          return
        }
        this.areaBody.actionData = {database_id: this.selectedDatabase}
        this.areaBody.reactionData = {message_content: this.discordMessage, guild_id: this.selectedGuild}
        this.sendAreaToBack(this.areaBody)
      }

      console.log('done')
    },

    sendAreaToBack() {
      let body = this.areaBody
      axios.post('http://localhost:3000/area/create', {headers: {'Authorization': 'Bearer ' + this.accessToken}, body: {body}})
          .then((response) => {
            console.log(response.data)
          })
          .catch( () => {
            console.log("post to area error")
          })
    },

    resetArea() {
      this.selectedActionService = []
      this.selectedAction = ''
      this.selectedReactionService = []
      this.selectedReaction = ''
    },
    confirmArea() {
      if (this.destinations[1].isConfirmed === false || this.destinations[2].isConfirmed === false || this.areaName === '') {
        this.errorMsg = 'Veuillez remplir toutes les conditions !'
      }
    },

    isButtonIndex(service, id) {
      if (service === this.services[id]) {
        return true
      }
      return false
    },

    isButtonIndexSigma(index, which) {
      if (which === 1) {
        if (this.selectedActionService.actions[index] === this.selectedAction) {
          return true
        } else {
          return false
        }
      }
      if (which === 2) {
        if (this.selectedReactionService.reactions[index] === this.selectedReaction) {
          return true
        } else {
          return false
        }
      }
    },

    selectDatabase(id) {
      this.selectedDatabase = id
      this.currentDestination.isConfirmed = true
    },

    selectGuild(id) {
      this.selectedGuild = id
      this.currentDestination.isConfirmed = true
    },

    filterChannels() {
      this.channels = this.channels.filter(channel => channel.type === 'text')
    },
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