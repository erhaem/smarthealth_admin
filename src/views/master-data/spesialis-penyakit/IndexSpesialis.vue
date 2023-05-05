<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#tambahData">Tambah Data
                    +</button>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Id Penyakit</th>
                            <th>Nama</th>
                            <th>Slug</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-for="data in spesialis" :key="index">
                        <tr>
                            <td>{{ data.idPenyakit }}</td>
                            <td>{{ data.namaSpesialis }}</td>
                            <td>{{ data.slugSpesialis }}</td>
                            <td>
                                <router-link :to="'spesialis_penyakit/' + data.idPenyakit + '/edit'">
                                    <ButtonComponent Message="Edit" Color="btn-warning" />
                                </router-link>
                                <ButtonComponent Message="Hapus" Color="btn-danger"
                                    @click="deleteSpesialis(data.idPenyakit)" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <ModalComponent id="tambahData" labelBy="exampleModalLabel" :modalTitle="'Tambah ' + $route.name">
        <template #modal>
            <Form @submit="postSpesialis" :validation-schema="schema" v-slot="{ errors }">
                <div>
                    <Label>Jenis Spesialis</Label>
                    <InputField Name="namaSpesialis" v-model="form.nama_spesialis" />
                    <span class="text-danger">{{ errors.namaSpesialis }}</span>
                </div>
                <ButtonComponent />
            </Form>
        </template>
    </ModalComponent>
</template>

<script>
import ModalComponent from '../../../components/partials-component/ModalComponent.vue'
import { Form } from 'vee-validate'
import InputField from '../../../components/partials-component/InputField.vue'
import ButtonComponent from '../../../components/partials-component/ButtonComponent.vue'
import iziToast from 'izitoast'
import * as valid from 'yup'
export default {
    data() {
        return {
            spesialis: [],
            form: {
                nama_spesialis: ''
            }
        }
    },
    created() {
        this.getSpesialis()
    },
    computed: {
        schema() {
            return valid.object({
                namaSpesialis: valid.string().required('wajib diisi')
            })
        }
    },
    methods: {
        getSpesialis() {
            let type = "getData"
            let url = [
                "master/penyakit/spesialis_penyakit"
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.spesialis = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        goBack() {
            window.location = '/master/spesialis_penyakit'
        },
        postSpesialis() {
            let type = "postData"
            let url = [
                "master/penyakit/spesialis_penyakit", this.form
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.goBack()
            }).catch((err) => {
                console.log(err);
            })
        },
        deleteSpesialis(idPenyakit) {
            let type = "deleteData"
            let url = [
                "master/penyakit/spesialis_penyakit", idPenyakit
            ]
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success',
                    message: 'Data Berhasil Dihapus',
                    timeout: 1000,
                    position: 'topRight'
                })
                this.getSpesialis()
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: {
        ModalComponent, Form, InputField, ButtonComponent
    }
}
</script>