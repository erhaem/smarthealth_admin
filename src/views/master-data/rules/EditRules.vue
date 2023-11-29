<template>
  <div>
    <div class="row">
      <div class="col-md-7 ">
        <div class="table-responsive shadow-lg p-3 mb-5 rounded">
          <table class="table table-hover border">
            <thead>
              <tr style="background-color: #4E73DF; color: aliceblue;">
                <th>NO</th>
                <th>GEJALA</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(diagnosaItem,index) in diagnosa"
                :key="diagnosaItem.id"
                style="cursor: pointer;"
              >
                <td>{{ index+1 }}</td>
                <td>
                  {{ diagnosaItem.nama }}
                </td>
                <td>
                  <button type="button" class="btn btn-primary btn-sm mx-2 mx-sm-2 mx-lg-2 mt-2">UPDATE</button>
                  <button type="button" class="btn btn-primary btn-sm mx-2 mx-sm-2 mx-lg-2 mt-2">DELETE</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="margin-top: -2rem; " class="mb-4">
          <button
            type="button"
            class="btn btn-primary btn-outline-dark btn-sm"
            style="color: white; box-shadow: 2px 2px black"
          >
            TAMBAH DATA
          </button>
        </div>
      </div>

      <div class="col-md-5">
        <div class="table-responsive shadow-lg p-3 mb-5 rounded">
          <table class="table table-hover border hover" style="color: black;">
            <thead>
              <tr style="background-color: #4E73DF; color: aliceblue;">
                <th>PENYAKIT</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="penyakit in penyakitList"
                :key="penyakit.id"
                style="cursor: pointer;"
              >
                <td>
                  {{ penyakit.nama }}
                </td>
                <td>
                  <button type="button" class="btn btn-primary btn-sm mx-2 mx-sm-2 mx-lg-2 mt-2">UPDATE</button>
                  <button type="button" class="btn btn-primary btn-sm mx-2 mx-sm-2 mx-lg-2 mt-2">DELETE</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="margin-top: -2rem;">
          <button
            type="button"
            class="btn btn-primary btn-outline-dark btn-sm"
            style="color: white; box-shadow: 2px 2px black"
          >
            TAMBAH DATA
          </button>
        </div>
      </div>
      </div>
  </div>
</template>

<style>
  .selected {
    background-color: #e0e0e0; /* Ganti dengan warna latar belakang yang Anda inginkan */
  }
</style>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        diagnosa: [],
        penyakitList: [],
      };
    },
    created() {
      this.fetchPenyakitData();
      this.fetchDiagnosaData(); // Fetch diagnosa data on component creation
    },
    methods: {
      async fetchPenyakitData() {
        try {
          const response = await axios.get('/penyakit');
          const data = response.data;
          this.penyakitList = data;
        } catch (error) {
          console.error('Error fetching penyakit data:', error);
        }
      },
      selectPenyakit(penyakitId) {
        this.selectedPenyakitId = penyakitId;
      },
      async fetchDiagnosaData() {
        try {
          const response = await axios.get('/diagnosa');
          const data = response.data;
          this.diagnosa = data;
        } catch (error) {
          console.error('Error fetching diagnosa data:', error);
        }
      },
      selectDiagnosa(diagnosaId) {
        this.selectedDiagnosaId = diagnosaId;
      },
    },
  };
</script>
