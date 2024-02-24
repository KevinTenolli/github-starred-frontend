<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { GitHubUser } from '../models/githubUser'
import StarredRepository from '../models/starredRepository'
import axiosInstance from '../utils/axios'
import TopBar from './TopBar.vue'

const state = reactive({
  userData: {} as GitHubUser,
  repositoryData: {} as StarredRepository[]
})

onMounted(async () => {
  state.userData = await getUserData()
  state.repositoryData = await getRepositoryData(state.userData.login)
})

async function getUserData() {
  const response:GitHubUser = await axiosInstance.get('/oauth/getUserData')
  return response
}

async function getRepositoryData(username:string) {
  const response:StarredRepository[] = await axiosInstance.get(`/user/${username}/starredRepos`)
  return response
}
</script>

<template>
  <TopBar></TopBar>
  Username: {{  state.userData.login }}
  Name: {{ state.userData.name }}
  Followers: {{ state.userData.followers }}
  Following: {{ state.userData.following }}
  Public Repos: {{ state.userData.public_repos }}
  <br>
  <li v-for="repo of state.repositoryData">
    {{ repo.name }}
  </li>
</template>

<style scoped>
</style>