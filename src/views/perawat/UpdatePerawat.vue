<template>
    <InputField v-model="form.nomorStrp"/>
    <button @click="updateData">submit</button>
</template>
<script>
import InputField from '@/components/partials-component/InputField.vue'
export default {
    data(){
        return {
            form: {
                nomorStrp: ''
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
            const idPerawat = this.idFromParams
            let type = "putData"
            this.$store.dispatch(type, [`akun/active_account/${idPerawat}/account` ,[], {
                nomor_strp:this.form.nomorStrp
            }]).then((result)=>{
                this.$router.back()
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
}
</script>