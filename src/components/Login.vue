<script setup lang="ts">
import { onMounted } from 'vue'
import axios from 'axios'
import router from '../router';

onMounted(async () => {
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  localStorage.removeItem('accessToken')
  if (!code) {
    return
  }
  const accessTokenResponse = await axios.get('http://localhost:3000/oauth/getAccessToken', {
    params: { code }
  })
  if (accessTokenResponse.status !== 200 || accessTokenResponse.data.error) {
    localStorage.removeItem('accessToken')
    return
  }
  localStorage.setItem('accessToken', accessTokenResponse.data.access_token)
  router.push('user')
})

const clientId:string = ''

function loginWithGithub() {
  window.location.assign(`https://github.com/login/oauth/authorize?client_id=${clientId}`)
}

</script>

<template>
 <button @click="loginWithGithub">Login with Github</button>
</template>

<style scoped>
</style>
