<template>
    <div class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoadingComponent'
  }
  </script>
  
  <style scoped>
  .loading-overlay {
  position: fixed; /* atau 'absolute' jika 'fixed' tidak efektif */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Gelapkan background */
  z-index: 2000; /* Pastikan ini lebih tinggi dari komponen lain */
}
  
  .loading-spinner {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  