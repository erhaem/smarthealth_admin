<template>
    <div class="container col-xxl-12">
        <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
            <div class="card shadow-lg" style="width: 70vh;">
                <div class="card-header text-center">
                    <h4 class="text-dark font-weight-bold">
                        Login Akun BerobatPlus
                    </h4>
                </div>
                <Form @submit="postLogin" class="px-4 py-4 text-dark" :validation-schema="schema" v-slot="{ errors }">
                    <div class="mb-2">
                        <label for="">Nomor HP</label>
                        <InputField Name="nomorHp" v-model="form.nomor_hp" />
                        <span class="text-danger">{{ errors.nomorHp }}</span>
                    </div>
                    <div>
                        <label for="">Password</label>
                        <InputField Name="password" v-model="form.password" type="password" />
                        <span class="text-danger">{{ errors.password }}</span>
                    </div>
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
import * as valid from 'yup'
export default {
    data() {
        return {
            form: {
                nomor_hp: '',
                password: ''
            }
        }
    },
    computed: {
        schema() {
            return valid.object({
                nomorHp: valid.string().required('nomor hp wajib diisi').min(12).max(15),
                password: valid.string().required('password wajib diisi').min(8)
            })
        }
    },
    methods: {
        postLogin() {
            let type = "postData"
            let url = [
                "autentikasi/login", this.form, {}
            ]
            const allowRoles = ["RO-2003061", "RO-2003063", "RO-2003065", "RO-2003066", "RO-2003062", "RO-2003067"]
            this.$store.dispatch(type, url).then((result) => {
                console.log(result);
                const cekRole = result.data.getRole.idRole;
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
                console.log('salahhhh');
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