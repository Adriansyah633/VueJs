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
      <div class="col-md-4 d-flex justify-content-end">
        <input
          type="text"
          name="cari-data"
          v-model="search"
          class="form-control mr-2"
        />
        <button
          class="btn btn-md btn-success"
          name="cari_nolangg"
          v-on:click="cari_data_nolangg()"
        >
        <i class="fa-solid fa-magnifying-glass"></i>  
        </button>
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
    <b-modal ref="detailModal" hide-footer>
      <template #modal-title>Detail Pelanggan</template>
      <div v-for="(detail, index) in detailPelanggan" :key="index" class="detail-section">
      <div class="text-left" style="padding: 10px; border-bottom: 2px black">
        <p>Nomor Pelanggan: {{ selectedNolangg }}</p>
        <p>DISM : {{ detail.dism }}</p>
        <p>
          Cabang :
          {{ detail.cabang ? detail.cabang.nm_cabang : "" }}
        </p>
        <p>Periode : {{ detail.periode }}</p>
        <p>Kini : {{ detail.kini }}</p>
        <p>Lalu : {{ detail.lalu }}</p>
        <p>
          Status Meter :
          {{ detail.st ? detail.status_meter.status : "" }}
        </p>
        <p>
          Status Data :
          {{ detail.dt ? detail.status_baca.nm_status : "" }}
        </p>
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
