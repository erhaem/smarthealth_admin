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
                            <th>Nama</th>
                            <th>NIK</th>
                            <th>Nomor HP</th>
                            <th>Alamat</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody v-for="data in konsumen" :key="index">
                        <tr>
                            <td>{{data.user.nama}}</td>
                            <td>{{data.nik}}</td>
                            <td>{{data.user.nomorHp}}</td>
                            <td>{{data.user.email}}</td>
                            <td>{{data.user.email}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import ActiveSlider from '../../components/partials-component/ActiveSlider.vue'
import SpanSlider from '../../components/partials-component/SpanSlider.vue'

export default {
    data() {
        return {
            konsumen: [],
            status: 0
        };
    },
    created() {
        this.getDokter();
    },
    methods: {
        getDokter() {
            let type = "getData";
            let url = [
                "akun/konsumen",
                {}
            ];
            this.$store.dispatch(type, url).then((result) => {
                console.log(result.data);
                this.konsumen = result.data;
            }).catch((err) => {
                console.log(err);
            });
        },
    },
    components: { ActiveSlider, SpanSlider }
}
</script>