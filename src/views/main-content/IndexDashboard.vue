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
    <div v-for="data in nearestResults">
        <div class="card shadow w-25 mb-2">
            <div class="card-body">
                {{ data.namaRs }} berjarak {{ data.jarak }} km dari kamu
            </div>
        </div>
    </div>
    {{ locationName }}
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
            latitude: null,
            longitude: null,
            locationName: [],
            nearestResults: [],
            lokasi: []
        }
    },
    mounted() {
        this.getCountData(),
        this.getLocation()
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
        getNeareset() {
            let type = "postData"
            let url = [
                "master/rumah_sakit/data/find_nearest", {
                    latitude: this.latitude,
                    longitude: this.longitude
                }
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.nearestResults = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        this.latitude = position.coords.latitude;
                        this.longitude = position.coords.longitude;
                        this.getNeareset();
                        this.getLocationName();
                    },
                    error => {
                        console.error(error);
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        },
        async getLocationName() {
            const apiKey = 'AIzaSyB2Xd4GJtDxGPUI7nlMV-I99x5EQqYqhGc';
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.latitude},${this.longitude}&key=${apiKey}`
            const parsing = JSON.parse(Cookies.get("user"));

            // axios.get(url)
            //     .then((response) => {
            //         console.log(response);
            //     }).catch((error) => {
            //         console.log(error);
            //     })
            try {
                const response = await axios.get(url);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
            // axios({
            //     url: url,
            //     headers: {
            //         Authorization: 'Bearer ' + parsing.data.token
            //     },
            //     method: "GET"
            // }).then((response) => {
            //     console.log(response);
            // }).catch((error) => {
            //     console.log(error);
            // })

            // axios({
            //     url: url,
            //     headers: {
            //         Authorization: ''
            //     }
            // }).then((response) => {

            // }).catch((error) => {

            // });
            // axios.get(url)
            //     .then(response => {
            //         // if (response.data.results.length > 0) {
            //         //     const address = response.data.results[0].formatted_address;
            //         //     this.locationName = address;
            //         //     console.log(address);
            //         // }
            //         console.log("ada")
            //     })
            //     .catch(error => {
            //         console.error('Error:', error);
            //     });
                
        }
    },
    components: {
        LoadingIndicator, Form

    }
}
</script>