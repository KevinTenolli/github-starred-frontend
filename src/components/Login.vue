<script setup lang="ts">
import { onMounted } from 'vue'
import router from '../router'
import axiosInstance from '../utils/axios'
import { AccessTokenResponse } from '../models/accessTokenResponse';

onMounted(async () => {
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  if (!code) {
    return
  }
  try {
    const accessTokenResponse: AccessTokenResponse = await axiosInstance.get<AccessTokenResponse>('oauth/getAccessToken', { code })
    console.log(accessTokenResponse)
    localStorage.setItem('accessToken', accessTokenResponse.access_token)
    router.push('user')
  } catch (error) {
    console.log(error)
  }
})


function loginWithGithub() {
  const githubClientId = import.meta.env.VITE_APP_GITHUB_CLIENT_ID
  window.location.assign(`https://github.com/login/oauth/authorize?client_id=${githubClientId}`)
}

</script>

<template>
  <button @click="loginWithGithub">Login with Github</button>
</template>

<style scoped>
</style>
