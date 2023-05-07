<template>
    <div class="card shadow">
        <div class="card-header">
            <h6 class="font-weight-bold text-primary">
                {{ $route.name }}
            </h6>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" cellspacing="0">
                        <thead>
                            <th>nama</th>
                            <th>nomor hp</th>
                            <th>alamat</th>
                            <th>status</th>
                        </thead>
                        <tbody v-for="data in dataApotek">
                            <tr>
                                <td>{{data.namaApotek}}</td>
                                <td>{{data.nomorHp}}</td>
                                <td>{{data.alamatApotek}}</td>
                                <td>
                                    <ActiveSlider :checked="data.status == 1">
                                        <template #span>
                                            <SpanSlider @click="updateStatus(data.idProfilApotek, data.status)"/>
                                        </template>
                                    </ActiveSlider>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <br>
    <br>
    <Form @submit="postApotek">
        <InputField Name="nama" v-model="form.nama"/>
        <InputField Name="email" v-model="form.email"/>
        <InputField Name="password" v-model="form.password"/>
        <InputField Name="alamat" v-model="form.alamat"/>
        <InputField Name="nomorhp" v-model="form.nomor_hp"/>
        <!-- <InputField Name="status" hidden v-model="form.status"/> -->
        <ButtonComponent/>
    </Form>
</template>
<script>
import { Form } from 'vee-validate';
import ActiveSlider from '../../components/partials-component/ActiveSlider.vue';
import SpanSlider from '../../components/partials-component/SpanSlider.vue'
import InputField from '../../components/partials-component/InputField.vue';
import ButtonComponent from '../../components/partials-component/ButtonComponent.vue';
export default {
    data() {
        return {
            dataApotek: [],
            form: {
                nama: '',
                email: '',
                alamat: '',
                password: '',
                status: '0',
                nomor_hp: ''
            }
        };
    },
    created() {
        this.getApotek();
    },
    methods: {
        getApotek() {
            let type = "getData";
            let url = [
                "apotek/pengaturan/profil_apotek",
                {}
            ];
            this.$store.dispatch(type, url).then((result) => {
                this.dataApotek = result.data;
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });
        },
        updateStatus(id_user, status){
            if(status == 1){
                status == 0
            } else {
                status == 1
            }
            let type = "updateData"
            let url = [
                "apotek/pengaturan/profil_apotek/aktifkan", 
                id_user,
                {
                    status: status,
                }
            ]
            this.$store.dispatch(type, url).then((result)=>{
                console.log(result);
            }).catch((err)=>{
                console.log(err);
            })
        }, 
        postApotek(){
            let type = "postData"
            let url = [
                "akun/apotek", this.form, {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                console.log(result);
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    components: { SpanSlider, ActiveSlider, InputField, ButtonComponent, Form }
}
</script>