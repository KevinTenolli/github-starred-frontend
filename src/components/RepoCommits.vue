<template>
  <div>
    <top-bar></top-bar>
    <router-link to="/user">
      <Button>Return to User Page</Button>
    </router-link>
    <div class="container">
      <bar v-if="loaded" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import ApiService from '../api/apiService'
import RepoCommits from '../models/RepoCommits'
import { useRoute } from 'vue-router'
import TopBar from './TopBar.vue'
import Button from 'primevue/button'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const loaded = ref(false)
const chartData = ref({
  labels: [''],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [0],
    },
  ],
})
const chartOptions = ref({
  responsive: true,
})

onMounted(async () => {
  loaded.value = false

  try {
    const route = useRoute();
    const id = parseInt(route.params.id as string)
    const response: RepoCommits[] = await ApiService.getRepositoryCommits(id)
    const commitDates = response.map((response) => response.commitDate)
    const commitCounts = response.map((response) => response.numberOfCommits)

    chartData.value = {
      labels: commitDates,
      datasets: [
        {
          label: 'commits per day',
          backgroundColor: '#f87979',
          data: commitCounts,
        },
      ],
    };

    loaded.value = true
  } catch (e) {
    console.error(e)
  }
})
</script>

<style scoped>
.container {
  width: 1000px;
  height: 1000px;
}
</style>
