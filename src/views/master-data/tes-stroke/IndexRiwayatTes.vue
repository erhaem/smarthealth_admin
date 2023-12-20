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
              <th>No.</th>
              <th>Nama Pasien</th>
              <th>Tanggal Tes</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody v-if="isLoading">
            <EmptyLoading />
          </tbody>
          <tbody v-else-if="dataRiwayat === null || dataRiwayat.length === 0">
            <EmptyData Label="Belum ada riwayat test stroke" />
          </tbody>
          <template v-else>
            <tbody v-for="(data, index) in dataRiwayat" :key="index">
              <tr>
                <td>
                  {{ index + 1 }}
                </td>
                <td>
                  {{ data.userKonsumen.nama }}
                </td>
                <td>
                  {{ getFormattedDate(data.createdAt) }}
                </td>
                <td>
                  <BtnDetailComponent
                    Message="Lihat Detail"
                    data-bs-toggle="modal"
                    data-bs-target="#dataRiwayat"
                    @click="selectedData = data"
                  />
                </td>
              </tr>
            </tbody>
          </template>
        </table>
      </div>
    </div>
  </div>

  <ModalComponent
    v-if="selectedData !== null"
    :isScrollable="true"
    id="dataRiwayat"
    :modalTitle="'Detail ' + $route.name"
  >
    <template #modal>
      <div class="d-flex rounded pt-3 text-dark" style="background-color: #effcfc">
        <ul class="fw-bold" style="list-style-type: none">
          <li>ID Rekam Medis: {{ this.selectedData.id }}</li>
          <li>Nama Pasien: {{ this.selectedData.userKonsumen.nama }}</li>
          <li>Waktu Tes: {{ getFormattedDate(this.selectedData.createdAt) }}</li>
        </ul>
      </div>
      <div class="ms-4">
        <p class="fw-bold text-dark mt-2">Hasil Tes:</p>
        <div class="d-flex flex-row gap-5">
          <h1>
            <span
              :class="
                'badge bg-' + getLabelClass(this.selectedData.persentaseTotal) + ' rounded-circle'
              "
              >{{ this.selectedData.persentaseTotal }}</span
            >
          </h1>

          <h4
            :class="'text-' + getLabelClass(this.selectedData.persentaseTotal) + '-emphasis mt-3'"
          >
            {{ this.selectedData.label }}
          </h4>
        </div>
        <!-- <h6 class="fw-normal">Level Risiko Perempuan, >40 Tahun</h6> -->
        <p class="fw-bold text-dark mt-2">Pesan Dokter:</p>
        <p>{{ this.selectedData.pesanDokter }}</p>
        <h5 class="fw-bold text-primary-emphasis">Ringkasan Seputar Tes</h5>
        <div class="d-grid gap-2 mb-1">
          <div class="d-flex flex-column rounded bg-secondary-subtle px-3 py-2">
            <p>{{ question[0].q1 }}</p>
            <p class="fw-normal">{{ this.selectedData.isHipertensi === 1 ? 'Ya' : 'Tidak' }}</p>
          </div>
          <div class="d-flex flex-column rounded bg-secondary-subtle px-3 py-2">
            <p>{{ question[1].q2 }}</p>
            <p class="fw-normal">{{ this.selectedData.rangeKadarLdl }}</p>
          </div>
          <div class="d-flex flex-column rounded bg-secondary-subtle px-3 py-2">
            <p>{{ question[2].q3 }}</p>
            <p class="fw-normal">{{ this.selectedData.isVertigo === 1 ? 'Ya' : 'Tidak' }}</p>
          </div>
          <div class="d-flex flex-column rounded bg-secondary-subtle px-3 py-2">
            <p>{{ question[3].q4 }}</p>
            <p class="fw-normal">
              {{ this.selectedData.isKelumpuhanParsial === 1 ? 'Ya' : 'Tidak' }}
            </p>
          </div>
          <div class="d-flex flex-column rounded bg-secondary-subtle px-3 py-2">
            <p>{{ question[4].q5 }}</p>
            <p class="fw-normal">
              {{ this.selectedData.isKesulitanBicara === 1 ? 'Ya' : 'Tidak' }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </ModalComponent>
</template>
<script>
import Cookies from 'js-cookie'
import EmptyData from '@/components/empty-table/EmptyData.vue'
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue'
import BtnDetailComponent from '../../../components/partials-component/BtnDetailComponent.vue'
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
export default {
  data() {
    return {
      selectedData: null,
      dataRiwayat: null,
      isLoading: false,
      question: [
        { q1: 'Apakah pasien memiliki riwayat hipertensi ?' },
        {
          q2: 'Berapa tingkat kolesterol “jahat” Low Density Lipoprotein pasien (Berdasarkan hasil tes lab)?'
        },
        { q3: 'Apakah pasien memiliki gejala vertigo sentral (pusing berkeliling)?' },
        { q4: 'Apakah pasien memiliki gejala Kelumpuhan pada sebagian tubuh?' },
        { q5: 'Apakah pasien mengalami kesulitan dalam berbicara?' }
      ]
    }
  },

  mounted() {
    this.listRiwayatTestByDokter()
  },
  created() {
    // this.listRiwayatTestByDokter()
  },
  methods: {
    listRiwayatTestByDokter() {
      const currentDokter = JSON.parse(Cookies.get('user')).data

      let type = 'getData'
      let url = [`list_riwayat_test_stroke/${currentDokter.getDokter.userId}/dokter`, {}]

      this.$store
        .dispatch(type, url)
        .then((result) => {
          if (!result.success) {
            this.$swal({
              icon: 'error',
              title: 'Gagal mendapatkan list riwayat test stroke',
              text: result.message
            })

            return false
          }

          this.dataRiwayat = result.data
        })
        .catch(console.error)
    },

    getFormattedDate(currentDate) {
      const nextMonthDate = new Date(currentDate)
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false // Use 24-hour format
      }

      return nextMonthDate.toLocaleDateString('id-ID', options).replace(/\./g, ':')
    },

    getLabelClass(persentase) {
      const persentaseTotal = parseInt(persentase)

      if (persentaseTotal > 75) {
        return 'danger'
      } else if (persentaseTotal > 50) {
        return 'warning'
      }

      return 'primary'
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
