<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <th>No</th>
                    <th>Nama</th>
                    <th>Akun</th>
                    <th>Aksi</th>
                    <tbody v-for="(data, index) in akun" :key="index">
                        <tr>
                            <td> {{ index + 1 }} </td>
                            <td> {{ data.nama }} </td>
                            <td> {{ data.role.namaRole }} </td>
                            <td>
                                <ButtonComponent data-bs-toggle="modal" data-bs-target="#tambahData" Message="Aktifkan Akun"
                                    @click="lihat(data.id)" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <ModalComponent id="tambahData">
        <template #modal>
            <label for="">Nomor STR</label>
            <InputField v-model="form.nomor_str" />
            <selectOption Width="w-100 mb-3" Label="Kategori Dokter" v-model="form.is_dokter_rs">
                <template #option>
                    <option value="">pilih kategori dokter</option>
                    <option value="1">terikat rumah sakit</option>
                    <option value="2">tidak terikat rumah sakit</option>
                </template>
            </selectOption>
            <selectOption Width="w-100" v-if="form.is_dokter_rs === '1'" Label="Praktek di Rumah Sakit" v-model="form.id_rumah_sakit">
                <template #option>
                    <option value="">pilih tempat praktek</option>
                    <option :value="data.idRumahSakit" v-for="data in rumahSakit">
                        {{ data.namaRs }}
                    </option>
                </template>
            </selectOption>
            <ButtonComponent class="mt-3" @click="simpanAkun" />
        </template>
    </ModalComponent>
</template>
<script>
import SelectOption from '@/components/partials-component/SelectOption.vue'
import InputField from '@/components/partials-component/InputField.vue'
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
export default {
    data() {
        return {
            akun: [],
            rumahSakit: [],
            idUser: {},
            form: {
                nomor_str: '',
                is_dokter_rs: '',
                id_rumah_sakit: ''
            }
        }
    },
    components: {
        ButtonComponent, ModalComponent, InputField, SelectOption
    },
    created() {
        this.getAkun(),
        this.getRumahSakit()
    },
    methods: {
        getAkun() {
            let type = "getData"
            let url = [
                "akun/data_register", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.akun = result.data
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        },
        lihat(id) {
            this.idUser = id
        },
        simpanAkun() {
            let type = "putData";
            let url = [
                `akun/active_account/${this.idUser}/account`, {
                    id_rumah_sakit: this.form.id_rumah_sakit,
                    is_dokter_rs: this.form.is_dokter_rs,
                    nomor_str: this.form.nomor_str
                }
            ];
            this.$store.dispatch(type, url).then((result)=>{
                console.log(result);
            }).catch((err)=>{
                console.log(err);
            })
        },
        getRumahSakit(){
            let type = "getData"
            let url = [
                "master/rumah_sakit/data", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.rumahSakit = result.data
            }).catch((err) => {
                console.log(err);
            })
        }
    },
}
</script>