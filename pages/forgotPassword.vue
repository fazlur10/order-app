<template>
<div class="forgotPass login bg-white my-8 py-5 px-8 rounded-lg shadow lg:mx-32 mx-8 content-center">
    <h3 class="text-3xl text-center text-red-500">
      Forgot User Name / Password
    </h3>
    <form class="max-w-sm my-0 mx-auto" @submit.prevent="resetPassword">
      <div class="email">
        <label for="email" class="block mt-6 text-xl">Email: </label>
        <input v-model="email" class="block mx-0 my-2 p-2 w-full border-solid border-2" type="text" placeholder="email">
      </div>
      <button class="border-0 cursor-pointer text-xl mt-5 p-3 text-white bg-red-500 hover:bg-black rounded-2xl">
        Reset Password
      </button>
    </form>
    <div class="text-center py-6 hover:text-red-500 text-xl">
      <nuxt-link to="/">Login</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    this.loggedin()
    },
  data () {
    return {
      email: ''
    }
  },
  methods: {
    resetPassword () {
      if (this.email != '')
      {
         this.$fire.auth.sendPasswordResetEmail(this.email).then(function(){
            alert("An email has been sent to your mail addess, please check your email and verify");

        })
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);
            alert("Message: " +errorMessage);

        });
      }
      else
      {
        alert('please add required email address')
      }
    },
    loggedin(){
        this.$fire.auth.onAuthStateChanged(user=>{
            if(user){
                this.$router.push('home');
            }
        })
   }
  }
}
</script>

<style>

</style>
