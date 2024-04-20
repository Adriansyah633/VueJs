<template>
  <div class="container mt-2">
    <LoadingComponent v-if="loading" />
    <h4 class="riwayat text-center poppins-semibold">INPUT DATA BY BENDEL</h4>
    <div class="row justify-content-center align-items-center">
      <div class="col mb-4">
        <div class="row md-3 ml-2">
          <router-link to="/dashboard" class="btn btn-primary poppins-semibold">
            Kembali
          </router-link>
          <router-link to="/riwayat" class="btn btn-danger poppins-semibold">
            Riwayat Baca
          </router-link>
        </div>
      </div>
       
      <div class="col-md-6 d-flex align-items-center justify-content-end">
        <div class="row">
          <div class="col">
            <button
              class="btn btn-secondary poppins-semibold"
              v-on:click="kembali()"
            >
            <i class="fa fa-backward" aria-hidden="true"></i>
            </button>
          </div>
          <div class="col">
            <input
              type="text"
              name="cari-data-nolangg"
              v-model="search_nolangg"
              class="form-control form-control-sm" 
              style="width: 200px;" 
            />
          </div>
          <div class="col">
            <button
              class="btn btn-success"
              name="cari_nolangg"
              v-on:click="cari_data_nolangg()"
            >
              <i class="fa-solid fa-magnifying-glass"></i>  
            </button>
          </div>
        </div>
      </div>
    </div>
   
    <table
      class="table table-hover table-striped table-responsive"
      id="my-table"
      :pelanggan="pelanggan"
      :per-page="perPage"
      :current-page="currentPage"
    >
    <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        @change="loadData"
      ></b-pagination>
      <thead>
        <tr>
          <th class="text-center">No</th>
          <th class="text-center">ID Pelanggan</th>
          <th class="text-center">Periode</th>
          <th class="text-center">DISM</th>
          <th class="text-center">Lalu</th>
          <th class="text-center">Kini</th>
          <th class="text-center">M3</th>
          <th class="text-center">Status</th>
          <th class="text-center">Keterangan</th>
          <th class="text-center">Data</th>
          <th class="text-center">Cabang</th>
          <th class="text-center">Aksi</th>
          <!-- <th class="text-center">Tandai</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(pel, index) in pelanggan" :key="index">
          <td class="text-center">{{ index + 1 }}</td>
          <td>{{ pel.nolangg }}</td>
          <td>{{ pel.periode }}</td>
          <td>{{ pel.dism }}</td>
          <td>{{ pel.lalu }}</td>
          <td>{{ pel.kini }}</td>
          <td>{{ pel.m3 }}</td>
          <td>{{ pel.status_meter.status}}</td>
          <td>{{ pel.kt }}</td>
          <td>{{ pel.status_baca.nm_status}}</td>
          <td>{{ pel.cabang.nm_cabang }}</td>
          <td>
            <router-link :to="'/editbendel/' + pel.nolangg">
              <button class="btn btn-md btn-success"><i class="fa-solid fa-pen-to-square"></i></button>
            </router-link>
          </td>
          <!-- <td class="text-center" width="100%">
           <div class="form-check form-check-inline">
            <input
            class="form-check-input" 
            type="checkbox"
            v-model="pel.ditandai"
            @change="toggleTandai(index)"
            style="transform: scale(2);"
            >
           </div>
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import { search } from "core-js/fn/symbol";
import LoadingComponent from "./LoadingComponents.vue"; 
export default {
  name: "NolanggComponent",
  components:{
    LoadingComponent
  },
  data() {
    return {
      loading:true,
      bendel:"",
      kode :"",
      pelanggan: [],
      search: this.$route.query.search,
      bendelData: [],
      pagination: {},
      perPage: 10,
      currentPage: 1,
      totalRows: 0,
      status_baca: "",
      status_meter: "",
      search_nolangg:"",
    };
  },
  computed: {
    rows() {
      return this.pelanggan.length;
    },
  },
  methods: {
    // loadData() {
    //   const headers = {
    //     Authorization: "Bearer " + localStorage.getItem("token"),
    //   };
    //   const url = `http://localhost/BE/be/public/api/bendel`;
    //   this.$axios
    //     .post(url, {headers})
    //     .then((response) => {
    //       this.pelanggan = response.data.data;
    //       this.pagination = response.data;
    //       this.totalRows = response.data.total;
    //     })
    //     .catch((error) => console.error("Error:", error));
    // },

    tb_pelanggan() {
      this.loadData();
    },
    cari_data_nolangg() {
    // Cari data berdasarkan nolangg
    if (this.search.trim() !== '') {
      const token = localStorage.getItem('token');
      const kode = localStorage.getItem("kode");
      const params = {
        page: this.currentPage,
        perPage: this.perPage,
      };
      const url = `http://localhost/BackEnd/Backend-Laravel/public/api/cari`;
      const data = {
        nolangg: this.search_nolangg,
        kode: kode
      };
      const headers = {
        Authorization: "Bearer " + token,
      };

      this.$axios.post(url, data, { headers }, { params })
        .then(response => {
          console.log(response);
          this.pelanggan = response.data.data;
          this.totalRows = response.data.total;
          this.pagination = response.data;
        })
        .catch(error => console.error("Error:", error));
    } else {
      // Jika input pencarian kosong, load data semua nolangg
      this.search_nolangg = '';
      this.loadData();
    }
  },
  kembali() {
      // Kembali ke tampilan tabel awal
      this.search_nolangg = ''; // Reset input pencarian
      this.loadData(); // Tampilkan semua data
    },
  loadData() {
    const token = localStorage.getItem('token');
    const kode = localStorage.getItem("kode");
    const params = {
        page: this.currentPage,
        perPage: this.perPage,
      };
    const url = `http://localhost/BackEnd/Backend-Laravel/public/api/bendel`;
    const data = {
        bendel: this.search,
        kode : kode
    };
    const headers = {
        Authorization: "Bearer " + token,
    };

    this.$axios.post(url, data, { headers }, {params})
        .then(response => {
            console.log(response);
            this.pelanggan = response.data;
            this.totalRows = response.data.total;
            this.pagination = response.data;
        })
        .catch(error => console.error("Error:", error));
    },
    toggleTandai(index) {
      this.pelanggan[index].ditandai = !this.pelanggan[index].ditandai;
      // Simpan status ke localStorage
      localStorage.setItem('statusTandai', JSON.stringify(this.pelanggan));
    }
  },
  mounted(){
    setTimeout(() => {
      this.loading = false; // Set loading to false after the data is loaded
    }, 2000);
  },
  created() {
    let statusTandai = localStorage.getItem('statusTandai');
    if (statusTandai) {
      this.pelanggan = JSON.parse(statusTandai);
    } else {
      this.loadData();
    }
  },
};
</script>

<style>
</style>