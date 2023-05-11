<template>
    <div class="container d-flex justify-content-center align-items-center" style="height: 100vh;">
        <div class="">
            <div class="card shadow" style="width: 70vh;">
                <div class="card-header text-center">
                    <h4 class="text-dark font-weight-bold">
                        Login User
                    </h4>
                </div>
                <Form @submit="postLogin" class="px-4 py-4 text-dark">
                    <label for="">Nomor HP</label>
                    <InputField Name="nama" v-model="form.nomor_hp" />
                    <label for="">Password</label>
                    <InputField v-model="form.password" />
                    <div class="d-flex justify-content-end">
                        <ButtonComponent />
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
import { Form } from 'vee-validate'
import InputField from '../../components/partials-component/InputField.vue';
import ButtonComponent from '../../components/partials-component/ButtonComponent.vue';
import iziToast from 'izitoast';
export default {
    data() {
        return {
            form: {
                nomor_hp: '',
                password: ''
            }
        }
    },
    methods: {
        postLogin() {
            let type = "postData"
            let url = [
                "autentikasi/login", this.form, {}
            ]
            const allowRoles = ["Administrator", "Perawat", "Owner Apotek", "Dokter", "Admin Rumah Sakit"]
            this.$store.dispatch(type, url).then((result) => {
                console.log(result);
                const cekRole = result.data.getRole.namaRole;
                if (allowRoles.includes(cekRole)) {
                    Cookies.set('token', result.data.token)
                    Cookies.set('user', JSON.stringify(result))
                    iziToast.success({
                        title: 'success',
                        message: 'berhasil login',
                        timeout: 2000,
                        position: 'topRight'
                    })
                    window.location = '/dashboard'
                } else {
                    iziToast.error({
                        title: 'error',
                        message: 'maaf hanya role tertentu yang dapat login',
                        timeout: 2000,
                        position: 'topRight'
                    })
                }
            }).catch((err) => {
                if (err.response && err.response.data && err.response.data.message === 'Incorrect password') {
                    iziToast.error({
                        title: 'error',
                        message: 'nomor hp dan password tidak sesuai',
                        position: 'topRight',
                        timeout: 2000
                    });
                } else {
                    console.log(err);
                }
            })
        }
    },
    components: {
        Form,
        InputField,
        ButtonComponent
    }
}
</script>