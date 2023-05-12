<template>
    <div class="card shadow">
        <div class="card-header">
            <h6><b class="text-primary">{{ $route.name }}</b></h6>
        </div>
        <div class="card-body">
            <Form @submit="postRumahSakit">
                <div class="row">
                    <h6 class="mt-1"><b>Data Rumah Sakit</b></h6>
                    <div class="col-sm-6 col-6">
                        <label for="">Nama Rumah Sakit</label>
                        <InputField Name="rumahSakit" v-model="form.nama_rs" />
                        <label for="">Longitude</label>
                        <InputField Name="longitude" v-model="form.longitude" />
                        <label for="">Deskripsi</label>
                        <textarea Name="deskripsi" class="form-control" rows="3" v-model="form.deskripsi_rs"></textarea>
                    </div>
                    <div class="col-sm-6 col-6">
                        <label for="">Alamat</label>
                        <InputField Name="alamat" v-model="form.alamat_rs" />
                        <label for="">Latitude</label>
                        <InputField Name="latitude" v-model="form.latitude" />
                        <label for="">Alamat</label>
                        <input Name="alamat" class="form-control" type="file" @change="chooseFoto">
                    </div>
                </div>
                <div class="d-flex justify-content-between mt-3">
                    <ButtonComponent />
                    <router-link to="/master/rumah_sakit">
                        <ButtonComponent Color="btn-dark" Message="Kembali" />
                    </router-link>
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
import { Form } from 'vee-validate'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import InputField from '@/components/partials-component/InputField.vue'
import iziToast from 'izitoast'
export default {
    data() {
        return {
            form: {
                nama_rs: '',
                deskripsi_rs: '',
                alamat_rs: '',
                latitude: '',
                longitude: '',
                foto_rs: null
            }
        }
    },
    computed: {
        formData() {
            const { foto_rs, nama_rs, deskripsi_rs, alamat_rs, latitude, longitude } = this.form;
            const formData = new FormData();

            formData.append('foto_rs', foto_rs);
            formData.append('nama_rs', nama_rs);
            formData.append('deskripsi_rs', deskripsi_rs);
            formData.append('alamat_rs', alamat_rs);
            formData.append('latitude', latitude);
            formData.append('longitude', longitude);

            return formData;
        }

    },
    methods: {
        postRumahSakit() {
            const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
            const file = this.form.foto_rs;
            const maxSizeInBytes = 5 * 1024 * 1024;

            if (file && allowedFormats.includes(file.type)) {
                if (file.size <= maxSizeInBytes) {
                    const formData = this.formData;
                    let type = "postDataUpload";
                    this.$store
                        .dispatch(type, [formData, '/master/rumah_sakit/data'])
                        .then((result) => {
                            iziToast.success({
                                title: 'Success',
                                position: 'topRight',
                                message: 'Data Artikel Berhasil Ditambahkan',
                                timeout: 1000
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    iziToast.error({
                        title: 'Error',
                        message: 'Maaf, ukuran file gambar terlalu besar. Maksimum ukuran file adalah 5MB.',
                        position: 'topRight'
                    });
                }
            } else {
                iziToast.error({
                    title: 'Error',
                    message: 'Maaf, format yang diperbolehkan hanya jpg, png, jpeg',
                    position: 'topRight'
                });
            }
        },
        chooseFoto(event) {
            this.form.foto_rs = event.target.files[0]
            console.log(event);
            console.log(this.form.foto_rs);
        }
    },
    components: {
        ButtonComponent, InputField, Form
    }
}
</script>