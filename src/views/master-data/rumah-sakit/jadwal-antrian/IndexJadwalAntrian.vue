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
                            <th>No</th>
                            <th>Nama</th>
                            <th>Jadwal</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="antrian.length === 0">
                        <EmptyData Label="belum ada antrian pasien nihh" />
                    </tbody>
                    <template v-else>
                        <tbody v-for="(data, index) in antrian" :key="index">
                            <tr>
                                <td>
                                    {{ index + 1 }}
                                </td>
                                <td>
                                    {{ data.konsumen.user.nama }}
                                </td>
                                <td>
                                    {{ data.praktek.jadwal.tanggal }}
                                </td>
                                <td>
                                    <template v-if="data.status == 1">
                                        belum konsultasi
                                    </template>
                                </td>
                                <td>
                                    <ButtonComponent Message="ubah status"
                                        @click="ubahStatus(data.idJadwalAntrian)" />
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
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
export default {
    data() {
        return {
            antrian: [],
            isLoading: false
        }
    },
    created() {
        this.getAntrian()
    },
    methods: {
        getAntrian() {
            let type = "getData";
            let url = ["ahli/jadwal_antrian", {}];
            this.isLoading = true;
            this.$store.dispatch(type, url)
                .then((result) => {
                    this.antrian = result.data;
                    this.isLoading = false;
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        ubahStatus(idJadwalAntrian) {
            let type = "putData";
            let url = [`ahli/jadwal_antrian/${idJadwalAntrian}`, {}];
            this.$swal({
                icon: 'question',
                title: "Apakah sudah selesai melakukan konsultasi?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Ya, sudah",
                denyButtonText: "Belum nih"
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$store.dispatch(type, url)
                        .then(() => {
                            this.$swal({
                                icon: 'success',
                                title: 'berhasil melakukan konsultasi'
                            });
                            this.getAntrian();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            });
        }

    },
    components: {
        EmptyData, EmptyLoading, ButtonComponent
    }
}
</script>