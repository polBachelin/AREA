const authorizeRedirect = "http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fnotion_callback"
const clientId = "69156507-b2a0-46ac-aea9-afe5a4227b1f"

export function connectNotion() {
	let url = "https://api.notion.com/v1/oauth/authorize?" +
	"client_id=" + clientId +
	"&redirect_uri=" + authorizeRedirect +
	"&response_type=code&owner=user";

	window.location.replace(url);
}

export function sendCode(code) {
	fetch('http://localhost:3000/auth/notion_callback?code=' + code, {
		method: 'GET',
		headers: { 
			"Access-Control-Allow-Origin": "*"},
	}).then(res => {
		console.log("request complete", res);
	})
}