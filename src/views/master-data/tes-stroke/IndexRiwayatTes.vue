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
                  <BtnDetailComponent Message="Lihat Detail" @click="lihat(data.idJadwalAntrian)" />
                </td>
              </tr>
            </tbody>
          </template>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import EmptyData from '@/components/empty-table/EmptyData.vue'
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue'
import BtnDetailComponent from '../../../components/partials-component/BtnDetailComponent.vue'
export default {
    data() {
        return {
            riwayat: [],
            isLoading: false
        };
    },
    created() {
        const userNames = ['Alvi', 'Ade', 'AdeAl', 'ViAlvi', 'AlviAd'];
        const currentDate = new Date();
        this.riwayat = userNames.map((nama, index) => ({
            konsumen: { nama },
            idJadwalAntrian: index + 1,
            tanggalTes: this.getFormattedDate(currentDate, index) // Add formatted date
        }));
    },
    methods: {
        getFormattedDate(currentDate, index) {
            const nextMonthDate = new Date(currentDate);
            nextMonthDate.setMonth(currentDate.getMonth() + index + 1);
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            return nextMonthDate.toLocaleDateString('id-ID', options);
        }
    },
    components: { 
        EmptyData,
        EmptyLoading,
        BtnDetailComponent 
    }
}

</script>
