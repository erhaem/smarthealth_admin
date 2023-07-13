<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>no</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Email</th>
                            <th>Nomor Hp</th>
                            <th>Nomor STR</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <tr>
                            <td colspan="12" class="text-center">
                                <LoadingIndicator />
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else-if="dokter.length == 0">
                        <EmptyData />
                    </tbody>
                    <template v-else>
                        <tbody v-for="(data, index) in dokter" :key="index">
                            <tr>
                                <td>
                                    {{ index + 1 }}
                                </td>
                                <td>{{ data.userId.nama }}</td>
                                <td>{{ data.userId.alamat }}</td>
                                <td>{{ data.userId.nomorHp }}</td>
                                <td>{{ data.nomorStr }}</td>
                                <td>
                                    <router-link :to="'dokter/' + data.userId.id">
                                        <ButtonComponent Message="keahlian" Icon="fa-plus" Color="btn-primary" />
                                    </router-link>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <router-link :to="'dokter/' + data.userId.id">
                                            <ButtonComponent Message="Aktifkan akun" Color="btn-warning" />
                                        </router-link>
                                        <a :href="data.fileDokumen" class="btn btn-sm btn-icon-split me-2 rounded btn-info"
                                            target="_blank">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-eye"></i>
                                            </span>
                                            <span class="text">
                                                dokumen
                                            </span>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </table>
            </div>
        </div>
    </div>
    <!-- <div class="form-group">
        <select class="select-2 w-50 form-select" v-model="form.idUser" data-placeholder="-- Pilih Dokter --"
            @change="handleChange">
            <option value=""></option>
            <option :value="data.userId.id" v-for="data in dokter">{{ data.userId.nama }}</option>
        </select>
        <br>
        <br>
        <select class="select-2 w-50 form-select" v-model="form.idKeahlian" data-placeholder="-- Pilih Keahlian --">
            <option value=""></option>
            <option :value="data.idKeahlian" v-for="data in keahlian">{{ data.namaKeahlian }}</option>
        </select>
        <br>
        <br>
        <ButtonComponent @click="postKeahlianDokter" />
    </div> -->
</template>

<script>
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
import ActiveSlider from '@/components/partials-component/ActiveSlider.vue'
import LoadingIndicator from '@/components/partials-component/LoadingIndicator.vue';
import SpanSlider from '@/components/partials-component/SpanSlider.vue'
import EmptyData from '@/components/empty-table/EmptyData.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
export default {
    data() {
        return {
            dokter: [],
            status: 0,
            keahlian: [],
            form: {
                idUser: '',
                idKeahlian: ''
            },
            isLoading: false
        };
    },
    created() {
        this.getDokter(),
            this.getKeahlian()
    },
    mounted() {
        // $('.select-2').select2();

        // Listen to changes in Select2
        // $('.select-2').on('change', this.handleChange);
    },
    methods: {
        getDokter() {
            let type = "getData";
            let url = [
                "akun/dokter/data",
                {}
            ];
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.dokter = result.data;
                this.isLoading = false
            }).catch((err) => {
                console.log(err);
            });
        },
        getKeahlian() {
            let type = "getData";
            let url = [
                "master/keahlian",
                {}
            ];
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.keahlian = result.data;
                this.isLoading = false
            }).catch((err) => {
                console.log(err);
            });
        },
        handleChange() {
            
        },
        updateStatus(id_user, status) {
            if (status == 1) {
                status = 0;
            } else {
                status = 1;
            }
            let type = "updateData";
            let url = [
                "akun/active_account",
                id_user,
                {
                    status: status,
                }
            ];
            this.$store.dispatch(type, url).then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });
        },
        postKeahlianDokter() {
            let type = "postData"
            let url = [
                "master/ahli/keahlian/master", {
                    user_ahli_id: this.form.idUser,
                    keahlian_id: this.form.idKeahlian
                }, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: { ActiveSlider, SpanSlider, LoadingIndicator, EmptyData, ButtonComponent, ModalComponent },
}
</script>