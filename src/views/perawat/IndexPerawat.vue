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
                            <th>Alamat</th>
                            <th>Email</th>
                            <th>Nomor STR</th>
                            <th>Biaya perawat</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody v-for="data in perawat" :key="index">
                        <tr>
                            <td>{{data.getUser.nama}}</td>
                            <td>{{data.getUser.alamat}}</td>
                            <td>{{data.getUser.email}}</td>
                            <td>{{data.nip}}</td>
                            <td>{{data.getUser.nomorHp}}</td>
                            <td>
                                <ActiveSlider :checked="data.getUser.status == 1">
                                    <template #span>
                                        <SpanSlider @click="updateStatus(data.getUser.id)"/>
                                    </template>
                                </ActiveSlider>
                            </td>
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
            perawat: [],
            status: 0,
        };
    },
    created() {
        this.getPerawat();
    },
    methods: {
        getPerawat() {
            let type = "getData";
            let url = [
                "akun/perawat",
                {}
            ];
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                console.log(result.data);
                this.perawat = result.data;
            }).catch((err) => {
                console.log(err);
            });
        },
        updateStatus(id_user) {
            let type = "updateData";
            let url = [
                "akun/active_account",
                id_user,
                {}
            ];
            this.$store.dispatch(type, url).then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    components: { ActiveSlider, SpanSlider }
}
</script>