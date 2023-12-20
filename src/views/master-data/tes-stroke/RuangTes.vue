<template>
  <div class="bs-stepper">
    <div class="card shadow">
      <div class="card-header py-2">
        <div class="d-flex flex-column px-2 pb-3">
          <h6 class="mt-4 font-weight-bold text-primary">{{ $route.name }}</h6>

          <div class="d-flex m-2 p-4 pt-2 rounded" style="background-color: #d1f7f5">
            <div class="d-none d-flex flex-column col-6">
              <div class="bs-stepper-header" role="tablist">
                <div class="step" data-target="#part1">
                  <button
                    type="button"
                    class="step-trigger"
                    role="tab"
                    aria-controls="logins-part"
                    id="logins-part-trigger"
                  >
                    <span class="bs-stepper-circle">1</span>
                  </button>
                </div>
                <div class="line"></div>
                <div class="step" data-target="#part2">
                  <button
                    type="button"
                    class="step-trigger"
                    role="tab"
                    aria-controls="logins-part"
                    id="logins-part-trigger"
                  >
                    <span class="bs-stepper-circle">2</span>
                  </button>
                </div>
                <div class="line"></div>
                <div class="step" data-target="#part3">
                  <button
                    type="button"
                    class="step-trigger"
                    role="tab"
                    aria-controls="logins-part"
                    id="logins-part-trigger"
                  >
                    <span class="bs-stepper-circle">3</span>
                  </button>
                </div>
              </div>
              <h6 class="fw-bold text-primary-emphasis mt-2">
                {{ stepTitles[currentStep - 1].subtittle }}
              </h6>
            </div>

            <div class="d-none d-flex flex-column col-6 ms-3 ps-5 pt-4">
              <template v-if="infoAntrean && infoAntrean.userKonsumen">
                <h6 class="fw-bold text-primary-emphasis pb-2">
                  Nama pasien: {{ infoAntrean.userKonsumen.nama }}
                </h6>
                <h6 class="fw-bold text-primary-emphasis pt-1">
                  Kedatangan: {{ getFormattedDate(infoAntrean.createdAt) }}
                </h6>
              </template>
              <template v-else>
                <p>Loading...</p>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="card-body fw-bold text-primary-emphasis">
        <div class="bs-stepper-content ps-5 pt-3">
          <div
            id="part1"
            ref="part1"
            class="content"
            role="tabpanel"
            aria-labelledby="logins-part-trigger"
            v-show="isCurrentStep(1)"
          >
            <div class="form-group d-grid gap-3">
              <label for="Jenis Kelamin">Apa Jenis Kelamin Pasien?</label>
              <BtnOptionComponent
                :value="formData.jenisKelamin"
                @update:value="formData.jenisKelamin = $event"
                Option1="Perempuan"
                Option2="Laki-Laki"
                :uniqueId="'1'"
              />

              <label for="Usia">Berapa Usia Pasien?</label>
              <select v-model="formData.rentangUsia" class="form-select form-select-lg w-50">
                <option disabled>Rentang Usia</option>
                <option value="1">55 tahun atau kurang</option>
                <option value="2">lebih dari 55 tahun</option>
              </select>
            </div>
          </div>
          <div
            id="part2"
            ref="part2"
            class="content"
            role="tabpanel"
            aria-labelledby="logins-part-trigger"
            v-show="isCurrentStep(2)"
          >
            <div class="d-flex flex-column">
              <div class="form-group d-grid gap-3">
                <label for="Hipertensi">{{ question[0].q1 }}</label>
                <BtnOptionComponent
                  :value="formData.isHipertensi"
                  @update:value="formData.isHipertensi = $event"
                  :uniqueId="2"
                />
                <label for="Kolesterol">{{ question[1].q2 }}</label>
                <select v-model="formData.rangeKadarLdl" class="form-select form-select-lg w-25">
                  <option disabled>Kadar LDL</option>
                  <option value="90">&lt;= 90 mg/dL</option>
                  <option value="100-129">100-129 mg/dL</option>
                  <option value="130-159">130-159 mg/dL</option>
                  <option value="160-189">160-189 mg/dL</option>
                  <option value="190">&gt;= 190 mg/dL</option>
                </select>
                <!-- <p>
                  {{ formData.jenisKelamin }} {{ formData.isHipertensi }} {{ formData.kadarLdl }}
                </p> -->
                <label for="vertigo">{{ question[2].q3 }}</label>
                <BtnOptionComponent
                  :value="formData.isVertigo"
                  @update:value="formData.isVertigo = $event"
                  :uniqueId="3"
                />
                <label for="kelumpuhan">{{ question[3].q4 }}</label>
                <BtnOptionComponent
                  :value="formData.isKelumpuhanParsial"
                  @update:value="formData.isKelumpuhanParsial = $event"
                  :uniqueId="4"
                />
                <label for="bicara">{{ question[4].q5 }}</label>
                <BtnOptionComponent
                  :value="formData.isKesulitanBicara"
                  @update:value="formData.isKesulitanBicara = $event"
                  :uniqueId="5"
                />
              </div>
            </div>
          </div>
          <div
            id="part3"
            ref="part3"
            class="content"
            role="tabpanel"
            aria-labelledby="logins-part-trigger"
            v-show="isCurrentStep(3)"
          >
            <div v-if="resultTest !== null" class="d-flex flex-column">
              <h3 class="fw-bold text-primary-emphasis mx-auto">Tingkat Risiko</h3>
              <div
                class="progress mx-auto w-50"
                role="progressbar"
                :aria-valuenow="resultTest.persentaseTotal"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  :class="
                    'progress-bar text-bg-' +
                    (parseInt(resultTest.persentaseTotal) > 75
                      ? 'danger'
                      : parseInt(resultTest.persentaseTotal) > 50
                      ? 'warning'
                      : 'success')
                  "
                  :style="{ width: resultTest.persentaseTotal + '%' }"
                >
                  {{ resultTest.persentaseTotal }}%
                </div>
              </div>
              <!-- <p class="fw-light mx-auto mt-2">Level Risiko Perempuan, >40 Tahun</p> -->
              <h5 class="fw-bold text-primary-emphasis">Detail Info Angka Risiko</h5>
              <div class="d-flex flex-row gap-5">
                <span class="fw-normal mb-2">
                  <i class="icon text-success fa-solid fa-circle fa-lg"></i> 0-50 - Risiko Rendah
                </span>
                <span class="fw-normal mb-2">
                  <i class="icon text-warning fa-solid fa-circle fa-lg"></i> 51-75 - Risiko Warning
                </span>
                <span class="fw-normal mb-2">
                  <i class="icon text-danger fa-solid fa-circle fa-lg"></i> 75-100 - Risiko Danger
                </span>
              </div>

              <h5 class="fw-bold text-primary-emphasis">Ringkasan Seputar Tes</h5>
              <div class="d-grid gap-2 mb-2">
                <div class="d-flex flex-column rounded bg-secondary-subtle px-5 py-2">
                  <p>{{ question[0].q1 }}</p>
                  <p class="fw-normal">{{ formData.isHipertensi ? 'Ya' : 'Tidak' }}</p>
                </div>
                <div class="d-flex flex-column rounded bg-secondary-subtle px-5 py-2">
                  <p>{{ question[1].q2 }}</p>
                  <p class="fw-normal">{{ formData.rangeKadarLdl }}</p>
                </div>
                <div class="d-flex flex-column rounded bg-secondary-subtle px-5 py-2">
                  <p>{{ question[2].q3 }}</p>
                  <p class="fw-normal">{{ formData.isVertigo ? 'Ya' : 'Tidak' }}</p>
                </div>
                <div class="d-flex flex-column rounded bg-secondary-subtle px-5 py-2">
                  <p>{{ question[3].q4 }}</p>
                  <p class="fw-normal">{{ formData.isKelumpuhanParsial ? 'Ya' : 'Tidak' }}</p>
                </div>
                <div class="d-flex flex-column rounded bg-secondary-subtle px-5 py-2">
                  <p>{{ question[4].q5 }}</p>
                  <p class="fw-normal">
                    {{ formData.isKesulitanBicara ? 'Ya' : 'Tidak' }}
                  </p>
                </div>
              </div>
              <h5 class="fw-bold text-primary-emphasis">Berikan Anjuran Untuk Pasien</h5>
              <textarea
                name="anjuran"
                id="comment"
                cols="auto"
                rows="2"
                v-model="pesanDokter"
                class="p-3 rounded"
                placeholder="Tuliskan rekomendasi penanganan/pencegahan medis...."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer mt-5">
        <div class="d-grid">
          <button
            class="btn btn-primary btn-lg btn-block col-11 mx-auto"
            @click="getNext"
            type="button"
          >
            {{ getButtonLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Stepper from 'bs-stepper'
import BtnOptionComponent from '@/components/partials-component/BtnOptionComponent.vue'
export default {
  data() {
    return {
      pesanDokter: null,
      resultTest: null,
      infoAntrean: null,
      formData: {
        jenisKelamin: null,
        isHipertensi: false,
        rangeKadarLdl: 0, // kalo yg ini range
        isVertigo: false,
        isKelumpuhanParsial: false,
        isKesulitanBicara: false
      },
      currentStep: 1,
      stepper: null,
      stepTitles: [
        { subtittle: 'Informasi Umum Pasien' },
        { subtittle: 'Sesi Tes Risiko Stroke' },
        { subtittle: 'Hasil Tes Risiko Stroke' }
      ],
      question: [
        { q1: 'Apakah pasien memiliki riwayat hipertensi ?' },
        {
          q2: 'Berapa tingkat kolesterol "jahat" Low Density Lipoprotein pasien (Berdasarkan hasil tes lab)?'
        },
        { q3: 'Apakah pasien memiliki gejala vertigo sentral (pusing berkeliling)?' },
        { q4: 'Apakah pasien memiliki gejala Kelumpuhan pada sebagian tubuh?' },
        { q5: 'Apakah pasien mengalami kesulitan dalam berbicara?' }
      ],

      riwayat: [],
      isLoading: false
    }
  },
  created() {
    this.getInfoCurrentAntrean()
  },
  computed: {
    isCurrentStep() {
      return (step) => this.currentStep === step
    },
    getButtonLabel() {
      switch (this.currentStep) {
        case 1:
          return 'Lanjutkan Tes'
        case 2:
          return 'Lihat Hasil Tes'
        // case 3:
        //   return 'Kirimkan Hasil Tes'
        default:
          return 'Kirimkan Hasil Tes'
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.stepper = new Stepper(document.querySelector('.bs-stepper'), {
        linear: true,
        animation: false,
        selectors: {
          steps: '.step',
          trigger: '.step-trigger',
          stepper: '.bs-stepper'
        }
      })
    })
  },
  methods: {
    changeStep(step) {
      this.currentStep = step
    },
    getInfoCurrentAntrean() {
      let type = 'getData'
      let url = [`list_antrean_test_stroke/${this.$route.params.antreanId}/antrean/info`, {}]

      this.$store
        .dispatch(type, url)
        .then((result) => {
          if (!result.success) {
            this.$swal({
              icon: 'error',
              title: 'Gagal mendapatkan list antrean',
              text: result.message
            })

            return false
          }

          this.infoAntrean = result.data
        })
        .catch(console.error)
    },

    prosesTest() {
      let type = 'postData'
      let url = ['proses_test_stroke', this.formData]

      this.$store
        .dispatch(type, url)
        .then((result) => {
          if (!result.success) {
            this.$swal({
              icon: 'error',
              title: 'Gagal memproses test risiko stroke',
              text: result.message
            })

            return false
          }

          this.resultTest = result.data

          console.log(this.resultTest)
        })
        .catch(console.error)
    },

    sendHasilTest() {
      const data = {
        ...this.resultTest,
        pesanDokter: this.pesanDokter,
        idUserKonsumen: this.infoAntrean.userKonsumen.id,
        idUserDokter: this.infoAntrean.userDokter.id,
        noUrutAntrean: this.infoAntrean.noUrut
      }

      let type = 'postData'
      let url = ['add_riwayat_test_stroke', data]

      this.$store
        .dispatch(type, url)
        .then((result) => {
          if (!result.success) {
            this.$swal({
              icon: 'error',
              title: 'Gagal mengirim hasil test risiko stroke',
              text: result.message
            })

            return false
          }

          this.$swal({
            icon: 'success',
            title: 'Berhasil mengirim hasil test risiko stroke'
            // text: result.message
          })
        })
        .catch(console.error)
    },

    getNext() {
      console.log('refs: ', this.$refs)

      if (this.currentStep == 2) {
        this.prosesTest()
      }

      if (this.currentStep == 3) {
        this.sendHasilTest()
        return
      }

      this.stepper.next()
      this.currentStep++

      this.$nextTick(() => {
        for (let i = 1; i <= 3; i++) {
          const contentRef = this.$refs[`part${i}`]
          if (contentRef) {
            contentRef.style.display = this.isCurrentStep(i) ? 'block' : 'none'
          }
        }
      })
    },
    getFormattedDate(currentDate) {
      const nextMonthDate = new Date(currentDate)
      // nextMonthDate.setMonth(currentDate.getMonth() + index + 1)
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
      return nextMonthDate.toLocaleDateString('id-ID', options)
    }
  },
  components: {
    BtnOptionComponent
  }
}
</script>
