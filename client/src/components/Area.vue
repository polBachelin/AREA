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
              AREA CREATION
            </v-card-text>
          </v-card>

          <v-row class="mt-2">
            <v-spacer></v-spacer>
              <v-text-field
                  style="font-size: 25px"
                  label="Give a name to your Area"
                  v-model="areaName"
              />
            <v-spacer></v-spacer>
          </v-row>

          <v-row class="mt-15"></v-row>

          <v-row>
            <v-col cols="1"></v-col>
<!--            ACTION BUTTONS-->
            <v-col cols="5">
              <v-row class="mt-10 justify-center text-center">
                <v-btn
                    @click="actionServicesInbound"
                    style="background-color: black; color: darkorange; width: 170px ;height: 70px; font-size: 35px"
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

              <v-row class="mt-7 justify-center text-center">
                <v-btn
                    @click="actionsInbound"
                    style="background-color: black; color: darkorange; height: 70px; width: 170px ; font-size: 35px"
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
                <v-row class="mt-10 text-center justify-center">
                  <v-btn
                      @click="reactionServicesInbound"
                      style="background-color: black; color: darkorange; height: 70px; width: 170px; font-size: 35px"
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

                <v-row class="mt-7 justify-center text-center">
                  <v-btn
                      @click="reactionsInbound"
                      style="background-color: black; color: darkorange; height: 70px; width: 170px; font-size: 35px"
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
                RESET
              </v-btn>
            </v-col>
            <v-col>
              <v-btn @click="confirmArea" style="background-color: darkorange; color: black; font-size: 20px; width: 150px">
                CONFIRM
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

          <v-row>
            <v-card-text class="text-center" style="font-style: italic; font-size: 20px" v-if="this.areaName && this.selectedReactionService.name && this.selectedActionService.name">
              Your area: {{this.areaName}} has this action: {{this.selectedAction}} from {{this.selectedActionService.name}} and gets this reaction: {{this.selectedReaction}} from {{this.selectedReactionService.name}}
            </v-card-text>
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
            Choose {{currentDestination.label}}
            <v-row class="mt-16"></v-row>
          </v-card-text>
          <v-row
              v-for="(item, index) in selectInfo()"
              v-bind:key="index"
          >
            <v-col cols="1"></v-col>
            <v-col cols="10">
            <v-card class="mt-1" width="800" elevation="7">
              <v-row v-if="currentDestination.label === 'services for actions' || currentDestination.label === 'services for reactions'">
                <v-col cols="4">
                  <v-card-text class="text-center" style="font-size: 30px; font-weight: bold"> {{ item.name }} </v-card-text>
                </v-col>
                <v-col cols="2">
                  <v-img :src="item.icon" max-height="50" max-width="50"/>
                </v-col>
                <v-col cols="4" class="text-right">
                  <v-btn v-if="currentDestination.label === 'services for actions'"
                         :disabled="checkIfServiceConnected(item.name)"
                         @click="selectActionService(index)" :style= "isButtonIndex(selectedActionService, index) ? 'background-color: lime' : ''">
                    SELECT
                  </v-btn>
                  <v-btn v-if="currentDestination.label === 'services for reactions'"
                         :disabled="checkIfServiceConnected(item.name)"
                         @click="selectReactionService(index)" :style= "isButtonIndex(selectedReactionService, index) ? 'background-color: lime' : ''">
                    SELECT
                  </v-btn>
                </v-col>
              </v-row>
              <v-row v-if="currentDestination.label === 'actions' || currentDestination.label === 'reactions'">
                <v-col cols="5">
                  <v-card-text class="text-center" style="font-size: 30px; font-weight: bold"> {{ item }} </v-card-text>
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
              <v-row v-if="currentDestination.label === 'actions' && currentDestination.isClicked && (selectedAction === selectedActionService.actions[index])">

                <!--              NOTION -->
                <v-row v-if="selectedActionService.name === 'Notion'" >
                  <v-row v-if="selectedAction === 'Add to database'" class="text-center justify-center mb-2">
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
                          Choose Database
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item
                            v-for="item in databases"
                            :key="item.id"
                            @click="selectDatabase(item.id, item.title[0].text.content)"
                            link
                        >
                          <v-list-item-title v-text="item.title[0].text.content"></v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                      <v-card-text class="text-center" style="font-size: 20px; font-weight: bold">
                        {{databaseName}}
                      </v-card-text>
                  </v-row>
                  </v-row>

