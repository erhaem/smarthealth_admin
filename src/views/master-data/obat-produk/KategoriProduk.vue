<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <ButtonComponent v-if="$can('create', 'Kategori Produk')" Message="Tambah Data +" data-bs-toggle="modal" data-bs-target="#tambahData" />
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Id Produk</th>
                            <th>Kategori Produk</th>
                            <th v-if="$can('edit', 'Kategori Produk')">Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading/>
                    </tbody>
                    <tbody v-else-if="kategoriProduk.length == 0">
                        <EmptyData/>
                    </tbody>
                    <template v-else>
                        <tbody v-for="data in kategoriProduk" :key="index">
                            <tr>
                                <td>{{ data.idKategoriProduk }}</td>
                                <td>{{ data.namaKategoriProduk }}</td>
                                <td v-if="$can('edit', 'Kategori Produk')">
                                    <div class="d-flex justify-content-start">
                                        <router-link :to="'kategori_produk/' + data.idKategoriProduk + '/edit'">
                                        <ButtonComponent Color="btn-warning" Message="edit"/>
                                        </router-link>
                                        <ButtonComponent Color="btn-danger" Message="hapus" @click="deleteKategori(data.idKategoriProduk)" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </table>
            </div>
        </div>
    </div>
    <ModalComponent id="tambahData" :modalTitle="'Tambah ' + $route.name">
        <template #modal>
            <Form @submit="postKategoriProduk" :validation-schema="schema" v-slot="{errors}">
                <div>
                    <label>Kategori Produk</label>
                    <InputField Name="namaKategoriProduk" v-model="form.nama_kategori_produk"/>
                    <span class="text-danger">{{errors.namaKategoriProduk}}</span>
                </div>
                <ButtonComponent />
            </Form>
        </template>
    </ModalComponent>
</template>

<script>
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import InputField from '../../../components/partials-component/InputField.vue'
import iziToast from 'izitoast'
import ModalComponent from '../../../components/partials-component/ModalComponent.vue';
import LoadingIndicator from '../../../components/partials-component/LoadingIndicator.vue';
import EmptyLoading from '../../../components/empty-table/EmptyLoading.vue';
import EmptyData from '../../../components/empty-table/EmptyData.vue';
import { Form } from 'vee-validate'
import * as valid from 'yup'
export default {
    data() {
        return {
            kategoriProduk: [],
            form: {
                nama_kategori_produk: ''
            },
            isLoading: false
        }
    },
    created() {
        this.getKategoriProduk()
    },
    computed: {
        schema(){
            return valid.object({
                namaKategoriProduk: valid.string().required('wajib diisi')
            })
        }
    },
    methods: {
        getKategoriProduk() {
            let type = "getData"
            let url = [
                "master/produk/kategori_produk", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.kategoriProduk = result.data
                this.isLoading = false
            }).catch((err) => {
                console.log(err);
            })
        },
        postKategoriProduk(){
            let type = "postData"
            let url = [
                "master/produk/kategori_produk", this.form, {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                iziToast.success({
                    title: 'success',
                    message: 'Data Berhasil Ditambah',
                    position: 'topRight',
                    timeout: 1000
                })
                this.getKategoriProduk()
            }).catch((err)=>{
                console.log(err);
            })
        },
        deleteKategori(idKategoriProduk){
            let type = "deleteData"
            let url = [
                "master/produk/kategori_produk", idKategoriProduk
            ]
            this.$store.dispatch(type, url).then((result)=>{
                iziToast.success({
                    title: 'success',
                    message: 'Data Berhasil Dihapus',
                    position: 'topRight',
                    timeout: 1000
                })
                this.getKategoriProduk()
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    components: {
        ButtonComponent,
        InputField,
        Form,
        ModalComponent,
        LoadingIndicator,
        EmptyLoading,
        EmptyData
    }
}
</script>