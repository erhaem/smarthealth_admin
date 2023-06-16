<template>
    <InputField v-model="form.nomorStr"/>
    <button @click="updateData">submit</button>
</template>
<script>
import InputField from '@/components/partials-component/InputField.vue'
export default {
    data(){
        return {
            form: {
                nomorStr: ''
            }
        }
    },
    computed: {
        idFromParams(){
            return this.$route.params.id
        }
    },
    components: {
        InputField
    },
    methods: {
        updateData(){
            const idDokter = this.idFromParams
            let type = "putData"
            this.$store.dispatch(type, [`akun/active_account/${idDokter}/dokter` ,[], {
                nomor_str:this.form.nomorStr
            }]).then((result)=>{
                console.log(result);
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
}
</script>