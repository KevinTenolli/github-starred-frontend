<script setup lang="ts">
import router from '../router';


function logout() {
    localStorage.removeItem('accessToken')
    router.push('/login')
}
</script>

<template>
  <button @click="logout">Logout</button>
</template>

<style scoped>
</style>
