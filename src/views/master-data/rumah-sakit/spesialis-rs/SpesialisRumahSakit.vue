<template>
    <div class="card shadow">
        <div class="card-header">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <div class="d-flex justify-content-start">
                    <div>
                        <ButtonComponent data-bs-toggle="modal" data-bs-target="#tambahData" Message="Tambah Data +" />
                        <!-- <div v-if="selected.length === 0"></div>
                            <ButtonComponent v-else-if="selected" Color="btn-danger" Message="hapus" @click="deleteData" /> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" cellspacing="0">
                    <thead>
                        <th>pilih</th>
                        <th>Nama</th>
                        <th>Aksi</th>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="dataSpesialis.length === 0">
                        <EmptyData />
                    </tbody>
                    <template v-else>
                        <tbody v-for="data in dataSpesialis">
                            <tr>
                                <td>
                                    {{ data.idSpesialis }}
                                </td>
                                <td>{{ data.penyakit.namaSpesialis }}</td>
                                <td>
                                    <div class="d-flex">
                                        <router-link :to="'/master/rumah_sakit/spesialis/' + idFromParams + '/' + data.idSpesialis">
                                            <ButtonComponent Message="edit" Color="btn-warning" />
                                          </router-link>                                          
                                        <ButtonComponent Color="btn-danger" Message="hapus" @click="deleteData(data.idSpesialis)"/>
                                        <router-link :to="'/master/rumah_sakit/dokter/' + data.penyakit.idPenyakit + '/' + idFromParams">
                                            <ButtonComponent Color="btn-success" Message="+ dokter spesialis" />
                                        </router-link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </table>
            </div>
        </div>
    </div>
    <ModalComponent id="tambahData">
        <template #modal>
            <Form @submit="postSpesialis">
                <SelectOption Label="Spesialis" Width="w-100" v-model="form.id_penyakit">
                    <template #option>
                        <option value="">pilih spesialis</option>
                        <option :value="data.idPenyakit" v-for="data in spesialisPenyakit">{{ data.namaSpesialis }}</option>
                    </template>
                </SelectOption>
                <ButtonComponent />
            </Form>
        </template>
    </ModalComponent>
</template>
<script>
import SelectOption from '@/components/partials-component/SelectOption.vue'
import { Form } from 'vee-validate'
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import EmptyData from '@/components/empty-table/EmptyData.vue'
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue'
export default {
    data() {
        return {
            dataSpesialis: [],
            spesialisPenyakit: [],
            selected: [],
            isLoading: false,
            form: {
                id_rumah_sakit: '',
                id_penyakit: ''
            }
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        }
    },
    created() {
        this.getSpesialis(),
            this.getSpesialisPenyakit()
    },
    methods: {
        getSpesialis() {
            let type = "showData"
            let url = [
                "master/rumah_sakit/spesialis", this.idFromParams
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.dataSpesialis = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        postSpesialis() {
            const userId = this.idFromParams;
            console.log(userId);
            let type = 'postData';
            let url = [
                `master/rumah_sakit/spesialis/${userId}`,
                {
                    id_rumah_sakit: this.idFromParams,
                    id_penyakit: this.form.id_penyakit
                }
            ];
            this.$store
                .dispatch(type, url)
                .then((result) => {
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getSpesialisPenyakit() {
            let type = "getData"
            let url = [
                "master/penyakit/spesialis_penyakit", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.spesialisPenyakit = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        deleteData(idSpesialis){
            let type = "deleteData"
            let url = [
                "master/rumah_sakit/spesialis", idSpesialis
            ]
            this.$store.dispatch(type, url).then((result)=>{
                this.getSpesialis()
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    components: {
        EmptyData, EmptyLoading, ButtonComponent, Form, SelectOption, ModalComponent
    }
}
</script>