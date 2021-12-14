<template>
    <div class="bg-white my-8 py-5 px-8 rounded-lg shadow lg:mx-32 mx-8 content-center">
        <form name="productForm" class="max-w-sm my-0 mx-auto" @submit.prevent="updateProduct">
      <h3 class="text-3xl text-center text-red-500">
          Update Products
     </h3>
      <div class="products" v-for='product in products' v-bind:key="product.id">
        <input v-model="product.name" name="name" id="name" class="block mx-0 my-2 p-2 w-full border-solid border-2" type="text" value="">
        <textarea v-model="product.description" name="description" id="description" rows="4" class="block mx-0 my-2 p-2 w-full border-solid border-2" value=""></textarea>
        <input v-model="product.quantity" name="quantity" id="quantity"  class="block mx-0 my-2 p-2 w-full border-solid border-2" type="number" value="">
        <input v-model="product.price" name="price" id="price" class="block mx-0 my-2 p-2 w-full border-solid border-2" type="number" step="1" value="">
        <input v-model="product.category.categoryname" name="categoryname" id="categoryname" class="block mx-0 my-2 p-2 w-full border-solid border-2" type="text" value="">
        <select name="status" id="status" v-model="product.status" class="block mx-0 my-2 p-2 w-full border-solid border-2">
                <option value="inactive">Inactive</option>
                <option value="active">Active</option>
            </select>
      </div>
      <button class="border-0 cursor-pointer text-xl mt-5 p-3 text-white bg-red-500 hover:bg-black rounded-2xl">
        Update product
      </button>
    </form>
    </div>
</template>

<script>
    export default {
      layout: 'content',
        mounted() {
            this.retrieveData()
      },
      data(){
          return{
              productId : this.$route.params.productId,
              products:[]
          }
      },
      methods:{
      retrieveData() {
          this.$fire.firestore.collection('products').doc(this.productId).onSnapshot((doc) => {
                this.products.push(doc.data());
         })
       },

       updateProduct(){
         var name = document.getElementById('name').value;
         var description = document.getElementById('description').value;
         var quantity = document.getElementById('quantity').value;
         var price = document.getElementById('price').value;
         var categoryname = document.getElementById('categoryname').value;
         var status = document.getElementById('status').value;
         var datetime = new Date();
         if(name != '' && description != '' && price != '' && categoryname != '' && status != '')
       {
         const priceSchema = ({
            price: parseFloat(price),
            date: new Date
          })
       var productData = {
           "name" : name,
           "description" : description,
           "quantity": parseInt(quantity),
           "prices" : [priceSchema],
           "category" :{
             "categoryname" : categoryname
           },
           "status" : status
         }
        this.$fire.firestore.collection("products").doc(this.productId).set(productData).then((result)=>{
              this.$router.push('product')
              alert('succesfully updated product') 
           })
            .catch((error)=>{
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                alert("Message: " +errorMessage);
            });


            
       }
       else{
         alert("please fill all required fields to update")
       }
    },
       
      }
    }
</script>

<style lang="scss" scoped>

</style>