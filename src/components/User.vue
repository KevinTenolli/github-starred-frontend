<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import axios from 'axios'
import { GitHubUser } from '../models/githubUser'

const state = reactive({
  data: {} as GitHubUser
})

onMounted(async () => {
  state.data = await getUserData()
})

async function getUserData() {
  const headers = {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  }
  const response = await axios.get('http://localhost:3000/oauth/getUserData', {
    headers,
  })
  return response.data
}
</script>

<template>
    {{ state.data.name }}
</template>

<style scoped>
</style>