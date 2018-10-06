<template>
  <div id="app">
      <component :is="layout">
        <router-view/>
      </component>
  </div>
</template>

<script>

  import Dashboard from '@/layouts/Dashboard.vue'
  import Auth from '@/layouts/Auth.vue'
  import Site from '@/layouts/Site.vue'

  const layout_default = 'dashboard'
  export default {
    components:{
      Dashboard,
      Auth,
      Site
    },
    computed: {
      layout(){
        return this.$route.meta.layout || layout_default;
      }
    }
  }
</script>
