<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <ButtonComponent Message="Tambah Data +" data-bs-toggle="modal" data-bs-target="#tambahData" />
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>ID Dokter Keahlian</th>
                            <th>Nama Dokter</th>
                            <th>Nama Keahlian</th>
                            <th class="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading/>
                    </tbody>
                    <tbody v-else-if="dokterKeahlian.length == 0">
                        <EmptyData/>
                    </tbody>
                    <template v-else>
                        <tbody v-for="data in dokterKeahlian" :key="index">
                            <tr>
                                <td>{{ data.idDokterKeahlian }}</td>
                                <td>{{ data.getDokter.nama }}</td>
                                <td>{{ data.getKeahlian.namaKeahlian }}</td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <router-link :to="'dokter_keahlian/' + data.idDokterKeahlian + '/edit'">
                                            <ButtonComponent Message="Edit" Color="btn-warning" />
                                        </router-link>
                                        <ButtonComponent @click="deleteKeahlian(data.idDokterKeahlian)" Color="btn-danger"
                                            Message="Hapus" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </table>
            </div>
        </div>
    </div>
    <ModalComponent id="tambahData" :modalTitle="'tambah ' + $route.name">
        <template #modal>
            <Form @submit="postKeahlian">
                <div class="mb-3">
                    <SelectOption v-model="form.dokter_id" Width="w-100" Label="Nama Dokter">
                        <template #option>
                            <option value="">pilih dokter</option>
                            <option :value="data.idDokter" v-for="data in dokter" :key="index">{{
                                data.userId.nama }}
                            </option>
                        </template>
                    </SelectOption>
                </div>
                <div class="mb-3">
                    <SelectOption v-model="form.keahlian_id" Width="w-100" Label="Nama Keahlian">
                        <template #option>
                            <option value="">pilih keahlian</option>
                            <option :value="data.idKeahlian" v-for="data in keahlianDokter" :key="index">{{
                                data.namaKeahlian }}
                            </option>
                        </template>
                    </SelectOption>
                </div>
                <div>
                    <ButtonComponent />
                </div>
            </Form>
        </template>
    </ModalComponent>
</template>

<script>
import SelectOption from '../../components/partials-component/SelectOption.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import iziToast from 'izitoast'
import { Form } from 'vee-validate'
import InputField from '@/components/partials-component/InputField.vue'
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
import EmptyLoading from '../../components/empty-table/EmptyLoading.vue';
import EmptyData from '../../components/empty-table/EmptyData.vue';
export default {
    data() {
        return {
            dokterKeahlian: [],
            keahlianDokter: [],
            dokter: [],
            form: {
                dokter_id: '',
                keahlian_id: ''
            },
            isLoading: false
        }
    },
    created() {
        this.getKeahlianDokter(),
            this.getDokter(),
            this.getKeahlian()
    },
    methods: {
        getKeahlian() {
            let type = "getData"
            let url = [
                "master/keahlian", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.keahlianDokter = result.data
                this.isLoading = false
            }).catch((err) => {
                console.log(err);
            })
        },
        getDokter() {
            let type = "getData";
            let url = [
                "akun/dokter",
                {}
            ];
            this.$store.dispatch(type, url).then((result) => {
                this.dokter = result.data
            }).catch((err) => {
                console.log(err);
            });
        },
        getKeahlianDokter() {
            let type = "getData"
            let url = [
                "master/dokter_keahlian", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.dokterKeahlian = result.data
                console.log(result.data);
            }).catch((err) => {
                console.log(err);
            })
        },
        goBack() {
            window.location = '/dokter/dokter_keahlian'
        },
        deleteKeahlian(idDokterKeahlian) {
            let type = "deleteData"
            let url = [
                "master/dokter_keahlian", idDokterKeahlian
            ]
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success',
                    message: 'data berhasil dihapus',
                    timeout: 1000,
                    position: 'topRight'
                })
                this.getKeahlianDokter()
            }).catch((err) => {
                console.log(err);
            })
        },
        postKeahlian() {
            let type = "postData"
            let url = [
                "master/dokter_keahlian", this.form
            ]
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success'
                }),
                    this.goBack()
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: {
        ButtonComponent, ModalComponent, InputField, Form, SelectOption, EmptyData, EmptyLoading
    }
}
</script>