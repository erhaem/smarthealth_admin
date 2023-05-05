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
                            <th>ID Kategori Produk</th>
                            <th>Kategori Produk</th>
                            <th>Produk</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="groupingProduk.length == 0">
                        <EmptyData />
                    </tbody>
                    <template v-else-if="groupingProduk.length">
                        <tbody v-for="data in groupingProduk">
                            <tr>
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
                                <td v-if="data.produk">
                                    {{ data.produk }}
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
</template>

<script>
import LoadingIndicator from '../../components/partials-component/LoadingIndicator.vue'
import EmptyData from '../../components/empty-table/EmptyData.vue';
import EmptyLoading from '../../components/empty-table/EmptyLoading.vue';
export default {
    data() {
        return {
            groupingProduk: [],
            isLoading: false
        };
    },
    created() {
        this.getProdukApotek();
    },
    methods: {
        getProdukApotek() {
            let type = "getData";
            let url = [
                "apotek/produk/produk_kategori",
                {}
            ];
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.groupingProduk = result.data;
                this.isLoading = false
                console.log(result.data);
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    components: { LoadingIndicator, EmptyData, EmptyLoading }
}


</script>