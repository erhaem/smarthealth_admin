<template>
    <div class="card shadow">
        <div class="card-header">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <div class="d-flex justify-content-start">
                    <ButtonComponent v-if="$can('action', 'Owner')" Color="btn-dark" Message="Tambah Data +"
                        data-bs-toggle="modal" data-bs-target="#tambahData" />
                    <div v-if="selected.length == 0">
                    </div>
                    <ButtonComponent Color="btn-danger" v-else-if="selected" Message="hapus"
                        @click="deleteData" />
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" cellspacing="0">
                    <thead>
                        <th>no</th>
                        <th>pilih</th>
                        <th>nama</th>
                        <th>harga</th>
                        <th v-if="$can('action', 'Owner')">aksi</th>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="dataProduk.length === 0">
                        <EmptyData />
                    </tbody>
                    <template v-else>
                        <tbody v-for="(data, index) in dataProduk" :key="index">
                            <tr>
                                <td>
                                    {{ index + 1 }}
                                </td>
                                <td><input type="checkbox" v-model="selected" :value="data.kodeProduk"></td>
                                <td>{{ data.namaProduk }}</td>
                                <td>{{ data.hargaProduk }}</td>
                                <td v-if="$can('action', 'Owner')">
                                    <router-link :to="{name: 'Edit Produk Apotek', params:{profilApotek: this.idFromParams, id:data.kodeProduk}}">
                                        <ButtonComponent Message="Edit" Color="btn-warning"/>
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </table>
            </div>
        </div>
    </div>
    <ModalComponent id="tambahData">
        <template #modal>
            <label for="">nama</label>
            <InputField v-model="form.nama_produk" />
            <label for="">harga</label>
            <InputField v-model="form.harga_produk" />
            <label for="">deskripsi</label>
            <InputField v-model="form.deskripsi_produk" />
            <ButtonComponent @click="postData" />
        </template>
    </ModalComponent>
    <button @click="postProduk">
        aak
    </button>
</template>

<script>
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
import InputField from '@/components/partials-component/InputField.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue'
import EmptyData from '@/components/empty-table/EmptyData.vue'
export default {
    data() {
        return {
            dataProduk: [],
            form: {
                nama_produk: '',
                harga_produk: '',
                deskripsi_produk: '',
                id_profil_apotek: ''
            },
            isLoading: false,
            selected: [],
            produk: {
                kode_produk: 'PRO-2003061',
                tanggal: '2023-05-05',
                qty: '10',
                nama_supplier: 'tegar',
                asal_supplier: 'pemadang',
                apotek_id: 'PR-A-12345678910'
            }
        }
    },
    created() {
        this.getProduk()
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        }
    },
    methods: {
        postData() {
            let type = "postData"
            let url = [
                "apotek/produk/data_produk", {
                    nama_produk: this.form.nama_produk,
                    harga_produk: this.form.harga_produk,
                    deskripsi_produk: this.form.deskripsi_produk,
                    idProfilApotek: this.idFromParams
                },
                {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        },
        getProduk() {
            let type = "getData"
            let url = [
                `produk/data_produk/by_owner/${this.idFromParams}/get`, {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.dataProduk = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        deleteData() {
            if (this.selected.length === 0) {
                return;
            }
            let type = "deleteData";
            let urls = this.selected.map((kodeProduk) => ["apotek/produk/data_produk", kodeProduk]);
            this.$swal({
                icon: 'question',
                title: "Apakah kamu ingin menyimpan perubahan",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Ya, Hapus",
                denyButtonText: "Jangan Hapus"
            }).then((results) => {
                if (results.isConfirmed) {
                    Promise.all(urls.map((url) => this.$store.dispatch(type, url)))
                    this.$swal({
                        icon: 'success',
                        text: 'data berhasil dihapus'
                    })
                    this.getProduk();
                }
            })
                .catch((err) => {
                    console.log(err);
                });
            this.selected = [];
        },
        postProduk(){
            let type = "postData"
            let url = [
                "master/obat/transaksi_obat_masuk", this.produk, {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                console.log(result);
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    components: {
        EmptyData, EmptyLoading, ButtonComponent, InputField, ModalComponent
    }
}
</script>