<template>
    <div class="card shadow">
        <div class="card-header">
            <h6><b class="text-primary">{{ $route.name }}</b></h6>
        </div>
        <div class="card-body">
            <Form @submit="postRumahSakit">
                <div class="row">
                    <h6><b>Data Diri</b></h6>
                    <div class="col-sm-6 col-6">
                        <label for="">Nama Pembuat</label>
                        <InputField Name="nama" v-model="form.nama" />
                        <label for="">Password</label>
                        <InputField Name="password" v-model="form.password" />
                        <label for="">Alamat</label>
                        <textarea Name="alamat" rows="3" class="form-control" v-model="form.alamat"></textarea>
                    </div>
                    <div class="col-sm-6 col-6">
                        <label for="">Email</label>
                        <InputField Name="email" v-model="form.email" />
                        <label for="">Nomor HP</label>
                        <InputField Name="nomorHp" v-model="form.nomor_hp" />
                    </div>
                </div>
                <div class="row">
                    <h6 class="mt-4"><b>Data Rumah Sakit</b></h6>
                    <div class="col-sm-6 col-6">
                        <label for="">Nama Rumah Sakit</label>
                        <InputField Name="rumahSakit" v-model="form.nama_rs" />
                        <label for="">Deskripsi</label>
                        <textarea Name="deskripsi" class="form-control" rows="3" v-model="form.deskripsi_rs"></textarea>
                    </div>
                    <div class="col-sm-6 col-6">
                        <label for="">Alamat</label>
                        <InputField Name="alamat" v-model="form.alamat_rs" />
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
import InputField from '../../../components/partials-component/InputField.vue'
import iziToast from 'izitoast'
export default {
    data() {
        return {
            form: {
                nama: '',
                nomor_hp: '',
                password: '',
                email: '',
                alamat: '',
                nama_rs: '',
                deskripsi_rs: '',
                alamat_rs: ''
            }
        }
    },
    methods: {
        postRumahSakit() {
            let type = "postData"
            let url = [
                "master/rumah_sakit/data", this.form
            ]
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success',
                    message: 'berhasil data ditambah',
                    position: 'topRight',
                    timeout: 1000
                })
                this.$router.back()
            }).catch((err) => {
                console.log(err);
            })
        },
    },
    components: {
        ButtonComponent, InputField, Form
    }
}
</script>