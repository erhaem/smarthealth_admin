<template>
  <div class="card shadow mb-4">
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
              <th>No. Urut</th>
              <th>Nama Pasien</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody v-if="isLoading">
            <EmptyLoading />
          </tbody>
          <tbody v-else-if="antrian.length === 0">
            <EmptyData Label="Saat ini belum ada antrean untuk Anda" />
          </tbody>
          <template v-else>
            <tbody v-for="(data, index) in antrian" :key="index">
              <tr>
                <td>
                  {{ data.noUrut }}
                </td>
                <td>
                  {{ data.userKonsumen.nama }}
                </td>
                <td>
                  <router-link
                    :to="{ name: 'Ruang Tes Risiko Stroke', params: { antreanId: data.id } }"
                  >
                    <BtnKajiComponent Message="Kaji Pasien" />
                  </router-link>
                </td>
              </tr>
            </tbody>
          </template>
        </table>
      </div>
    </div>
  </div>
  <ModalComponent id="detail">
    <template #modal>
      <img :src="convert(qr.qrCode)" alt="" />
    </template>
  </ModalComponent>
</template>

<script>
import Cookies from 'js-cookie'
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
import EmptyData from '@/components/empty-table/EmptyData.vue'
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue'
import BtnKajiComponent from '../../../components/partials-component/BtnKajiComponent.vue'
export default {
  data() {
    return {
      antrian: [],
      riwayat: [],
      isLoading: false,
      qr: {},
      currentUser: {}
    }
  },
  created() {
    // this.getRiwayat()
    // this.getInfoCurrentUser()
    this.listAntrean()
    // const userNames = ['Alvi', 'Ade', 'AdeAl', 'ViAlvi', 'AlviAd']
    // this.antrian = userNames.map((nama, index) => ({
    //   konsumen: { user: { nama } },
    //   idJadwalAntrian: index + 1 // You can add other properties as needed
    // }))
  },
  methods: {
    listAntrean() {
      /**
       * 07/12/23
       * Call me insane,
       * I know it's probably a devil way to get current user info thru cookie
       * see that variable: currentDokter
       *
       * Think I lost my mind wtf, help
       * */
      const currentDokter = JSON.parse(Cookies.get('user')).data

      // console.log('list antrean dulu')
      let type = 'getData'
      let url = [`list_antrean_test_stroke/${currentDokter.getDokter.userId}/dokter`, {}]

      this.$store.dispatch(type, url).then((result) => {
        if (!result.success) {
          this.$swal({
            icon: 'error',
            title: 'Gagal mendapatkan list antrean',
            text: result.message
          })

          return false
        }

        this.antrian = result.data.filter((data) => data.sedangDiproses === 0)
        // console.log(result.data)
      })
    },

    lihat(idJadwalAntrian) {
      let type = 'getData'
      let url = [`qr/${idJadwalAntrian}`, {}]
      this.loadingQr = true
      this.$store
        .dispatch(type, url)
        .then((result) => {
          // this.antrian = result
          this.loadingQr = false
          this.qr = result
        })
        .catch((err) => {
          console.log(err)
        })
    },
    convert(svgCode) {
      return `data:image/svg+xml;base64,${btoa(svgCode)}`
    },
    getRiwayat() {
      let type = 'getData'
      let url = ['ahli/transaksi_buat_janji', {}]
      this.isLoading = true
      this.$store
        .dispatch(type, url)
        .then((result) => {
          this.isLoading = false
          this.riwayat = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  components: {
    EmptyData,
    EmptyLoading,
    ModalComponent,
    BtnKajiComponent
  }
}
</script>
