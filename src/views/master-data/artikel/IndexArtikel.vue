<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <ButtonComponent v-if="$can('create' , 'Artikel')" Color="btn-dark" Message="Tambah Data +" data-bs-toggle="modal"
                    data-bs-target="#tambahData" />
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Judul</th>
                            <th>Deskripsi</th>
                            <th>Penulis</th>
                            <th v-if="$can('edit', 'Artikel')">Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="dataArtikel.length == 0">
                        <EmptyData />
                    </tbody>
                    <template v-else>
                        <tbody v-for="data in dataArtikel" :key="index">
                            <tr>
                                <td>{{ data.judulArtikel }}</td>
                                <td>{{ data.deskripsi }}</td>
                                <td>{{ data.getUser.nama }}</td>
                                <td  v-if="$can('edit', 'Artikel')">
                                    <div class="d-flex justify-content-start">
                                        <router-link :to="'artikel/' + data.idArtikel + '/edit'">
                                            <ButtonComponent Message="edit" Color="btn-warning" />
                                        </router-link>
                                        <ButtonComponent Message="hapus" Color="btn-danger"
                                            @click="deleteArtikel(data.idArtikel)" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </table>
            </div>
        </div>
    </div>
    <ModalComponent id="tambahData" labelBy="exampleModalLabel" :modalTitle="'Tambah ' + $route.name">
        <template #modal>
            <Form :validation-schema="schema" v-slot="{ errors }">
                <input type="text" hidden v-model="artikels.id_artikel">
                <div>
                    <Label>Foto Artikel</Label>
                    <input type="file" @change="chooseFoto" class="form-control">
                    <span :class="[error]">{{ errors.foto }}</span>
                </div>
                <div>
                    <Label>Judul Artikel</Label>
                    <InputField Name="judulArtikel" v-model="artikels.judul_artikel" />
                    <span :class="[error]">{{ errors.judulArtikel }}</span>
                </div>
                <div>
                    <Label>Deskripsi</Label>
                    <textarea name="deskripsi" class="form-control border-primary" v-model="artikels.deskripsi"></textarea>
                </div>
                <div>
                    <ButtonComponent @click="handleKontol()"/>
                </div>
            </Form>
        </template>
    </ModalComponent>
</template>

<script>
import InputField from '../../../components/partials-component/InputField.vue';
import { Form } from 'vee-validate'
import iziToast from 'izitoast';
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue';
import ModalComponent from '@/components/partials-component/ModalComponent.vue';
import EmptyData from '../../../components/empty-table/EmptyData.vue';
import EmptyLoading from '../../../components/empty-table/EmptyLoading.vue';
import * as valid from 'yup'
export default {
    data() {
        return {
            dataArtikel: [],
            artikels: {
                judul_artikel: '',
                deskripsi: '',
                foto: ''
            },
            isLoading: false,
            error: 'text-danger'
        };
    },
    computed: {
        schema() {
            let message = 'wajib diisi'
            return valid.object({
                judulArtikel: valid.string().required(message),
                deskripsi: valid.string().required(message)
            })
        },
        formData() {
            const formData = new FormData()

            formData.append('foto', this.artikels.foto)
            formData.append('judul_artikel', this.artikels.judul_artikel)
            formData.append('deskripsi', this.artikels.deskripsi)

            return formData;
        }
    },
    created() {
        this.getArtikel();
    },
    methods: {
        getArtikel() {
            let type = "getData";
            let url = [
                "master/artikel",
                {}
            ];
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.dataArtikel = result.data;
                this.isLoading = false
                console.log(result.data);
            }).catch((err) => {
                console.log(err);
            });
        },
        goBack() {
            window.location = '/master/artikel'
        },
        deleteArtikel(idArtikel) {
            let type = "deleteData"
            let url = [
                "master/artikel", idArtikel
            ]
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'berhasil',
                    message: 'Data Artikel Berhasil Dihapus',
                    position: 'topRight',
                    timeout: 1000
                })
                this.getArtikel()
            }).catch((err) => {
                console.log(err);
            })
        },
        handleKontol() {
            let type = "postDataUpload"
            this.$store.dispatch(type, [this.formData, '/master/artikel']).then((result) => {
                iziToast.success({
                    title: 'success',
                    position: 'topRight',
                    message: 'Data Artikel Berhasil Ditambahkan',
                    timeout: 1000
                })
                this.goBack()
            }).catch((err) => {
                console.log(err);
            })
        },
        chooseFoto(event) {
            console.log(event);
            this.artikels.foto = event.target.files[0]
            console.log(this.artikels.foto)
        }
    },
    components: {
        ButtonComponent, ModalComponent, Form, InputField, EmptyData, EmptyLoading
    }
}
</script>