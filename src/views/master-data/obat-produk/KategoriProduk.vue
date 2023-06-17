<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <div class="d-flex">
                <ButtonComponent v-if="$can('action', 'Kategori Produk')" Message="Tambah Data +" data-bs-toggle="modal" data-bs-target="#tambahData" />
                <div v-if="selectedId.length == 0"></div>
                <ButtonComponent v-else-if="selectedId" @click="deleteKategori()" Color="btn-danger" Message="Hapus" />
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th v-if="$can('action', 'Kategori Produk')">pilih</th>
                            <th>Kategori Produk</th>
                            <th v-if="$can('action', 'Kategori Produk')">Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading/>
                    </tbody>
                    <tbody v-else-if="kategoriProduk.length == 0">
                        <EmptyData/>
                    </tbody>
                    <template v-else>
                        <tbody v-for="(data, index) in kategoriProduk" :key="index">
                            <tr>
                                <td>{{ index + 1 }}</td>
                                <td v-if="$can('action', 'Kategori Produk')">
                                    <input type="checkbox" :value="data.idKategoriProduk" v-model="selectedId">
                                </td>
                                <td>{{ data.namaKategoriProduk }}</td>
                                <td v-if="$can('action', 'Kategori Produk')">
                                    <div class="d-flex justify-content-start">
                                        <router-link :to="'kategori_produk/' + data.idKategoriProduk + '/edit'">
                                        <ButtonComponent Color="btn-warning" Message="edit"/>
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
            isLoading: false,
            selectedId: []
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
        deleteKategori(){
            if(this.selectedId.length === 0){
                return
            }
            let type = "deleteData"
            let urls = this.selectedId.map((idKategoriProduk)=>["master/produk/kategori_produk", idKategoriProduk])
            this.$swal({
                icon: 'question',
                title: 'Apakah kamu ingin menghapus data?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Ya, hapus',
                denyButtonText: "jangan hapus"
            }).then((result)=>{
                if(result.isConfirmed){
                    Promise.all(urls.map((url)=> this.$store.dispatch(type, url)))
                    this.$swal({
                        icon: 'success',
                        text: 'data berhasil dihapus'
                    })
                    this.getKategoriProduk()
                }
            }).catch((err)=>{
                console.log(err);
            })
            this.selectedId = []
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