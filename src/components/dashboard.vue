<template>
  <div class="dahlah">
    <LoadingComponent v-if="loading" />
    <b-carousel>
      <div id="carouselExampleIndicators" class="carousel slide">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="../assets/slide1.jpg" class="d-block w-100" />
          </div>
          <div class="carousel-item">
            <img src="../assets/slide2.jpg" class="d-block w-100" />
          </div>
          <div class="carousel-item">
            <img src="../assets/slide3.jpg" class="d-block w-100" />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </b-carousel>

    <div class="row row-dashboard">
      <div class="col-md-8 ml-5">
        <div class="container gradient-container rounded-container shadow">
          <div class="container">
            <div class="container">
              <div
                class="card mt-4 mb-4 poppins-regular shadow"
                style="max-width: 400px"
              >
                <div class="row no-gutters">
                  <div
                    class="col-md-4 d-flex align-items-center justify-content-center"
                  >
                    <img src="../assets/petugas.png" width="100px" />
                  </div>
                  <div class="col-md-8">
                    <div
                      class="card-body"
                      style="background-color: #107eff; color: white"
                    >
                      <h5 class="card-title">
                        Selamat Datang <br />
                        {{ nm_petugas }}
                      </h5>
                      <p class="card-text">NPP : {{ kode }} Pembaca Meter.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div v-for="(bar, index) in bars" :key="index" class="row mb-1">
                <div class="col-sm-2">{{ bar.variant }}:</div>
                <div class="col-sm-10 pt-1">
                  <b-progress
                    :value="bar.value"
                    :variant="bar.variant"
                    :key="bar.variant"
                  ></b-progress>
                </div>
              </div>

              <div class="row mt-4 justify-content-between">
                <ChartComponent
                  :chart-data="chartData"
                  :chart-options="chartOptions"
                  style="width: 800px; height: 400px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="container gradient-container rounded-container shadow">
          <div class="card mb-3 poppins-regular">
            <div class="card-body" style="position: relative">
              <h5 class="card-title poppins-semibold">
                <img src="../assets/date.png" width="60px" /> Waktu dan Tanggal
              </h5>
              <p class="card-text">
                Jam : {{ new Date().getHours() }}:{{
                  new Date().getMinutes() < 10
                    ? "0" + new Date().getMinutes()
                    : new Date().getMinutes()
                }}
              </p>
              <p class="card-text">
                Tanggal : {{ new Date().toLocaleDateString() }}
              </p>
            </div>
          </div>
          <div class="col align-items-center card-opsi">
            <div v-if="UserRole != 1">
              <div class="mb-3">
                <b-button
                  v-b-modal.modal-prevent-closing-1
                  class="btn btn-block poppins-semibold shadow"
                  style="
                    height: 110px;
                    margin: 0;
                    font-size: 24px;
                    display: flex;
                    align-items: center;
                    background-color: #59d5e0;
                    border: none;
                  "
                  @click="$bvModal.show('bv-modal-example-1')"
                  ><img src="../assets/nolangg.png" width="90px" /> Input By
                  Nolangg</b-button
                >
                <b-modal id="bv-modal-example-1" hide-footer>
                  <template #modal-title> Cari Data Nolangg </template>
                  <div class="d-block text-left">
                    <label>Masukkan Nomor Pelanggan</label>
                    <input
                      type="text"
                      name="cari_data"
                      v-model="search"
                      class="form-control mb-2"
                    />
                    <button
                      class="btn btn-md btn-success"
                      v-on:click="cari_data_nolangg()"
                    >
                      Search
                    </button>
                    <div v-if="showWarning" class="alert alert-danger">
                      <strong>Peringatan!</strong> {{ this.warningMessage }}
                    </div>
                  </div>
                </b-modal>
              </div>
              <div>
                <b-button
                  v-b-modal.modal-prevent-closing-1
                  class="btn btn-block poppins-semibold mb-3 shadow"
                  style="
                    height: 110px;
                    font-size: 24px;
                    display: flex;
                    align-items: center;
                    background-color: #faa300;
                    border: none;
                  "
                  @click="$bvModal.show('bv-modal-example')"
                  ><img src="../assets/bendel.png" width="90px" />Input By
                  Bendel</b-button
                >
                <b-modal id="bv-modal-example" hide-footer>
                  <template #modal-title> Cari Data Bendel </template>
                  <div class="d-block text-left">
                    <label>Masukkan Nomor Bendel(4 angka DISM)</label>
                    <input
                      type="text"
                      name="cari_data_dism"
                      v-model="search"
                      class="form-control mb-2"
                    />
                    <button
                      class="btn bt n-md btn-success"
                      v-on:click="cari_data_dism()"
                    >
                      Search
                    </button>
                    <div v-if="showWarning" class="alert alert-danger">
                      <strong>Peringatan!</strong> Bendel Tidak Ditemukan!!
                    </div>
                  </div>
                </b-modal>
              </div>
            </div>

            <b-button
              class="btn btn-block btn-success poppins-semibold shadow"
              style="
                height: 110px;
                font-size: 24px;
                display: flex;
                align-items: center;
                background-color: #f4538a;
                border: none;
              "
              v-on:click="getDetailPelanggann()"
              ><img src="../assets/riwayat.png" width="90px" />Riwayat
              Baca</b-button
            >
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div class="footer poppins-semibold">
        <p>
          © 2018 Perumda Air Minum Tirta Moedal Kota Semarang • dikembangkan
          oleh dinustek.
        </p>
        <h6>Pembaca Meter</h6>
      </div>
    </footer>
  </div>
