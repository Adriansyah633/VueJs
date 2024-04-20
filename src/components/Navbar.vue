<template>  
<div class="container-navbar">
<div class="top-bar">
  <div class="row justify-content-start align-items-center ">
     <img src="../assets/Group 2.png" width="90px">
     <div class="col justify-content-start">
      <h2 class="poppins-bold judul">PDAM Tirta Moedal Kota Semarang</h2>
      <div class="row ml-1">
      <p >Call Us: <a  href="tel:123-456-7890">(123) 456-7890</a></p>
          <p style="margin-left:5px;">Email Us: <a  href="mailto:info@yourcompany.com">info@yourcompany.com</a></p>
      </div>
     </div>
  </div> 
        <ul class="social-media-list poppins-regular">
          <li><a href="#"><i class="fab fa-facebook-f"></i>  PDAM Kota Semarang</a></li>
          <li><a href="#"><i class="fab fa-twitter"></i>PDAMKotaSMG</a></li>
          <li><a href="#"><i class="fab fa-instagram"></i> pdam_kota_semarang</a></li>
          <li><a href="#"><i class="fab fa-phone"></i>  0811-26800-60</a></li>
        </ul>
        <nav class="navbar navbar-expand-lg navbar-light">
         <div class="container-fluid">
             <router-link class="navbar-brand poppins-semibold" to="/das  hboard">PDAM</router-link>
             <button class="navbar-toggler" type="button"  @click="toggleNavCollapse" target="navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                 <span class="navbar-toggler-icon"></span>
             </button>
             <div :class="['navbar-collapse', { 'collapse': isNavCollapsed }]"  id="navbarNav">
                 <ul class="navbar-nav me-auto">
                     <li class="nav-item">
                         <router-link class="nav-link" style="font-size: 20px" to="/dashboard" v-show="!isNavCollapsed">Home</router-link>
                     </li>
                     <li class="nav-item">
                         <router-link class="nav-link" style="font-size: 20px" to="/contact" v-show="!isNavCollapsed">Contact</router-link>
                     </li>
                 </ul>
                 <ul class="ml-auto">
                  <li class="nav-item">
                    <button v-on:click="handleLogout" class="btn btn-danger nav-link ml-auto" style="font-family: poppins;" v-show="!isNavCollapsed">Logout</button>
                  </li>
                 </ul>
             </div>
         </div>
     </nav>
      </div>
   
</div>
</template>

<script>
export default {
  name: "NavbarCom",
  data() {
    return{
      isNavCollapsed: false, // Added state for navbar collapse
      isHomePage: false
    };
  },
  created(){
    this.isHomePage = this.$router.path === "/";
  },
  watch: {
    $route(to) {
      this.isHomePage = to.path === "/";
    }
  },
  methods: {
     toggleNavCollapse() {
       this.isNavCollapsed = !this.isNavCollapsed; // Method to toggle navbar collapse state
     },
    navigateToLogin() {
  if (this.$router.currentRoute.path !== '/login') {
    this.$router.push('/login');
  }
},
    async handleLogout() {
  localStorage.clear();
  this.navigateToLogin();

  // Kemudian, coba lakukan request logout ke server
  try {
    const response = await fetch('http://localhost/BackEnd/Backend-Laravel/public/api/logout', {
      method: 'POST',
    });

    // Cek jika logout berhasil dilakukan di server
    if (!response.ok) {
      console.error('Failed to logout:', response.statusText);
    }
  } catch (error) {
    console.error('Failed to logout:', error);
  }
}

  },
};
</script>

<style scoped>

</style>