<template>
    <div class="col-lg-12 col-12">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="d-flex justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                    <ButtonComponent Color="btn-dark" Message="Tambah Data +" data-bs-toggle="modal"
                        data-bs-target="#tambahData" v-if="$can('create', 'Kategori Artikel')" />
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>ID Kategori</th>
                                <th>Nama Kategori</th>
                                <th v-if="$can('create', 'Kategori Artikel')" >Aksi</th>
                            </tr>
                        </thead>
                        <tbody v-if="isLoading">
                            <EmptyLoading />
                        </tbody>
                        <tbody v-else-if="kategoriArtikel.length == 0">
                            <EmptyData />
                        </tbody>
                        <template v-else>
                            <tbody v-for="data in kategoriArtikel" :key="index">
                                <tr>
                                    <td>{{ data.idKategoriArtikel }}</td>
                                    <td>{{ data.namaKategori }}</td>
                                    <td v-if="$can('create', 'Kategori Artikel')">
                                        <div class="d-flex justify-content-start">
                                            <router-link :to="'kategori_artikel/' + data.idKategoriArtikel + '/edit'">
                                                <ButtonComponent Color="btn-warning" Message="Edit" />
                                            </router-link>
                                            <ButtonComponent Color="btn-danger" Message="Hapus"
                                                @click="deleteData(data.idKategoriArtikel)" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <ModalComponent id="tambahData" labelBy="exampleModalLabel" :modalTitle="'Tambah ' + $route.name">
        <template #modal>
            <Form @submit="postKategori" :validationSchema="schema" v-slot="{ errors }">
                <div>
                    <input type="text" hidden v-model="kategoris.id_kategori_artikel">
                    <Label>Nama Kategori</Label>
                    <InputField Name="namaKategori" v-model="kategoris.nama_kategori" />
                    <span :class="[error]">{{ errors.namaKategori }}</span>
                </div>
                    <ButtonComponent Message="submit" />
            </Form>
        </template>
    </ModalComponent>
</template>

<script>
import { Form } from 'vee-validate'
import ButtonComponent from '../../../components/partials-component/ButtonComponent.vue';
import ModalComponent from '../../../components/partials-component/ModalComponent.vue';
import InputField from '../../../components/partials-component/InputField.vue';
import iziToast from 'izitoast'
import * as validate from 'yup'
import EmptyLoading from '../../../components/empty-table/EmptyLoading.vue';
import EmptyData from '../../../components/empty-table/EmptyData.vue';
export default {
    data() {
        return {
            kategoriArtikel: [],
            kategoris: {
                nama_kategori: ''
            },
            isLoading: false,
            error: 'text-danger',
        };
    },
    computed: {
        schema() {
            return validate.object({
                namaKategori: validate.string().required('wajib diisii yaaaaa')
            })
        }
    },
    created() {
        this.getKategoriArtikel();
    },
    methods: {
        getKategoriArtikel() {
            let type = "getData";
            let url = [
                "master/kategori_artikel",
                {}
            ];
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.kategoriArtikel = result.data;
                this.isLoading = false
            }).catch((err) => {
                console.log(err);
            });
        },
        goBack() {
            window.location = '/master/kategori_artikel'
        },
        postKategori() {
            let type = "postData"
            let url = [
                "master/kategori_artikel", this.kategoris, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success',
                    position: 'topRight',
                    message: 'Data Kategori Artikel Berhasil Ditambahkan',
                    timeout: 1000
                })
                this.goBack()
                this.getKategoriArtikel()
            }).catch((err) => {
                console.log(err);
            })
        },
        deleteData(idKategoriArtikel) {
            let type = "deleteData"
            let url = [
                "master/kategori_artikel", idKategoriArtikel
            ]
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success',
                    position: 'topRight',
                    message: 'Data Kategori Artikel Berhasil Dihapus',
                    timeout: 1000
                })
                this.getKategoriArtikel()
            }).catch((err) => {
                console.log(err);
            })
        },
    },
    components: { ButtonComponent, Form, InputField, ModalComponent, EmptyData, EmptyLoading }
}
</script>