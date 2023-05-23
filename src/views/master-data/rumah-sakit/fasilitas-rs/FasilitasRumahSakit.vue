<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <ButtonComponent v-if="$can('show', 'Fasilitas')" Message="Tambah Data +" data-bs-toggle="modal" data-bs-target="#tambahData" />
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Id Rs</th>
                            <th>Nama Rumah Sakit</th>
                            <th v-if="$can('create', 'Fasilitas')">Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading/>
                    </tbody>
                    <tbody v-else-if="fasilitasRs.length == 0">
                        <EmptyData/>
                    </tbody>
                    <template v-else-if="fasilitasRs.length">
                        <tbody v-for="data in fasilitasRs" :key="index">
                            <tr>
                                <td>
                                    {{ data.idFasilitas }}
                                </td>
                                <td>
                                    {{ data.namaFasilitas }}
                                </td>
                                <td v-if="$can('create', 'Fasilitas')">
                                    <div class="d-flex justify-content-start">
                                        <router-link :to="{ name: 'Edit Fasilitas Rumah Sakit', params: { id: data.idFasilitas } }">
                                            <ButtonComponent Color="btn-warning" Message="edit" />
                                          </router-link>
                                        <ButtonComponent Color="btn-danger" Message="hapus"
                                            @click="deleteFasilitas(data.idFasilitas)" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                    <template>
                        <div class="vr">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus voluptatem possimus repellat sunt numquam excepturi ullam illum quae recusandae asperiores id repellendus, non fugiat, iure odio ipsam quam beatae eos.
                        </div>
                    </template>
                </table>
                <PaginationComponent />
            </div>
        </div>
    </div>
    <ModalComponent id="tambahData">
        <template #modal>
            <Form @submit="postFasilitas">
                <label>Nama Fasilitas</label>
                <InputField Name="Nama Fasilitas" v-model="form.nama_fasilitas" />
                <SelectOption v-model="form.id_rumah_sakit" Width="w-100" Label="Rumah Sakit">
                    <template #option>
                        <option value="">Pilih nama rumah sakit</option>
                        <option :value="data.rumahSakit.idRumahSakit" v-for="data in fasilitasRs" :key="index">{{ data.rumahSakit.namaRs }}
                        </option>
                    </template>
                </SelectOption>
                <br>
                <ButtonComponent />
            </Form>
        </template>
    </ModalComponent>
</template>

<script>
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue';
import PaginationComponent from '@/components/partials-component/PaginationComponent.vue';
import { Form } from 'vee-validate'
import iziToast from 'izitoast';
import InputField from '@/components/partials-component/InputField.vue';
import ModalComponent from '@/components/partials-component/ModalComponent.vue';
import SelectOption from '@/components/partials-component/SelectOption.vue';
import EmptyData from '@/components/empty-table/EmptyData.vue';
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue';
export default {
    data() {
        return {
            fasilitasRs: [],
            form: {
                nama_fasilitas: '',
                id_rumah_sakit: ''
            },
            isLoading: false,
            limit: 1
        }
    },
    computed: {
        idFromParams(){
            return this.$route.params.id
        },
        limitData(){
            
        }
    },
    created() {
        this.getFasilitas()
    },
    methods: {
        getFasilitas() {
            let type = "getData"
            let url = [
                "master/rumah_sakit/fasilitas_rs/rs/" + this.idFromParams, {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.fasilitasRs = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        postFasilitas() {
            let type = "postData"
            let url = [
                "master/rumah_sakit/fasilitas_rs", this.form
            ]
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success',
                    message: 'Data Berhasil Ditambahkan',
                    position: 'topRight',
                    timeout: 2000
                })
                this.getFasilitas()
            }).catch((err) => {
                console.log(err);
            })
        },
        deleteFasilitas(idFasilitas) {
            let type = "deleteData"
            let url = [
                "master/rumah_sakit/fasilitas_rs", idFasilitas
            ]
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success',
                    message: 'Data Berhasil Dihapus',
                    position: 'topRight',
                    timeout: 1000
                })
                this.getFasilitas()
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: {
        ButtonComponent,
        Form,
        InputField,
        PaginationComponent,
        ModalComponent,
        SelectOption,
        EmptyData,
        EmptyLoading
    }
}
</script>