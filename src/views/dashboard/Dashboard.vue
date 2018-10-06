<template>
  <div>
    <div class="flex justify-center items-center p-6">
      <div class=" w-full max-w-2xl ">
        <h1 class="">I'm the dashboard! And I'm super secret! :) </h1>
        <p class="mt-5">
          <a href="#" @click="logout">Logout</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  components:{
    
  },
  methods:{
     async logout(){
      await this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>