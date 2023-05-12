<template>
    <div class="card shadow">
        <div class="card-header">
            <h6><b class="text-primary">{{$route.name}}</b></h6>
        </div>
        <div class="card-body">
            <Form @submit="postRumahSakit">
                <div class="container py-2 row">
                    <h6><b> {{ $route.name }} </b></h6>
                    <div class="col-sm-6 col-6">
                        <label for="">Nama Rumah Sakit</label>
                        <InputField Name="namaRs" v-model="form.namaRs" />
                        <label for="">Alamat RS</label>
                        <InputField Name="alamat" v-model="form.alamatRs" />
                        <ButtonComponent class="mb-3" />
                    </div>
                    <div class="col-sm-6 col-6">
                        <label for="">Deskripsi RS</label>
                        <InputField Name="deskripsi" v-model="form.deskripsiRs" />
                        <label for="">Latitude RS</label>
                        <InputField Name="latitude" v-model="form.latitude" />
                        <label for="">Longitude RS</label>
                        <InputField Name="longitude" v-model="form.longitude" />
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
import InputField from '@/components/partials-component/InputField.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import { Form } from 'vee-validate'
export default {
    data() {
        return {
            form: {
                nama: '',
                email: '',
                password: '',
                alamat: '',
                nomorHp: '',
                namaRs: '',
                deskripsiRs: '',
                alamatRs: '',
                latitude: '',
                longitude: ''
            }
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        }
    },
    created() {
        this.detailRumahSakit()
    },
    methods: {
        detailRumahSakit() {
            let type = "getData"
            let url = [
                'master/rumah_sakit/data/' + this.idFromParams + '/edit', {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.form = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        postRumahSakit() {
            let type = "updateData"
            let url = [
                "master/rumah_sakit/data", this.idFromParams, this.form
            ]
            this.$store.dispatch(type, url).catch((err) => {
                iziToast.success({
                    title: 'success',
                    message: 'berhasil data diubah',
                    position: 'topRight',
                    timeout: 1000
                })
                this.$router.back()
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: {
        InputField,
        ButtonComponent,
        Form
    }
}
</script>