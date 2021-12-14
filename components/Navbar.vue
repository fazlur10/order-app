<template>
  <nav class="bg-white md:flex md:justify-between md:items-center md:px-4 md:py-3">
    <div class="flex items-center justify-between px-4 py-3 md:p-0 max-h-20 min-h-12 lg:mx-20">
      <div class="text-3xl text-red-500"> 
        Order Logo
      </div>
      <div class="md:hidden">
        <button
          @click="isOpen = !isOpen"
          type="button"
          class="block text-red-500 hover:text-black focus:text-red-400 focus:outline-none"
        >
          <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path v-if="isOpen" fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
            <path v-if="!isOpen" fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
          </svg>
        </button>
      </div>
    </div>
    <div :class="isOpen ? 'block' : 'hidden'" class="px-2 pt-2 pb-4 md:flex">
      <nuxt-link to="home" class="block px-2 py-1 font-semibold rounded hover:text-red-500">Order Managment</nuxt-link>
      <nuxt-link to="product" class="mt-1 block px-2 py-1 font-semibold rounded hover:text-red-500 md:mt-0 md:ml-2">Products</nuxt-link>
      <nuxt-link to="order" class="mt-1 block px-2 py-1 font-semibold rounded hover:text-red-500 md:mt-0 md:ml-2">Orders</nuxt-link>
      <a href="" @click="logout" class="mt-1 block px-2 py-1 font-semibold rounded hover:text-red-500 md:mt-0 md:ml-2">Logout</a>
     
    </div>
  </nav>
</template>

<script>
export default {
  mounted(){
    this.loggedout()
  },
  data() {
    return {
      isOpen: false,
      loggedIn: false
    };
  },
  methods: {
    toggleNavbar: function() {
      this.showMenu = !this.showMenu;
    },
    logout(){
      this.$fire.auth.signOut().then(() => {
        this.$router.push('/')
      }).catch((err) => {
        console.log(err)
      });
    },
    loggedout(){
      this.$fire.auth.onAuthStateChanged(user=>{
            if(!user){
                this.$router.push('/');
            }
        })
    }
  }
};


</script>