<!--            TIMER-->
                <v-row v-if="selectedActionService.name === 'Timer'" >
                  <v-row v-if="selectedAction === 'Start timer'" class="text-center justify-center mb-2">
                    <v-col cols="8">
                      <v-text-field
                        style="font-size: 20px"
                        v-model="timerValue"
                        label="Timer Duration in Seconds"
                        append-icon="mdi-clock"
                        type="number"
                        color="orange"
                        @input="checkTimer"
                      />
                    </v-col>
                  </v-row>
                </v-row>

                <v-row v-if="selectedActionService.name === 'Weather'" >
                  <v-row v-if="selectedAction === 'City\'s weather change'" class="text-center justify-center mb-2">
                    <v-col cols="6">
                      <v-text-field
                          style="font-size: 30px"
                          v-model="cityName"
                          label="City name"
                          append-icon="mdi-domain"
                          color="orange"
                          @input="checkCity"
                      />
                    </v-col>
                  </v-row>
                </v-row>

                </v-row>


<!--              REACTIONS-->
              <v-row v-if="currentDestination.label === 'reactions' && currentDestination.isClicked && (selectedReaction === selectedReactionService.reactions[index])">

                <!--              DISCORD -->
                <v-row v-if="selectedReactionService.name === 'Discord'" class="text-center justify-center mb-5">

                  <v-row v-if="selectedReaction === 'Send a message'">
                    <v-col cols="5" class="text-center justify-center mt-3">
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
                              :key="item.channel_id"
                              @click="selectGuild(item.channel_id, item.name)"
                              link
                          >
                            <v-list-item-title v-text="item.name"></v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                          label="Message"
                          v-model="discordMessage"
                          prepend-icon="mdi-pen"
                          clearable
                      />
                    </v-col>
                    <v-row>
                      <v-col cols="5">
                      <v-card-text class="text-right" style="font-size: 20px">
                        Selected channel:
                      </v-card-text>
                      </v-col>
                      <v-col cols="5" class="text-left">
                        <v-card-text class="text-left" style="color: darkorange; font-size: 25px">
                          {{guildName}}
                        </v-card-text>
                      </v-col>
                    </v-row>
                  </v-row>

                  <v-row v-if="selectedReaction === 'Rename channel'">
                    <v-col cols="5" class="text-center justify-center mt-3">
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
                              :key="item.channel_id"
                              @click="selectGuild2(item.channel_id, item.name)"
                              link
                          >
                            <v-list-item-title v-text="item.name"></v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                          label="New channel name"
                          v-model="newChannelName"
                          prepend-icon="mdi-pen"
                          clearable
                      />
                    </v-col>
                    <v-row>
                      <v-col cols="5">
                        <v-card-text class="text-right" style="font-size: 20px">
                          Selected channel:
                        </v-card-text>
                      </v-col>
                      <v-col cols="5" class="text-left">
                        <v-card-text class="text-left" style="color: darkorange; font-size: 25px">
                          {{guildName}}
                        </v-card-text>
                      </v-col>
                    </v-row>
                  </v-row>

                  <v-row v-if="selectedReaction === 'Add role'">
                    <v-col cols="12">
                      <v-row>
                        <v-col cols="4" class="text-right mt-3">
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
                                  :key="item.channel_id"
                                  @click="selectGuild3(item.channel_id, item.name)"
                                  link
                              >
                                <v-list-item-title v-text="item.name"></v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </v-col>
                        <v-col cols="3">
                          <v-card-text class="text-center" style="font-size: 20px">
                            Selected channel:
                          </v-card-text>
                        </v-col>
                        <v-col cols="5" class="text-left">
                          <v-card-text style="color: darkorange; font-size: 25px">
                            {{guildName}}
                          </v-card-text>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="4" class="text-right mt-3">
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
                                Choose Role
                              </v-btn>
                            </template>

                            <v-list>
                              <v-list-item
                                  v-for="item in roles"
                                  :key="item.role_id"
                                  @click="selectRole(item.role_id, item.name)"
                                  link
                              >
                                <v-list-item-title v-text="item.name"></v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </v-col>
                        <v-col cols="3">
                          <v-card-text class="text-center" style="font-size: 20px">
                            Selected role:
                          </v-card-text>
                        </v-col>
                        <v-col cols="5" class="text-left">
                          <v-card-text style="color: darkorange; font-size: 25px">
                            {{roleName}}
                          </v-card-text>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>

                </v-row>

                <v-row v-if="selectedReaction === 'Create an event'" class="ml-3">
                  <v-col cols="12" class="mt-3 mb-3 text-center justify-center">
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
                          Choose Calendar
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item
                            v-for="item in calendars"
                            :key="item.id"
                            @click="selectCalendar(item.id, item.summary)"
                            link
                        >
                          <v-list-item-title v-text="item.summary"></v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <v-row>
                      <v-col cols="5">
                        <v-card-text class="text-right" style="font-size: 20px">
                          Selected calendar:
                        </v-card-text>
                      </v-col>
                      <v-col cols="5" class="text-left">
                        <v-card-text class="text-left" style="color: darkorange; font-size: 25px">
                          {{calendarName}}
                        </v-card-text>
                      </v-col>
                    </v-row>
                    <v-col cols="6" class="text-center">
                      <v-text-field
                          label="Event name"
                          v-model="eventName"
                          prepend-icon="mdi-pen"
                          clearable
                      />
                    </v-col>
                  </v-col>
