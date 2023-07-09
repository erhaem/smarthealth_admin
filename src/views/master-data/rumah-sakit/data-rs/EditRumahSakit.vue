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
                        <label for="">Foto Rs</label>
                        <img :src="form.foto" class="img-fluid mb-3">
                        <input Name="alamat" class="form-control" type="file" @change="chooseFoto">
                    </div>
                    <div class="col-sm-6 col-6">
                        <label for="">Nama Rumah Sakit</label>
                        <InputField Name="namaRs" v-model="form.namaRs" />
                        <label for="">Alamat RS</label>
                        <InputField Name="alamat" v-model="form.alamatRs" />
                        <label for="">Deskripsi RS</label>
                        <InputField Name="deskripsi" v-model="form.deskripsiRs" />
                        <label for="">Latitude RS</label>
                        <InputField Name="latitude" v-model="form.latitude" />
                        <label for="">Longitude RS</label>
                        <InputField Name="longitude" v-model="form.longitude" />
                        <ButtonComponent class="mb-3" />
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
import iziToast from 'izitoast'
import InputField from '@/components/partials-component/InputField.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import { Form } from 'vee-validate'
export default {
    data() {
        return {
            form: {
                namaRs: '',
                deskripsiRs: '',
                alamatRs: '',
                latitude: '',
                longitude: '',
                foto: null,
                gambarLama: ''
            }
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        },
        formData() {
            const formData = new FormData()

            formData.append('foto_rs', this.form.foto)
            formData.append('nama_rs', this.form.namaRs)
            formData.append('alamat_rs', this.form.alamatRs)
            formData.append('deskripsi_rs', this.form.deskripsiRs)
            formData.append('latitude', this.form.latitude)
            formData.append('longitude', this.form.longitude)
            formData.append('gambarLama', this.form.gambarLama)

            return formData;
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
            const params = this.$route.params.id
            let type = "postDataUpload"
            const formData = this.formData
            let url = [
                `master/rumah_sakit/data/${params}?_method=put`, formData
            ]
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success',
                    message: 'data berhasil diubah',
                    position: 'topRight',
                    timeout: 1000
                })
                this.$router.back()
            }).catch((err) => {
                console.log(err);
            })
        },
        chooseFoto(event) {
            this.form.foto = event.target.files[0]
            console.log(this.form.foto);
        }
    },
    components: {
        InputField,
        ButtonComponent,
        Form
    }
}
</script>