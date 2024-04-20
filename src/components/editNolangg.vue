<template>
    <div class="container">
      <h2
        class="poppins-semibold text-center justify-content-center mb-3"
        style="
          background: #107eff;
          align-items: center;
          padding: 10px;
          color: white;
          border-radius: 5px;
        "
      >
        Input Data Meter By Nolangg
      </h2>
      <div class="row">
        <div class="col-md-6">
          <!-- Kolom untuk menampilkan lokasi saat ini -->
      <div class="input">
        <label for="currentLocation" class="poppins-semibold">Lokasi Saat Ini</label>
        <textarea
          style="background-color: #65B741; color: white;"
          v-if="currentLocation"
          v-model="currentLocationDisplay"
          class="poppins-regular form-control"
          name="currentLocation"
          placeholder="Latitude, Longitude"
          aria-label="Lokasi Saat Ini"
          aria-describedby="addon-wrapping"
          disabled
        ></textarea>
        <div v-else>
          <span class="text-muted">Mendapatkan lokasi saat ini...</span>
        </div>
      </div>
          <div class="input">
            <label for="alamat" class="poppins-semibold">Alamat</label>
            <textarea
              type="text"
              v-model="alamat"
              class="poppins-regular form-control"
              name="alamat"
              placeholder="Alamat Pelanggan"
              aria-label="Alamat Pelanggan"
              aria-describedby="addon-wrapping"
            ></textarea>
          </div>
          <div class="row align-items-center">
            <div class="col-md-4">
              <label for="nolangg" class="poppins-semibold">ID Pelanggan</label>
            </div>
            <div class="col-md-8">
              <div class="input">
                <input
                  type="text"
                  v-model="nolangg"
                  class="poppins-regular form-control"
                  placeholder="Nomor Pelanggan"
                  aria-label="Nomor Pelanggan"
                  aria-describedby="addon-wrapping"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col-md-4">
              <label for="nolangg" class="poppins-semibold">DISM</label>
            </div>
            <div class="col-md-8">
              <div class="input">
                <input
                  type="text"
                  v-model="dism"
                  class="poppins-regular form-control"
                  placeholder="Nomor Pelanggan"
                  aria-label="Nomor Pelanggan"
                  aria-describedby="addon-wrapping"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col-md-4">
              <label for="nolangg" class="poppins-semibold">Lalu</label>
            </div>
            <div class="col-md-8">
              <div class="input">
                <input
                  type="text"
                  v-model="lalu"
                  class="poppins-regular form-control"
                  placeholder="Nomor Pelanggan"
                  aria-label="Nomor Pelanggan"
                  aria-describedby="addon-wrapping"
                />
              </div>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col-md-4">
              <label for="nolangg" class="poppins-semibold">Periode</label>
            </div>
            <div class="col-md-8">
              <div class="input">
                <input
                  type="text"
                  v-model="periode"
                  class="poppins-regular form-control"
                  placeholder="Nomor Pelanggan"
                  aria-label="Nomor Pelanggan"
                  aria-describedby="addon-wrapping"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col-md-4">
              <label for="nolangg" class="poppins-semibold">Status Data</label>
            </div>
            <div class="col-md-8">
              <div class="input">
                <input
                  type="text"
                  v-model="dt"
                  class="poppins-regular form-control"
                  placeholder="Nomor Pelanggan"
                  aria-label="Nomor Pelanggan"
                  aria-describedby="addon-wrapping"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <!-- Kolom untuk Status Data -->
          <div class="row align-items-center">
            <div class="col-md-4">
              <label for="st" class="poppins-semibold">Kini</label>
            </div>
            <div class="col-md-8">
              <div class="input">
                <input
                  type="text"
                  v-model="kini"
                  class="poppins-regular form-control"
                  placeholder="Masukkan meter kini"
                  aria-label="Status Data"
                  aria-describedby="addon-wrapping"
                />
              </div>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col-md-4">
              <label for="kt" class="poppins-semibold">Keterangan</label>
            </div>
            <div class="col-md-8">
              <div class="input">
                <textarea
                  type="text"
                  v-model="kt"
                  class="poppins-regular form-control"
                  placeholder="Tambahkan Keterangan"
                  aria-label="Status Data"
                  aria-describedby="addon-wrapping"
                />
              </div>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col-md-4">
              <label for="st" class="poppins-semibold">Status Meter</label>
            </div>
            <div class="col-md-8">
              <div class="input">
                <select v-model="st" class="form-control">
                <option value="">Pilih Status Meter</option>
                <option v-for="all_status_meter in all_status_meter" :key="all_status_meter.kode" :value="all_status_meter.status">{{all_status_meter.kode}} {{ all_status_meter.status }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col-md-4">
              <label for="foto_meter" class="poppins-semibold">Foto Meter</label>
            </div>
            <div class="col-md-8">
              <div class="input mb-5 display-flex">
                <Vue2Dropzone
                v-model="file"
                  ref="myVueDropzone"
                  id="dropzone"
                  :options="dropzoneOptions"
                  @vdropzone-file-added="fileAdded"
                  @vdropzone-removed-file="fileRemoved"
                >
                  <div class="dz-message text-center" style="margin:10px;">
                    <i class="fas fa-cloud-upload fa-3x"></i>
                    <h3>Drop files here or click to upload.</h3>
                  </div>
                </Vue2Dropzone>
              </div>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col-md-6">
              <router-link
                to="/dashboard"
                class="btn btn-success btn-block poppins-semibold"
              >
                KEMBALI
              </router-link>
            </div>
            <div class="col-md-6">
              <button
              class="btn btn-primary btn-block poppins-semibold"
              @click="simpandata"
            >
              SIMPAN DATA
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Vue2Dropzone from "vue2-dropzone";
  import "vue2-dropzone/dist/vue2Dropzone.min.css";
  import { required } from "vuelidate/lib/validators";
  export default {
    name: "EditNolangg",
    components:{
      Vue2Dropzone,
    },
    data() {
      return {
        nolangg: "",
        alamat: "",
        dism: "",
        lalu: "",
        st: "",
        dt:"",
        kini:"",
        kt:"",
        status_meter: "",
        status_baca:"",
        periode: "",
        map: null,
        file:null,
        all_status_meter: [],
        currentLocation: null,
        currentLocationDisplay: null,
        lokasi:"",
        dropzoneOptions: {
          url: `http://localhost/BackEnd/Backend-Laravel/public/api/upload-image/${this.$route.params.nolangg}`,
          thumbnailWidth: 150,
          thumbnailHeight: 150,
          maxFilesize: 2, // in MB
          maxFiles: 1,
          accept: function (file, done) {
          if (
            file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/gif"
          ) {
            done(
              "File yang diunggah harus berupa gambar dalam format JPEG, PNG, atau GIF."
            );
          } else {
            done();
          }
        },
          dictDefaultMessage:"<i class='fas fa-cloud-upload'></i> Drop files here or click to upload.",
          addRemoveLinks: true,
          headers: {
          // Tambahkan header untuk menyertakan token otorisasi
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          nolangg: localStorage.getItem("nolangg"),
        },
      },
      };
    },
    validations:{
      file: {
        required,
     },
    },
    methods: {
      getAvailableStatusMeter(){
        const config = {
            headers : {Authorization : `Bearer ${localStorage.getItem("token")}`}, 
        };
        this.$axios.get(`http://localhost/BackEnd/Backend-Laravel/public/api/getStatus`, config)
        .then(response =>{
          console.log("Status Meter Data:", response.data);
          this.all_status_meter = response.data;
        })
        .catch(error=>{
          console.eror("Error flecting data status meter", error);
        });
      },
      getdetailpelanggan() {
        const headers = {
          Authorization: "Bearer " + localStorage.getItem("token"),
        };
        const params={
          periode : '202404'
        }
        this.$axios
          .get(
            `http://localhost/BackEnd/Backend-Laravel/public/api/getdetail?nolangg=${this.$route.params.nolangg}&periode=${params.periode}`,
            {headers}
          )
          .then((result) => {
            this.nolangg = result.data.nolangg;
            this.alamat = result.data.alamat;
            this.dism = result.data.dism;
            this.lalu = result.data.lalu;
            this.kini = result.data.kini;
            this.kt = result.data.kt;
            this.dt = result.data.status_baca.nm_status;
            this.file = result.data.file;
            this.st = result.data.status_meter.status;
            this.periode = result.data.periode;
            this.status_meter = result.data.status_meter.status;
            this.all_status_meter = result.data.all_status_meter;
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      },
      simpandata() {
        const kode = localStorage.getItem("kode")
        const headers = {
          Authorization: "Bearer " + localStorage.getItem("token"),
        };
        const selectedStatus = this.all_status_meter.find(status => status.status === this.st);
        const params ={
          periode: '202404'
        }
        const formData = new FormData();
        formData.append("nolangg", this.nolangg);
        formData.append("dism", this.dism);
        formData.append("periode", this.periode);
        formData.append("alamat", this.alamat);
        formData.append("lalu", this.lalu);
        formData.append("dt", this.dt.kode);
        formData.append("st", selectedStatus.kode);
        formData.append("kini", this.kini);
        formData.append("kt", this.kt);
        formData.append("file", this.file);
        formData.append("all_status_meter", this.all_status_meter);
        this.$axios
        .post(
          `http://localhost/BackEnd/Backend-Laravel/public/api/edit/${this.$route.params.nolangg}?periode=${params.periode}&petugas=${kode}`,
          formData,
          { headers }
        )
        .then((response) => {
            console.log(formData)
          console.log("Data berhasil disimpan:", response.data);
          this.getAvailableStatusMeter();
          this.$router.push(`/riwayat`);
        })
          .catch((error) => {
            console.error("Error Saving Data:", error);
          });
      },
      fileAdded(file) {
        this.file = file;
      },
      fileRemoved(){
        this.file = null;
      },
      getCurrentLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            this.showPosition,
            this.showError
          );
        } else {
          alert("Geolocation tidak didukung oleh browser ini.");
        }
      },
      showPosition(position) {
        this.currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this.getAddressFromCoordinates(this.currentLocation.latitude, this.currentLocation.longitude);
      },
      showError(error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Akses Lokasi Ditolak.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Informasi Lokasi Tidak Tersedia.");
            break;
          case error.TIMEOUT:
            alert("Permintaan Lokasi Melebihi Waktu.");
            break;
          case error.UNKNOWN_ERROR:
            alert("Kesalahan Tidak Diketahui.");
            break;
        }
      },
      getAddressFromCoordinates(latitude, longitude) {
        // Ganti API_KEY dengan kunci API Google Maps Geocoding Anda
        const API_KEY = "AIzaSyDEnROEdWNv2FCGflnEODYyhPp9EqDNnTg";
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
        
        fetch(url)
          .then(response => response.json())
          .then(data => {
            if (data.status === "OK") {
              // Ambil alamat pertama dari hasil geocoding
              const address = data.results[0].formatted_address;
              // Set nilai textarea untuk menampilkan alamat saat ini
              this.currentLocationDisplay = address;
            } else {
              throw new Error(data.status);
            }
          })
          .catch(error => {
            console.error("Error fetching address:", error);
          });
      },
    },
    mounted() {
      this.getdetailpelanggan();
      this.getAvailableStatusMeter();
      this.getCurrentLocation();
      // Misalnya, dapatkan data bendel dari route params atau state management
      this.pelangganIds = this.$route.params.pelangganIds || [];
      if (this.pelangganIds.length > 0) {
        this.loadPelangganData(this.pelangganIds[0]);
      } else {
        // Handle kasus tidak ada data bendel
        console.error('Tidak ada data bendel');
      }
    },
  };
  </script>
  
  <style>
  </style>
