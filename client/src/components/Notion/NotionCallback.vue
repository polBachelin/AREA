<template lang="">
	<div>
		Hello world
	</div>
</template>
<script>
import { sendCode } from '../../oauth/Notion'

export default {
	
}

window.onload = function() {
	console.log("got it")
	const urlParams = new URLSearchParams(window.location.search);
	const code = urlParams.get('code');
	sendCode(code);	
}



</script>
<style lang="">
	
</style>