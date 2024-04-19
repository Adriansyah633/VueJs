<template>
  <div>
    <NavbarCom />
    <div class="container-contact">
        <div class="contact-form">
            <form action="submit_contact.php" method="POST">
              <div class="row">
                <label for="name">Nama:</label>
                <input type="text" id="name" name="name" placeholder="Nama Anda...">
                
                <label for="email">Email:</label>
                <input type="text" id="email" name="email" placeholder="Email Anda...">
                
                <label for="message">Keluhan/Masukan:</label>
                <textarea id="message" name="message" placeholder="Tulis keluhan atau masukan Anda..." rows="6"></textarea>
                
                <input type="submit" value="Kirim">
              </div>
            </form>
            <div class="social-icons">
                <a href="https://facebook.com"><i class="fab fa-facebook-f"></i> </a>
                <a href="https://twitter.com"><i class="fab fa-twitter"></i></a>
                <a href="https://instagram.com"><i class="fab fa-instagram"></i></a>
            </div>
        </div>
    </div>
    <footer class="footer-contact">
        PDAM Kota Semarang &copy; 2024 | Hubungi Kami: +62 821 1234 5678
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import NavbarCom from '@/components/Navbar.vue'

export default {
  name: 'ContactView',
  components: {
    NavbarCom
  }
}
</script>

<style>
        .container-contact {
            display: flex;
            justify-content: start;
            padding: 20px;
            background-color: #107EFF; /* Warna latar belakang baru */
        }
        .contact-form {
            flex: 1;
            max-width: 800px; /* Lebih besar dari sebelumnya */
            margin: 20px;
            padding: 40px; /* Padding lebih besar */
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 15px rgba(0,0,0,0.1);
        }
        input[type=text], textarea {
            width: 100%;
            padding: 12px; /* Padding lebih besar */
            margin-top: 6px;
            margin-bottom: 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px; /* Ukuran teks lebih besar */
        }
        label {
            font-size: 18px;
            font-weight: bold; /* Ukuran label lebih besar */
        }
        input[type=submit] {
            background-color: #4CAF50;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin-top:10px;
        }
        input[type=submit]:hover {
            background-color: #45a049;
        }
        .footer-contact {
            font-size: 20px;
            margin-top: 20px;
            padding: 10px;
            text-align: center;
        }
        .social-icons i {
            text-align: center;
            margin-top: 20px;
            width: 80px;
            padding: 10px;
            display:flexbox;
            justify-content: center;
            margin-right: 20px;
        }
        .social-icons img {
            width: 40px;
            margin: 0 10px;
            transition: transform 0.3s ease;
        }
        .social-icons img:hover {
            transform: scale(1.1);
        }

</style>