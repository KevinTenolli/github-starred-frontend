<script lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axiosInstance from '../middleware/axios'
import RepoCommits from '../models/RepoCommits'
import { useRoute, useRouter } from 'vue-router'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data: () => ({
    loaded: false,
    chartData: {
      labels: [''],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [0]
        }
      ]
    },
    chartOptions: {
      responsive: true
    }
    
  }),
  redirectToUser () {
    const router = useRouter()
    router.push('/user')
  },
  async mounted () {
    this.loaded = false

    try {
      const route = useRoute()
      const id = parseInt(route.params.id as string)
      const response: RepoCommits[] = await axiosInstance.get(`/repos/repo/${id}`)
      const commitDates = response.map((response) =>response.commitDate)
      const commitCounts = response.map((response) =>response.numberOfCommits)

      this.chartData = {
        labels : commitDates,
        datasets: [
          {
            label: 'commits per day',
            backgroundColor: '#f87979',
            data: commitCounts
          }
        ]
      }

      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<template>
  <div>
    <router-link to="/user">
      <button severity="info">return to user page</button>
    </router-link>  
  </div>
  <div class="container">
    <Bar v-if="loaded" :data="chartData" :options="chartOptions"/>
  </div>
</template>

<style computed>
.container {
  width: 1000px;
  height: 1000px;
}
</style>

