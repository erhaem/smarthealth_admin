<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>id produk kategori</th>
                            <th>ID Kategori Produk</th>
                            <th>Kategori Produk</th>
                            <th>Produk</th>
                        </tr>
                    </thead>
                    {{ groupingProduk }}
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="groupingProduk.length == 0">
                        <EmptyData />
                    </tbody>
                    <template v-else-if="groupingProduk.length">
                        <tbody v-for="data in groupingProduk">
                            <tr>
                                <td v-if="data.groupingProduk">
                                    {{data.idKategoriProduk}}
                                </td>
                                <td v-else>
                                    <strong>
                                        <i>
                                            Data Tidak Ada
                                        </i>
                                    </strong>
                                </td>
                                <td v-if="data.kategori">
                                    {{ data.kategori.idKategoriProduk }}
                                </td>
                                <td v-else>
                                    <strong>
                                        <i>
                                            Data Tidak Ada
                                        </i>
                                    </strong>
                                </td>
                                <td v-if="data.kategori">
                                    {{ data.kategori.namaKategoriProduk }}
                                </td>
                                <td v-else>
                                    <strong>
                                        <i>
                                            Data Tidak Ada
                                        </i>
                                    </strong>
                                </td>
                                <td v-if="data.getProduk">
                                    {{ data.getProduk }}
                                </td>
                                <td v-else>
                                    <strong>
                                        <i>Data Tidak Ada</i>
                                    </strong>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </table>
            </div>
        </div>
    </div>
    <Form @submit="postGroup">
        <div>
            <SelectOption v-model="form.kode_produk">
                <template #option>
                    <option :value="data.kodeProduk" v-for="data in produkApotek">{{produkApotek}}</option>
                </template>
            </SelectOption>
        </div>
        <div>
            <SelectOption v-model="form.id_produk_kategori">
                <template #option>
                    <option :value="data.idKategoriProduk" v-for="data in kategoriProduk">{{data.idKategoriProduk}}</option>
                </template>
            </SelectOption>
        </div>
        <ButtonComponent/>
    </Form>
</template>

<script>
import {Form} from 'vee-validate'
import LoadingIndicator from '../../components/partials-component/LoadingIndicator.vue'
import EmptyData from '../../components/empty-table/EmptyData.vue';
import EmptyLoading from '../../components/empty-table/EmptyLoading.vue';
import SelectOption from '../../components/partials-component/SelectOption.vue'
import ButtonComponent from '../../components/partials-component/ButtonComponent.vue'
export default {
    data() {
        return {
            groupingProduk: [],
            produkApotek: [],
            kategoriProduk: [],
            form: {
                id_produk_kategori: '',
                kode_produk: '',
            },
            isLoading: false
        };
    },
    created() {
        this.getProdukApotek();
        this.getGrouping(),
        this.getKategoriProduk()
    },
    methods: {
        getGrouping() {
            let type = "getData";
            let url = [
                "apotek/produk/produk_kategori",
                {}
            ];
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.groupingProduk = result.data;
                this.isLoading = false
            }).catch((err) => {
                console.log(err);
            });
        },
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
        postGroup(){
            let type = "postData"
            let url = [
                "apotek/produk/produk_kategori", this.form
            ]
            this.$store.dispatch(type, url).then((result)=>{
                console.log(result);
            }).catch((err)=>{
                console.log(err);
            })
        },
        getProdukApotek(){
            let type = "getData"
            let url  = [
                "apotek/produk/data_produk", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result)=>{
                this.isLoading = false
                this.produkApotek = result.data
            }).catch((err)=>{
                console.log(err);
            })
        }

    },
    components: { LoadingIndicator, EmptyData, EmptyLoading, Form, SelectOption, ButtonComponent }
}


</script>