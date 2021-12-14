<template>
<div class="login bg-white my-8 py-5 px-8 rounded-lg shadow lg:mx-32 mx-8 content-center">
    <h3 class="text-3xl text-center text-red-500">
      Login
    </h3>
    <form class="max-w-sm my-0 mx-auto" @submit.prevent="login">
      <div class="email">
        <label for="email" class="block mt-6 text-xl">Email: </label>
        <input v-model="email" class="block mx-0 my-2 p-2 w-full border-solid border-2" type="text" placeholder="email">
      </div>
      <div class="password">
        <label for="password" class="block mt-6 text-xl">password: </label>
        <input v-model="password" class="block mx-0 my-2 p-2 w-full border-solid border-2" type="password" placeholder="password">
      </div>
      
      <button class="border-0 cursor-pointer text-xl mt-5 p-3 text-white bg-red-500 hover:bg-black rounded-2xl">
        Login
      </button>
    </form>
    <div class="text-center pt-6 text-xl">
      <nuxt-link class="mx-4 hover:text-red-500 block" to="forgotPassword">Forgot? User Name/ Password</nuxt-link>
      <nuxt-link class="mx-4 hover:text-red-500 block" to="signup">Not have an account? Sign up</nuxt-link>
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
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (this.email != '' && this.password != '')
      {
        this.$fire.auth.signInWithEmailAndPassword(this.email,this.password).then(data=>{
              console.log(data);
              this.$router.push('/home');
            }).catch(function(error){
              var errorCode = error.code
              var errorMessage = error.message
              alert("Message: " +errorMessage)
      });
      }
      else
      {
        alert('please fill email and password')
      }
    },
    loggedin(){
        this.$fire.auth.onAuthStateChanged(user=>{
            if(user){
                var userID = this.$fire.auth.currentUser.uid;
                var docRef = this.$fire.firestore.collection("users").doc(userID);
                docRef.get().then((doc) => {
                     if (doc.exists) {
                        this.$router.push('home');
                        } 
                    else {
                        this.$router.push('account');
                        }
                      }).catch((error) => {
                      alert("Error getting document:", error);
                });
            }
        });
    }
  }
}
</script>

<style>
  
</style>
