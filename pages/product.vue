<template>
<div class="container grid xl:grid-cols-2 ">
<div class="addproduct col-span-1 bg-white my-8 py-5 px-8 max-w-5xl rounded-lg shadow mx-8">
    <form name="productForm" class="max-w-sm my-0 mx-auto" @submit.prevent="addProduct">
      <h3 class="text-3xl text-center text-red-500">
      Add Product
     </h3>
      <div class="productname">
        <input v-model="productname" class="block mx-0 my-2 p-2 w-full border-solid border-2" type="text" placeholder="name">
      </div>
      <div class="description">
        <textarea v-model="description" rows="4" class="block mx-0 my-2 p-2 w-full border-solid border-2" placeholder="description"></textarea>
      </div>
      <div class="quantity">
        <input v-model="quantity" class="block mx-0 my-2 p-2 w-full border-solid border-2" type="number" placeholder="quantity in grams">
      </div>
      <div class="price">
        <input v-model="price" class="block mx-0 my-2 p-2 w-full border-solid border-2" type="number" step="1" placeholder="price">
      </div>
      
      <div class="category">
           <select name="" v-model="categoryname" class="block mx-0 my-2 p-2 w-full border-solid border-2 text-gray-500">
                <option value="" disabled selected>category</option>
                <option  v-for='(category) in categorys' v-bind:key="category.id">{{category.catname}}</option>
            </select>
         </div>
    
      <button @click="isOpen = !isOpen"
          type="button"
          class="block focus:outline-none" >
          <p v-if="!isOpen" class="text-gray-600 hover:text-red-500 mt-2"> Add category </p>
          <svg class="h-6 w-6" viewBox="0 0 24 24">
            <path v-if="isOpen" fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
          </svg>
        </button>

        <div :class="isOpen ? 'block' : 'hidden'" class="px-1 pt-1">
      <div class="block px-1  "><input v-model="catname" class="block mx-0 my-2 p-2 w-full border-solid border-2" type="text" placeholder="category name"></div>
      <div class="mt-1 block px-1 "><textarea v-model="catdescription" rows="2" class="block mx-0 my-2 p-2 w-full border-solid border-2" placeholder="category description"></textarea></div>
      <div class="mt-1 block px-1 "> <div @click="addCategory()" class="hover:text-red-500 cursor-pointer" >Add category</div></div>
     
      </div>

      <div class="status">
        <select name="status" v-model="status" class="block mx-0 my-2 p-2 w-full border-solid border-2 text-gray-500">
                <option value="" disabled selected>status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
      </div>
      <button class="border-0 cursor-pointer text-xl mt-5 p-3 text-white bg-red-500 hover:bg-black rounded-2xl">
        Add product
      </button>
    </form>
  </div>
  <div id="productlist" class="productList col-span-1  my-8 py-5 px-8 max-w-5xl">
     <ul id="product-list" class="list-none p-0">
        <li v-for='(product, index) in products' v-bind:key="product.id" class="relative border-b-2 border-gray-300 border-b p-5 bg-gray-200 rounded">
          <span class="block text-xl">{{product.name}}</span>
          <span class=""> Quantity:{{product.quantity}} </span>
          <span class="sm:ml-2"> Price:{{product.prices}}</span>
          <div class="absolute top-0 right-0 my-2">
          <div @click="deleteProducts(productids[index])" class="bg-white cursor-pointer px-0 py-2 mb-1 text-center w-10 font-bold"> X </div>
          <div @click="updateProducts(productids[index])" class="bg-white cursor-pointer px-0 py-2 text-center w-10 font-bold"> + </div>
          </div>
        </li>
      </ul>
  </div>
</div>
</template>

<script>
    export default {
  layout: 'content',

  mounted(){
       this.retrieveProducts(),
       this.retrieveCategory()
        },
  data () {
    return {
      isOpen: false,
      productname: '',
      description: '',
      price: '',
      quantity: '',
      categoryname: '',
      status: '',
      products: [],
      categorys: [],
      productids: [],
      catname:'',
      catdescription:''
    }
  },
  methods: {
    toggleNavbar: function() {
      this.showMenu = !this.showMenu;
    },
    addProduct(){

      

       if(this.productname != '' && this.description != '' && this.price != '' && this.categoryname != '')
       {
         const priceSchema = ({
            price: parseFloat(this.price),
            date: new Date
          })
         var productData = {
           "name" : this.productname,
           "description" : this.description,
           "quantity": parseInt(this.quantity),
           "prices" : [priceSchema],
           "category" :{
             "categoryname" : this.categoryname
           },
           "status" : this.status
         }
         this.$fire.firestore.collection("products").add(productData).then((result)=>{
             alert('succesfully added a product') 
              this.$router.push('product')
              document.productForm.reset();
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
    async retrieveProducts () {
       this.$fire.firestore.collection('products').where("status", "==", "active").onSnapshot(snapshot => {
                    let changes = snapshot.docChanges();
                    changes.forEach(change => {
                        console.log(change.doc.id,"=>",change.doc.data());
                        if(change.type == 'added'){
                              this.products.push(change.doc.data());
                              this.productids.push(change.doc.id);
                            } 
                        else if (change.type == 'modified'){
                            }
                    });
            });
            
  },
  async retrieveCategory () {
       this.$fire.firestore.collection('category').onSnapshot(snapshot => {
                    let changes = snapshot.docChanges();
                    changes.forEach(change => {
                        console.log(change.doc.id,"=>",change.doc.data());
                        if(change.type == 'added'){
                              this.categorys.push(change.doc.data());
                            } 
                    });
            });
  },

   deleteProducts(id){
       this.$fire.firestore.collection('products').doc(id).update({ status: 'inactive'}).then(() => {
         location.reload(true);
       })
   },
   updateProducts(id){
     this.$router.push({ name: 'productUpdates', params: { productId: id } });
   },
   addCategory(){
       if (this.catname !='' && this.catdescription != '')
       {
              var categoryData = {
                  catname: this.catname,
                  catdescription: this.catdescription
              }
            this.$fire.firestore.collection("category").add(categoryData).then((result)=>{
             alert('succesfully added a category') 
              location.reload(true);
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
         alert('please fill details required to enter a category')
       }
   },
   
    async returnCurrentDate(){
        var datetime = new Date();
            var year = datetime.getFullYear();
            var month = datetime.getMonth()+1;
            var date = datetime.getDate();
            var formattedDate = year+''+month+''+date;
            return formattedDate;
    },
  }
 }
</script>

<style lang="scss" scoped>

</style>