<!--                  START DATES-->

                  <v-col cols="6" class="">
                    <v-dialog
                        ref="dialog"
                        v-model="startDateModal"
                        persistent
                        width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            style="font-size: 20px"
                            v-model="startEventDate"
                            label="Start Date"
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                            color="orange"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="startEventDate"
                          scrollable
                          color="orange"
                      >
                        <v-btn
                            text
                            color="orange"
                            @click="startDateModal = false"
                        >
                          Cancel
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="orange"
                            @click="startDateModal = false"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <v-col cols="5">
                    <v-dialog
                        ref="dialog"
                        v-model="startTimeModal"
                        width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            style="font-size: 20px"
                            v-model="startEventTime"
                            label="Start time"
                            prepend-icon="mdi-clock-time-four-outline"
                            color="orange"
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                          v-if="startTimeModal"
                          v-model="startEventTime"
                          format="24hr"
                          color="orange"
                      >
                        <v-btn
                            text
                            color="orange"
                            @click="startTimeModal = false"
                        >
                          Cancel
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="orange"
                            @click="startTimeModal = false; checkIfEventOk()"
                        >
                          OK
                        </v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-col>
<!--                  END DATES-->
                  <v-col cols="6" class="">
                    <v-dialog
                        ref="dialog"
                        v-model="endDateModal"
                        persistent
                        width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            style="font-size: 20px"
                            v-model="endEventDate"
                            label="End Date"
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                            color="orange"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="endEventDate"
                          scrollable
                          color="orange"
                      >
                        <v-btn
                            text
                            color="orange"
                            @click="endDateModal = false"
                        >
                          Cancel
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="orange"
                            @click="endDateModal = false; checkIfEventOk()"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <v-col cols="5">
                    <v-dialog
                        ref="dialog"
                        v-model="endTimeModal"
                        width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            style="font-size: 20px"
                            v-model="endEventTime"
                            label="End time"
                            prepend-icon="mdi-clock-time-four-outline"
                            color="orange"
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                          v-if="endTimeModal"
                          v-model="endEventTime"
                          format="24hr"
                          color="orange"
                      >
                        <v-btn
                            text
                            color="orange"
                            @click="endTimeModal = false"
                        >
                          Cancel
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="orange"
                            @click="endTimeModal = false; checkIfEventOk()"
                        >
                          OK
                        </v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-col>
                </v-row>

                <v-row v-if="selectedReaction === 'Create page'" class="justify-center text-center">
                  <v-col cols="4">
                    <v-menu
                        rounded
                        offset-y
                    >
                      <template v-slot:activator="{ attrs, on }">
                        <v-btn
                            class="mt-2"
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
                            @click="selectDatabase(item.id, item.title[0].text.content)"
                            link
                        >
                          <v-list-item-title v-text="item.title[0].text.content"></v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <v-card-text class="text-center" style="font-size: 20px; font-weight: bold">
                      {{databaseName}}
                    </v-card-text>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                        label="Page Name"
                        v-model="selectedPageName"
                    />
                  </v-col>
                  <v-col cols="4">
                    <v-btn color="orange" class="mt-2 ml-7" @click="checkPageName">
                      Create
                    </v-btn>
                  </v-col>
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
              SAVE
            </v-btn>
            <v-btn
                v-else
                :disabled="!currentDestination.isConfirmed"
                @click="goToNextDestination"
                style="background-color: darkorange; color: black; font-size: 20px"
                class="mb-3"
            >
              NEXT
            </v-btn>
            <v-spacer></v-spacer>
          </v-row>
          <v-row v-if="rightCardError.length > 0">
            <v-card-text class="text-center" style="color: red; font-size: 30px">{{rightCardError}}</v-card-text>
          </v-row>
          <v-row v-if="goodMessage.length > 0">
            <v-card-text class="text-center" style="color: green; font-size: 40px">{{goodMessage}}</v-card-text>
          </v-row>
        </v-card>

        <v-card v-else style="background-color: black; height: 800px" >
          <v-row style="margin-top: 400px">
          <v-card-text   style="color: darkorange; font-size: 40px; font-style: italic" class="text-center">
            Awaiting creation ...
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
        {label: 'services for actions', isConfirmed: false, isClicked: false, service: ''},
        {label: 'actions', isConfirmed: false, isClicked: false, service: ''},
        {label: 'services for reactions', isConfirmed: false, isClicked: false, service: ''},
        {label: 'reactions', isConfirmed: false, isClicked: false, service: ''},
      ],
      currentDestination: {label: 'none'},
      selectedActionService: [],
      selectedAction: '',
      selectedReactionService: [],
      selectedReaction: '',
      isSelected: false,
      services: [],
      connectedServices: [],
      errorMsg: '',
      rightCardError: '',
      goodMessage: '',
      areaName: '',
      databases: [],
      accessToken: '',
      selectedDatabase: '',
      databaseName: '',
      channels: [],
      selectedGuild: '',
      guildName: '',
      roles: [],
      selectedRole: '',
      roleName: '',
      discordMessage: '',
      areaBody: {
        name: '',
        actionName: '',
        actionData: {},
        reactionName: '',
        reactionData: {}
      },
      startEventDate: null,
      startEventTime: null,
      startDateModal: false,
      startTimeModal: false,
      endEventDate: null,
      endEventTime: null,
      endDateModal: false,
      endTimeModal: false,
      calendars: [],
      calendarName: '',
      selectedCalendar: '',
      eventName: '',
      timerValue: 0,
      cityName: 'Paris',
      newChannelName: '',
      selectedPageName: '',
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

    axios.get('http://localhost:3000/services/logged', {headers: {'Authorization': 'Bearer ' + this.accessToken}})
        .then((response) => {
          this.connectedServices = response.data
        })
        .catch( () => {
          console.log("logged services fetch error")
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
        })
        .catch( () => {
          console.log("channels fetch error")
        })

    axios.get('http://localhost:3000/discord/getRoles', {headers: {'Authorization': 'Bearer ' + this.accessToken }})
        .then((response) => {
          this.roles = response.data
        })
        .catch( () => {
          console.log("channels fetch error")
        })

    axios.get('http://localhost:3000/googleCalendar/listCalendars', {headers: {'Authorization': 'Bearer ' + this.accessToken }})
        .then((response) => {
          this.calendars = response.data
        })
        .catch( () => {
          console.log("channels fetch error")
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
    goToNextDestination() {
      if (this.currentDestination.label === 'services for actions') {
        this.destinations[1].isConfirmed = true
        this.currentDestination = this.destinations[2]
        return
      }
      if (this.currentDestination.label === 'actions') {
        this.destinations[2].isConfirmed = true
        this.currentDestination = this.destinations[3]
        return
      }
      if (this.currentDestination.label === 'services for reactions') {
        this.destinations[3].isConfirmed = true
        this.currentDestination = this.destinations[4]
        return
      }
    },

    selectInfo() {
      let info = []

      if (this.currentDestination.label === 'services for actions' || this.currentDestination.label === 'services for reactions') {
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
      console.log(this.selectedActionService)
    },

    selectAction(id) {
      this.selectedAction = this.selectedActionService.actions[id]
      this.currentDestination.isClicked = true
      if (this.selectedAction === 'Receive a message') {
        this.currentDestination.isConfirmed = true
      }
      if (this.selectedAction === 'GPA changes') {
        this.currentDestination.isConfirmed = true
      }
      if (this.selectedAction === 'New notification') {
        this.currentDestination.isConfirmed = true
      }
      console.log(this.selectedAction)
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

      if (!this.areaName) {
        this.rightCardError = 'Please give a name to your Area !'
        return
      }
      this.areaBody.name = this.areaName
      this.areaBody.actionName = this.selectedAction
      this.areaBody.reactionName = this.selectedReaction

      //ACTIONS ---------------------------------------
      if (this.selectedAction === 'Add to database') {
        if (this.selectedDatabase)
          this.areaBody.actionData = {database_id: this.selectedDatabase}
      }

      if (this.selectedAction === 'City\'s weather change') {
        if (this.cityName.length > 0)
          this.areaBody.actionData = {city: this.cityName}
      }

      if (this.selectedAction === 'Start timer') {
        if (this.timerValue > 0)
          this.areaBody.actionData = {time_s: this.timerValue}
      }

      //REACTIONS -------------------------------------
      if (this.selectedReaction === 'Send a message') {
        if (!this.discordMessage) {
          this.rightCardError = 'Please fill a message'
          return
        }
        this.areaBody.reactionData = {message_content: this.discordMessage, guild_id: this.selectedGuild}
      }

      if (this.selectedReaction === 'Rename channel') {
        if (!this.newChannelName) {
          return
        }
        this.areaBody.reactionData = {channel_name: this.newChannelName, guild_id: this.selectedGuild}
      }

      if (this.selectedReaction === 'Add role') {
        if (!this.roleName) {
          return
        }
        this.areaBody.reactionData = {role_id: this.selectedRole, guild_id: this.selectedGuild}
      }

      if (this.selectedReaction === 'Create page') {
        if (!this.selectedPageName) {
          this.rightCardError = 'Please give a name !'
          return
        }
        this.areaBody.reactionData = {title: this.selectedPageName, database_id: this.selectedDatabase}
      }

      if (this.selectedReaction === 'Create an event') {
        if (!this.eventName) {
          this.rightCardError = 'Please give a name !'
          return
        }
        this.areaBody.reactionData = {
          calendar_id: this.selectedCalendar,
          event: {
            summary: this.eventName,
            start: {
              dateTime: new Date(this.startEventDate + 'T' + this.startEventTime + ':00Z'),
              timeZone: "Europe/Paris"
            },
            end: {
              dateTime: new Date(this.endEventDate + 'T' + this.endEventTime + ':00Z'),
              timeZone: "Europe/Paris"
            }
          }
        }
      }

      if (this.areaBody.actionName && this.areaBody.reactionName) {
        this.sendAreaToBack(this.areaBody)
        this.rightCardError = ''
        this.goodMessage = "Area created !"
      } else {
        this.rightCardError = 'Please select an action AND a reaction !'
      }
    },

    sendAreaToBack() {
      let body = this.areaBody

      axios.post('http://localhost:3000/area/create', body, {headers: {'Authorization': 'Bearer ' + this.accessToken, 'Content-Type': 'application/json'}})
          .then((response) => {
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error)
          })
    },

    resetArea() {
      this.selectedActionService = []
      this.selectedAction = ''
      this.selectedReactionService = []
      this.selectedReaction = ''
    },
    confirmArea() {
      if (this.destinations[1].isConfirmed === false || this.destinations[2].isConfirmed === false || !this.areaName) {
        this.errorMsg = 'Please fulfill all conditions !'
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

    selectDatabase(id, name) {
      this.databaseName = name
      this.selectedDatabase = id
      this.currentDestination.isConfirmed = true
    },

    selectGuild(id, name) {
      this.guildName = name
      this.selectedGuild = id
      if (this.discordMessage) {
        this.currentDestination.isConfirmed = true
      } else {
        this.currentDestination.isConfirmed = false
      }
    },

    selectGuild2(id, name) {
      this.guildName = name
      this.selectedGuild = id
      if (this.newChannelName) {
        this.currentDestination.isConfirmed = true
      } else {
        this.currentDestination.isConfirmed = false
      }
    },

    selectGuild3(id, name) {
      this.guildName = name
      this.selectedGuild = id
      if (this.roleName) {
        this.currentDestination.isConfirmed = true
      } else {
        this.currentDestination.isConfirmed = false
      }
    },

    selectRole(id, name) {
      this.roleName = name
      this.selectedRole = id
      if (this.guildName) {
        this.currentDestination.isConfirmed = true
      } else {
        this.currentDestination.isConfirmed = false
      }
    },

    selectCalendar(id, name) {
      this.calendarName = name
      this.selectedCalendar = id
      this.checkIfEventOk()
    },

    checkIfServiceConnected(name) {
     if (this.connectedServices.toString().toUpperCase().indexOf(name.toUpperCase()) > -1)
        return false
      else
        return true
    },

    checkIfEventOk() {
      if (this.selectedCalendar && this.startEventTime && this.startEventDate && this.endEventTime && this.endEventDate) {
        this.currentDestination.isConfirmed = true
      }
    },

    checkTimer() {
      if (this.timerValue > 0) {
        this.currentDestination.isConfirmed = true
      } else {
        this.currentDestination.isConfirmed = false
      }
    },

    checkCity() {
      if (this.cityName.length > 0) {
        this.currentDestination.isConfirmed = true
      } else {
        this.currentDestination.isConfirmed = false
      }
    },

    checkPageName() {
      if (this.selectedPageName.length > 0 && this.selectedDatabase.length > 0) {
        this.currentDestination.isConfirmed = true
      } else {
        this.currentDestination.isConfirmed = false
      }
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