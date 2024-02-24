<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { GitHubUser } from '../models/githubUser'
import axiosInstance from '../utils/axios';
import TopBar from './TopBar.vue';

const state = reactive({
  data: {} as GitHubUser
})

onMounted(async () => {
  state.data = await getUserData()
})

async function getUserData() {
  const response:GitHubUser = await axiosInstance.get('/oauth/getUserData')
  return response
}
</script>

<template>
  <TopBar></TopBar>
  {{ state.data.name }}
</template>

<style scoped>
</style>