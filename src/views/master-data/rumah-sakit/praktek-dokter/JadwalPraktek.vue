<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <div class="d-flex justify-content-start">
                    <!-- <div v-if="$can('action', 'Rumah Sakit')">
                        <router-link to="/master/rumah_sakit/create">
                            <ButtonComponent Message="Tambah Data" Icon="fa-plus" />
                        </router-link>
                        <div v-if="selectedId.length === 0"></div>
                        <ButtonComponent v-else-if="selectedId" Icon="fa-trash" Color="btn-danger" Message="hapus" @click="deleteRumahSakit" />
                    </div> -->
                    <!-- <ButtonComponent Message="Download Rekap RS" Icon="fa-download"/> -->
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>no</th>
                            <th>Nama</th>
                            <th>Biaya Praktek</th>
                            <th>Tanggal</th>
                            <th>Jam</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="jadwalPraktek.length == 0">
                        <EmptyData />
                    </tbody>
                    <template v-else>
                        <tbody v-for="(data, index) in jadwalPraktek" :key="index">
                            <tr>
                                <td>
                                    {{ index + 1 }}
                                </td>
                                <td>{{ data.praktek.dokter }}</td>
                                <td>{{ data.praktek.biaya }}</td>
                                <td>{{ data.tanggal }}</td>
                                <td>{{ data.mulaiJam }} s/d {{ data.selesaiJam }}</td>
                            </tr>
                        </tbody>
                    </template>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            jadwalPraktek: [],
            isLoading: false
        }
    },
    created(){
        this.getJadwalPraktek()
    },
    methods: {
        getJadwalPraktek(){
            let type = "getData"
            let url = [
                "master/ahli/jadwal_praktek/" + this.$route.params.idPraktek, {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result)=>{
                this.jadwalPraktek = result.data
                this.isLoading = false
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
}
</script>