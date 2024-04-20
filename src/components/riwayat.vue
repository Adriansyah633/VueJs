<template>
  <div class="container">
    <LoadingComponent v-if="loading" />
    <h4 class="riwayat text-center poppins-semibold">RIWAYAT BACA DATA</h4>
    <div class="row justify-content-center align-items-center">
      <div class="col mb-4">
        <div class="row md-3 ml-2">
          <router-link to="/dashboard" class="btn btn-primary poppins-semibold">
            Kembali
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
              name="cari-data-riwayat"
              v-model="search_riwayat"
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
      items="riwayat"
      :pelanggan="pelanggan"
      :per-page="perPage"
      :current-page="currentPage"
    >
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
          <th class="text-center">View</th>
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
          <td class="text-center">{{ pel.status_meter.status }}</td>
          <td>{{ pel.kt }}</td>
          <td>{{ pel.status_baca.nm_status }}</td>
          <td>{{ pel.cabang.nm_cabang }}</td>
          <td style="padding: 10px; display: flex">
            <button
              class="btn btn-md btn-info ml-1"
              @click="viewDetail(pel.nolangg)"
            >
              <i class="fa-solid fa-eye"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <b-modal class="poppins-regular" ref="detailModal" hide-footer>
      <template #modal-title>
        <div style="background-color: #f0f0f0; padding: 10px;">
          <h5 style="margin: 0; font-weight: bold;">Detail Pelanggan</h5>
        </div>
    </template>
      <div v-for="(detail, index) in detailPelanggan" :key="index" class="detail-section">
      <div class="text-left" style="padding: 10px; border-bottom: 2px black">
        <p style="font-weight: bold;">
          <span  style="background: linear-gradient(to left, #459bcd, #107EFF); background-color: blue; border-radius: 5px; color: white; padding: 5px; font-weight: bold;">Nomor Pelanggan:</span> 
           {{ selectedNolangg }}</p>
        <p style="font-weight: bold;">
          <span  style="background: linear-gradient(to left, #459bcd, #107EFF); background-color: blue; border-radius: 5px; color: white; padding: 5px; font-weight: bold;">DISM :</span>
           {{ detail.dism }}</p>
        <p style="font-weight: bold;">
          <span  style="background: linear-gradient(to left, #459bcd, #107EFF); background-color: blue; border-radius: 5px; color: white; padding: 5px; font-weight: bold;">Cabang:</span>
          {{ detail.cabang ? detail.cabang.nm_cabang : "" }}
        </p>
        <p style="font-weight: bold;">
          <span  style="background: linear-gradient(to left, #459bcd, #107EFF); background-color: blue; border-radius: 5px; color: white; padding: 5px; font-weight: bold;">Periode :</span>
           {{ detail.periode }}</p>
        <p style="font-weight: bold;">
          <span  style="background: linear-gradient(to left, #459bcd, #107EFF); background-color: blue; border-radius: 5px; color: white; padding: 5px; font-weight: bold;">Kini :</span> 
          {{ detail.kini }}</p>
        <p style="font-weight: bold;">
          <span  style="background: linear-gradient(to left, #459bcd, #107EFF); background-color: blue; border-radius: 5px; color: white; padding: 5px; font-weight: bold;">Lalu :</span> 
          {{ detail.lalu }}</p>
        <p style="font-weight: bold;">
          <span  style="background: linear-gradient(to left, #459bcd, #107EFF); background-color: blue; border-radius: 5px; color: white; padding: 5px; font-weight: bold;">Status Meter :</span>
          {{ detail.st ? detail.status_meter.status : "" }}
        </p>
        <p style="font-weight: bold;">
          <span  style="background: linear-gradient(to left, #459bcd, #107EFF); background-color: blue; border-radius: 5px; color: white; padding: 5px; font-weight: bold;">Status Data :</span>
          {{ detail.dt ? detail.status_baca.nm_status : "" }}
        </p>
        <p  style=" text-align: center; color: black; padding: 5px; font-weight: bold;">Gambar Meteran</p>
        <div class="text-center">
          <b-img
            v-if="detail.file"
            :src="detail.file"
            fluid
            alt="Gambar Meteran"
            thumbnail
            rounded
          ></b-img>
          <p v-else>Tidak ada gambar</p>
        </div>
        </div>
        <!-- Tambahkan informasi detail lainnya sesuai kebutuhan -->
        <div class="d-flex justify-content-center mt-3">
          <router-link :to="'/Edit/' + selectedNolangg">
        <button
          class="btn btn-md btn-success mr-1"
          v-if="detail.status_baca && detail.status_baca.nm_status === 'SIAP'"
          @click="editData(detail.nolangg)"
        >
          <i class="fa-solid fa-pen-to-square"></i> Edit Data
        </button>
      </router-link>
          <button
            class="btn btn-md btn-danger"
            v-if="detail.status_baca && detail.status_baca.nm_status === 'SIAP'"
            @click="$refs.detailModal.hide()"
          >
            <i class="fa-solid fa-times"></i> Close
          </button>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>

