<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Data {{$route.name}}</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Produk</th>
                            <th>Deskripsi</th>
                            <th>Harga produk</th>
                            <th>Owner</th>
                            <th>Jumlah</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading/>
                    </tbody>
                    <tbody v-else-if="produkApotek.length === 0">
                        <EmptyData/>
                    </tbody>
                    <template v-else>
                        <tbody v-for="data in produkApotek">
                            <tr>
                                <td>
                                    {{ data.namaProduk }}
                                </td>
                                <td>
                                    {{ data.deskripsiProduk }}
                                </td>
                                <td>
                                    {{ data.hargaProduk }}
                                </td>
                                <td>
                                    {{ data.owner }}
                                </td>
                                <td>
                                    {{ data.qty }}
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
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue'
import EmptyData from '@/components/empty-table/EmptyData.vue'
export default {
    data(){
        return {
            produkApotek: [],
            isLoading: false
        }
    },
    created(){
        this.getProdukApotek()
    },
    methods: {
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
    components: {
        EmptyData, EmptyLoading
    }
}
</script>