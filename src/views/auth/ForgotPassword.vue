<template>
  <div class="flex bg-blue justify-center items-center min-h-screen">
    <div class="w-full max-w-xs">
      <form
        @submit.prevent="login"
        @keydown="errors.clear($event.target.name)" 
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="identification">
            E-mail or Username
          </label>
          <input 
            v-model="credentials.identification"
            :class="[{'border-red': errors.has('identification')},'shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline']" 
            name="identification" 
            type="text" 
            placeholder="E-mail or username">
          <p v-if="errors.has('identification')" class="text-red text-xs italic mt-3">{{errors.get('identification')}}</p>
        </div>


        <div class="flex items-center justify-between">
          <button 
            :class="[this.errors.any() || this.auth.loading ? 'bg-grey-light hover:bg-grey-light ' :'bg-red-light hover:bg-red ' , 'text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline']" 
            type="submit"
            :disabled="this.errors.any() || this.auth.loading"
            >
            {{auth.loading? 'Wait...' : 'Reset my password' }}
            
          </button>
        </div>
        <div class="text-center mt-5 pt-4 border-t border-grey-lighter border-t-1">

            <div>
              <router-link class="text-xs text-blue hover:text-blue-darker" to="/login">
                Back to login page
              </router-link>
            </div>
        </div>
      </form>
      <p class="text-center text-grey text-xs">
        {{ year }} - @alexrili. No rights reserved.
      </p>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Errors from '@/helpers/Errors'
export default {
  data(){
    return {
      credentials:{
        identification: ''
      },
      errors: new Errors()
    }
  },
  computed:{
    ...mapState(['auth']),
    year(){
      return new Date().getFullYear()
    }
    
  },
  methods:{
    async login(){
      try{
        const { identification } = this.credentials;
        await this.$store.dispatch('resetPassword', {identification})
        this.$router.push('/login')
      }catch(error){
        this.errors.record(error.response.data.error)
      }
    }
  }
}
</script>
