<template>
<div class="signup bg-white my-8 py-5 px-8 rounded-lg shadow lg:mx-32 mx-8 content-center">
    <h3 class="text-3xl text-center text-red-500">
      Sign Up
    </h3>
    <form class="max-w-sm my-0 mx-auto" @submit.prevent="signedup">
      <div class="email">
        <label for="email" class="block mt-6 text-xl">Email: </label>
        <input v-model="email" class="block mx-0 my-2 p-2 w-full border-solid border-2" type="text" placeholder="email">
      </div>
      <div class="password">
        <label for="password" class="block mt-6 text-xl">password: </label>
        <input v-model="password" class="block mx-0 my-2 p-2 w-full border-solid border-2" type="password" placeholder="password">
      </div>
      <div class="confirmPassword">
        <label for="confirmPassword" class="block mt-6 text-xl">confirm password: </label>
        <input v-model="confirmPassword" class="block mx-0 my-2 p-2 w-full border-solid border-2" type="password" placeholder="confirm password">
      </div>
      <button class="border-0 cursor-pointer text-xl mt-5 p-3 text-white bg-red-500 hover:bg-black rounded-2xl">
        Sign Up
      </button>
    </form>
    <div class="text-center py-6 hover:text-red-500 text-xl">
      <nuxt-link to="/">Already have an account? Login</nuxt-link>
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
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    signedup () {
      if (this.email != '' && this.password != '' &&this.confirmPassword !='')
      {
        if (this.password == this.confirmPassword)
        {
            var result = this.$fire.auth.createUserWithEmailAndPassword(this.email, this.password);
            result.catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);
            alert("Message: " +errorMessage);
        });
        }
        else
        {
            alert('password did not match with confirm password')
        }
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

<style lang="scss" scoped>

</style>