<template>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">{{ $route.name }}</h1>
        <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
    </div>
    <div class="row" v-for="count in datas" :key="index">
        <div class="col-xl-3 col-md-6 mb-4">
            <LoadingIndicator v-if="isLoading" />
            <div class="card border-left-primary shadow h-100 py-2" v-if="!isLoading">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                Jumlah Dokter</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ count.dokter }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-user-doctor fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 mb-4">
            <LoadingIndicator v-if="isLoading" />
            <div class="card border-left-success shadow h-100 py-2" v-if="!isLoading">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                Jumlah Perawat</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ count.perawat }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-user-nurse fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 mb-4">
            <LoadingIndicator v-if="isLoading" />
            <div class="card border-left-info shadow h-100 py-2" v-if="!isLoading">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Jumlah Konsumen
                            </div>
                            <div class="row no-gutters align-items-center">
                                <div class="col-auto">
                                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{{ count.konsumen }}</div>
                                </div>
                                <div class="col">
                                    <div class="progress progress-sm mr-2">
                                        <div class="progress-bar bg-info" role="progressbar" style="width: 50%"
                                            aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-users fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 mb-4">
            <LoadingIndicator v-if="isLoading" />
            <div class="card border-left-warning shadow h-100 py-2" v-if="!isLoading">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                Jumlah Apotek</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ count.apotek }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-store fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LoadingIndicator from '@/components/partials-component/LoadingIndicator.vue';
import axios from 'axios'
import { Form } from 'vee-validate'
import Cookies from "js-cookie"
export default {
    data() {
        return {
            datas: '',
            isLoading: false,
        }
    },
    mounted() {
        this.getCountData()
    },
    methods: {
        getCountData() {
            let type = "getData"
            let url = [
                "count_data", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.datas = result.jumlahData
                setTimeout(() => {
                    this.isLoading = false
                }, 2000);
            }).catch((err) => {
                console.log(err);
            })
        },
    },
    components: {
        LoadingIndicator, Form

    }
}
</script>