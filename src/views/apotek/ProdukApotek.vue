<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Data {{$route.name}}</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Produk</th>
                            <th>Deskripsi</th>
                            <th>Harga produk</th>
                            <th>Owner</th>
                            <th>Jumlah</th>
                        </tr>
                    </thead>
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
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            produkApotek: []
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
            this.$store.dispatch(type, url).then((result)=>{
                this.produkApotek = result.data
                console.log(result.data);
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
}
</script>