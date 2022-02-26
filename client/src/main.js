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

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
	base: process.env.BASE_URL,
	routes: [
		{path: '/', component: Login},
		{path: '/home', component: Home, name: 'home'},
		{path: '/area', component: Area, name: 'area'},
		{path: '/myapps', component: MyApps},
		{path: '/profile', component: Profile},
		{path: '/login', component: Login},
		{path: '/register', component: Register, name: 'register'},
	],
})

new Vue({
	router,
	vuetify,
	render: h => h(App)
}).$mount('#app')	