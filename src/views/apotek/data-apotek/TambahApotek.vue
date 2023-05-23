<template>
    <div class="card shadow">
        <div class="card-header">
            <h6 class="text-primary font-weight-bold">
                {{ $route.name }}
            </h6>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-6 col-sm-6">
                    <label for="">Nama Apotek</label>
                    <InputField v-model="form.nama_apotek" />
                    <label for="">Deskripsi</label>
                    <InputField v-model="form.deskripsi_apotek" />
                    <label for="">Alamat</label>
                    <InputField v-model="form.alamat_apotek" />
                </div>
                <div class="col-6 col-sm-">
                    <label for="">Nomor HP</label>
                    <InputField v-model="form.nomor_hp" />
                    <label for="">latitude</label>
                    <InputField v-model="form.latitude" />
                    <label for="">longitude</label>
                    <InputField v-model="form.longitude" />
                </div>
            </div>
            <ButtonComponent @click="postApotek" />
        </div>
    </div>
</template>
<script>
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue';
import InputField from '@/components/partials-component/InputField.vue';
export default {
    data() {
        return {
            form: {
                nama_apotek: '',
                deskripsi_apotek: '',
                alamat_apotek: '',
                nomor_hp: '',
                latitude: '',
                longitude: ''
            }
        }
    },
    methods: {
        postApotek() {
            let type = "postData"
            let url = [
                "apotek/pengaturan/profil_apotek", this.form, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: {
        InputField,
        ButtonComponent
    }
}

</script>