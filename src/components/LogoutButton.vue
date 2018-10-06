<template>
  <div>
    <button @click="logout" class="text-white">
      Logout
    </button>
  </div>
</template>

<script>
export default {
  name: 'Logout',
  methods:{
    async logout(){
      await this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>