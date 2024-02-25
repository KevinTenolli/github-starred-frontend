<script setup lang="ts">
import router from '../router'
import Button from 'primevue/button'


function logout() {
    localStorage.removeItem('accessToken')
    router.push('/login')
}
</script>

<template>
  <Button severity="danger" @click="logout">Logout</Button>
</template>

<style scoped>
</style>
