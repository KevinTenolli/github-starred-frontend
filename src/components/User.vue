<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { GitHubUser } from '../models/githubUser'
import { StarredRepository } from '../models/starredRepository'
import TopBar from './TopBar.vue'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Chip from 'primevue/chip'
import Tag from 'primevue/tag'
import ApiService from '../api/apiService'

const state = reactive({
  userData: {} as GitHubUser,
  repositoryData: {} as StarredRepository[]
})

onMounted(async () => {
  state.userData = await ApiService.getUserData()
  state.repositoryData = await ApiService.getRepositoryData(state.userData.login)
})

function isEmpty(data: GitHubUser){
  return Object.keys(data).length === 0
} 

function redirectToGithubRepository(repoUrl: string) {
  window.open(repoUrl)
}
</script>

<template>
  <div class="user-information" v-if="!isEmpty(state.userData)">
    <Chip :label="state.userData.name" :image="state.userData.avatar_url" />
    <Tag class="user-data-tag-styling" icon="pi pi-user">Following: {{ state.userData.following }}</Tag>
    <Tag class="user-data-tag-styling" icon="pi pi-user">Followers: {{ state.userData.followers }}</Tag>
    <Tag class="user-data-tag-styling" severity="secondary">Public repos: {{ state.userData.public_repos }}</Tag>
  </div>
  <div v-if="isEmpty(state.userData)">No Starred Repositories</div>
  <TopBar></TopBar>
  <Accordion>
    <AccordionTab v-for="repo in state.repositoryData" :key="repo.id" :header="repo.name">
        <p class="m-0">{{ repo.description }}</p>
        <router-link :to="{ name: 'repo', params: { id: repo.id } }">View commit history</router-link>
        <br>
        <a href="" @click="redirectToGithubRepository(repo.html_url)">Go to github repository</a>
        <Tag class="user-data-tag-styling" icon="pi pi-user">Stars: {{ repo.stargazers_count }}</Tag>
        <p>Owner: {{ repo.owner.login }}</p>
    </AccordionTab>
</Accordion>
</template>

<style scoped>
  .user-information {
    display: flex;
    width: 500px;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 0 10px;
  }

  .user-data-tag-styling {
    height: 50%;
  }
</style>