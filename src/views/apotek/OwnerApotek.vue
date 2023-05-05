<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Email</th>
                            <th>Nomor Hp</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading/>
                    </tbody>
                    <tbody v-else-if="ownerApotek.length ==0 ">
                        <EmptyData/>
                    </tbody>
                    <template v-else>
                        <tbody v-for="data in ownerApotek">
                            <tr>
                                <td>
                                    {{ data.getUser.nama }}
                                </td>
                                <td>
                                    {{ data.getUser.alamat }}
                                </td>
                                <td>
                                    {{ data.getUser.email }}
                                </td>
                                <td>
                                    {{ data.getUser.nomorHp }}
                                </td>
                                <td>
                                    <ActiveSlider :checked="data.getUser.status == 1">
                                        <template #span>
                                            <SpanSlider @click="updateStatus(data.getUser.status)"/>
                                        </template>
                                    </ActiveSlider>
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
import ButtonComponent from '../../components/partials-component/ButtonComponent.vue'
import LoadingIndicator from '../../components/partials-component/LoadingIndicator.vue'
import ActiveSlider from '../../components/partials-component/ActiveSlider.vue'
import SpanSlider from '../../components/partials-component/SpanSlider.vue'
import EmptyLoading from '../../components/empty-table/EmptyLoading.vue';
import EmptyData from '../../components/empty-table/EmptyData.vue';
export default {
    data() {
        return {
            ownerApotek: [],
            isLoading: false
        }
    },
    created() {
        this.getOwnerApotek()
    },
    methods: {
        getOwnerApotek() {
            let type = "getData"
            let url = [
                "akun/apotek", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.ownerApotek = result.data
                this.isLoading = false
            }).catch((err) => {
                console.log(err);
            })
        },

    },
    components: {
        ButtonComponent,
        LoadingIndicator,
        ActiveSlider,
        SpanSlider,
        EmptyData,
        EmptyLoading
    }
}
</script>