<template>
    <div class="container col-xxl-12 bg-dark">
        <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
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
                    <InputField v-model="form.password" type="password" />
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
            const allowRoles = ["RO-2003061", "RO-2003063", "RO-2003065", "RO-2003066", "RO-2003062"]
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
                console.log(err);
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