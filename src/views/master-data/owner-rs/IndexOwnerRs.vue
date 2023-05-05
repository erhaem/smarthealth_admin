<template >
    <div class="card shadow">
        <div class="card-header">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <ButtonComponent Color="btn-dark" Message="Tambah Data +" data-bs-toggle="modal"
                    data-bs-target="#tambahData" />
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <th>
                            Nama
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Nomor HP
                        </th>
                        <th>
                            No KTP
                        </th>
                        <th>
                            Aksi
                        </th>
                    </thead>
                    <tbody v-for="data in dataOwnerRs" :key="index">
                        <tr>
                            <td>{{data.user.nama}}</td>
                            <td>{{data.user.email}}</td>
                            <td>{{data.user.nomorHp}}</td>
                            <td>{{data.noKtp}}</td>
                            <td>
                                <div class="d-flex justify-content-start">
                                    <ButtonComponent Color="btn-warning" Message="Edit"/>
                                    <ButtonComponent Color="btn-danger" Message="Hapus"/>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <ModalComponent id="tambahData" :modalTitle="'Tambah ' + $route.name">
        <template #modal>
            <Form @submit="postOwner">
                <div class="row">
                    <div class="col-sm-6 col-6">
                        <label for="">Nama</label>
                        <InputField Name="nama" v-model="form.nama"/>
                        <label for="">Email</label>
                        <InputField Name="email" v-model="form.email"/>
                        <label for="">Password</label>
                        <InputField Name="password" v-model="form.password"/>
                    </div>
                    <div class="col-sm-6 col-6">
                        <label for="">Nomor Hp</label>
                        <InputField Name="nomor_hp" v-model="form.nomor_hp"/>
                        <label for="">Alamat</label>
                        <InputField Name="alamat" v-model="form.alamat"/>
                        <label for="">NIK</label>
                        <InputField Name="noktp" v-model="form.no_ktp"/>
                    </div>
                </div>
                <ButtonComponent/>
            </Form>
        </template>
    </ModalComponent>
</template>
<script>
import ModalComponent from '../../../components/partials-component/ModalComponent.vue';
import ButtonComponent from '../../../components/partials-component/ButtonComponent.vue';
import { Form } from 'vee-validate';
import InputField from '../../../components/partials-component/InputField.vue';
import iziToast from 'izitoast';
export default {
    data(){
        return {
            dataOwnerRs: [],
            form: {
                nama: '',
                email: '',
                password: '',
                nomor_hp: '',
                alamat: '',
                no_ktp: ''
            }
        }
    },
    created(){
        this.getOwner()
    },
    methods: {
        getOwner(){
            let type = "getData" 
            let url = [
                "akun/owner_rs", {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                console.log(result);
                this.dataOwnerRs = result.data
            }).catch((err)=>{
                console.log(err);
            })
        },
        goBack(){
            window.location = '/master/owner_rs'
        },
        postOwner(){
            let type = "postData"
            let url = [
                "akun/owner_rs", this.form
            ]
            this.$store.dispatch(type, url).then((result)=>{
                this.goBack()
            }).catch((err)=>{
                console.log(err);
            })
        },
    },
    components: {
        InputField, Form, ButtonComponent, ModalComponent
    }
}
</script>
<style >
    
</style>