import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Home from "@/components/Home";
import Area from "@/components/Area";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Profile from "@/components/Profile"
import vuetify from './plugins/vuetify'
import MyApps from "@/components/MyApps";
import Apk from "@/components/Apk";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import VueI18n from 'vue-i18n'

Vue.use(VueRouter)

Vue.use(VueI18n)

Vue.config.productionTip = false

const messages = {
	'en': {
		message: {
			passwordLabel: 'Password',

			//Errors Register
			invalidEmail: 'Email must be valid !',
			passwordDoesNotMatch: 'Passwords does not match !',

			//Error Login
			unknownUser: ' does not exist !',
			wrongPass: 'Invalid password !',
			wrongAutoLogin: 'Please enter an autologin link !',

			//Errors area Creation
			notFilled: 'Please fulfill all conditions !',
			noNameArea: 'Please give a name to your Area !',
			noName: 'Please give a name !',
			noActionSelected: 'Please select an Action AND a Reaction',

			// Header
			logoutBtn: 'Logout',
			searchBtn: 'Search',
			profileBtn: 'Profile',
			homeSideBar: 'Home',
			myAppSideBar: 'My services',
			historySideBar: 'History',

			// Account creation
			welcomeTitle: 'Welcome to your Area',
			accountCreationTitle: 'Account Creation :',
			confirmPasswordLabel: 'Confirm Password',
			areaCreated: 'Area created succesfully',

			// Login
			pleaseConnectTitle: 'Please connect :',
			createAccountBtn: 'Create Account',
			connectNotionBtn: 'Connect to Notion',
			connectDiscordBtn: 'Connect to Discord',
			connectIntraBtn: 'Connect to Intra',
			connectGoogleBtn: 'Connect to Google',

			// Home
			noAreaText: 'No Area ...',
			myAreaText: 'My Areas',

			// New Area
			creationTitle: 'Area Creation',
			titlePlaceHolder: 'Give a name to your area',
			chooseServiceTitle: 'Choose',
			resetBtn: 'Reset',
			confirmBtn: 'Confirm',
			nextBtn: 'Next',
			saveBtn: 'Save',
			selectBtn: 'Select',
			chooseDatabase: 'Choose Page',
			chooseChannel: 'Choose Channel',
			chooseRole: 'Choose Role',
			chooseCalendar: 'Choose Calendrier',
			selectedChannel: 'Channel selected: ',
			selectedRole: 'Role selected: ',
			selectedCalendar: 'Calendrier selected: ',

			eventName: 'Event name',
			timerDuration: 'Timer duration',
			cityName: 'City\'s name',
			startDate: 'Start date',
			endDate: 'End date',
			startTime: 'Start time',
			endTime: 'End time',
			cancelBtn: 'Cancel',
			okBtn: 'OK',
			pageName: 'Page name',
			createBtn: 'Create',
			waitingCreation: 'Awaiting creation ...',

			//myApps
			myAppsTitle: 'My Services',
			serviceOffline: 'Offline',
			serviceOnline: 'Connected',
			connectBot: 'Connect Bot',
			actions: 'Actions',
			reactions: 'Reactions',
		}
	},
	'fr': {
		message: {
			passwordLabel: 'Mot de passe',

			//Errors Register
			invalidEmail: 'Email incorrect !',
			passwordDoesNotMatch: 'Mots de passes diff??rents !',

			//Error Login
			unknownUser: ' n\'??xiste pas !',
			wrongPass: 'Mot de passe incorrect !',
			wrongAutoLogin: 'Veuillez entrer un lien autologin !',

			//Errors area Creation
			notFilled: 'Veuillez remplir toutes les conditions !',
			noNameArea: 'Veuillez donner un nom ?? votre Area !',
			noName: 'Veuillez tout remplir !',
			noActionSelected: 'Veuillez s??lectionner une Action ET une R??action',

			// Header
			logoutBtn: 'D??connexion',
			searchBtn: 'Rechercher',
			profileBtn: 'Profil',
			homeSideBar: 'Accueil',
			myAppSideBar: 'Mes services',
			historySideBar: 'Historique',

			// Account creation
			welcomeTitle: 'Bienvenue sur votre Area',
			accountCreationTitle: 'Cr??ation de compte :',
			confirmPasswordLabel: 'Confirmer le mot de passe',
			areaCreated: 'Area cr???? avec succ??s !',

			// Login
			pleaseConnectTitle: 'Veuillez vous connecter :',
			createAccountBtn: 'Cr??er un Compte',
			connectNotionBtn: 'Connexion ?? Notion',
			connectDiscordBtn: 'Connexion ?? Discord',
			connectIntraBtn: 'Connexion ?? l\'Intra',
			connectGoogleBtn: 'Connexion ?? Google',

			// Home
			noAreaText: 'Aucune Area ...',
			myAreaText: 'Mes Areas',

			// New Area
			creationTitle: 'Cr??ation d\'Area',
			titlePlaceHolder: 'Donnez un nom ?? votre area',
			chooseServiceTitle: 'Choisissez',
			resetBtn: 'R??initialiser',
			confirmBtn: 'Confirmer',
			nextBtn: 'Suivant',
			saveBtn: 'Sauvegarder',
			selectBtn: 'S??l??ctionner',
			chooseDatabase: 'Choisir Page',
			chooseChannel: 'Choisir Channel',
			chooseRole: 'Choisir Role',
			chooseCalendar: 'Choisir Calendrier',
			selectedChannel: 'Channel choisie: ',
			selectedRole: 'Role choisi: ',
			selectedCalendar: 'Calendrier choisi: ',

			timerDuration: 'Dur??e du Chronom??tre',
			cityName: 'Nom de la ville',
			eventName: 'Nom de l\'??v??nement',
			startDate: 'Date de d??but',
			endDate: 'Date de fin',
			startTime: 'Heure de d??but',
			endTime: 'Heure de fin',

			cancelBtn: 'Annuler',
			okBtn: 'OK',
			pageName: 'Nom de page',
			createBtn: 'Cr??er',
			waitingCreation: 'En attente de cr??ation ...',


			//myApps
			myAppsTitle: 'Mes Services',
			serviceOffline: 'Hors-ligne',
			serviceOnline: 'En ligne',
			connectBot: 'Connectez Bot',
			actions: 'Actions',
			reactions: 'R??actions',
		}
	}
};

const i18n = new VueI18n({
	locale: localStorage.getItem('lang'), // set locale
	messages, // set locale messages
})

const router = new VueRouter({
	base: process.env.BASE_URL,
	routes: [
		{path: '/', component: Login},
		{path: '/home', component: Home, name: 'home'},
		{path: '/area', component: Area, name: 'area'},
		{path: '/myapps', component: MyApps, name: 'myapps'},
		{path: '/profile', component: Profile},
		{path: '/login', component: Login},
		{path: '/register', component: Register, name: 'register'},
		{path: '/client.apk', component: Apk, name: 'apk'}
	],
})

new Vue({
	i18n,
	router,
	vuetify,
	render: h => h(App)
}).$mount('#app')	