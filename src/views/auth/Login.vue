<template>
  <div class="flex bg-blue justify-center items-center min-h-screen">
    <div class="w-full max-w-xs">
      <form
        @submit.prevent="login"
        @keydown="errors.clear($event.target.name)" 
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
        <h3 class="mb-5 text-grey-darkest">Make login to have access</h3>
        <div v-if="errors.has('generic')" class="alert text-red text-xs" >
          <p  class="italic font-bold mt-3 mb-5">* {{errors.get('generic')}}</p>
        </div>
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="email">
            E-mail
          </label>
          <input 
            v-model="credentials.email"
            :class="[{'border-red': errors.has('email')},'shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline']" 
            name="email" 
            type="text" 
            placeholder="E-mail">
          <p v-if="errors.has('email')" class="text-red text-xs italic mt-3">{{errors.get('email')}}</p>
        </div>

        <div class="mb-6">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input 
            v-model="credentials.password"
            :class="[{'border-red':errors.has('password')}, 'shadow appearance-none border  rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline']" 
            name="password" 
            type="password" 
            placeholder="******">
            
            <p v-if="errors.has('password')" class="text-red text-xs italic">{{ errors.get('password')}}</p>
        </div>
        <div class="flex items-center justify-between">
          <button 
            :class="[this.errors.any() || this.auth.loading ? 'bg-grey-light hover:bg-grey-light ' :'bg-blue hover:bg-blue-dark ' , 'text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline']" 
            type="submit"
            :disabled="this.errors.any() || this.auth.loading"
            >
            {{auth.loading? 'Wait...' : 'Login' }}
            
          </button>
          <div class="text-right">
            <div>
              <router-link class="font-bold text-sm text-blue hover:text-blue-darker" to="/register">
                Don't have an account?
              </router-link>
            </div>           
          </div>
        </div>
        <div class="text-center mt-5 pt-4 border-t border-grey-lighter border-t-1">
           <div>
              <span class="text-grey-dark text-xs">Forgot Password? Don't worry!</span>
            </div>
            <div>
              <router-link class="text-xs text-blue hover:text-blue-darker" to="/forgot-password">
                reset your password
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
        email: '',
        password: ''
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
        const { email, password } = this.credentials;
        await this.$store.dispatch('loginByEmailAndPassword', {email, password})
        this.$router.push(this.$store.state.auth.redirectAffterLogin)
      }catch(error){
        
        this.errors.record({generic:error.response.data.error})
      }
    }
  }
}
</script>