// import { search } from "core-js/fn/symbol";
import LoadingComponent from "./LoadingComponents.vue"; 
export default {
  name: "RiwayatComponent",
  components:{
    LoadingComponent
  },
  data() {
    return {
      loading:true,
      pelanggan: [],
      perPage: 10,
      currentPage: 1,
      search: "",
      petugas: "",
      pagination: "",
      totalRows: "",
      riwayat: [],
      selectedNolangg: "",
      detailPelanggan: {},
      status_baca: "",
      status_meter: "",
      search_riwayat:"",
    };
  },
  created() {
    this.getDetailPelanggann();
  },
  methods: {
    // Mengambil detail pelanggan dari backend
    getDetailPelanggann() {
      // this.loading = true;
      const kode = localStorage.getItem("kode");
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      const params = {
        petugas: kode,
        periode: '202404',
      };
      const url = `http://localhost/BackEnd/Backend-Laravel/public/api/riwayat?petugas=${params.petugas}&periode=${params.periode}`;
      console.log(url);
      this.$axios
        .get(url, { headers })
        .then((response) => {
          this.pelanggan = response.data;
          console.log(response.data);
          // this.loading = false;
        })
        .catch((error) => console.error("Error:", error));
        // this.loading = false;
    },
    
    cari_data_nolangg() {
    // Cari data berdasarkan nolangg
    if (this.search_riwayat.trim() !== '') {
      const token = localStorage.getItem('token');
      const kode = localStorage.getItem("kode");
      const params = {
        page: this.currentPage,
        perPage: this.perPage,
      };
      const url = `http://localhost/BackEnd/Backend-Laravel/public/api/cari`;
      const data = {
        nolangg: this.search_riwayat,
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
    // Jika input pencarian kosong, load semua data riwayat
    this.search_riwayat = '';
    this.getDetailPelanggann();
  }
  },
  kembali() {
      // Kembali ke tampilan tabel awal
      this.search_riwayat = ''; // Reset input pencarian
      this.getDetailPelanggann(); // Tampilkan semua data
    },
    deleteConfirm(nolangg) {
      if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
        this.deleteData(nolangg);
      }
    },
    deleteData(nolangg) {
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      this.$axios
        .delete(`http://localhost/BackEnd/Backend-Laravel/public/api/riwayat/{nolangg}`, headers)
        .then(() => {
          // Hapus data dari array pelanggan setelah berhasil dihapus dari backend
          this.pelanggan = this.pelanggan.filter(
            (pel) => pel.nolangg !== nolangg
          );
          // Tampilkan pesan sukses
          this.$toast.success("Data berhasil dihapus.");
        })
        .catch((error) => console.error("Error:", error));
    },
    viewDetail(nolangg) {
    const token = localStorage.getItem("token");
    const kode = localStorage.getItem("kode");
    if (!token) {
      console.error("Authorization token not found");
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };
    this.selectedNolangg = nolangg;
    const periode1 = ['202403']; 
    const periode2 = ['202404']; 
    const requests = [];
    periode1.forEach(periode => {
      const url = `http://localhost/BackEnd/Backend-Laravel/public/api/getdetail?nolangg=${nolangg}&periode=${periode}`;
      requests.push(this.$axios.get(url, { headers }));
    });
    periode2.forEach(periode => {
      const url = `http://localhost/BackEnd/Backend-Laravel/public/api/getdetail?nolangg=${nolangg}&periode=${periode}&petugas=${kode}`;
      requests.push(this.$axios.get(url, { headers }));
    });
    Promise.all(requests)
      .then(responses => {
        this.detailPelanggan = responses.map(response => response.data);
        this.$refs.detailModal.show();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  },
},
mounted(){
    setTimeout(() => {
      this.loading = false; // Set loading to false after the data is loaded
    }, 2000);
  },
};
</script>
