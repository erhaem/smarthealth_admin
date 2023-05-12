<template>
    <Form @submit="postSpesialisRS">
        <SelectOption v-model="form.penyakit.idPenyakit">
            <template #option>
                <option value="">pilih nama spesialis</option>
                <option :value="data.idPenyakit" v-for="data in spesialisPenyakit">{{ data.namaSpesialis }}</option>
            </template>
        </SelectOption>
        <ButtonComponent />
    </Form>
</template>
<script>
import { Form } from 'vee-validate'
import SelectOption from '@/components/partials-component/SelectOption.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
export default {
    data() {
        return {
            editSPRS: [],
            spesialisPenyakit: [],
            form: {
                penyakit: {
                    idPenyakit: ''
                }
            }
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        },
        idFromSpesialis() {
            return this.$route.params.idSpesialis
        },
    },
    created() {
        this.getData(),
            this.getSpesialisPenyakit()
    },
    methods: {
        getData() {
            let type = "getData"
            let url = [
                "master/rumah_sakit/spesialis" + '/' + this.idFromParams + '/' + this.idFromSpesialis, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                console.log(result.data);
                this.editSPRS = result.data
            }).catch((err) => {
                console.log(err);
            })
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
        postSpesialisRS() {
            let type = "updateData"
            let url = [
                `master/rumah_sakit/spesialis`, this.idFromSpesialis, {
                    id_penyakit: this.form.penyakit.idPenyakit
                }, {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                console.log(result.data);
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: {
        SelectOption, Form, ButtonComponent
    }
}
</script>