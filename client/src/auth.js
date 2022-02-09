export function setUser(email, access_token) {
	localStorage.setItem('username', email)
	localStorage.setItem('accessToken', access_token)
	localStorage.setItem('isLogged', 'true')
}