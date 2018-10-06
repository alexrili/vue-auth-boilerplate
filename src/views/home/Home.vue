<template>
  <div class="home">
  <h2>HOME SITE</h2>    
  <p>
    <router-link to="login">
      LOGIN
    </router-link>
    
    <router-link to="dashboard">
      DASHBOARD
    </router-link>
  </p>
  </div>
</template>

<script>

export default {
  name: 'home',
  created(){
    console.log('teste', this.$store.state.user.currentUser)
  }
}
</script>