</template>

<script>
import ChartComponent from "./ChartComponent.vue";
import LoadingComponent from "./LoadingComponents.vue";
export default {
  name: "DashboardComponent",
  components: {
    ChartComponent,
    LoadingComponent,
  },
  data() {
    return {
      UserRole: null,
      loading: true,
      showWarning: false,
      nm_petugas: "",
      kode: "",
      bars: [
        { variant: "success", value: "75" },
        { variant: "info", value: "124" },
      ],
      timer: null,
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Agustus",
          "September",
          "Oktober",
          "November",
          "Desember",
        ],
        datasets: [
          {
            label: "DATA METER",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgb(54, 162, 235)",
            data: [56, 78, 43, 60, 50, 98, 76, 77, 56, 87, 65, 43],
          },
        ],
      },
      chartOptions: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
      search: "",
    };
  },
  methods: {
    getfromLocalStorage() {
      this.nm_petugas = localStorage.getItem("nm_petugas");
      this.kode = localStorage.getItem("kode");
      this.UserRole = localStorage.getItem("role");
    },
    cari_data_nolangg() {
      const nolangg = this.search;
      const data = {
        nolangg: nolangg,
      };
      const headers = {
        Authorization: "bearer " + localStorage.getItem("token"),
      };
      const url = "http://localhost:8080/BackEnd/Backend-Laravel/public/api/pelanggan-check";
      this.$axios
        .post(url, data, { headers })
        .then((response) => {
          console.log(response.data);
          const kode = response.data.kode;
          if (kode === "1") {
            this.$router.push(`/editnolangg/${nolangg}`);
          } else if (kode === "0") {
            this.showWarning = true; 
            this.warningMessage = "Data Tidak Ditemukan atau Data Sudah Diedit!!";
            setTimeout(() => {
              this.showWarning = false;
            }, 3000);
          } else if (kode === "2") {
            this.showWarning = true;
            this.warningMessage = "Data Sudah ada!!";
            setTimeout(() => {
              this.showWarning = false;
            }, 3000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cari_data_dism() {
      const token = localStorage.getItem("token");
      const kode = localStorage.getItem("kode");
      const bendel = this.search.substring(0, 4);
      const data = {
        kode: kode,
        bendel: bendel,
      };
      const headers = {
        Authorization: "bearer " + token,
      };
      const url = "http://localhost:8080/BackEnd/Backend-Laravel/public/api/bendel-check";
      this.$axios
        .post(url, data, { headers })
        .then((response) => {
          console.log(response.data);
          const kode = response.data.kode;
          if (kode === "1") {
            this.$router.push({
              path: "/nolangg",
              query: { search: this.search },
            });
          } else if (kode === "0") {
            this.showWarning = true;
            setTimeout(() => {
              this.showWarning = false;
            }, 2500);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDetailPelanggann() {
      const kode = localStorage.getItem("kode");
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      const params = {
        petugas: kode,
        periode: "202403",
      };
      const url = `http://localhost:8080/BackEnd/Backend-Laravel/public/api/riwayat?petugas=${params.petugas}&periode=${params.periode}`;
      console.log(url);
      this.$axios
        .get(url, { headers })
        .then((response) => {
          this.pelanggan = response.data;
          console.log(response.data);
          this.$router.push({ name: "riwayat" });
        })
        .catch((error) => console.error("Error:", error));
    },
  },
  mounted() {
    this.getfromLocalStorage();
    this.timer = setInterval(() => {
      this.bars.forEach((bar) => (bar.value = 25 + Math.random() * 75));
    }, 2000);
    setTimeout(() => {
      this.loading = false; // Set loading to false after the data is loaded
    }, 2000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>

<style>
/* Tambahkan styling sesuai kebutuhan */
</style>
