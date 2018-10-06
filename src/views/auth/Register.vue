<template>
  <div class="flex bg-blue justify-center items-center min-h-screen">
    <div class="w-full max-w-xs">
      <form
        @submit.prevent="register" 
        @keydown="errors.clear($event.target.name)"
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
            Name
          </label>
          <input 
            v-model="user.name"
            class=" shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" 
            :class="{'border-red': errors.has('name')}" 
            name="name" 
            type="text"
            placeholder="Name">
            
            <p v-if="errors.has('name')" class="mt-3 text-red text-xs italic">
              {{ errors.get('name')}}
            </p>
        </div>
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
            E-mail
          </label>
          <input 
            v-model="user.email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" 
            :class="{'border-red': errors.has('email')}" 
            name="email" 
            type="text" 
            placeholder="E-mail">
            <p v-if="errors.has('email')" class="mt-3 text-red text-xs italic">
              {{ errors.get('email')}}
            </p>
        </div>
        <div class="mb-6">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input 
            v-model="user.password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            :class="{'border-red':errors.has('password')}"
            name="password" 
            type="password" 
            placeholder="*******">
            <p v-if="errors.has('password')" class="mt-3 text-red text-xs italic">
              {{ errors.get('password')}}
            </p>
          
        </div>
        <div class="flex items-center justify-between">
          <button           
          :class="[errors.any() ? 'hover:bg-grey-light bg-grey-light' : 'bg-green hover:bg-green-dark', 'text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline']"
          :disabled="errors.any()"
          type="submit"
          >
            Register
          </button>
        
        </div>
        <div class="text-center mt-5 pt-4 border-t border-grey-lighter border-t-1">
           <div>
              <span class="text-grey-dark text-xs">Already have an account?</span>
            </div>
            <div>
              <router-link class="text-xs text-blue hover:text-blue-darker" to="/login">
                Login
              </router-link>
            </div>
        </div>
      </form>
      <p class="text-center text-grey text-xs">
        ©2018 Acme Corp. All rights reserved.
      </p>
    </div>
  </div>
</template>
<script>
import Errors from '@/helpers/Errors'
export default {
  data(){
    return {
      user:{
        name:'',
        email: '',
        password: ''
      },
      errors: new Errors()
    }
  },
  methods:{
    async register(){
      try{
        await this.$store.dispatch('registerByEmail', this.user);
        this.$router.push(this.$store.state.auth.redirectAffterRegister)
      }catch(errors){
        this.errors.record(errors.response.data.error)
      }
    }
  }
}
</script>
