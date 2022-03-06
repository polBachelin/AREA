<template>
  <v-container class="justify-center text-center">
    <v-divider class="mt-10"></v-divider>
    <v-row class="justify-center text-center mt-10">
      <a id="ApkDL" href="/files/client.apk" download>
        DOWNLOAD APK
      </a>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Apk.vue",

  mounted() {
    document.getElementById("ApkDL").click()
  },
}
</script>