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
                            <th>no</th>
                            <th>Nama</th>
                            <th>NIK</th>
                            <th>Nomor HP</th>
                            <th>Alamat</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading/>
                    </tbody>
                    <tbody v-else-if="riwayat.length === 0">
                        <EmptyData/>
                    </tbody>
                    <template v-else>
                        <tbody v-for="(data, index) in riwayat" :key="index">
                            <tr>
                                <td>
                                    {{ index + 1 }}
                                </td>
                                <td>hamdan</td>
                                <td>hamdan</td>
                                <td>hamdan</td>
                                <td>hamdan</td>
                            </tr>
                        </tbody>
                    </template>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import ActiveSlider from '../../components/partials-component/ActiveSlider.vue'
import SpanSlider from '../../components/partials-component/SpanSlider.vue'
import EmptyData from '../../components/empty-table/EmptyData.vue';
import EmptyLoading from '../../components/empty-table/EmptyLoading.vue';
export default {
    data() {
        return {
            riwayat: [],
            isLoading: false
        };
    },
    created() {
        this.getRiwayat();
    },
    methods: {
        getRiwayat(){
            let type = "getData"
            let url = [
                "transaksi/konsultasi", {}, {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                this.riwayat = result.data
                console.log(result);
            }).catch((err)=>{
                console.log(err);
            })
        },
    },
    components: { ActiveSlider, SpanSlider, EmptyData, EmptyLoading }
}
</script>