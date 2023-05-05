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
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>ID Keahlian</th>
                            <th>Nama Keahlian</th>
                            <th class="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-for="data in keahlianDokter" :key="index">
                        <tr>
                            <td>{{ data.idKeahlian }}</td>
                            <td>{{ data.namaKeahlian }}</td>
                            <td>
                                <div class="d-flex justify-content-center">
                                    <router-link :to="'keahlian_dokter/' + data.idKeahlian + '/edit'">
                                        <ButtonComponent Message="Edit" Color="btn-warning" />
                                    </router-link>
                                    <ButtonComponent @click="deleteKeahlian(data.idKeahlian)" Color="btn-danger"
                                        Message="Hapus" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <ModalComponent id="tambahData" :modalTitle="'tambah ' + $route.name">
        <template #modal>
            <Form @submit="postKeahlian" :validation-schema="schema" v-slot="{ errors }">
                <label for="">Nama Keahlian</label>
                <InputField Name="namaKeahlian" v-model="form.nama_keahlian" />
                <span class="text-danger">{{ errors.namaKeahlian }}</span>
                <div>
                    <ButtonComponent />
                </div>
            </Form>
        </template>
    </ModalComponent>
</template>

<script>
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import iziToast from 'izitoast'
import { Form } from 'vee-validate'
import InputField from '@/components/partials-component/InputField.vue'
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
import * as valid from 'yup'
export default {
    data() {
        return {
            keahlianDokter: [],
            form: {
                nama_keahlian: ''
            }
        }
    },
    created() {
        this.getKeahlian()
    },
    computed: {
        schema() {
            return valid.object({
                namaKeahlian: valid.string().required('wajib diisi')
            })
        }
    },
    methods: {
        getKeahlian() {
            let type = "getData"
            let url = [
                "master/keahlian", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.keahlianDokter = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        goBack() {
            window.location = '/dokter/keahlian_dokter'
        },
        deleteKeahlian(idKeahlian) {
            let type = "deleteData"
            let url = [
                "master/keahlian", idKeahlian
            ]
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success',
                    message: 'data berhasil dihapus',
                    timeout: 1000,
                    position: 'topRight'
                })
                this.getKeahlian()
            }).catch((err) => {
                console.log(err);
            })
        },
        postKeahlian() {
            let type = "postData"
            let url = [
                "master/keahlian", this.form
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
        ButtonComponent, ModalComponent, InputField, Form
    }
}
</script>