<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <div class="d-flex justify-content-start">
                    <div v-if="$can('create', 'Rumah Sakit')">
                        <router-link to="/master/rumah_sakit/create">
                            <ButtonComponent Message="Tambah Data +" />
                        </router-link>
                        <div v-if="selectedId.length === 0"></div>
                        <ButtonComponent v-else-if="selectedId" Color="btn-danger" Message="hapus" @click="deleteRumahSakit" />
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th v-if="$can('create', 'Rumah Sakit')">Pilih</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Pemilik</th>
                            <th v-if="$can('create', 'Rumah Sakit')">Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="rumahSakit.length == 0">
                        <EmptyData />
                    </tbody>
                    <template v-else>
                        <tbody v-for="data in rumahSakit" :key="index">
                            <tr>
                                <td v-if="$can('create', 'Rumah Sakit')">
                                    <input type="checkbox" v-model="selectedId" :value="data.idRumahSakit">
                                </td>
                                <td>{{ data.namaRs }}</td>
                                <td>{{ data.alamatRs }}</td>
                                <td>{{ data.pemilik }}</td>
                                <td v-if="$can('create', 'Rumah Sakit')">
                                    <div class="d-flex">
                                        <router-link :to="'rumah_sakit/' + data.idRumahSakit + '/edit'">
                                            <ButtonComponent Message="edit" Color="btn-warning" />
                                        </router-link>
                                        <router-link :to="'rumah_sakit/' + 'spesialis/' + data.idRumahSakit">
                                        <ButtonComponent Color="btn-success" Message="tambah spesialis"/> 
                                        </router-link>
                                    </div>
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
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import InputField from '../../../components/partials-component/InputField.vue'
import EmptyLoading from '../../../components/empty-table/EmptyLoading.vue'
import EmptyData from '../../../components/empty-table/EmptyData.vue'
import iziToast from 'izitoast'
import Cookies from 'js-cookie'
export default {
    data() {
        return {
            rumahSakit: [],
            isLoading: false,
            selectedId: []
        };
    },
    created() {
        this.getRumahSakit();
    },
    methods: {
        getRumahSakit() {
            const parsing = JSON.parse(Cookies.get('user'));
            const userId = parsing.data.id;
            const cekRole = parsing.data.getRole.idRole;
            const type = "getData";
            let url = null;
            if(cekRole === "RO-2003061"){
                url = [
                    "master/rumah_sakit/data", {}
                ]
            } else if (cekRole === "RO-2003066"){
                url = [`master/rumah_sakit/data/${userId}`, {}];
            }
            this.isLoading = true;
            this.$store.dispatch(type, url)
                .then((result) => {
                    this.rumahSakit = result.data;
                    this.isLoading = false;
                    console.log(result.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        deleteRumahSakit() {
            if (this.rumahSakit.length === 0){
                return;
            }
            let type = "deleteData"
            let urls = this.rumahSakit.map((idRumahSakit)=> ["master/rumah_sakit/data", idRumahSakit]) 
            this.$swal({
                icon: 'question',
                title: 'Apakah kamu ingin menghapus data?',
                showDenyButton: true,
                confirmButtonText: false,
                confirmButtonText: 'Ya, hapus',
                denyButtonText: 'jangan hapus'
            }).then((result)=>{
                if(result.isConfirmed){
                    Promise.all(urls.map((url)=>this.$store.dispatch(type, url)))
                    this.$swal({
                        icon: 'success',
                        text: 'data berhasil dihapus'
                    })
                this.getRumahSakit()
                }
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    components: {
        ButtonComponent,
        InputField,
        EmptyLoading,
        EmptyData
    }
}
</script>