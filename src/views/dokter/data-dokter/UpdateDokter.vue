<template>
    <label for="">Update Nomor STR</label>
    <InputField v-model="form.nomorStr" class="w-50"/>
    <button @click="updateData" class="btn btn-sm btn-primary">submit</button>
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
            this.$store.dispatch(type, [`akun/active_account/${idDokter}/account` ,[], {
                nomor_str:this.form.nomorStr
            }]).then((result)=>{
                console.log(result);
                // this.$router.back()
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
}
</script>