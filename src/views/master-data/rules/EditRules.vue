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
  <tr v-for="(gejalaItem, index) in gejala" :key="gejalaItem.id" style="cursor: pointer;">
    <td>{{ index + 1 }}</td>
    <td>{{ gejalaItem.nama }}</td>
    <td>
      <button type="button" class="btn btn-primary btn-sm" @click="confirmDelete(gejalaItem.id)">DELETE</button>
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
            data-toggle="modal" data-target="#gejala" data-whatever="@mdo"
          >
            Tambah Data Gejala
          </button>
        </div>
      </div>

      <div class="col-md-5">
        <div class="table-responsive shadow-lg p-3 mb-5 rounded">
          <table class="table table-hover border hover" style="color: black;">
            <thead>
              <tr style="background-color: #4E73DF; color: aliceblue;">
                <th>NO</th>
                <th>PENYAKIT</th>
                <th>PENYEBAB</th>
                <th>ACTION</th>
              </tr>
            </thead>
                        <tbody>
              <tr
                v-for="(penyakit, index) in penyakitList"
                :key="penyakit.id"
                style="cursor: pointer;"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ penyakit.nama }}</td>
                <td>{{ penyakit.penyebab }}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="confirmDeletePenyakit(penyakit.id)"
                  >
                    DELETE
                  </button>
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
            data-toggle="modal" data-target="#penyakit" data-whatever="@mdo"
          >
            Tambah Data Penyakit
          </button>
        </div>
      </div>
      </div>

      <div class="modal fade" id="gejala" tabindex="-1" role="dialog" aria-labelledby="gejalaLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="gejalaLabel">Tambah Gejala</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="submitGejala">
            <div class="modal-body">
              <div class="form-group">
                <label for="nama" class="col-form-label">Nama Gejala</label>
                <input v-model="newGejala.nama" name="nama" type="text" class="form-control" id="nama" placeholder="Nama Gejala" required>
              </div>
              <div class="form-group">
                <label for="kode" class="col-form-label">Kode Gejala</label>
                <input v-model="newGejala.kode" name="kode" type="text" class="form-control" id="kode" placeholder="Kode Gejala" required>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Kirim</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal fade" id="penyakit" tabindex="-1" role="dialog" aria-labelledby="penyakitLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="penyakitLabel">Tambah penyakit</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="submitPenyakit">
            <div class="modal-body">
              <div class="form-group">
                <label for="kode" class="col-form-label">Kode</label>
                <input v-model="newpenyakit.kode" name="kode" type="text" class="form-control" id="kode" placeholder="kode penyakit" required>
              </div>
              <div class="form-group">
                <label for="nama" class="col-form-label">Nama Penyakit</label>
                <input v-model="newpenyakit.nama" name="nama" type="text" class="form-control" id="nama" placeholder="nama penyakit" required>
              </div>
              <div class="form-group">
                <label for="penyebab" class="col-form-label">Penyebab</label>
                <input v-model="newpenyakit.penyebab" name="penyebab" type="text" class="form-control" id="penyebab" placeholder="penyebab penyakit" required>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Kirim</button>
            </div>
          </form>
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
      gejala: [],
      penyakitList: [],
      newGejala: {
        nama: '',
        kode: ''
      },
      newpenyakit: {
        kode: '',
        nama: '',
        penyakit:''
      },
    };
  },
  created() {
    this.fetchPenyakitData();
    this.fetchgejalaData();
  },
  methods: {
    async fetchPenyakitData() {
      try {
        const response = await axios.get('/penyakit');
        this.penyakitList = response.data;
      } catch (error) {
        console.error('Error fetching penyakit data:', error);
      }
    },
    async fetchgejalaData() {
      try {
        const response = await axios.get('/gejala');
        this.gejala = response.data;
      } catch (error) {
        console.error('Error fetching gejala data:', error);
      }
    },
    async submitGejala() {
      try {
        const response = await axios.post('/gejala', this.newGejala);
        console.log(response.data.success);

        this.newGejala = { nama: '', kode: '' };


        this.fetchgejalaData();


        $('#gejala').modal('hide');
      } catch (error) {
        console.error('Error submitting gejala data:', error);
      }
    },

            async submitPenyakit() {
          try {
            const response = await axios.post('/penyakit', this.newpenyakit);
            console.log(response.data.success);

            this.newpenyakit = { kode: '', nama: '', penyebab: '' };

            // Fix the method name here
            this.fetchPenyakitData();

            $('#penyakit').modal('hide');
          } catch (error) {
            console.error('Error submitting penyakit data:', error);
          }
        },  
    confirmDelete(gejalaId) {
    const shouldDelete = window.confirm("apakah anda ingin delete data berikut ?");
    if (shouldDelete) {
      this.deleteGejala(gejalaId);
    }
  },

  async deleteGejala(gejalaId) {
    try {
      const response = await axios.delete(`/gejala/${gejalaId}`);
      console.log(response.data.message);

      this.gejala = this.gejala.filter(item => item.id !== gejalaId);
    } catch (error) {
      console.error('Error deleting gejala:', error);
    }
  },
  confirmDeletePenyakit(penyakitId) {
      const shouldDelete = window.confirm("Apakah Anda ingin menghapus data?");
      if (shouldDelete) {
        this.deletePenyakit(penyakitId);
      }
    },
    async deletePenyakit(penyakitId) {
      try {
        const response = await axios.delete(`/penyakit/${penyakitId}`);
        console.log(response.data.message);

        // Filter the deleted penyakit by id
        this.penyakitList = this.penyakitList.filter(
          (penyakit) => penyakit.id !== penyakitId
        );
      } catch (error) {
        console.error("Error deleting penyakit:", error);
      }
    },
  },
};
</script>


