<template>
  <div class="card shadow">
    <div class="card-header py-3">
      <div class="d-flex justify-content-between">
        <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-bordered" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Pasien</th>
              <th>Tanggal Tes</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody v-if="isLoading">
            <EmptyLoading />
          </tbody>
          <tbody v-else-if="riwayat.length === 0">
            <EmptyData Label="belum ada antrian pasien nihh" />
          </tbody>
          <template v-else>
            <tbody v-for="(data, index) in riwayat" :key="index">
              <tr>
                <td>
                  {{ index + 1 }}
                </td>
                <td>
                  {{ data.konsumen.nama }}
                </td>
                <td>
                  {{ data.tanggalTes }}
                </td>
                <td>
                  <BtnDetailComponent
                    Message="Lihat Detail"
                    data-bs-toggle="modal"
                    data-bs-target="#dataRiwayat"
                  />
                </td>
              </tr>
            </tbody>
          </template>
        </table>
      </div>
    </div>
  </div>

  <ModalComponent :isScrollable="true" id="dataRiwayat" :modalTitle="'Detail ' + $route.name">
    <template #modal>
      <div class="d-flex rounded pt-3 text-dark" style="background-color: #effcfc">
        <ul class="fw-bold" style="list-style-type: none">
          <li>ID Rekam Medis:</li>
          <li>Nama Pasien:</li>
          <li>Waktu Tes:</li>
        </ul>
      </div>
      <div class="ms-4">
        <p class="fw-bold text-dark mt-2">Hasil Tes:</p>
        <div class="d-flex flex-row gap-5">
          <h1><span class="badge bg-primary rounded-circle">70</span></h1>

          <h4 class="text-primary-emphasis mt-3">Risiko Tinggi</h4>
        </div>
        <h6 class="fw-normal">Level Risiko Perempuan, >40 Tahun</h6>
        <p class="fw-bold text-dark mt-2">Anjuran:</p>
        <ul>
          <li>Cobalah untuk minum air putih 1 galon</li>
          <li>Cobalah untuk minum air putih 1 galon</li>
          <li>Cobalah untuk minum air putih 1 galon</li>
        </ul>
        <h5 class="fw-bold text-primary-emphasis">Ringkasan Seputar Tes</h5>
        <div class="d-grid gap-2 mb-1">
          <div class="d-flex flex-column rounded bg-secondary-subtle px-3 py-2">
            <p>{{ question[0].q1 }}</p>
            <p class="fw-normal">Yes - <b>Score %</b></p>
          </div>  
          <div class="d-flex flex-column rounded bg-secondary-subtle px-3 py-2">
            <p>{{ question[1].q2 }}</p>
            <p class="fw-normal">Yes - <b>Score %</b></p>
          </div>
          <div class="d-flex flex-column rounded bg-secondary-subtle px-3 py-2">
            <p>{{ question[2].q3 }}</p>
            <p class="fw-normal">Yes - <b>Score %</b></p>
          </div>
          <div class="d-flex flex-column rounded bg-secondary-subtle px-3 py-2">
            <p>{{ question[3].q4 }}</p>
            <p class="fw-normal">Yes - <b>Score %</b></p>
          </div>
          <div class="d-flex flex-column rounded bg-secondary-subtle px-3 py-2">
            <p>{{ question[4].q5 }}</p>
            <p class="fw-normal">Yes - <b>Score %</b></p>
          </div>
        </div>
      </div>
    </template>
  </ModalComponent>
</template>
<script>
import EmptyData from '@/components/empty-table/EmptyData.vue'
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue'
import BtnDetailComponent from '../../../components/partials-component/BtnDetailComponent.vue'
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
export default {
  data() {
    return {
      riwayat: [],
      isLoading: false,
      question: [
        { q1: 'Apakah pasien memiliki riwayat hipertensi ?'},
        { q2: 'Berapa tingkat kolesterol “jahat” Low Density Lipoprotein pasien (Berdasarkan hasil tes lab)?'},
        { q3: 'Apakah pasien memiliki gejala vertigo sentral (pusing berkeliling)?'},
        { q4: 'Apakah pasien memiliki gejala Kelumpuhan pada sebagian tubuh?'},
        { q5: 'Apakah pasien mengalami kesulitan dalam berbicara?'}

      ],
    }
  },
  created() {
    const userNames = ['Alvi', 'Ade', 'AdeAl', 'ViAlvi', 'AlviAd']
    const currentDate = new Date()
    this.riwayat = userNames.map((nama, index) => ({
      konsumen: { nama },
      idJadwalAntrian: index + 1,
      tanggalTes: this.getFormattedDate(currentDate, index) // Add formatted date
    }))
  },
  methods: {
    getFormattedDate(currentDate, index) {
      const nextMonthDate = new Date(currentDate)
      nextMonthDate.setMonth(currentDate.getMonth() + index + 1)
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
      return nextMonthDate.toLocaleDateString('id-ID', options)
    }
  },
  components: {
    EmptyData,
    EmptyLoading,
    BtnDetailComponent,
    ModalComponent
  }
}
</script>
