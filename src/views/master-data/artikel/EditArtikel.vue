<template>
    <div class="card shadow rounded">
        <div class="card-header">
            <h6><b class="text-primary">{{ $route.name }}</b></h6>
        </div>
        <div class="card-body">
            <Form @submit="submitEdit" :validation-schema="schema" v-slot="{ errors }">
                <div>
                    <label for="">Judul Artikel</label>
                    <InputField class="w-25" Name="judulArtikel" v-model="form.judulArtikel" />
                    <span>{{ errors.judulArtikel }}</span>
                </div>
                <div>
                    <label for="">Deskripsi Artikel</label>
                    <textarea class="form-control border-primary" v-model="form.deskripsi" cols="30" rows="10"></textarea>
                </div>
                <div class="d-flex justify-content-between">
                    <ButtonComponent class="mt-3" />
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
import InputField from '@/components/partials-component/InputField.vue';
import iziToast from 'izitoast'
import { Form, Field } from 'vee-validate'
import ButtonComponent from '../../../components/partials-component/ButtonComponent.vue';
import TextArea from '../../../components/partials-component/TextArea.vue';
import * as valid from 'yup'
export default {
    data() {
        return {
            form: {
                judulArtikel: '',
                deskripsi: ''
            }
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        },
        schema() {
            let message = 'wajib diisi'
            return valid.object({
                judulArtikel: valid.string().required(message)
            })
        }
    },
    components: {
        InputField,
        Form,
        Field,
        ButtonComponent,
        TextArea
    },
    created() {
        this.detailArtikel()
    },
    methods: {
        detailArtikel() {
            let type = "getData"
            let url = [
                "master/artikel/" + this.idFromParams + "/edit", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.form = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        submitEdit() {
            let type = "updateData"
            let url = [
                "master/artikel", this.idFromParams, this.form
            ]
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success',
                    message: 'data berhasil diubah',
                    position: 'topRight',
                    timeout: 1000
                })
                this.$router.back()
            }).catch((err) => {
                console.log(err);
            })
        }
    },
}
</script>