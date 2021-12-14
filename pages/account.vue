<template>
<div class="account bg-white my-8 py-5 px-8 rounded-lg shadow lg:mx-32 mx-8 content-center">
    <h3 class="text-3xl text-center text-red-500">
      User Account
    </h3>
    <form class="max-w-sm my-0 mx-auto" @submit.prevent="setUserAccount">
      <div class="firstname">
        <label for="firstname" class="block mt-6 text-xl">First Name: </label>
        <input v-model="firstname" class="block mx-0 my-2 p-2 w-full border-solid border-2" type="text" placeholder="first name">
      </div>
      <div class="lastname">
        <label for="lastname" class="block mt-6 text-xl">Last Name: </label>
        <input v-model="lastname" class="block mx-0 my-2 p-2 w-full border-solid border-2" type="text" placeholder="last name">
      </div>
      <div class="streetAdress">
        <label for="streetAdress" class="block mt-6 text-xl">Street Address: </label>
        <input v-model="streetAdress" class="block mx-0 my-2 p-2 w-full border-solid border-2" type="text" placeholder="street address">
      </div>
      <div class="postCode">
        <label for="postCode" class="block mt-6 text-xl">postcode: </label>
        <input v-model="postCode" class="block mx-0 my-2 p-2 w-full border-solid border-2" type="number" placeholder="postcode">
      </div>
      <div class="townCity">
        <label for="townCity" class="block mt-6 text-xl">Town/City: </label>
        <input v-model="townCity" class="block mx-0 my-2 p-2 w-full border-solid border-2" type="text" placeholder="town / city">
      </div>
      <div class="country">
        <label for="country" class="block mt-6 text-xl">Country: </label>
        <select name="" v-model="country" class="block mx-0 my-2 p-2 w-full border-solid border-2">
                <option value="" selected disabled>Country</option>
                <option value="South Africa">South Africa</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="England">England</option>
                <option value="France">France</option> 
                <option value="Australia">Australia</option> 
            </select>
      </div>
      <div class="countryCode">
        <label for="countryCode" class="block mt-6 text-xl">Country Code: </label>
        <select name="" v-model="countryCode" class="block mx-0 my-2 p-2 w-full border-solid border-2">
                <option value="" selected disabled>country code</option>
                <option value="+1">+1 - America</option>
                <option value="+27">+27 - SA</option>
                <option value="+33">+33 - FRA</option>
                <option value="+44">+44 - ENG</option>
                <option value="+61">+61 - AUS</option> 
            </select>
      </div>
      <div class="phoneNo">
        <label for="phoneNo" class="block mt-6 text-xl">Phone Number: </label>
        <input v-model="phoneNo" class="block mx-0 my-2 p-2 w-full border-solid border-2" type="number" placeholder="phone number">
      </div>
      <button class="border-0 cursor-pointer text-xl mt-5 p-3 text-white bg-red-500 hover:bg-black rounded-2xl">
        Set User Account
      </button>
    </form>
  </div>
</template>

<script>
   export default {
        mounted(){
    this.loggedin()
    },
        data () {
    return {
      firstname: '',
      lastname: '',
      streetAdress: '',
      postCode: '',
      townCity: '',
      country: '',
      countryCode: '',
      phoneNo: ''
    }
  },
  methods: {
    setUserAccount () {
        var rootRef = this.$fire.firestore.collection("users");
        var userID = this.$fire.auth.currentUser.uid;
        var userRef = rootRef.doc(userID);

      if (this.firstname != '' && this.lastname != '' && this.streetAdress !='' && this.postCode!= '' && this.townCity != '' && this.country !='' && this.countryCode != '' && this.phoneNo !='')
      {
        var userData = {
            "Name": {
                "firstName" : this.firstname,
                 "lastName" : this.lastname
            },
            "Address": {
                "streetAddress" : this.streetAdress, 
                "postCode" : this.postCode,
                "townCity" : this.townCity,
                "country" : this.country
            },
            "phone": {
                "countryCode" : this.countryCode,
                "phoneNumber" : this.phoneNo
            }
        };

        userRef.set(userData).then((result)=>{
             this.$router.push('home'); 
           })
            .catch((error)=>{
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                alert("Message: " +errorMessage);
            });
      }
      else
      {
        alert('please fill all feilds')
      }
    },
     loggedin(){
              this.$fire.auth.onAuthStateChanged(user=>{
              if(user){
                var userID = this.$fire.auth.currentUser.uid;
                var docRef = this.$fire.firestore.collection("customer").doc(userID);
                docRef.get().then((doc) => {
                     if (doc.exists) {
                        this.$router.push('home');
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